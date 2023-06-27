<template>
  <v-alert style="font-size: 25px; font-weight: 600">Căn cước công dân</v-alert>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">No.</th>
        <th class="text-left">Full name</th>
        <th class="text-left">Date of birth</th>
        <th class="text-left">Sex</th>
        <th class="text-left">Nationality</th>
        <th class="text-left">Date of expiry</th>
        <th class="text-left">Date supply</th>
        <th class="text-left">Details</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.id">
        <td>{{ item.soCCCD }}</td>
        <td>{{ item.hoTen }}</td>
        <td>{{ item.ngayThangNamSinh }}</td>
        <td>{{ item.gioiTinh }}</td>
        <td>{{ item.quocTich }}</td>
        <td>{{ item.coGiaTriDen }}</td>
        <td>{{ item.ngayDangKy }}</td>
        <td>
          <ShowDetail :id="item.id" :type="1" />
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-pagination
    v-if="this.$store.getters.getOverlayVisible == false"
    v-model="page"
    :length="pageCount"
    :total-visible="10"
  ></v-pagination>
</template>

<script>
import DemoAPI from "../../api/DemoRD/DemoAPI.js";
import ShowDetail from "./ShowDetail.vue";
export default {
  components: { ShowDetail },
  data() {
    return {
      page: 1,
      desserts: null,
      pageCount: 0,
    };
  },
  methods: {
    async getData() {
      try {
        this.$store.commit("setOverlayVisible", true);
        this.desserts = await DemoAPI.getCanCuoc(this.page, 10);
        this.pageCount = (await DemoAPI.getCanCuocCount()) / 10 + 1;
        this.$store.commit("setOverlayVisible", false);
        this.$store.commit("setSnackBarContent", "Xác nhận thành công");
      } catch (error) {
        this.$store.commit("setOverlayVisible", false);
        this.$store.commit("setSnackBarContent", "Không tải được dữ liệu");
        return;
      }
    },
  },
  created() {
    this.getData();
  },
  watch: {
    page: {
      handler() {
        this.getData();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="css" scoped></style>
