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
        <td>19/10/2003</td>
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
</template>

<script>
import DemoAPI from "../../api/DemoRD/DemoAPI.js";
import ShowDataCard from "./ShowDataCard.vue";
export default {
  name: "DataAdmin",
  components: { ShowDataCard },
  data() {
    return {
      desserts: null,
    };
  },
  methods: {
    async getData() {
      try {
        this.$store.commit("setOverlayVisible", true);
        this.desserts = await DemoAPI.getDuLieu();
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
