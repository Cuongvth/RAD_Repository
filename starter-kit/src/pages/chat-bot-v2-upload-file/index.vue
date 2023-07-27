<template>
  <VRow>
    <VCol>
      <VCard
        title="Upload"
        subtitle=" PDF, Word or Powerpoint files "
        @click="setTypeFile(1)"
      />
    </VCol>
    <VCol>
      <VCard
        title="Import Website"
        subtitle=" Webpage with text content "
        @click="setTypeFile(2)"
      />
    </VCol>
  </VRow>
  <VCard style="margin-top: 20px; padding: 10px 20px;">
    <VFileInput
      v-if="typeupload == 1"
      @change="onFileSelected"
    />
    <VTextField v-if="typeupload == 2" />
    <VBtn
      style="margin-top: 20px;"
      text="Training"
      @click="training"
    />
  </VCard>
</template>

<script setup>
import { uploadFileToBlob, runIndexer } from "./useAPI";
import { useStore } from "vuex";

const store = useStore();
const typeupload = ref(1);
const selectedFile = ref(null);

const training = async ()=>{
  try {
    store.commit("setOverlayVisible", true);
    await uploadFileToBlob(selectedFile.value);
    await runIndexer();
    store.commit("setOverlayVisible", false);
    store.commit("setSnackBarContent", "Complete");
  } catch (error) {
    store.commit("setOverlayVisible", false);
    store.commit("setSnackBarContent", error);
  }
};

const setTypeFile = value =>{
  typeupload.value = value;
};

const onFileSelected = event => {
  const [file] = event.target.files;

  selectedFile.value = file;
};
</script>