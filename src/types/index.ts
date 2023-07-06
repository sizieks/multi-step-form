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
  monthly: number;
  yearly: number;
}

export interface IPlan<T = IPrice> {
  id: number;
  icon: string;
  label: string;
  // price: { monthly: number; yearly: number; }
  price: T;
}

export interface IAddon<T = IPrice> extends Omit<IPlan<T>, 'icon'> {
  description: string;
}

export interface IResponse {
  addons: IAddon[];
  billing: string;
  currency: string;
  plans: IPlan[];
}
