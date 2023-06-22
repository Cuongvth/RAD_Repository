<template>
  <h3 class="text-center">Căn cước công dân</h3>
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
        <v-col cols="1">
          <v-switch v-model="checkSoCCCD"></v-switch>
        </v-col>
        <v-col v-if="!checkSoCCCD" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracSoCCCD"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkHoTen"></v-switch>
        </v-col>
        <v-col v-if="!checkHoTen" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracHoTen"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkNgayThangNamSinh"></v-switch>
        </v-col>
        <v-col v-if="!checkNgayThangNamSinh" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracNgayThangNamSinh"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkGioiTinh"></v-switch>
        </v-col>
        <v-col v-if="!checkGioiTinh" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracGioiTinh"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkQuocTich"></v-switch>
        </v-col>
        <v-col v-if="!checkQuocTich" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracQuocTich"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkCoGiaTriDen"></v-switch>
        </v-col>
        <v-col v-if="!checkCoGiaTriDen" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracCoGiaTriDen"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkNoiThuongTru"></v-switch>
        </v-col>
        <v-col v-if="!checkNoiThuongTru" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracNoiThuongTru"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkQueQuan"></v-switch>
        </v-col>
        <v-col v-if="!checkQueQuan" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracQueQuan"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkDacDiemNhanDang"></v-switch>
        </v-col>
        <v-col v-if="!checkDacDiemNhanDang" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracDacDiemNhanDang"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkNgayDangKy"></v-switch>
        </v-col>
        <v-col v-if="!checkNgayDangKy" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracNgayDangKy"
            density="compact"
            label="Accurac"
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
        <v-col cols="1">
          <v-switch v-model="checkVnm"></v-switch>
        </v-col>
        <v-col v-if="!checkVnm" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracVnm"
            density="compact"
            label="Accurac"
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
    return {
      checkSoCCCD: true,
      checkHoTen: true,
      checkNgayThangNamSinh: true,
      checkGioiTinh: true,
      checkQuocTich: true,
      checkQueQuan: true,
      checkNoiThuongTru: true,
      checkCoGiaTriDen: true,
      checkDacDiemNhanDang: true,
      checkNgayDangKy: true,
      checkVnm: true,
      accuracSoCCCD: 100,
      accuracHoTen: 100,
      accuracNgayThangNamSinh: 100,
      accuracGioiTinh: 100,
      accuracQuocTich: 100,
      accuracQueQuan: 100,
      accuracNoiThuongTru: 100,
      accuracCoGiaTriDen: 100,
      accuracDacDiemNhanDang: 100,
      accuracNgayDangKy: 100,
      accuracVnm: 100,
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
