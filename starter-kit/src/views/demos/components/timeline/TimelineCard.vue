<script setup>
import pumaShoes from '@images/pages/puma-shoes.jpeg';

const props = defineProps({
  data: [],
});
</script>

<template>
  <VCard title="Timeline Card">
    <VCardText>
      <VTimeline
        side="end"
        align="start"
        truncate-line="both"
        density="compact"
        class="v-timeline-density-compact v-timeline-icon-only"
      >
        <!-- SECTION Flight -->
        <!-- SECTION Interview Schedule -->
        <VTimelineItem
          v-for="(item, index) in data"
          :key="index"
        >
          <template #icon>
            <VIcon
              size="20"
              :icon="item.icon"
              color="success"
            />
          </template>

          <VCard
            class="bg-light-primary"
            variant="text"
          >
            <VCardText>
              <div class="d-flex justify-space-between align-center mb-1">
                <span class="app-timeline-title">{{ item.title }}</span>
                <span class="app-timeline-meta">{{ item.timeLine }}</span>
              </div>

              <p class="app-timeline-text mb-0">
                {{ item.description }}
              </p>

              <!-- 👉 Divider -->
              <VDivider class="my-4" />

              <!-- 👉 Person -->
              <div class="d-flex justify-space-between align-center">
                <!-- 👉 Avatar & Personal Info -->
                <span class="d-flex align-center">
                  <VAvatar
                    size="40"
                    :image="item.avatar"
                    class="me-2"
                  />

                  <div>
                    <h6 class="text-sm font-weight-medium">{{ item.author }}</h6>
                    <span class="text-xs">{{ item.role }}</span>
                  </div>
                </span>

                <!-- 👉 Person Actions -->
                <div>
                  <IconBtn>
                    <VIcon
                      size="20"
                      icon="tabler-message"
                    />
                  </IconBtn>
                  <IconBtn>
                    <VIcon
                      size="20"
                      icon="tabler-phone"
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
