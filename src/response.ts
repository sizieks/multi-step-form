import { IResponse } from './types';
import advanced from './assets/images/icon-advanced.svg';
import arcade from './assets/images/icon-arcade.svg';
import pro from './assets/images/icon-pro.svg';

export const response: IResponse = {
  addons: [
    {
      description: 'Access to multiplayer games',
      id: 1,
      label: 'Online service',
      price: { monthly: 1, yearly: 10 },
    },
    {
      description: 'Extra 1TB of cloud save',
      id: 2,
      label: 'Larger storage',
      price: { monthly: 2, yearly: 20 },
    },
    {
      description: 'Custom theme on your profile',
      id: 3,
      label: 'Customizable Profile',
      price: { monthly: 3, yearly: 30 },
    },
  ],
  billing: 'monthly',
  currency: '$',
  plans: [
    {
      id: 1,
      icon: arcade,
      label: 'Arcade',
      price: { monthly: 9, yearly: 90 },
    },
    {
      id: 2,
      icon: advanced,
      label: 'Advanced',
      price: { monthly: 12, yearly: 120 },
    },
    {
      id: 3,
      icon: pro,
      label: 'Pro',
      price: { monthly: 15, yearly: 150 },
    },
  ],
};
