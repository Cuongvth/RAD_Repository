<script setup>
import lightbulb from '@images/svg/lightbulb.svg';
import discord from '@images/svg/discord.svg';
import rocket from '@images/svg/rocket.svg';

const props = defineProps({
  linkdoc: String,
});

const articles= [{ img: rocket, subtitle: "Whether you\'re new or you\'re a power user.", title: "Getting Started" }, { img: lightbulb, subtitle: "Are you a new customer wondering how to get started?", title: "First Steps" }, { img: discord, subtitle: "Documentation of the development process", title: "Documentation" }];
</script>

<template>
  <VRow class="mt-3">
    <VCol class="mx-auto">
      <VRow>
        <VCol
          v-for="article in articles"
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

              <a :href="article.title == 'Documentation'? props.linkdoc: '#'">
                <VBtn
                  size="small"
                  variant="tonal"
                >
                  Read More
                </VBtn></a>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
