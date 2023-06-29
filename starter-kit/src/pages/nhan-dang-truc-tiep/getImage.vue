<template>
  <div>
    <VRow>
      <VCol cols="12" md="4">
        <VImg
          v-if="dataImage[0].length > 0"
          :src="`data:image/jpeg;base64, ` + dataImage[0]"
          :style="`transform: rotate(${rotater1.deg}deg); height: 400px; width: 300px`"
          @click="rotater(1)"
        />
      </VCol>
      <VCol cols="12" md="4">
        <VImg
          v-if="dataImage[1].length > 0"
          :src="`data:image/jpeg;base64, ` + dataImage[1]"
          :style="`transform: rotate(${rotater2.deg}deg); height: 400px; width: 300px`"
          @click="rotater(2)"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="4">
        <VBtn @click="$refs.fileInput0.click()"> Mặt trước</VBtn>
        <VFileInput
          ref="fileInput0"
          v-model="selectFile[0]"
          accept="image/*"
          outlined
          dense
          hide-details
          style="display: none"
          @change="onFileSelect(0)"
        />
      </VCol>
      <VCol cols="12" md="4">
        <VBtn @click="$refs.fileInput1.click()"> Mặt sau</VBtn>
        <VFileInput
          ref="fileInput1"
          v-model="selectFile[1]"
          accept="image/*"
          outlined
          dense
          hide-details
          style="display: none"
          @change="onFileSelect(1)"
        />
      </VCol>
    </VRow>
    <br />
    <VBtn @click="submit">
      <VIcon icon="tabler-scan" size="20" />Nhận dạng</VBtn
    >
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const props = defineProps({
  getData: Function,
});

const store = useStore();
var selectFile = [null, null];
var dataImage = ref(["", ""]);
var rotater1 = ref({ deg: 0 });
var rotater2 = ref({ deg: 0 });

function submit() {
  if (selectFile[0] == null || selectFile[1] == null) {
    store.commit("setSnackBarContent", "Không được để trống hình ảnh!");

    return;
  }
  const formData = new FormData();

  formData.append("matTruoc", selectFile[0] ? selectFile[0][0] : null);
  formData.append("matSau", selectFile[1] ? selectFile[1][0] : null);
  props.getData(formData);
}

function rotater(index) {
  if (index == 1) {
    rotater1.value.deg += 90;
  } else if (index == 2) {
    rotater2.value.deg += 90;
  }
}

async function onFileSelect(index) {
  if (
    selectFile[index][0].type == "image/png" ||
    selectFile[index][0].type == "image/jpeg" ||
    selectFile[index][0].type == "image/jpg"
  ) {
    const reader = new FileReader();

    reader.onload = () => {
      dataImage.value[index] = reader.result.split(",")[1];
    };
    await reader.readAsDataURL(selectFile[index][0]);
  } else {
    store.commit(
      "setSnackBarContent",
      "Vui lòng chọn đúng file định dạng ảnh! Các định dạng được hỗ trợ: JPG, JPEG, PNG"
    );
  }
}
</script>
