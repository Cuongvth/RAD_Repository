<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Số thứ tự</th>
        <th class="text-left">Mặt trước</th>
        <th class="text-left">Mặt sau</th>
        <th class="text-left">Ngày thêm</th>
        <th class="text-left">Trạng thái</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in desserts" :key="item.id">
        <td>{{ i + 1 }}</td>
        <td>
          <img
            :src="`data:image/jpeg;base64, ` + item.matTruoc"
            class="mattruoc"
            v-if="item.matTruoc.length > 0"
          />
        </td>
        <td>
          <img
            :src="`data:image/jpeg;base64, ` + item.matSau"
            class="matsau"
            v-if="item.matSau.length > 0"
          />
        </td>
        <td>{{ item.thoiGianThem.substring(0, 10) }}</td>
        <td>{{ item.status == 1 ? "Chưa nhận diện" : "Đã nhận diện" }}</td>
        <td>
          <ShowDataCard
            :dataId="item.id"
            :matTruoc="item.matTruoc"
            :matSau="item.matSau"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-pagination
    v-if="this.$store.getters.getOverlayVisible == false"
    v-model="page"
    :length="100"
    :total-visible="10"
  ></v-pagination>
</template>

<script>
import DemoAPI from "../../api/DemoRD/DemoAPI.js";
import ShowDataCard from "./ShowDataCard.vue";
export default {
  name: "DataAdmin",
  components: { ShowDataCard },
  data() {
    return {
      page: 1,
      desserts: null,
    };
  },
  methods: {
    async getData() {
      try {
        this.$store.commit("setOverlayVisible", true);
        this.desserts = await DemoAPI.getDuLieu(this.page, 10);
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

<style lang="css" scoped>
.mattruoc,
.matsau {
  height: 180px;
  width: 135px;
  transform: rotate(90deg);
}
</style>
