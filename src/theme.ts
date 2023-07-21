import { ThemeConfig } from "ant-design-vue/es/config-provider/context";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#483eff',
    colorError: '#f9818e',
    colorLink: '#483eff',
    fontFamily: 'Ubuntu',
    fontSize: 16,
  },
  components: {
    Steps: {
      colorFillContent: '#ffffff',
      colorSplit: '#ffffff',
      colorPrimary: '#ffaf7e',
      colorText: '#ffffff',
      colorTextDescription: '#ffffff',
      colorTextLabel: '#483eff',
      controlItemBgActive: '#ffffff',
    },
    Card: {
      fontSizeLG: 32,
      fontWeightStrong: 700,
    },
  },
};
