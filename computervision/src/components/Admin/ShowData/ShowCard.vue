<template>
  <v-tabs v-model="tab" align-tabs="start">
    <v-tab :value="0">Trường dữ liệu</v-tab>
    <v-tab :value="1">Loại thẻ</v-tab>
    <v-tab :value="2">Nội dung toàn văn</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item key="0" value="0"
      ><CanCuoc v-if="type == 1" :cardData="cardData" />
    </v-window-item>
    <v-window-item key="1" value="1"> aaaaaaaaaaaaa</v-window-item>
    <v-window-item key="2" value="2">
      <TextCard :googleMatTruoc="googleMatTruoc" :googleMatSau="googleMatSau"
    /></v-window-item>
  </v-window>
</template>

<script>
import CanCuoc from "./CanCuoc.vue";
import TextCard from "./TextCard.vue";
export default {
  components: { CanCuoc, TextCard },
  name: "ShowCard",
  data() {
    return { tab: null };
  },
  props: {
    type: Number,
    cardData: Object,
    googleMatTruoc: Array,
    googleMatSau: Array,
  },
};
</script>

<style lang="css" scoped></style>
