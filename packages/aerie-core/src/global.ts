import { Pinia } from "pinia";

export function registerStores(path: string, pinia: Pinia) {
  const storeModules = import.meta.glob(path, { eager: true });

  for (const path in storeModules) {
    const storeModule = storeModules[path];

    if (
      storeModule &&
      typeof storeModule === "object" &&
      "default" in storeModule
    ) {
      const useStore = storeModule.default;
      if (typeof useStore === "function") {
        useStore(pinia); // 调用 Store，并传入 pinia 实例
      }
    }
  }
}
