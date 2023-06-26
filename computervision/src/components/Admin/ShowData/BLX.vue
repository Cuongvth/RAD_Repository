<template>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.so"
            density="compact"
            label="No."
            hint="No."
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-switch v-model="checkSo"></v-switch>
        </v-col>
        <v-col v-if="!checkSo" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracSo"
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
            v-model="data.ngaySinh"
            density="compact"
            label="Date of birth"
            hint="Date of birth"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-switch v-model="checkNgaySinh"></v-switch>
        </v-col>
        <v-col v-if="!checkNgaySinh" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracNgaySinh"
            density="compact"
            label="Accurac"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.noiCuTru"
            density="compact"
            label="Address"
            hint="Address"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-switch v-model="checkNoiCuTru"></v-switch>
        </v-col>
        <v-col v-if="!checkNoiCuTru" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracNoiCuTru"
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
            v-model="data.hang"
            density="compact"
            label="Class"
            hint="Class"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-switch v-model="checkHang"></v-switch>
        </v-col>
        <v-col v-if="!checkHang" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracHang"
            density="compact"
            label="Accurac"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.moTaXeDuocSuDung"
            density="compact"
            label="Vehicles are allowed to use"
            hint="Vehicles are allowed to use"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-switch v-model="checkMoTaXeDuocSuDung"></v-switch>
        </v-col>
        <v-col v-if="!checkMoTaXeDuocSuDung" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracMoTaXeDuocSuDung"
            density="compact"
            label="Accurac"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.ngayTrungTuyen"
            density="compact"
            label="Admission date"
            hint="Admission date"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-switch v-model="checkNgayTrungTuyen"></v-switch>
        </v-col>
        <v-col v-if="!checkNgayTrungTuyen" cols="2">
          <v-text-field
            :rules="[validateNumber]"
            v-model="accuracNgayTrungTuyen"
            density="compact"
            label="Accurac"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-text-field
            readonly
            v-model="data.ngayDangKy"
            density="compact"
            label="Registration date"
            hint="Registration date"
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
      checkSo: true,
      checkHoTen: true,
      checkNgaySinh: true,
      checkNoiCuTru: true,
      checkQuocTich: true,
      checkNgayTrungTuyen: true,
      checkMoTaXeDuocSuDung: true,
      checkHang: true,
      checkNgayDangKy: true,
      accuracSo: 100,
      accuracHoTen: 100,
      accuracNgaySinh: 100,
      accuracNoiCuTru: 100,
      accuracQuocTich: 100,
      accuracNgayTrungTuyen: 100,
      accuracMoTaXeDuocSuDung: 100,
      accuracHang: 100,
      accuracNgayDangKy: 100,
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
    checkSo: {
      handler(newValue) {
        if (newValue == true) {
          this.accuracSo = 100;
        }
      },
      immediate: true,
    },
    checkHoTen: {
      handler(newValue) {
        if (newValue == true) {
          this.accuracHoTen = 100;
        }
      },
      immediate: true,
    },
    checkNgaySinh: {
      handler(newValue) {
        if (newValue == true) {
          this.accuracNgaySinh = 100;
        }
      },
      immediate: true,
    },
    checkNoiCuTru: {
      handler(newValue) {
        if (newValue == true) {
          this.accuracNoiCuTru = 100;
        }
      },
      immediate: true,
    },
    checkQuocTich: {
      handler(newValue) {
        if (newValue == true) {
          this.accuracQuocTich = 100;
        }
      },
      immediate: true,
    },
    checkNgayTrungTuyen: {
      handler(newValue) {
        if (newValue == true) {
          this.accuracNgayTrungTuyen = 100;
        }
      },
      immediate: true,
    },
    checkMoTaXeDuocSuDung: {
      handler(newValue) {
        if (newValue == true) {
          this.accuracMoTaXeDuocSuDung = 100;
        }
      },
      immediate: true,
    },
    checkHang: {
      handler(newValue) {
        if (newValue == true) {
          this.accuracHang = 100;
        }
      },
      immediate: true,
    },
    checkNgayDangKy: {
      handler(newValue) {
        if (newValue == true) {
          this.accuracNgayDangKy = 100;
        }
      },
      immediate: true,
    },
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
