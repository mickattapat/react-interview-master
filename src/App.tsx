import { useEffect, useRef, useState } from "react";
import "./App.css";
import CarCard from "./components/CarCard";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { ICar, IDiscount, IOrder } from "./model/car.interface";
import Title from "./components/Title";
import { optionsTitle } from "./model/mock";
import { converterText, filterCars, trimText } from "./utils";

function App() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [discount, setDiscount] = useState<IDiscount[]>([]);
  const [carts, setCarts] = useState<IOrder[]>([]);
  const initDataCars = useRef<ICar[]>([]);
  const [addedID, setAddedID] = useState<any[]>([]);
  const search = useRef<string>("");
  const filter = useRef<string>("");

  const onFilter = async (value: any, data: any, getNew: boolean) => {
    const currentData = [...data];
    const newData = filterCars(value, currentData);
    if (!getNew) {
      return newData;
    } else {
      setCars(newData);
      return [];
    }
  };

  const onSearch = async (value: any) => {
    const currentData = [...initDataCars.current];
    const newDataSearch = currentData.filter((item: ICar) => {
      return converterText(trimText(item.fields.title), "lower").includes(
        converterText(trimText(value), "lower")
      );
    });
    return newDataSearch;
  };

  const filterData = async (event?: any) => {
    const name = event?.name || "";
    const value = event?.value || "";
    if (name === "search") {
      search.current = value;
      if (!search.current) {
        getData();
        getDiscount();
      }
    } else {
      filter.current = value;
    }
    const newData = await onSearch(search.current);
    const current = await onFilter(filter.current, newData, false);

    setCars(current);
  };

  const addToCart = (event: string) => {
    const added = [...addedID, event];
    localStorage.setItem("addedID", JSON.stringify(added));
    setAddedID(added);
    let data: any = cars.find((car: ICar) => car.sys.id === event);
    const order: IOrder = {
      img_url: data.fields.photo,
      id: data.sys.id,
      name: data.fields.title,
      price: data.fields.price,
      day: 1,
      total_price: 0,
    };
    const orders: IOrder[] = [
      ...carts,
      { ...order, total_price: order.price * order.day },
    ];
    localStorage.setItem("orders", JSON.stringify(orders));
    setCarts(orders);
  };

  const addOrDelete = (id: string, event: string) => {
    const orders = carts.filter((item: IOrder) => item.day !== 0);
    orders.forEach((item: IOrder) => {
      if (item.id === id) {
        if (event === "add") {
          ++item.day;
          item.total_price = item.price * item.day;
        } else {
          --item.day;
          item.total_price = item.price * item.day;
        }
      }
    });
    const newOrders = orders.filter((item: IOrder) => item.day >= 1);
    const newAddedID = newOrders.map((item: IOrder) => item.id);
    localStorage.setItem("addedID", JSON.stringify(newAddedID));
    localStorage.setItem("orders", JSON.stringify(newOrders));
    setAddedID(newAddedID);
    setCarts(newOrders);
  };

  const getData = async () => {
    try {
      const url = `https://cdn.contentful.com/spaces/${process.env.REACT_APP_USER_ID}/entries?access_token=${process.env.REACT_APP_ACCESS_TOKEN}&content_type=car`;
      const info = await fetch(url);
      const json = await info.json();
      if (json.sys.type !== "Error") {
        setCars(json.items);
        initDataCars.current = json.items;
        onFilter(filter.current, initDataCars.current, true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDiscount = async () => {
    try {
      const url = `https://cdn.contentful.com/spaces/${process.env.REACT_APP_USER_ID}/entries?access_token=${process.env.REACT_APP_ACCESS_TOKEN}&content_type=discount`;
      const info = await fetch(url);
      const json = await info.json();
      if (json.sys.type !== "Error") {
        console.log(json.items);
        setDiscount(json.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getDiscount();
    const orders: any = localStorage.getItem("orders");
    const addedID: any = localStorage.getItem("addedID");
    if (JSON.parse(orders)) {
      setCarts(JSON.parse(orders));
    }
    if (JSON.parse(addedID)) {
      setAddedID(JSON.parse(addedID));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar carts={carts} addOrDelete={addOrDelete} discount={discount} />
      <Title optionsTitle={optionsTitle} filter={filterData} />
      <div className="content container px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars?.map((car: ICar, index: number) => {
            return (
              <CarCard
                car={car}
                addToCart={addToCart}
                key={car.sys.id}
                addedID={addedID}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
