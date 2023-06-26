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
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  props: { matTruoc: String, matSau: String },
};
</script>

<style lang="scss" scoped></style>
