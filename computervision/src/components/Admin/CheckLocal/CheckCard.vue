<template>
  <div style="margin: 50px">
    <GetCard :getData="getData" />
    <div style="margin-top: 100px">
      <ShowCard :type="type" :cardData="cardData" />
    </div>
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
      type: 0,
    };
  },
  methods: {
    async getData(formData) {
      var result = null;
      try {
        this.$store.commit("setOverlayVisible", true);
        result = await DemoAPI.check(formData);
        this.$store.commit("setOverlayVisible", false);
      } catch (error) {
        this.$store.commit("setOverlayVisible", false);
        this.$store.commit("setSnackBarContent", "Không nhận dạng được");
        return;
      }
      if (result.status == 3) {
        this.$store.commit("setSnackBarContent", "Xác nhận thành công");
        this.type = 2;
        this.cardData = result.data;
      } else if (result.status == 4) {
        this.$store.commit("setSnackBarContent", "Xác nhận thành công");
        this.cardData = result.data;
        this.type = 1;
      } else {
        this.$store.commit("setSnackBarContent", "Không nhận dạng được");
        this.type = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
