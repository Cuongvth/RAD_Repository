<template>
  <div>
    <h1>Webcam Demo</h1>
    <VRow>
      <VCol>
        <VBtn @click="startWebcam">
          Start Webcam
        </VBtn>
      </VCol>
      <VCol>
        <VBtn @click="stopWebcam">
          Stop Webcam
        </VBtn>
      </VCol>
    </VRow>
    <video
      ref="videoElement"
      style="margin-top: 20px;"
      autoplay
    />
  </div>
</template>
  
<script setup>
import { ref, onBeforeUnmount } from 'vue';
  
const videoElement = ref(null);
const stream = ref(null);
  
const startWebcam = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.value.srcObject = stream.value;
  } catch (error) {
    console.error('Error accessing webcam:', error);
  }
};
  
const stopWebcam = () => {
  if (stream.value) {
    const tracks = stream.value.getTracks();

    tracks.forEach(track => track.stop());
    videoElement.value.srcObject = null;
    stream.value = null;
  }
};
  
onBeforeUnmount(() => {
  stopWebcam();
});
</script>
  