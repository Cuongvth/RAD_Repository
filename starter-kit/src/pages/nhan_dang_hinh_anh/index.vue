<template>
  <div>
    <VRow>
      <VCol cols="6">
        <VTextField
          v-model="number1"
          label="Thời gian ghi hình"
        />
      </VCol>
      <VCol cols="6">
        <VTextField
          v-model="number2"
          label="Số lượng hình ảnh muốn trích xuất"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VBtn
          color="primary"
          @click="calculate"
        >
          Tính toán
        </VBtn>
      </VCol>
    </VRow>
    <VLabel
      :text="'Còn lại: ' + time + 's'"
      class="my-3"
    />
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
          <img :src="`data:image/gif;base64,` + output">
        </VCol>
      </VRow>
      <VRow>
        <VCol
          v-for="item in lstImage"
          :key="item"
          cols="3"
        >
          <VImg
            v-if="item"
            width="100%"
            :src="`data:image/jpeg;base64,` + item"
          />
        </VCol>
      </VRow>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@axios';

const videoElement = ref(null);
const canvas = ref(null);
let animationFrameId = null;
const lstImage = ref([]);
const number1 = ref('');
const output = ref('');
const number2 = ref('');
const time = ref('');

const calculate = async () => {
  lstImage.value = [];

  if(isNaN(number1.value) || isNaN(number2.value) || number1.value == "" || number2.value == "")
  {
    return;
  }
  time.value = number1.value;

  const interval =  setInterval(() => {
    if(time.value -1 == 0)
    {
      clearInterval(interval);
    }
    time.value--;
  }, 1000);

  var index = number2.value - 1;

  if(index < 0)
  {
    return;
  }

  await takeImage();
  if(index > 0)
  {
    await performIntervalWork(index);
  }

  let data = new FormData();

  for (let index = 0; index < lstImage.value.length; index++) {
    const element = `data:image/png;base64,` + lstImage.value[index];

    const file = await dataURLToBlob(element);

    data.append('imageUrls', file, 'image.png');
  }

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://apirad.ltsgroup.tech/api/ComputerVisionT8/convertToGif',
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
  };

  axios.request(config)
    .then(response => {
      output.value =  response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

async function performIntervalWork(index) {
  return new Promise(resolve => {
    const interval = setInterval(async () => {
      if (index == 1) {
        clearInterval(interval);
        resolve(); 
      }

      await takeImage();

      index--;
    }, (number1.value /(number2.value - 1)) * 1000);
  });
}

const takeImage = async ()=>{
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
    url: 'https://apirad.ltsgroup.tech/cplus/upload',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
    },
    data: await dataURLToBlob(url),
  };

  axios.request(config)
    .then(response => {
      lstImage.value.push(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    videoElement.value.srcObject = stream;
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

const handleCanPlay = () => {
  canvas.value.width = videoElement.value.videoWidth;
  canvas.value.height = videoElement.value.videoHeight;

  animationFrameId = requestAnimationFrame(drawFrame);
};

const drawFrame = () => {
  const ctx = canvas.value.getContext('2d');

  ctx.drawImage(videoElement.value, 0, 0, canvas.value.width, canvas.value.height);
  
  animationFrameId = requestAnimationFrame(drawFrame);
};

onMounted(() => {
  startCamera();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style>
/* Thêm các quy tắc CSS ở đây nếu cần */
</style>
