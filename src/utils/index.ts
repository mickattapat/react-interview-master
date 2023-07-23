import { ICar } from "../model/car.interface";

type SortText = "lower" | "upper" 

export const filterCars = (value: any, carsData: ICar[]) => {
  console.log(value);
  switch (value) {
    case "textAscending":
      return carsData.sort(function(a, b){
        if(a.fields.title < b.fields.title) { return -1; }
        if(a.fields.title > b.fields.title) { return 1; }
        return 0;
    })
    case "textDescending":
      return carsData.sort(function(a, b){
        if(a.fields.title > b.fields.title) { return -1; }
        if(a.fields.title < b.fields.title) { return 1; }
        return 0;
    })
    case "HighToLow":
      return carsData.sort(function (a, b) {
        return toNumber(b.fields.price) - toNumber(a.fields.price);
      })
    default:
      return carsData.sort(function (a, b) {
        return toNumber(a.fields.price) - toNumber(b.fields.price);
      })
  }
}

export const toNumber = (value:any) : number => {
  const number = Number(value)
  return isNaN(number) ? 0 : number
}

export const toString = (value:any) : string => {
  const stringValue = String(value)
  return stringValue
}

export const converterText = (text:any,sort:SortText): string => {
  const newTest = String(text)
  if (sort === "upper") {
    return newTest.toUpperCase()
  } else {
    return newTest.toLowerCase()
  }
}

export const trimText = (text:any): string => {
  const value = text.split(" ")
  return value.join("")
}


export const numberWithCommas = (num:any):string => {
  const checkNum = Number(num)
  return isNaN(checkNum) ? 0 : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


export const onImageError = (e: any) => {
  e.target.src = "/images/default-img.png";
};