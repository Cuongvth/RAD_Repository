<template>
  <v-row>
    <v-col cols="4">
      <v-text-field
        readonly
        v-model="soCCCD"
        density="compact"
        label="No."
        hint="No."
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        readonly
        v-model="hoTen"
        density="compact"
        label="Full name"
        hint="Full name"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        readonly
        v-model="ngayThangNamSinh"
        density="compact"
        label="Date of birth"
        hint="Date of birth"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        readonly
        v-model="gioiTinh"
        density="compact"
        label="Sex"
        hint="Sex"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        readonly
        v-model="quocTich"
        density="compact"
        label="Nationality"
        hint="Nationality"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        readonly
        v-model="coGiaTriDen"
        density="compact"
        label="Date of expiry"
        hint="Date of expiry"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        readonly
        v-model="noiThuongTru"
        density="compact"
        label="Place of residence"
        hint="Place of residence"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        readonly
        v-model="queQuan"
        density="compact"
        label="Place of onigin"
        hint="Place of onigin"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        readonly
        v-model="dacDiemNhanDang"
        density="compact"
        label="Personal identitication"
        hint="Personal identitication"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        readonly
        v-model="ngayDangKy"
        density="compact"
        label="Date supply"
        hint="Date supply"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-textarea
        readonly
        v-model="vnm"
        density="compact"
        label="VNM"
        hint="VNM"
        variant="outlined"
        rows="3"
        no-resize
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      soCCCD: "034099003175",
      hoTen: "ĐỖ QUANG ANH",
      ngayThangNamSinh: "09/02/1999",
      gioiTinh: "Nam",
      quocTich: "Việt Nam",
      queQuan: "Tân Học, Thái Thụy, Thái Bình",
      noiThuongTru: "Thôn Đông Tân Học, Thái Thụy, Thái Bình",
      coGiaTriDen: "09/02/2024",
      dacDiemNhanDang: null,
      ngayDangKy: null,
      vnm: "Tân Học, Thái Thụy, Thái BìnhNơi thường trú / Place of residence Thôn ĐôngTân Học, Thái Thụy, Thái Bình",
    };
  },
};
</script>

<style lang="css" scoped></style>
