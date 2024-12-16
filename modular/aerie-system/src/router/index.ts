import { Router, RouteRecordRaw } from "vue-router";

let globalRouter: Router | null = null;

export const libraryRoutes: RouteRecordRaw[] = [
  // { path: "/login", component: () => import("../views/login/index.vue") },
  {
    path: "/system/dict",
    component: () => import("../views/system/dict/index.vue"),
  },
  {
    path: "/system/file",
    component: () => import("../views/system/file/index.vue"),
  },
];

export function registerSystemRouter(router: Router) {
  globalRouter = router;
  libraryRoutes.forEach((route) => {
    router.addRoute(route);
  });
}
