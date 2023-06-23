<template>
  <v-navigation-drawer width="80" border="0">
    <v-list v-model:opened="open">
      <v-list-item
        style="border-radius: 5px; text-align: center; padding: 20px"
        v-for="nav in navsingles"
        :key="nav.to"
        :to="nav.to"
        :value="nav.to"
      >
        <v-icon :icon="nav.icon" size="30"></v-icon>
      </v-list-item>
      <v-list-group
        v-for="nav in navgroups"
        :key="nav.value"
        :value="nav.value"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :prepend-icon="nav.icon"></v-list-item>
        </template>
        <v-list-item
          v-for="sub in nav.subnav"
          :key="sub.to"
          :prepend-icon="sub.icon"
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
          icon: "mdi mdi-card-account-details-outline",
          to: "/admin/dashboard",
        },
        {
          icon: "mdi mdi-history",
          to: "/admin/history",
        },
        {
          icon: "mdi mdi-format-list-bulleted-square",
          to: "/admin/data",
        },
        {
          icon: "mdi mdi-information-outline",
          to: "/admin/info",
        },
      ],
      navgroups: [],
    };
  },
};
</script>

<style lang="css" scoped></style>
