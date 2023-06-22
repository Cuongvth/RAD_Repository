<template>
  <v-tabs v-model="tab" align-tabs="end">
    <v-tab :value="0">Mặt trước</v-tab>
    <v-tab :value="1">Mặt sau</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item key="0" value="0">
      <v-textarea
        bg-color="grey-lighten-2"
        color="cyan"
        rows="20"
        readonly
      ></v-textarea>
    </v-window-item>
    <v-window-item key="1" value="1">
      <v-textarea
        bg-color="grey-lighten-2"
        color="cyan"
        rows="20"
        readonly
      ></v-textarea>
    </v-window-item>
  </v-window>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
    };
  },
  methods: {},
  props: {},
};
</script>

<style lang="scss" scoped></style>
