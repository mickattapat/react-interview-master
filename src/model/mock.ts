import { IFilter } from "./car.interface";

export const optionsTitle: IFilter[] = [
  {
    value: "LowToHigh",
    name: "Price: Low - High",
    status: true,
  },
  {
    value: "HighToLow",
    name: "Price: High - Low",
    status: true,
  },
  {
    value: "textDescending",
    name: "Name: Descending",
    status: true,
  },
  {
    value: "textAscending",
    name: "Name: Ascending",
    status: true,
  },
];