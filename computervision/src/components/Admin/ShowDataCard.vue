<template>
  <v-dialog v-model="dialog" maxWidth="1000" maxHeight="800">
    <template v-slot:activator="{ props }">
      <v-btn color="#4d96ff" v-bind="props"> Chi tiết </v-btn>
    </template>
    <v-card style="background-color: white">
      <CheckCard
        :dataId="dataId"
        :matTruoc="matTruoc"
        :matSau="matSau"
      /><v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="dialog = false"> Disagree </v-btn>
        <v-btn variant="text" @click="dialog = false"> Agree </v-btn>
      </v-card-actions>
    </v-card>
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
  props: { dataId: Number, matTruoc: String, matSau: String },
};
</script>

<style lang="css" scoped></style>
