<template>
  <VRow>
    <VCol cols="2">
      <VTabs
        v-model="tab"
        direction="vertical"
        class="v-tabs-pill"
      >
        <VTab
          v-for="(item, i) in listData"
          :key="item"
        >
          {{ "Nhận dạng " + (i+1) }}
        </VTab>
        <VTab>
          Video
        </VTab>
      </VTabs>
    </VCol>
    <VCol cols="10">
      <VCard>
        <VCardText>
          <VWindow v-model="tab">
            <VWindowItem
              v-for="item in listData"
              :key="item"
            >
              <VRow>
                <VCol><VImg :src="item[0]" /></VCol>
                <VCol><VImg :src="item[1]" /></VCol>
              </VRow>
            </VWindowItem>
            <VWindowItem>
              <VRow>
                <VCol>
                  <video
                    controls
                    autoplay
                  >
                    <source
                      :src="video"
                      type="video/mp4"
                    >
                  </video>
                </VCol>
                <VCol>
                  <video
                    controls
                    autoplay
                  >
                    <source
                      :src="video_detect"
                      type="video/mp4"
                    >
                  </video>
                </VCol>
              </VRow>
            </VWindowItem>
          </VWindow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
const tab = ref(0);
import smoke1 from "./image/smoke1.png";
import smoke1_recog from "./image/smoke1_recog.png";
import smoke2 from "./image/smoke2.jpg";
import smoke2_recog from "./image/smoke2_recog.jpg";
import smoke3 from "./image/smoke3.png";
import smoke3_recog from "./image/smoke3_recog.png";
import smoke4 from "./image/smoke4.png";
import smoke4_recog from "./image/smoke4_recog.png";
import smoke5 from "./image/smoke5.png";
import smoke5_recog from "./image/smoke5_recog.png";
import smoke6 from "./image/smoke6.png";
import smoke6_recog from "./image/smoke6_recog.png";
import smoke7 from "./image/smoke7.png";
import smoke7_recog from "./image/smoke7_recog.png";
import smoke8 from "./image/smoke8.jpg";
import smoke8_recog from "./image/smoke8_recog.jpg";
import smoke9 from "./image/smoke9.jpg";
import smoke9_recog from "./image/smoke9_recog.jpg";
import video from "./image/video.mp4";
import video_detect from "./image/video_detect.mp4";

const listData = [
  [smoke1, smoke1_recog],
  [smoke2, smoke2_recog],
  [smoke3, smoke3_recog],
  [smoke4, smoke4_recog],
  [smoke5, smoke5_recog],
  [smoke6, smoke6_recog],
  [smoke7, smoke7_recog],
  [smoke8, smoke8_recog],
  [smoke9, smoke9_recog],
];
</script>