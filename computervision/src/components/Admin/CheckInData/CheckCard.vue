<template>
  <div style="margin: 50px">
    <GetCard :getData="getData" :matTruoc="matTruoc" :matSau="matSau" />
    <div style="margin-top: 100px">
      <ShowCard :type="type" :cardData="cardData" />
    </div>
  </div>
</template>

<script>
import DemoAPI from "../../../api/DemoRD/DemoAPI.js";
import GetCard from "./GetCard.vue";
import ShowCard from "../ShowData/ShowCard.vue";
export default {
  components: { GetCard, ShowCard },
  data() {
    return {
      cardData: null,
      type: 0,
      googleMatTruoc: null,
      googleMatSau: null,
    };
  },
  methods: {
    async getData() {
      var result = null;
      try {
        this.$store.commit("setOverlayVisible", true);
        result = await DemoAPI.checkInData(this.dataId);
        this.$store.commit("setOverlayVisible", false);
      } catch (error) {
        this.$store.commit("setOverlayVisible", false);
        this.$store.commit("setSnackBarContent", "Không nhận dạng được");
        return;
      }
      if (result.status == 3) {
        this.$store.commit("setSnackBarContent", "Xác nhận thành công");
        this.type = 2;
        this.googleMatTruoc = result.result.googleMatTruoc;
        this.googleMatSau = result.result.googleMatSau;
        this.cardData = result.result.data;
      } else if (result.status == 4) {
        this.$store.commit("setSnackBarContent", "Xác nhận thành công");
        this.cardData = result.result.data;
        this.googleMatTruoc = result.result.googleMatTruoc;
        this.googleMatSau = result.result.googleMatSau;
        this.type = 1;
      } else {
        this.$store.commit("setSnackBarContent", "Không nhận dạng được");
        // Phải xóa
        this.cardData = result.result.data;
        this.googleMatTruoc = result.result.googleMatTruoc;
        this.googleMatSau = result.result.googleMatSau;
        // Phải sửa thành 0
        this.type = 1;
      }
    },
  },
  props: { dataId: Number, matTruoc: String, matSau: String },
};
</script>

<style lang="scss" scoped></style>
