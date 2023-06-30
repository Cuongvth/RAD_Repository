<template>
  <VTabs v-model="tab" class="v-tabs-pill">
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
            :cardData="props.cardData"
            :setCheck="setCheck"
          />
          <BLX
            v-if="props.type == 4"
            :cardData="props.cardData"
            :setCheck="setCheck"
          />
        </VWindowItem>
        <VWindowItem>
          <CanCuocCard v-if="props.type == 1" :setCheck="setCheck" />
          <BLXCard v-if="props.type == 4" :setCheck="setCheck" />
        </VWindowItem>
        <VWindowItem>
          <TextCard
            :googleMatTruoc="props.googleMatTruoc"
            :googleMatSau="props.googleMatSau"
            :setCheck="setCheck"
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
  setCheck: Function,
});

import CanCuocCard from "./CanCuocCard.vue";
import BLXCard from "./BLXCard.vue";
import CanCuoc from "./CanCuoc.vue";
import BLX from "./BLX.vue";
import TextCard from "./TextCard.vue";

var tab = ref(null);

var check = ref({
  googleMatTruoc: 100,
  googleMatSau: 100,
  checkTruong: [],
  type: props.type,
  loaiThe: true,
  thoaman: false,
});

function setCheck(key, value) {
  if (key == 1) {
    check.value.googleMatTruoc = value;
  } else if (key == 2) {
    check.value.googleMatSau = value;
  } else if (key == 3) {
    check.value.checkTruong = value;
  } else if (key == 4) {
    check.value.loaiThe = value;
  }
  if (check.value.type == 1 && check.value.checkTruong.length == 11) {
    check.value.thoaman = true;
  } else if (check.value.type == 4 && check.value.checkTruong.length == 9) {
    check.value.thoaman = true;
  } else {
    check.value.thoaman = false;
  }
}

watch(check.value, (newVal, oldVal) => {
  props.setCheck(newVal);
});
</script>
