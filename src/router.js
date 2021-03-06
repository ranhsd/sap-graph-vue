import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/Home.vue")
    },
    {
      path: "/orders/:id",
      name: "orders",
      props: true,
      component: () => import("@/pages/SalesOrderPage.vue")
    },  
    {
      path: "/order/:id",
      name: "order",
      props: true,
      component: () => import("@/pages/Order.vue")
    }  
  ]
});
