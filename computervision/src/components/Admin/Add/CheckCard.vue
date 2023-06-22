<template>
  <v-row>
    <v-col cols="7">
      <GetCard :getData="getData" :cardData="cardData"></GetCard>
      <CanCuoc v-if="type == 1" :cardData="cardData" />
    </v-col>
    <v-col cols="5">
      <TextCard></TextCard>
    </v-col>
  </v-row>
  <v-overlay
    persistent
    v-model="overlayVisible"
    class="align-center justify-center"
  >
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <v-snackbar v-model="snackbar">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="green" variant="text" @click="snackbar = false">
        Đóng
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import DemoAPI from "../../../api/DemoRD/DemoAPI.js";
import GetCard from "./GetCard.vue";
import CanCuoc from "./CanCuoc.vue";
import TextCard from "./TextCard.vue";
export default {
  components: { GetCard, CanCuoc, TextCard },
  data() {
    return {
      cardData: null,
      type: 0,
      snackbar: false,
      text: "",
      overlayVisible: false,
    };
  },
  methods: {
    async getData(formData) {
      var result = null;
      try {
        this.overlayVisible = true;
        result = await DemoAPI.check(formData);
        this.overlayVisible = false;
      } catch (error) {
        this.overlayVisible = false;
        this.text = "Không nhận dạng được";
        this.snackbar = true;
        return;
      }
      console.log(result.data);
      if (result.status == 3) {
        this.text = "Xác nhận thành công!";
        this.type = 2;
        this.cardData = result.data;
        this.snackbar = true;
      } else if (result.status == 4) {
        this.text = "Xác nhận thành công!";
        this.snackbar = true;
        this.cardData = result.data;
        this.type = 1;
      } else {
        this.text = "Không nhận dạng được!";
        this.snackbar = true;
        this.type = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
