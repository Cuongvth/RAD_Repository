<template>
  <VRow>
    <VCol cols="2">
      <VTabs v-model="tab" direction="vertical" class="v-tabs-pill">
        <VTab>Mặt trước</VTab>
        <VTab>Mặt sau</VTab>
      </VTabs></VCol
    >
    <VCol cols="10">
      <VCard>
        <VCardText>
          <VWindow v-model="tab">
            <VWindowItem>
              <VForm @submit.prevent="onSubmit1">
                <VTextarea
                  rows="20"
                  :value="props.googleMatTruoc.join('\n')"
                  readonly
                />
                <AppTextField
                  style="margin-top: 20px"
                  v-model="checkToanVan[0]"
                  :rules="[
                    requiredValidator,
                    betweenValidator(checkToanVan[0], 0, 100),
                    valid,
                  ]"
                  density="compact"
                  variant="outlined"
                />
                <VBtn style="margin-top: 20px" type="submit"> Save </VBtn>
              </VForm>
            </VWindowItem>
            <VWindowItem>
              <VForm @submit.prevent="onSubmit2">
                <VTextarea
                  rows="20"
                  readonly
                  :value="props.googleMatSau.join('\n')"
                />
                <AppTextField
                  style="margin-top: 20px"
                  v-model="checkToanVan[1]"
                  :rules="[
                    requiredValidator,
                    betweenValidator(checkToanVan[1], 0, 100),
                    valid,
                  ]"
                  density="compact"
                  variant="outlined"
                /><VBtn style="margin-top: 20px" type="submit"> Save </VBtn>
              </VForm>
            </VWindowItem>
          </VWindow>
        </VCardText>
      </VCard>
    </VCol></VRow
  >
</template>

<script setup>
const props = defineProps({
  googleMatTruoc: Array,
  googleMatSau: Array,
  setCheck: Function,
});

var tab = ref(null);

import { betweenValidator, requiredValidator } from "@validators";
import { useStore } from "vuex";

var checkToanVan = ref([100, 100]);
const store = useStore();

var ok = true;

function valid(value) {
  if (value < 0 || value > 100 || !isNaN(value) || value.length == 0) {
    ok = false;
  }

  return true;
}

function onSubmit1() {
  if (!ok) {
    store.commit("setSnackBarContent", "Thất bại");

    return;
  }
  props.setCheck(1, checkToanVan[0]);
  store.commit("setSnackBarContent", "Lưu thành công");
}

function onSubmit2() {
  if (!ok) {
    store.commit("setSnackBarContent", "Thất bại");

    return;
  }
  props.setCheck(2, checkToanVan[1]);
  store.commit("setSnackBarContent", "Lưu thành công");
}
</script>
