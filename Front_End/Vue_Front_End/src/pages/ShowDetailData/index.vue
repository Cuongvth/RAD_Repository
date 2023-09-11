<template>
  <div>
    <VCard title="Nhận dạng 🙌">
      <VCardText>Nhận dạng</VCardText>
    </VCard>
    <div style="margin-top: 20px">
      <GetImage
        :mat-truoc="props.matTruoc"
        :mat-sau="props.matSau"
      />
    </div>
    <div style="margin-top: 20px">
      <ShowCard
        :set-check="props.setCheck"
        :type="props.type"
        :card-data="props.cardData"
        :google-mat-truoc="props.googleMatTruoc"
        :google-mat-sau="props.googleMatSau"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: Number,
  cardData: Object,
  googleMatTruoc: Array,
  googleMatSau: Array,
  matTruoc: String,
  matSau: String,
  setCheck: Function,
});

import ShowCard from "@/views/CheckData/ShowCard.vue";
import GetImage from "./getImage.vue";
</script>
