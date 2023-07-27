<template>
  <div>
    <VCard>
      <VCardTitle>
        <span class="headline">Tải lên tệp</span>
      </VCardTitle>
      <VCardText>
        <VRow
          align="center"
          class="d-flex"
          justify="end"
        >
          <VCol cols="9">
            <VFileInput
              label="Chọn tệp"
              accept="application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              @change="onFileSelected"
            />
          </VCol>
          <VCol cols="3">
            <VSelect
              v-model="targetLanguage"
              :items="languages"
              item-title="title"
              item-value="abbr"
              label="Select"
              persistent-hint
              return-object
              single-line
            />
          </VCol>
          <VCol
            cols="3"
            class="d-flex justify-end"
          >
            <VBtn
              color="primary"
              :disabled="!selectedFile || isUploading"
              @click="convert"
            >
              Chuyển đổi
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VSpacer />

    <VRow class="mt-4">
      <VCol cols="6">
        <VCard outlined>
          <VCardTitle class="text-center">
            <h3 class="headline">
              Ảnh gốc
            </h3>
          </VCardTitle>
          <VCardText>
            <VList>
              <VListItem
                v-for="(image, imageIndex) in originalImages"
                :key="imageIndex"
              >
                <h3
                  class="mb-3"
                  :style="{ color: 'white' }"
                >
                  Trang {{ imageIndex + 1 }}
                </h3>
                <img
                  :src="getImageUrl(image.imagePath)"
                  class="image-border"
                >
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="6">
        <VCard outlined>
          <VCardTitle class="text-center">
            <h3 class="headline">
              Ảnh đã dịch
            </h3>
            <VProgressCircular
              v-if="isLoading"
              indeterminate
              color="primary"
            />
          </VCardTitle>
          <VCardText>
            <VList v-if="!isLoading">
              <VListItem
                v-for="(image, imageIndex) in convertedImage"
                :key="imageIndex"
              >
                <h3
                  class="mb-3"
                  :style="{ color: 'white' }"
                >
                  Trang {{ imageIndex + 1 }}
                </h3>
                <img
                  :src="getImageUrl(image.imagePath)"
                  class="image-border"
                >
              </VListItem>
            </VList>
            <VRow
              align="center"
              class="d-flex mr-2"
              justify="end"
            >
              <VCol cols="3">
                <VBtn
                  v-if="!isLoading && showDownloadButton"
                  color="primary"
                  @click="download"
                >
                  Tải xuống
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import {
  convertDocument,
  downloadDocument,
  uploadDocument,
} from "./AI_InterpreterAPI";

const store = useStore();

const selectedFile = ref(null);
const originalImages = ref([]);
const convertedImage = ref([]);
const isLoading = ref(false);
const isUploading = ref(false);
const uploadedFileName = ref("");
const targetLanguage = ref({ title: "Việt Nam", abbr: "vi" });
const maxFileSize = 29 * 1024 * 1024; // 29 MB in bytes

const languages = ref([
  { title: "Việt Nam", abbr: "vi" },
  { title: "Tiếng Anh", abbr: "en" },
  { title: "Tiếng Nhật", abbr: "ja" },
  { title: "Tiếmg Hàn", abbr: "ko" },
]);

watchEffect(() => {
  if (selectedFile.value) {
    upload();
  }
});

const showDownloadButton = computed(() => {
  return convertedImage.value.some(imagePath =>
    imagePath,
  );
});

const getImageUrl = imagePath => {
  const randomString = Math.random().toString(36).substring(7);
  
  return `https://localhost:7247/api/DocumentAPI/images/${encodeURIComponent(imagePath)}?rand=${randomString}`;
};

const handleError = errorMessage => {
  store.commit("setSnackBarContent", errorMessage);
  store.commit("setSnackBar", true);
};

const onFileSelected = event => {
  const [file] = event.target.files;

  if (file.size > maxFileSize) {
    handleError("Tệp quá lớn. Vui lòng chọn tệp có kích thước dưới 30 MB.");
    
    return;
  }

  selectedFile.value = file;
};

async function upload() {

  const formData = new FormData();

  formData.append("documentUpload", selectedFile.value);

  try {
    const response = await uploadDocument(formData);

    originalImages.value = Object.values(response.data).map(imagePath => ({
      imagePath,
    }));
    uploadedFileName.value = selectedFile.value.name;

    convertedImage.value = [];
  } catch (error) {
    handleError("Đã xảy ra lỗi trong quá trình tải lên tài liệu.");
  }
}

async function convert() {
  while (isUploading.value) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  try {
    isLoading.value = true;

    const imagePaths = originalImages.value.map(image => image.imagePath);

    const response = await convertDocument(
      targetLanguage.value.abbr,
      uploadedFileName.value,
      imagePaths,
    );

    convertedImage.value = Object.values(response.data).map(imagePath => ({
      imagePath,
    }));

    isLoading.value = false;
  } catch (error) {
    handleError("Đã xảy ra lỗi trong quá trình chuyển đổi tài liệu.");
    isLoading.value = false;
  }
}

async function download() {
  try {
    const folderName = getRarFileName(uploadedFileName.value);
    const response = await downloadDocument(folderName);

    const blob = new Blob([response.data], { type: 'application/zip' });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `${folderName}.zip`);
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    handleError("Đã xảy ra lỗi trong quá trình tải xuống.");
  }
}

const getRarFileName = uploadedFileName => uploadedFileName.replace(/\.[^.]+$/, "");
</script>

<style lang="scss">
.text-border {
  border: 1px solid #ff0000;
  border-radius: 5px;
}
.custom-padding {
  padding: 8px 16px;
}

.image-border {
  border: 2px solid #ff0000;
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
</style>
