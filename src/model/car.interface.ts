export interface ICar {
  metadata: Metadata;
  sys: SysMain;
  fields: Fields;
}

export interface Fields {
  title: string;
  price: number;
  photo: string;
}

export interface SysMain {
  space: Space;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: Space;
  revision: number;
  contentType: Space;
  locale: string;
}

export interface Space {
  sys: Sys;
}

export interface Sys {
  type: string;
  linkType: string;
  id: string;
}

export interface Metadata {
  tags: any[];
}

// Model filter
export interface IFilter {
  value: string
  name: string
  status?: boolean
}

export interface TitleFilter {
  search: string;
  select: string;
};


// cart
export interface IOrder {
  img_url: string
  id: string
  name: string
  price: number
  day: number
  total_price: number
}


export interface IDiscount {
  metadata: Metadata;
  sys: Sys2;
  fields: FieldsDis;
}

interface FieldsDis {
  amount: number;
  code: string;
}

interface Sys2 {
  space: Space;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: Space;
  revision: number;
  contentType: Space;
  locale: string;
}