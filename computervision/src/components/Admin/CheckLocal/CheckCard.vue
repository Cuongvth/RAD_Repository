<template>
  <v-alert style="font-size: 25px; font-weight: 600"
    >Nhận dạng trực tiếp</v-alert
  >
  <div>
    <GetCard :getData="getData" />
    <div style="margin-top: 50px">
      <ShowCard
        :type="type"
        :cardData="cardData"
        :googleMatTruoc="googleMatTruoc"
        :googleMatSau="googleMatSau"
      />
    </div>
    <v-btn v-if="dochinhXac.duDuLieu" style="margin-top: 50px"
      >Xác nhận độ chính xác</v-btn
    >
  </div>
</template>

<script>
import DemoAPI from "../../../api/DemoRD/DemoAPI.js";
import GetCard from "./GetCard.vue";
import ShowCard from "../ShowData/ShowCard";
export default {
  components: { GetCard, ShowCard },
  data() {
    return {
      cardData: null,
      googleMatTruoc: null,
      googleMatSau: null,
      type: 0,
      dochinhXac: {
        toanVanTruoc: 100,
        toanVanSau: 100,
        truongDuLieu: {},
        loaiThe: true,
        duDuLieu: false,
      },
    };
  },
  methods: {
    async getData(formData) {
      var result = null;
      try {
        this.$store.commit("setOverlayVisible", true);
        result = await DemoAPI.checkDataLocal(formData);
        this.$store.commit("setOverlayVisible", false);
      } catch (error) {
        this.$store.commit("setOverlayVisible", false);
        this.$store.commit("setSnackBarContent", "Không nhận dạng được");
        return;
      }
      console.log(result);
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
};
</script>

<style lang="scss" scoped></style>
