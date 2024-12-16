import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref("johe THREE");

    const setUser = (name: string) => {
      user.value = name;
    };
    return { user, setUser };
  },
  { persist: true }
);
