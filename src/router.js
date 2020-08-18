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
      path: "/sales-order/:id",
      name: "salesorder",
      props: true,
      component: () => import("@/pages/SalesOrderPage.vue")
    },    
  ]
});
