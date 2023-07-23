import { MdOutlineCompareArrows } from "react-icons/md";
import { IFilter } from "../model/car.interface";

type Props = {
  optionsTitle: IFilter[];
  filter?: any;
};

export default function Title(props: Props) {
  const { optionsTitle } = props;

  const toFilter = (event: any) => {
    props.filter(event.target);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto p-4 flex gap-4 flex-col lg:flex-row lg:justify-between items-center min-h-[80px]">
        <p className=" font-semibold text-3xl flex-1">Car Available</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-end w-full flex-1">
          <input
            type="text"
            placeholder="Search Car"
            name="search"
            onChange={toFilter}
            className=" border border-[#D1D5DB] h-[43px] lg:min-w-[300px] p-2 rounded w-full focus-visible:outline-[#1178ff]"
          />
          <label className="relative text-gray-400 focus-within:text-gray-600 block">
            <div className=" absolute top-[8px] rotate-90 left-2">
              <MdOutlineCompareArrows size={25} color="#000000" />
            </div>
            <select
              name="select"
              id="select"
              onChange={toFilter}
              className=" border border-[#D1D5DB] h-[43px] w-full md:min-w-[200px] py-2 px-4 rounded text-right text-black focus-visible:outline-[#1178ff]"
            >
              {optionsTitle.map((opt: IFilter, index: number) => {
                return (
                  <option key={index} value={opt.value}>
                    {opt.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
