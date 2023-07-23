import { Fields, ICar, SysMain } from "../model/car.interface";
import { numberWithCommas, onImageError } from "../utils";

type Props = {
  car: ICar;
  addToCart?: any;
  addedID: any[];
};

export default function CarCard(porps: Props) {
  const fields: Fields = porps.car.fields;
  // const metadata: Metadata = porps.car.metadata;
  const sys: SysMain = porps.car.sys;

  const addID = (event: string) => {
    porps.addToCart(event);
  };

  const checkID = (id: string) => {
    return porps.addedID.includes(id);
  };

  return (
    <div className="w-full flex flex-col rounded-2xl shadow-md bg-white">
      <img
        className="rounded-t-2xl object-cover h-[160px]"
        src={fields.photo}
        alt={fields.title}
        onError={onImageError}
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <p className="font-bold text-xl truncate">{fields.title}</p>
          <p className="text-sm">{numberWithCommas(fields.price)} THB/Day</p>
        </div>
        <button
          onClick={() => addID(sys.id)}
          disabled={checkID(sys.id)}
          className={
            checkID(sys.id)
              ? `bg-[#93C5FD] text-white h-[56px] w-full rounded-lg mt-4 cursor-pointer`
              : `bg-[#3B82F6] text-white h-[56px] w-full rounded-lg mt-4 cursor-pointer`
          }
        >
          {checkID(sys.id) ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
