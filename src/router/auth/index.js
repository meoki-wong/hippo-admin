import Vue from "vue";


export const authRouter = [
  {
    path: "/login",
    name: "登录",
    component: () => import(/* webpackChunkName: 'auth' */ '../../views/login'),
  },
];


