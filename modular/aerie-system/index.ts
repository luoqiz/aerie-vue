import Image from "./src/Image/index.vue";

import { Router } from "vue-router";
import { Pinia } from "pinia";
import { registerSystemRouter } from "./src/router";

export function useSystemModule({
  router,
  pinia,
}: {
  router: Router;
  pinia: Pinia;
}) {
  registerSystemStores(pinia);
  registerSystemRouter(router);
}

export function registerSystemStores(pinia: Pinia) {
  const storeModules = import.meta.glob("./src/stores/*.ts", { eager: true });

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

export { Image };
