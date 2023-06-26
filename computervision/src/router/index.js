import { createRouter, createWebHashHistory } from "vue-router";
import AdminLayout from "@/components/Admin/AdminLayout.vue";
import DataAdmin from "@/components/Admin/DataAdmin.vue";
import DetailsCanCuoc from "@/components/Admin/DetailsCanCuoc.vue";
import HistoryAdmin from "@/components/Admin/HistoryAdmin.vue";
import CheckCard from "@/components/Admin/CheckLocal/CheckCard.vue";
import InfoAdmin from "@/components/Admin/InfoAdmin.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: AdminLayout,
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
      {
        path: "data",
        component: DataAdmin,
      },
      {
        path: "info",
        component: InfoAdmin,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
