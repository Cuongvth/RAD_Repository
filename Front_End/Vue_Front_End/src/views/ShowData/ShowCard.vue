<template>
  <VTabs
    v-model="tab"
    class="v-tabs-pill"
  >
    <VTab>Trường dữ liệu</VTab>
    <VTab>Loại thẻ</VTab>
    <VTab>Nội dung toàn văn</VTab>
  </VTabs>

  <VCard class="mt-5">
    <VCardText>
      <VWindow v-model="tab">
        <VWindowItem>
          <CanCuoc
            v-if="props.type == 1"
            :card-data="props.cardData"
          />
          <BLX
            v-if="props.type == 4"
            :card-data="props.cardData"
          />
        </VWindowItem>
        <VWindowItem>
          <CanCuocCard v-if="props.type == 1" />
          <BLXCard v-if="props.type == 4" />
        </VWindowItem>
        <VWindowItem>
          <TextCard
            :google-mat-truoc="props.googleMatTruoc"
            :google-mat-sau="props.googleMatSau"
          />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

<script setup>
const props = defineProps({
  type: Number,
  cardData: Object,
  googleMatTruoc: Array,
  googleMatSau: Array,
});

import CanCuocCard from "./CanCuocCard.vue";
import BLXCard from "./BLXCard.vue";
import CanCuoc from "./CanCuoc.vue";
import BLX from "./BLX.vue";
import TextCard from "./TextCard.vue";

var tab = ref(null);
</script>
