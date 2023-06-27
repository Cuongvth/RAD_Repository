<template>
  <v-tabs v-model="tab" align-tabs="end">
    <v-tab :value="0">Mặt trước</v-tab>
    <v-tab :value="1">Mặt sau</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item key="0" value="0">
      <v-textarea rows="20" v-model="dataTruoc" readonly></v-textarea>
    </v-window-item>
    <v-window-item key="1" value="1">
      <v-textarea rows="20" readonly v-model="dataSau"></v-textarea>
    </v-window-item>
  </v-window>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      dataTruoc: null,
      dataSau: null,
    };
  },
  created() {
    if (this.googleMatTruoc != null && this.googleMatSau != null) {
      this.dataTruoc = this.googleMatTruoc.join("\n");
      this.dataSau = this.googleMatSau.join("\n");
    }
  },
  watch: {
    googleMatTruoc: {
      handler(newValue) {
        if (newValue == null) return;
        this.dataTruoc = newValue.join("\n");
      },
      immediate: true,
    },
    googleMatSau: {
      handler(newValue) {
        if (newValue == null) return;
        this.dataSau = newValue.join("\n");
      },
      immediate: true,
    },
  },
  methods: {
    validateNumber(value) {
      if (value === null || value === "") {
        return "Required";
      }
      const num = parseFloat(value);
      if (isNaN(num)) {
        return "Is number";
      }
      if (num < 0 || num > 100) {
        return "Out of range";
      }
      return true;
    },
  },
  props: {
    googleMatTruoc: Array,
    googleMatSau: Array,
  },
};
</script>

<style lang="scss" scoped></style>
