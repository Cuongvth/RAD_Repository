<script setup>
const props = defineProps({
  articles: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <VRow class="mt-3">
    <VCol class="mx-auto">
      <VRow>
        <VCol
          v-for="article in props.articles"
          :key="article.title"
          cols="12"
          md="4"
        >
          <VCard
            flat
            border
          >
            <VCardText class="text-center">
              <VImg
                :src="article.img"
                aspect-ratio="1"
                width="58"
                class="mx-auto"
              />

              <h6 class="text-h5 my-3">
                {{ article.title }}
              </h6>
              <p class="clamp-text">
                {{ article.subtitle }}
              </p>

              <VBtn
                size="small"
                variant="tonal"
              >
                Read More
              </VBtn>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
