import { defineStore } from "pinia";

export const useDictStore = defineStore("dictStore", {
  state: () => ({
    key: "dict key",
  }),
  actions: {
    setName(key: string) {
      this.key = key;
    },
  },
});
