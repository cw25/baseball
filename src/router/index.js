import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/BaseballPage.vue"),
    },
    {
      path: "/plays_count",
      name: "plays_count",
      component: () => import("../views/PlaysCount.vue"),
    },
    {
      path: "/player_search",
      name: "player_search",
      component: () => import("../views/PlayerSearch.vue"),
    },
  ],
});

export default router;
