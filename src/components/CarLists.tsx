import { IOrder } from "../model/car.interface";
import { onImageError } from "../utils";
import ButtonAddOrRemove from "./ButtonAddOrRemove";

type Props = {
  item: IOrder;
  addOrDelete: any;
};

export default function CarLists({ item, addOrDelete }: Props) {
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <img
            src={item.img_url}
            alt={item.name}
            className="w-[87px] h-full hidden md:block"
            onError={onImageError}
          />
          <div className="flex flex-col justify-between">
            <p className="text-xl font-bold">{item.name}</p>
            <p className="text-sm font-medium">{item.price} THB/Day</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ButtonAddOrRemove
            addOrDelete={addOrDelete}
            type="add"
            id={item.id}
            text="+"
          />
          <p className="text-2xl font-normal">{item.day}</p>
          <ButtonAddOrRemove
            addOrDelete={addOrDelete}
            type="delete"
            id={item.id}
            text="-"
          />
        </div>
      </div>
      <hr className="my-2" />
    </>
  );
}
