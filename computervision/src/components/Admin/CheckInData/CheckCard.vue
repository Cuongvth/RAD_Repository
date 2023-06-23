<template>
  <div>
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
      if (result.status == 1) {
        this.$store.commit("setSnackBarContent", "Xác nhận thành công");
        this.type = result.result.type;
        this.googleMatTruoc = result.result.googleMatTruoc;
        this.googleMatSau = result.result.googleMatSau;
        this.cardData = result.result.data;
      } else {
        this.$store.commit("setSnackBarContent", "Không nhận dạng được");
        this.type = 0;
      }
    },
  },
  props: { dataId: Number, matTruoc: String, matSau: String },
};
</script>

<style lang="scss" scoped></style>
