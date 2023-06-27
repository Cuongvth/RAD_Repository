<template>
  <div style="margin-left: 50px">
    <v-row>
      <v-col cols="6">
        <img
          :src="`data:image/jpeg;base64, ` + matTruoc"
          alt=""
          :style="`height: 400px; width: 300px; transform: rotate(${rotater1}deg)`"
          v-if="matTruoc.length > 0"
          @click="rotater(1)"
        />
      </v-col>
      <v-col cols="6">
        <img
          :src="`data:image/jpeg;base64, ` + matSau"
          alt=""
          :style="`height: 400px; width: 300px; transform: rotate(${rotater2}deg)`"
          v-if="matSau.length > 0"
          @click="rotater(2)"
        />
      </v-col>
    </v-row>
    <br />
    <v-btn
      color="#4d96ff"
      style="
        height: 35px;
        font-size: 14px;
        font-weight: 400;
        margin: 20px 0 0 0;
      "
      @click="submit()"
    >
      <v-icon icon="mdi mdi-credit-card-scan" size="20" />Nhận dạng</v-btn
    >
  </div>
</template>

<script>
export default {
  data() {
    return { rotater1: 90, rotater2: 90 };
  },
  methods: {
    rotater(index) {
      if (index == 1) {
        this.rotater1 += 90;
      } else if (index == 2) {
        this.rotater2 += 90;
      }
    },
    async submit() {
      this.getData();
    },
  },
  props: { getData: Function, matTruoc: String, matSau: String },
};
</script>

<style lang="scss" scoped></style>
