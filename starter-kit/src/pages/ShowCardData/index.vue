<template>
  <div>
    <VCard title="Nhận dạng 🙌">
      <VCardText>Nhận dạng</VCardText>
    </VCard>
    <div style="margin-top: 20px">
      <GetImage
        :getData="getData"
        :matTruoc="props.matTruoc"
        :matSau="props.matSau"
      />
    </div>
    <div style="margin-top: 20px">
      <ShowCard
        :type="type"
        :cardData="cardData"
        :googleMatTruoc="googleMatTruoc"
        :googleMatSau="googleMatSau"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dataId: Number,
  matTruoc: String,
  matSau: String,
});

import ShowCard from "@/views/ShowData/ShowCard.vue";
import GetImage from "./getImage.vue";
import { checkInData } from "../../api/DemoRD/DemoAPI";
import { useStore } from "vuex";

const store = useStore();
var cardData = ref(null);
var googleMatTruoc = ref(null);
var googleMatSau = ref(null);
var type = ref(0);

async function getData() {
  var result = null;
  try {
    store.commit("setOverlayVisible", true);
    result = await checkInData(props.dataId);
    store.commit("setOverlayVisible", false);
  } catch (error) {
    store.commit("setOverlayVisible", false);
    store.commit("setSnackBarContent", "Không nhận dạng được");

    return;
  }
  if (result.status == 1) {
    store.commit("setSnackBarContent", "Xác nhận thành công");
    type.value = result.result.type;
    googleMatTruoc.value = result.result.googleMatTruoc;
    googleMatSau.value = result.result.googleMatSau;
    cardData.value = result.result.data;
  } else {
    store.commit("setSnackBarContent", "Không nhận dạng được");
    type.value = 0;
  }
}
</script>
