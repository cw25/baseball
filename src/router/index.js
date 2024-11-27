import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/BaseballHome.vue"),
    },
    {
      path: "/player_search",
      name: "player_search",
      component: () => import("../views/PlayerSearch.vue"),
    },
    {
      path: "/player_details/:id",
      name: "player_details",
      component: () => import("../views/PlayerDetails.vue"),
    },
   ],
});

export default router;
