import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import CarLists from "./CarLists";
import { IDiscount, IOrder } from "../model/car.interface";
import { useState } from "react";
import { numberWithCommas } from "../utils";

type Props = {
  carts: IOrder[];
  onClose: any;
  addOrDelete: any;
  discount: IDiscount[];
};
export default function ModalCart(props: Props) {
  const [discount, setDiscount] = useState(0);
  const total = () => {
    const total = props.carts.reduce(
      (accumulator: number, currentValue: IOrder) => {
        return accumulator + currentValue.total_price;
      },
      0
    );
    return total;
  };
  const grandTotal = () => {
    const gtotal = total() - discount;
    return gtotal > 0 ? gtotal : 0;
  };

  const useDiscount = (event: any) => {
    const { value } = event.target;
    console.log(props.discount);
    const discount = props.discount.find(
      (item: IDiscount) => item.fields.code === value
    );
    setDiscount(discount?.fields?.amount || 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-30"
    >
      {/* Modal Backdrop */}
      <div className="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"></div>
      {/* Modal Content */}
      <main className="flex flex-col px-3 items-center justify-center w-full h-full">
        <div className="modal-wrapper flex items-center w-full h-full justify-center z-30">
          <div className="modal w-full max-w-md  xl:max-w-xl lg:max-w-xl md:max-w-xl bg-[#ffffff] dark:bg-primary-dark max-h-screen shadow-lg flex-row rounded-lg relative">
            <div className="modal-header flex justify-between gap-10 px-4 py-3">
              <h5 className="text-3xl font-semibold">Cart</h5>
              <button
                onClick={props.onClose}
                className="font-bold text-primary-dark dark:text-primary-light"
              >
                <FiX className="text-3xl" />
              </button>
            </div>
            <div className="modal-body px-5 pb-4 w-full max-h-[80vh] overflow-auto">
              <div className=" min-h-[300px]">
                {props.carts.map((item: IOrder) => {
                  return (
                    <CarLists
                      key={item.id}
                      item={item}
                      addOrDelete={props.addOrDelete}
                    />
                  );
                })}
              </div>
              <div className="bg-[#F3F4F6] p-4 rounded">
                <input
                  type="text"
                  placeholder="Discount code"
                  name="discount"
                  onChange={useDiscount}
                  className="border border-[#D1D5DB] h-[43px] lg:min-w-[300px] p-2 rounded w-full focus-visible:outline-[#1178ff]"
                />
              </div>
              <div className="flex flex-col mt-4">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">Total</p>
                  <p className="text-xl font-normal">
                    {numberWithCommas(total())} THB
                  </p>
                </div>
                <hr className=" my-2" />
                <div className="flex justify-between">
                  <p className="text-xl font-bold">Discount</p>
                  <p className="text-xl font-normal">
                    {numberWithCommas(discount)} THB
                  </p>
                </div>
                <hr className=" my-2" />
                <div className="flex justify-between">
                  <p className="text-xl font-bold">Grand Total</p>
                  <p className="text-xl font-normal">
                    {numberWithCommas(grandTotal())} THB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
