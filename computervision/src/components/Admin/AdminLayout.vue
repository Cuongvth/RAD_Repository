<template>
  <v-layout class="rounded rounded-md">
    <HeaderAdmin />
    <NavsBar style="margin-left: 10px" />
    <v-main style="min-height: 100vh; margin: 50px">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import NavsBar from "./NavsBar.vue";
import HeaderAdmin from "./HeaderAdmin.vue";
export default {
  name: "AdminLayout",
  components: { NavsBar, HeaderAdmin },
};
</script>

<style lang="css" scoped></style>
