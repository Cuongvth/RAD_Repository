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
        <VRow class="scrollbar force-overflow">
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
        <VList
          v-model:opened="open[1]"
          class="mb-6"
          border="true"
        >
          <VListGroup
            :value="1"
            style="margin: 0 20px;"
          >
            <template #activator="{ props }">
              <VListItem
                v-bind="props"
                title="Road map"
                color=""
              />
            </template>
            <VRow class="scrollbar force-overflow">
              <VCol
                cols="12"
                md="12"
              >
                <TimelineCard :data="data" />
              </VCol>
            </VRow>
          </VListGroup>
        </VList>
      </VListGroup>
    </VList>
  </div>
</template>

<script setup>
import avatar1 from '@images/avatars/avatar-1.png';
import CardReadMore from "./CardReadMore.vue";
import lightbulb from '@images/svg/lightbulb.svg';
import discord from '@images/svg/discord.svg';
import rocket from '@images/svg/rocket.svg';
import { content } from "./pageHome";

const card = [{ img: rocket, subtitle: "Whether you\'re new or you\'re a power user, this article will", title: "Getting Started" }, { img: lightbulb, subtitle: "Are you a new customer wondering how to get started?", title: "First Steps" }, { img: discord, subtitle: "A group of people living in the same place or having a particular.", title: "Community" }];

const open = ref({ }) ;



const data = ref([{ title: `Define the goal of the chatbot`, timeLine: `
        2023-03-08`, description: `Travel advice, provide information about destinations, book hotels, suggest schedules, etc`, 
author: `Nguyễn Đổng Khánh`, role: `CTO`, avatar: avatar1, icon: `tabler-send` }, { title: `Identify target users`, 
  timeLine: `
        2023-03-22`, description: `Freelance travelers, family travelers, business travelers, etc.
Set functional and non-functional requirements for the chatbot, e.g. destination search, booking, budget calculation, etc.
Collect data:
Search and collect data on tourist destinations, hotels, restaurants, leisure activities, and more.
Gather information about visas, entry procedures, currency, language and local culture`,
  author: `Nguyễn Đổng Khánh`, role: `CTO`, avatar: avatar1, icon: `tabler-brush` }, { title: `Building a knowledge base`, timeLine: `
        2023-04-05`, description: `Build a database for chatbots, activities, and more. including information about destinations, hotels, restaurants, entertainment 
Organize and structure data logically so that the chatbot can retrieve information easily`, author: `Nguyễn Đổng Khánh`, role: `Meomeo`, avatar: avatar1
, icon: `tabler-message` }, { title: `Design the theme`, timeLine: `
        2023-04-17`, description: `Define the chatbot interface, including text or voice chat.
Design an easy to use and intuitive user interface for interacting with the chatbot.
`, author: `Nguyễn Đổng Khánh`, role: `CTO`,
avatar: avatar1, icon: `tabler-basket
` }, { title: `Build and train chatbots`, timeLine: `
        2023-04-30`, description: `Use a chatbot platform to build and program chatbots.
Apply natural language processing (NLP) techniques so that the chatbot can understand and respond to information from the user.
Train the chatbot with the collected data so that the chatbot can give accurate and reasonable answers.
`, author: `Nguyễn Đổng Khánh`, role: `CTO`,
avatar: avatar1, icon: `tabler-basket
` }, { title: `Connecting external services and APIs`, timeLine: `
        2023-05-11`, description: `Connect the chatbot to external services and APIs to get real-time information, such as flight information, fares, hotel reviews, and more..
`, author: `Nguyễn Đổng Khánh`, role: `CTO`,
avatar: avatar1, icon: `tabler-basket
` }, { title: `Check and adjust:`, timeLine: `
        2023-05-23`, description: `Test and tune the chatbot to ensure its stability and performance.
Experiment with different scenarios and scenarios to make sure the chatbot can properly handle different scenarios..
`, author: `Nguyễn Đổng Khánh`, role: `CTO`,
avatar: avatar1, icon: `tabler-basket
` }, { title: `Deploy and maintain`, timeLine: `
        2023-05-27`, description: `Implement chatbots on platforms or apps that users can access.
`, author: `Nguyễn Đổng Khánh`, role: `CTO`,
avatar: avatar1, icon: `tabler-basket
` }]);
</script>

<style lang="css">
::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
} 
</style>
