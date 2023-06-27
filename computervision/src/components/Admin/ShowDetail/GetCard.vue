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
  },
  props: { matTruoc: String, matSau: String },
};
</script>

<style lang="scss" scoped></style>
