<template>
  <div>
    <GetCard :matTruoc="matTruoc" :matSau="matSau" />
    <div style="margin-top: 100px">
      <ShowCard
        :type="type"
        :cardData="cardData"
        :googleMatTruoc="googleMatTruoc"
        :googleMatSau="googleMatSau"
      />
    </div>
  </div>
</template>

<script>
import GetCard from "./GetCard.vue";
import ShowCard from "../ShowData/ShowCard.vue";
export default {
  components: { GetCard, ShowCard },
  data() {
    return {};
  },
  methods: {},
  props: {
    type: Number,
    cardData: Object,
    googleMatTruoc: Array,
    googleMatSau: Array,
    matTruoc: String,
    matSau: String,
  },
};
</script>

<style lang="scss" scoped></style>
