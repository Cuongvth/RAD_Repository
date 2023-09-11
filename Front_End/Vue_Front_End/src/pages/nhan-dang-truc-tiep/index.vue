<template>
  <div>
    <VCard title="Nhận dạng trực tiếp 🙌">
      <VCardText>Nhận dạng trực tiếp hình ảnh</VCardText>
    </VCard>
    <div style="margin-top: 20px">
      <GetImage :get-data="getData" />
    </div>
    <div style="margin-top: 20px">
      <ShowCard
        :type="type"
        :card-data="cardData"
        :google-mat-truoc="googleMatTruoc"
        :google-mat-sau="googleMatSau"
      />
    </div>
  </div>
</template>

<script setup>
import ShowCard from "@/views/ShowData/ShowCard.vue";
import GetImage from "./getImage.vue";
import { checkDataLocal } from "./useAPI";
import { useStore } from "vuex";

const store = useStore();
var cardData = ref(null);
var googleMatTruoc = ref(null);
var googleMatSau = ref(null);
var type = ref(0);

async function getData(formData) {
  var result = null;
  try {
    store.commit("setOverlayVisible", true);
    result = await checkDataLocal(formData);
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
