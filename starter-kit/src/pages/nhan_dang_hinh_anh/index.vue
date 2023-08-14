<template>
  <div>
    <h1>Camera Feed</h1>
    <div>
      <VRow>
        <VCol>
          <video
            ref="videoElement"
            autoplay
            @canplay="handleCanPlay"
          />
          <canvas
            ref="canvas"
            style="display: none;"
          />
        </VCol>
        <VCol>
          <img
            v-if="snapshotUrl"
            :src="`data:image/jpeg;base64, ` + snapshotUrl"
          >
        </VCol>
      </VRow>
    </div>
    
    <VRow>
      <VCol
        v-for="item in lstImage"
        :key="item"
        cols="3"
      >
        <VImg
          v-if="item"
          width="100%"
          :src="`data:image/jpeg;base64, ` + item"
        />
      </VCol>
    </VRow>
    <VBtn
      style="margin-top: 20px;"
      @click="takeSnapshot"
    >
      Take Snap Shot
    </VBtn>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@axios';

const videoElement = ref(null);
const canvas = ref(null);
let animationFrameId = null;
const snapshotUrl = ref(null);
const lstImage = ref(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    videoElement.value.srcObject = stream;

    setInterval(() => {
      const firstElement = lstImage.value.shift();

      takeSnapshot();
    }, 6000);
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
};

function dataURLToBlob(dataURL) {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const byteString = atob(parts[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([uint8Array], { type: contentType });
}

const takeSnapshot = async () => {
  const ctx = canvas.value.getContext('2d');
  const videoWidth = videoElement.value.videoWidth;
  const videoHeight = videoElement.value.videoHeight;
  
  canvas.value.width = videoWidth;
  canvas.value.height = videoHeight;
  
  ctx.drawImage(videoElement.value, 0, 0, videoWidth, videoHeight);

  const url = canvas.value.toDataURL('image/png');

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/upload',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
    },
    data: await dataURLToBlob(url),
  };

  axios.request(config)
    .then(response => {
      snapshotUrl.value = response.data;
      lstImage.value.push(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const handleCanPlay = () => {
  // Khởi tạo canvas với kích thước tương tự video
  canvas.value.width = videoElement.value.videoWidth;
  canvas.value.height = videoElement.value.videoHeight;

  // Bắt đầu lắng nghe sự kiện requestAnimationFrame
  animationFrameId = requestAnimationFrame(drawFrame);
};

const drawFrame = () => {
  const ctx = canvas.value.getContext('2d');

  ctx.drawImage(videoElement.value, 0, 0, canvas.value.width, canvas.value.height);

  /////////////////////////////////////////////////
  
  // Tiếp tục lắng nghe sự kiện requestAnimationFrame cho frame tiếp theo
  animationFrameId = requestAnimationFrame(drawFrame);
};

// Khởi chạy khi component được mounted
onMounted(() => {
  startCamera();
});

// Đảm bảo ngừng lắng nghe khi component bị unmounted
onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style>
/* Thêm các quy tắc CSS ở đây nếu cần */
</style>
