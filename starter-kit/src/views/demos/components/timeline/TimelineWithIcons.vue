<script setup>
const props = defineProps({
  data: [],
});

const serverSwitch = ref(false);
</script>

<template>
  <VCard
    variant="text"
    title="Timeline With Icons"
  >
    <VCardText>
      <VTimeline
        align="start"
        justify="center"
        truncate-line="both"
        :density="$vuetify.display.smAndDown ? 'compact' : 'default'"
        class="v-timeline-icon-only"
      >
        <!-- SECTION Timeline Item: Flight -->
       

        <!-- SECTION Timeline Item: Interview -->
        <VTimelineItem
          v-for="(item,index) in data"
          :key="index"
        >
          <template #icon>
            <VIcon
              size="20"
              :icon="item.icon"
              color="success"
            />
          </template>

          <VCard>
            <VCardText>
              <!-- 👉 Header -->
              <div class="d-flex justify-space-between align-center mb-1">
                <span class="app-timeline-title">
                  {{ item.title }}
                </span>
                <span class="app-timeline-meta">{{ item.timeLine }}</span>
              </div>

              <p class="app-timeline-text mb-0">
                {{ item.description }}
              </p>

              <!-- 👉 Divider -->
              <VDivider class="my-4" />

              <!-- 👉 Person -->
              <div class="d-flex justify-space-between align-center flex-wrap gap-4">
                <!-- 👉 Avatar & Personal Info -->
                <span class="d-flex align-bottom">
                  <VAvatar
                    size="40"
                    :image="item.avatar"
                    class="me-3"
                  />
                  <div class="d-flex flex-column">
                    <h6 class="text-sm font-weight-medium">{{ item.author }}</h6>
                    <span class="text-xs">{{ item.role }}</span>
                  </div>
                </span>

                <!-- 👉 Person Actions -->
                <div>
                  <IconBtn>
                    <VIcon
                      icon="tabler-message"
                      size="20"
                    />
                  </IconBtn>
                  <IconBtn>
                    <VIcon
                      icon="tabler-phone"
                      size="20"
                    />
                  </IconBtn>
                </div>
              </div>
            </VCardText>
          </VCard>
        </VTimelineItem>
        <!-- !SECTION -->
      </VTimeline>
    </VCardText>
  </VCard>
</template>
