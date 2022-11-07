import Vue from "vue";
import VueRouter from "vue-router";
import Apps from "@/Layout/index.vue";
import { authRouter } from './auth'
Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "App",
    component:  () => import('../Layout/index.vue'),
    children: [
      {
        path: "/about",
        name: "About",
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
      {
        path: "/home",
        name: "Home",
        component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
      },
    ]
  },
  
];
const routerContain = [
  ...authRouter,
  ...routes
]
const router = new VueRouter({
  mode: "history",
  routes: routerContain,
});

export default router;
