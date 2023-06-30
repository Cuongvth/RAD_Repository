<template>
  <div>
    <VCard title="Nhận dạng 🙌">
      <VCardText>Nhận dạng</VCardText>
    </VCard>
    <div style="margin-top: 20px">
      <GetImage :matTruoc="props.matTruoc" :matSau="props.matSau" />
    </div>
    <div style="margin-top: 20px">
      <ShowCard
        :setCheck="props.setCheck"
        :type="props.type"
        :cardData="props.cardData"
        :googleMatTruoc="props.googleMatTruoc"
        :googleMatSau="props.googleMatSau"
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
