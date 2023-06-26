<template>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.soCCCD"
            density="compact"
            label="No."
            hint="No."
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.hoTen"
            density="compact"
            label="Full name"
            hint="Full name"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.ngayThangNamSinh"
            density="compact"
            label="Date of birth"
            hint="Date of birth"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.gioiTinh"
            density="compact"
            label="Sex"
            hint="Sex"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.quocTich"
            density="compact"
            label="Nationality"
            hint="Nationality"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.coGiaTriDen"
            density="compact"
            label="Date of expiry"
            hint="Date of expiry"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.noiThuongTru"
            density="compact"
            label="Place of residence"
            hint="Place of residence"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.queQuan"
            density="compact"
            label="Place of onigin"
            hint="Place of onigin"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.dacDiemNhanDang"
            density="compact"
            label="Personal identitication"
            hint="Personal identitication"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.ngayDangKi"
            density="compact"
            label="Date supply"
            hint="Date supply"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-textarea
            readonly
            v-model="data.vnm"
            density="compact"
            label="VNM"
            hint="VNM"
            variant="outlined"
            rows="3"
            no-resize
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <small>* là trường là bắt buộc!</small>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
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
