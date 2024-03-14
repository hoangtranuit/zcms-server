import { IRoute } from "@zcmjs/layout";
import { APIService } from "src/services";
import { create } from "zustand";
import app from "src/configs/app";

type IAppConfig = {
  name: string;
  logo: string;
  sidebar: {
    menus: IRoute[];
  };
};

interface IAppStore {
  config: IAppConfig;
  isDarkTheme: boolean;
  actions: {
    load: () => void;
    toggleTheme: () => void;
  };
}

const useAppStore = create<IAppStore>((set) => ({
  config: {
    name: "",
    logo: "",
    sidebar: {
      menus: [],
    },
  },
  isDarkTheme: app.isDarkTheme,
  actions: {
    load: async () => {
      const json = await APIService.getConfig();
      set({
        config: json.data,
      });
    },
    toggleTheme: () => {
      set((state) => ({ isDarkTheme: !state.isDarkTheme }));
    },
  },
}));

export const useConfig = () => useAppStore((state) => state);
