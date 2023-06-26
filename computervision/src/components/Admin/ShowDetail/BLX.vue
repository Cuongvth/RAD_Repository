<template>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            readonly
            v-model="data.so"
            density="compact"
            label="No."
            hint="No."
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            readonly
            v-model="data.hoTen"
            density="compact"
            label="Full name"
            hint="Full name"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            readonly
            v-model="data.ngaySinh"
            density="compact"
            label="Date of birth"
            hint="Date of birth"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            readonly
            v-model="data.noiCuTru"
            density="compact"
            label="Address"
            hint="Address"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            readonly
            v-model="data.quocTich"
            density="compact"
            label="Nationality"
            hint="Nationality"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            readonly
            v-model="data.hang"
            density="compact"
            label="Class"
            hint="Class"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            readonly
            v-model="data.moTaXeDuocSuDung"
            density="compact"
            label="Vehicles are allowed to use"
            hint="Vehicles are allowed to use"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            readonly
            v-model="data.ngayTrungTuyen"
            density="compact"
            label="Admission date"
            hint="Admission date"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            readonly
            v-model="data.ngayDangKy"
            density="compact"
            label="Registration date"
            hint="Registration date"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <small>* là trường là bắt buộc!</small>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return { data: null };
  },
  created() {
    this.data = this.cardData;
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
  watch: {
    cardData: {
      handler(newValue) {
        this.data = newValue;
      },
      immediate: true,
    },
  },
  props: { cardData: Object },
};
</script>

<style lang="scss" scoped></style>
