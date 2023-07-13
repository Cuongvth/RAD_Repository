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
              <VTextarea
                rows="20"
                :value="props.googleMatTruoc.join('\n')"
                readonly
              />
            </VWindowItem>
            <VWindowItem>
              <VTextarea
                rows="20"
                readonly
                :value="props.googleMatSau.join('\n')"
              />
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
});

var tab = ref(null);
</script>
