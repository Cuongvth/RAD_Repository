<template>
  <VDialog
    v-model="dialog"
    max-width="1000"
    max-height="700"
    persistent
  >
    <template #activator="{ props }">
      <VBtn v-bind="props">
        <VIcon
          icon="tabler-scan"
          size="20"
        />Nhận dạng
      </VBtn>
    </template>
    <DialogCloseBtn @click="dialog = !dialog" />
    <VCard style="padding: 20px">
      <CheckCard
        :data-id="dataId"
        :mat-truoc="matTruoc"
        :mat-sau="matSau"
      /><VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="dialog = false"
        >
          Disagree
        </VBtn>
        <VBtn @click="dialog = false">
          Agree
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
const props = defineProps({
  dataId: Number,
  matTruoc: String,
  matSau: String,
});

import CheckCard from "./index.vue";

var dialog = ref(false);
</script>
