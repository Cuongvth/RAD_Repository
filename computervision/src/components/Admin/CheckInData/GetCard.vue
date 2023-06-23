<template>
  <div>
    <v-row>
      <v-col cols="4">
        <img
          :src="`data:image/jpeg;base64, ` + matTruoc"
          alt=""
          style="height: 400px; width: 300px"
          v-if="matTruoc.length > 0"
        />
      </v-col>
      <v-col cols="4">
        <img
          :src="`data:image/jpeg;base64, ` + matSau"
          alt=""
          style="height: 400px; width: 300px"
          v-if="matSau.length > 0"
        />
      </v-col>
    </v-row>
    <br />
    <v-btn
      color="#4d96ff"
      style="
        height: 35px;
        width: 104px;
        font-size: 14px;
        font-weight: 400;
        margin: 20px 0 0 0;
      "
      @click="submit()"
    >
      <v-icon icon="mdi mdi-credit-card-scan" size="20"
    /></v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async submit() {
      this.getData();
    },
  },
  props: { getData: Function, matTruoc: String, matSau: String },
};
</script>

<style lang="scss" scoped></style>
