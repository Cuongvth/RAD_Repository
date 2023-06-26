<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <v-overlay
    persistent
    v-model="this.$store.getters.getOverlayVisible"
    class="align-center justify-center"
  >
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <v-snackbar :model-value="this.$store.getters.getSnakBar">
    {{ this.$store.getters.getSnakBarContent }}
    <template v-slot:actions>
      <v-btn color="green" variant="text" @click="closeSnakBar()"> Đóng </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    closeSnakBar() {
      this.$store.commit("setSnackBar", false);
    },
  },
};
</script>
