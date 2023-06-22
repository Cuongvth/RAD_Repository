<template>
  <v-dialog v-model="dialog" width="1000">
    <template v-slot:activator="{ props }">
      <v-btn color="#4d96ff" v-bind="props"> Chi tiết </v-btn>
    </template>
    <div style="background-color: white">
      <CheckCard />
    </div>
  </v-dialog>
</template>

<script>
import CheckCard from "../Admin/CheckInData/CheckCard.vue";
export default {
  name: "DataAdmin",
  components: { CheckCard },
  data() {
    return { dialog: false };
  },
  methods: {},
};
</script>

<style lang="css" scoped></style>
