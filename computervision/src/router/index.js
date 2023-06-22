import { createRouter, createWebHashHistory } from "vue-router";
import AdminLayout from "@/components/Admin/AdminLayout.vue";
import DetailsCanCuoc from "@/components/Admin/DetailsCanCuoc.vue";
import HistoryAdmin from "@/components/Admin/HistoryAdmin.vue";
import CheckCard from "@/components/Admin/Add/CheckCard.vue";
import MainVue from "@/components/Main/MainVue.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: MainVue,
  },
  {
    path: "/admin",
    name: "abadminout",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        component: CheckCard,
      },
      {
        path: "history",
        component: HistoryAdmin,
      },
      {
        path: "detailscancuoc",
        component: DetailsCanCuoc,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
