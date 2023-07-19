<template>
  <div>
    <VList
      v-for="item in content"
      :key="item.key"
      v-model:opened="open[item.key]"
      class="mb-6"
    >
      <VListGroup
        :value="item.key"
        style="margin: 0 20px;"
      >
        <template #activator="{ props }">
          <VListItem
            v-bind="props"
            :title="item.title"
          />
        </template>
        <VRow>
          <VCol>
            <VCardText>
              {{ item.subtitle }}
            </VCardText>
            <VCardText>
              <p
                v-for="subcontent in item.content"
                :key="subcontent"
                class="mb-2"
              >
                {{ subcontent }}
              </p>
            </VCardText>
          </VCol>
          <VCol>
            <iframe
              style="border-radius: 10px;"
              width="100%"
              height="400px"
              :src="item.linkdemo"
              title="
              YouTube
              video
              player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
            <CardReadMore :articles="card" />
          </VCol>
        </VRow>
      </VListGroup>
    </VList>
  </div>
</template>

<script setup>
import CardReadMore from "./CardReadMore.vue";
import lightbulb from '@images/svg/lightbulb.svg';
import discord from '@images/svg/discord.svg';
import rocket from '@images/svg/rocket.svg';
import { content } from "./pageHome";

const card = [{ img: rocket, subtitle: "Whether you\'re new or you\'re a power user, this article will", title: "Getting Started" }, { img: lightbulb, subtitle: "Are you a new customer wondering how to get started?", title: "First Steps" }, { img: discord, subtitle: "A group of people living in the same place or having a particular.", title: "Community" }];

const open = ref({ }) ;
</script>
