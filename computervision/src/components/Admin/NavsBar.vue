<template>
  <v-navigation-drawer permanent>
    <v-list v-model:opened="open">
      <v-list-item
        v-for="nav in navsingles"
        :key="nav.to"
        :prepend-icon="nav.icon"
        :title="nav.title"
        :to="nav.to"
        :value="nav.to"
      >
      </v-list-item>
      <v-list-group
        v-for="nav in navgroups"
        :key="nav.value"
        :value="nav.value"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="nav.title"
            :prepend-icon="nav.icon"
          ></v-list-item>
        </template>
        <v-list-item
          v-for="sub in nav.subnav"
          :key="sub.to"
          :prepend-icon="sub.icon"
          :title="sub.title"
          :to="sub.to"
          :value="sub.to"
        >
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "NavsBar",
  data() {
    return {
      open: [],
      navsingles: [
        {
          icon: "mdi-view-dashboard",
          title: "Kiểm tra",
          to: "/admin/dashboard",
        },
        {
          icon: "mdi-view-dashboard",
          title: "Lịch sử",
          to: "/admin/history",
        },
      ],
      navgroups: [
        {
          icon: "mdi mdi-account-supervisor",
          title: "Tài khoản",
          value: "taikhoan",
          subnav: [
            {
              icon: "mdi mdi-account-supervisor",
              title: "Danh sách tài khoản",
              to: "/admin/courses",
            },
            {
              icon: "mdi mdi-account-remove",
              title: "Tài khoản vi phạm",
              to: "/admin/courses",
            },
            {
              icon: "mdi mdi-account-convert",
              title: "Phân quyền tài khoản",
              to: "/admin/courses",
            },
          ],
        },
        {
          icon: "mdi mdi-book-open",
          title: "Giấy tờ",
          value: "giayto",
          subnav: [
            {
              icon: "mdi mdi-book-open",
              title: "Căn cước",
              to: "/admin/post",
            },
            {
              icon: "mdi mdi-book-open",
              title: "BLX",
              to: "/admin/courses",
            },
            {
              icon: "mdi mdi-book-open",
              title: "Passport",
              to: "/admin/courses",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped></style>
