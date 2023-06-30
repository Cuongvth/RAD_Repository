<template>
  <VDialog v-model="dialog" maxWidth="1000" maxHeight="700" persistent>
    <template #activator="{ props }">
      <VBtn v-bind="props"><VIcon icon="tabler-scan" size="20" />Chi tiết</VBtn>
    </template>
    <DialogCloseBtn @click="dialog = !dialog" />
    <VCard style="padding: 20px">
      <CheckCard
        :setCheck="setCheck"
        :type="props.type"
        :cardData="cardData"
        :googleMatTruoc="googleMatTruoc"
        :googleMatSau="googleMatSau"
        :matTruoc="matTruoc"
        :matSau="matSau"
      />
      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn variant="tonal" color="secondary" @click="dialog = false">
          Disagree
        </VBtn>
        <VBtn @click="danhGia"> Agree </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
const props = defineProps({
  id: Number,
  type: Number,
});

import CheckCard from "./index.vue";
import {
  getOneCanCuoc,
  getOneBLX,
  danhGiaDuLieu,
} from "../../api/DemoRD/DemoAPI";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { ref } from "vue";

const store = useStore();
var cardData = ref("");
var googleMatTruoc = ref([]);
var googleMatSau = ref([]);
var matTruoc = ref("");
var matSau = ref("");
var dialog = ref(false);

async function getData() {
  var result = null;
  try {
    store.commit("setOverlayVisible", true);
    if (props.type == 1) {
      result = await getOneCanCuoc(props.id);
    } else if (props.type == 4) {
      result = await getOneBLX(props.id);
    }
    store.commit("setOverlayVisible", false);
  } catch (error) {
    store.commit("setOverlayVisible", false);
    store.commit("setSnackBarContent", "Không nhận dạng được");

    return;
  }
  store.commit("setSnackBarContent", "Xác nhận thành công");
  matTruoc.value = result[0].duLieu.matTruoc;
  matSau.value = result[0].duLieu.matSau;
  googleMatTruoc.value = [result[0].duLieu.googleMatTruoc];
  googleMatSau.value = [result[0].duLieu.googleMatSau];
  cardData.value = result[0];
}

var googleMatTruocC = ref(100);
var googleMatSauC = ref(100);
var checkTruong = ref([]);
var loaiThe = ref(true);
var thoaman = ref(false);

function setCheck(value) {
  googleMatTruocC.value = value.googleMatTruoc;
  googleMatSauC.value = value.googleMatSau;
  checkTruong.value = Array.from(value.checkTruong);
  loaiThe.value = value.loaiThe;
  thoaman.value = value.thoaman;
}

async function danhGia() {
  if (!thoaman.value) {
    store.commit("setSnackBarContent", "Chưa đủ điều kiện");

    return;
  }
  try {
    store.commit("setOverlayVisible", true);
    await danhGiaDuLieu(
      props.id,
      props.type,
      googleMatTruocC.value,
      googleMatSauC.value,
      checkTruong.value,
      loaiThe.value
    );
    store.commit("setOverlayVisible", false);
  } catch (error) {
    store.commit("setOverlayVisible", false);
    store.commit("setSnackBarContent", "Lỗi");

    return;
  }
  store.commit("setSnackBarContent", "Xác nhận thành công");
}

onMounted(() => {
  getData();
});
</script>
