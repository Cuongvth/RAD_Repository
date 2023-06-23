<template>
  <div style="margin: 50px">
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
};
</script>

<style lang="scss" scoped></style>
