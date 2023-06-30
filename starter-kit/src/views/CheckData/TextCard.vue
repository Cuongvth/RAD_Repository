<template>
  <VRow>
    <VCol cols="2">
      <VTabs
        v-model="tab"
        direction="vertical"
        class="v-tabs-pill"
      >
        <VTab>Mặt trước</VTab>
        <VTab>Mặt sau</VTab>
      </VTabs>
    </VCol>
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
                  v-model="checkToanVan[0]"
                  style="margin-top: 20px"
                  type="number"
                  density="compact"
                  variant="outlined"
                />
                <VBtn
                  style="margin-top: 20px"
                  type="submit"
                >
                  Save
                </VBtn>
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
                  v-model="checkToanVan[1]"
                  style="margin-top: 20px"
                  type="number"
                  density="compact"
                  variant="outlined"
                /><VBtn
                  style="margin-top: 20px"
                  type="submit"
                >
                  Save
                </VBtn>
              </VForm>
            </VWindowItem>
          </VWindow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
const props = defineProps({
  googleMatTruoc: Array,
  googleMatSau: Array,
  setCheck: Function,
});

var tab = ref(null);

import { useStore } from "vuex";

var checkToanVan = ref([100, 100]);
const store = useStore();

function valid(value) {
  const regex = /^([0-9]|[1-9][0-9]|100)$/;

  return regex.test(value);
}

function onSubmit1() {
  var ok = true;

  if (!valid(checkToanVan.value[0])) {
    ok = false;
  }

  if (!ok) {
    store.commit("setSnackBarContent", "Thất bại");

    return;
  }
  props.setCheck(1, checkToanVan.value[0]);
  store.commit("setSnackBarContent", "Lưu thành công");
}

function onSubmit2() {
  var ok = true;

  if (!valid(checkToanVan.value[1])) {
    ok = false;
  }

  if (!ok) {
    store.commit("setSnackBarContent", "Thất bại");

    return;
  }
  props.setCheck(2, checkToanVan.value[1]);
  store.commit("setSnackBarContent", "Lưu thành công");
}
</script>
