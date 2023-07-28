<template>
  <div>
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
    <VCard style="margin-top: 20px;">
      <VTable style="margin-top: 20px">
        <thead>
          <tr>
            <th class="text-left">
              Số thứ tự
            </th>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Created On
            </th>
            <th class="text-left">
              Content Type
            </th>
            <th class="text-left" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in data"
            :key="item.id"
          >
            <td>{{ i + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.createdOn }}</td>
            <td>{{ item.contentType }}</td>
            <td>
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
              ><VBtn text="Tải xuống" /></a>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>
  </div>
</template>

<script setup>
import { uploadFileToBlob, getBlobsInContainer } from "./useAPI";
import { useStore } from "vuex";

const store = useStore();
const typeupload = ref(1);
const selectedFile = ref(null);
const data = ref();

onMounted(async () => {
  data.value = await getBlobsInContainer();
});

const training = async ()=>{
  if(!selectedFile.value)
  {
    store.commit("setSnackBarContent", "Không có dữ liệu");
    
    return;
  }
  try {
    store.commit("setOverlayVisible", true);
    await uploadFileToBlob(selectedFile.value);
    data.value = await getBlobsInContainer();

    //await runIndexer();
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