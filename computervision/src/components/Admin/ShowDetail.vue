<template>
  <v-dialog v-model="dialog" maxWidth="1000" maxHeight="800" persistent>
    <template v-slot:activator="{ props }">
      <v-btn color="#4d96ff" v-bind="props"
        ><v-icon icon="mdi mdi-details" />Details</v-btn
      >
    </template>
    <v-card style="background-color: white; padding: 0 50px; padding-top: 50px">
      <CheckCard
        :type="type"
        :cardData="cardData"
        :googleMatTruoc="googleMatTruoc"
        :googleMatSau="googleMatSau"
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
import CheckCard from "../Admin/ShowDetail/CheckCard.vue";
import DemoAPI from "../../api/DemoRD/DemoAPI.js";
export default {
  name: "ShowDetail",
  components: { CheckCard },
  data() {
    return {
      dialog: false,
      matTruoc: null,
      matSau: null,
      googleMatTruoc: null,
      googleMatSau: null,
      cardData: null,
    };
  },
  methods: {
    async getData() {
      var result = null;
      try {
        this.$store.commit("setOverlayVisible", true);
        if (this.type == 1) {
          result = await DemoAPI.getOneCanCuoc(this.id);
        } else if (this.type == 4) {
          result = await DemoAPI.getOneBLX(this.id);
        }
        this.$store.commit("setOverlayVisible", false);
      } catch (error) {
        this.$store.commit("setOverlayVisible", false);
        this.$store.commit("setSnackBarContent", "Không nhận dạng được");
        return;
      }
      this.$store.commit("setSnackBarContent", "Xác nhận thành công");
      this.matTruoc = result[0].duLieu.matTruoc;
      this.matSau = result[0].duLieu.matSau;
      this.googleMatTruoc = [result[0].duLieu.googleMatTruoc];
      this.googleMatSau = [result[0].duLieu.googleMatSau];
      this.cardData = result[0];
    },
  },
  created() {
    this.getData();
  },
  props: { id: Number, type: Number },
};
</script>

<style lang="css" scoped></style>
