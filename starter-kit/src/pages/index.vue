<template>
  <div>
    <VList
      v-for="item in content"
      :key="item.key"
      v-model:opened="open[item.key]"
      class="mb-6"
      style="overflow: hidden"
    >
      <VListGroup
        :value="item.key"
        style="margin: 0 24px 4px 24px"
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
              style="border-radius: 10px"
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
          </VCol>
        </VRow>
        <VRow>
          <CardReadMore :linkdoc="item.linkdoc" />
        </VRow>
        <VRow>
          <VList
            v-model:opened="open[item.key + 'roadmap']"
            width="100vw"
          >
            <VListGroup
              :value="item.key + 'roadmap'"
              style="
                border: 1px solid rgb(222, 221, 224);
                border-radius: 10px;
                overflow: hidden;
              "
              density="compact"
            >
              <template #activator="{ props }">
                <VListItem
                  v-bind="props"
                  title="Road map"
                  color=""
                />
              </template>
              <VRow>
                <VCol
                  cols="12"
                  md="12"
                >
                  <TimelineCard :data="item.roadmap" />
                </VCol>
              </VRow>
            </VListGroup>
          </VList>
        </VRow>
      </VListGroup>
    </VList>
  </div>
</template>

<script setup>
import CardReadMore from "./CardReadMore.vue";
import { content } from "./pageHome";

const open = ref({});
</script>
