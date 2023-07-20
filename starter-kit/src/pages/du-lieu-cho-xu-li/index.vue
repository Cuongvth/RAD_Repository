<script setup>
import { getDuLieu, getDuLieuCount } from "./useAPI";
import { useStore } from "vuex";
import ShowDataCard from "../ShowCardData/showCard.vue";

const store = useStore();

var data = ref([]);
var lengthPage = ref(100);
var page = ref(1);

async function getData() {
  try {
    store.commit("setOverlayVisible", true);
    data.value = await getDuLieu(page.value, 10);
    lengthPage.value = (await getDuLieuCount()) / 10 + 1;
    store.commit("setOverlayVisible", false);
    store.commit("setSnackBarContent", "Xác nhận thành công");
  } catch (error) {
    store.commit("setOverlayVisible", false);
    store.commit("setSnackBarContent", "Không tải được dữ liệu");
  }
}

watch(page, (newVal, oldVal) => {
  getData();
});

onMounted(() => {
  getData();
});
</script>

<template>
  <div>
    <VCard title="Dữ liệu chờ nhận dạng 🙌">
      <VCardText>Dữ liệu chờ nhận dạng</VCardText>
    </VCard>
    <VTable style="margin-top: 20px">
      <thead>
        <tr>
          <th class="text-left">
            Số thứ tự
          </th>
          <th class="text-left">
            Mặt trước
          </th>
          <th class="text-left">
            Mặt sau
          </th>
          <th class="text-left">
            Ngày thêm
          </th>
          <th class="text-left">
            Trạng thái
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
          <td>
            <img
              v-if="item.matTruoc.length > 0"
              :src="`data:image/jpeg;base64, ` + item.matTruoc"
              style="height: 180px; width: 135px; transform: rotate(90deg)"
            >
          </td>
          <td>
            <img
              v-if="item.matSau.length > 0"
              :src="`data:image/jpeg;base64, ` + item.matSau"
              style="height: 180px; width: 135px; transform: rotate(90deg)"
            >
          </td>
          <td>{{ item.thoiGianThem.substring(0, 10) }}</td>
          <td>{{ item.status == 1 ? "Chưa nhận diện" : "Đã nhận diện" }}</td>
          <td>
            <ShowDataCard
              :data-id="item.id"
              :mat-truoc="item.matTruoc"
              :mat-sau="item.matSau"
            />
          </td>
        </tr>
      </tbody>
    </VTable>
    <VPagination
      v-model="page"
      :length="lengthPage"
      :total-visible="10"
    />
  </div>
</template>
