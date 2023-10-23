export interface IFormState {
  email: string;
  name: string;
  phone: string;
}

export interface IForm extends IFormState {
  addons: number[];
  billing: string;
  currency: string;
  plan: number;
  total: number;
}

export interface IStep {
  description: string;
  title: string;
}

export interface IPrice {
  decorated: string;
  plain: number;
}

export interface IPeriod<T = IPrice> {
  [key: string]: T;
}

export interface IAddon<T = IPrice> {
  description: string;
  id: number;
  label: string;
  price: IPeriod<T>;
}

export interface IPlan<T = IPrice> extends Omit<IAddon<T>, 'description'> {
  icon: string;
}

export interface IResponse {
  addons: IAddon<number>[];
  billing: string;
  currency: string;
  plans: IPlan<number>[];
}
