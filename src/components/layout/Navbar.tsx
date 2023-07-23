import { useState } from "react";
import { LuShoppingBag } from "react-icons/lu";
import ModalCart from "../ModalCart";
import { IDiscount, IOrder } from "../../model/car.interface";
import { onImageError } from "../../utils";
type Props = {
  carts: IOrder[];
  discount: IDiscount[];
  addOrDelete: any;
};

function Navbar(props: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const carts = props.carts;

  return (
    <>
      <div className="shadow-md bg-white sticky z-10 top-0">
        <div className="container mx-auto p-4 flex justify-between items-center h-[80px]">
          <img
            src="/images/dh-logo.svg"
            className="max-h-[50px]"
            alt="logo"
            onError={onImageError}
          />
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <LuShoppingBag size={30} />
            <div className="pl-2">Cart({carts.length})</div>
          </div>
        </div>
      </div>
      <div>
        {showModal ? (
          <ModalCart
            carts={carts}
            addOrDelete={props.addOrDelete}
            discount={props.discount}
            onClose={() => setShowModal(false)}
          />
        ) : null}
        {/* { showModal ? showHireMeModal : null } */}
      </div>
    </>
  );
}

export default Navbar;
