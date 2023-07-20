<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Tải lên tệp</span>
      </v-card-title>
      <v-card-text>
        <v-row align="center" class="d-flex" justify="end">
          <v-col cols="9">
            <v-file-input
              @change="onFileSelected"
              label="Chọn tệp"
              accept="application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            ></v-file-input>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="targetLanguage"
              :items="languages"
              item-title="title"
              item-value="abbr"
              label="Select"
              persistent-hint
              return-object
              single-line
            ></v-select>
          </v-col>
          <v-col cols="3" class="d-flex justify-end">
            <v-btn
              color="primary"
              @click="convert"
              :disabled="!selectedFile || isUploading"
              >Chuyển đổi</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-spacer></v-spacer>

    <v-row class="mt-4">
      <v-col cols="6">
        <v-card outlined>
          <v-card-title class="text-center">
            <h3 class="headline">Văn bản gốc</h3>
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-card-title>
          <v-card-text>
            <v-list v-if="!isLoading">
              <v-list-item
                v-for="(block, blockIndex) in translatedBlocks"
                :key="blockIndex"
              >
                <div class="text-container">
                  <h4>Trang {{ blockIndex + 1 }}</h4>
                  <div
                    v-for="annotation in block.textAnnotations"
                    :key="annotation"
                  >
                    <div v-for="item in annotation" :key="item.text">
                      <v-card
                        v-if="item.text && item.translatedText"
                        class="text-border mt-4"
                        outlined
                        tile
                      >
                        <v-card-text class="custom-padding">
                          {{ item.text }}
                        </v-card-text>
                      </v-card>
                    </div>
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title class="text-center">
            <h3 class="headline">Văn bản đã dịch</h3>
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-card-title>
          <v-card-text>
            <v-list v-if="!isLoading">
              <v-list-item
                v-for="(block, blockIndex) in translatedBlocks"
                :key="blockIndex"
              >
                <div class="text-container">
                  <h4>Trang {{ blockIndex + 1 }}</h4>
                  <div
                    v-for="annotation in block.textAnnotations"
                    :key="annotation"
                  >
                    <div
                      v-for="item in annotation"
                      :key="item.text"
                      class="mt-4"
                    >
                      <v-textarea
                        v-if="item.text && item.translatedText"
                        v-model="item.translatedText"
                        auto-grow
                        variant="solo-filled"
                        rows="1"
                      ></v-textarea>
                    </div>
                  </div>
                </div>
              </v-list-item>
            </v-list>
            <v-row align="center" class="d-flex mr-2" justify="end">
              <v-col cols="3">
                <v-btn
                  v-if="!isLoading && showDownloadButton"
                  color="primary"
                  @click="download"
                  >Tải xuống</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss">
.text-border {
  border: 1px solid #ff0000;
  border-radius: 5px;
}
.custom-padding {
  padding: 8px 16px;
}
</style>

<script setup>
import { useStore } from "vuex";
import {
  convertDocument,
  downloadDocument,
  uploadDocument,
} from "../../api/AI_Interpreter/AI_InterpreterAPI";

const store = useStore();

const selectedFile = ref(null);
const originalImages = ref([]);
const translatedBlocks = ref([]);
const isLoading = ref(false);
const isUploading = ref(false);
const uploadedFileName = ref("");
const targetLanguage = ref({ title: "Việt Nam", abbr: "vi" });
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
  return translatedBlocks.value.some((block) =>
    block.textAnnotations.some((annotation) =>
      annotation.some((item) => item.text && item.translatedText)
    )
  );
});

const handleError = (errorMessage) => {
  store.commit("setSnackBarContent", errorMessage);
  store.commit("setSnackBar", true);
};

const onFileSelected = (event) => {
  const [file] = event.target.files;
  selectedFile.value = file;
};

async function upload() {
  isUploading.value = true;

  const formData = new FormData();
  formData.append("documentUpload", selectedFile.value);

  try {
    const response = await uploadDocument(formData);
    originalImages.value = Object.values(response.data).map((imagePath) => ({
      imagePath,
    }));
    uploadedFileName.value = selectedFile.value.name;
  } catch (error) {
    handleError("Đã xảy ra lỗi trong quá trình tải lên tài liệu.");
  }

  isUploading.value = false;
}

async function convert() {
  while (isUploading.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  try {
    isLoading.value = true;
    const imagePaths = originalImages.value.map((image) => image.imagePath);
    const response = await convertDocument(
      targetLanguage.value.abbr,
      imagePaths
    );
    translatedBlocks.value = response.data.map((block) => ({ ...block }));

    isLoading.value = false;
  } catch (error) {
    handleError("Đã xảy ra lỗi trong quá trình chuyển đổi tài liệu.");
    isLoading.value = false;
  }
}

async function download() {
  try {
    const response = await downloadDocument(
      uploadedFileName.value,
      translatedBlocks.value
    );
    const blob = new Blob([response.data], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${getRarFileName()}.rar`);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    handleError("Đã xảy ra lỗi trong quá trình tải xuống.");
  }
}

const getRarFileName = () => uploadedFileName.value.replace(/\.[^.]+$/, "");
</script>
