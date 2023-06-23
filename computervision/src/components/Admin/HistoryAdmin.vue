<template>
  <h3 class="text-center">Căn cước công dân</h3>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">No.</th>
        <th class="text-left">Full name</th>
        <th class="text-left">Date of birth</th>
        <th class="text-left">Sex</th>
        <th class="text-left">Nationality</th>
        <th class="text-left">Date of expiry</th>
        <th class="text-left">Date supply</th>
        <th class="text-left">Details</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.soCCCD }}</td>
        <td>{{ item.hoTen }}</td>
        <td>{{ item.ngayThangNamSinh }}</td>
        <td>{{ item.gioiTinh }}</td>
        <td>{{ item.quocTich }}</td>
        <td>{{ item.coGiaTriDen }}</td>
        <td>{{ item.ngayDangKy }}</td>
        <td>
          <v-btn color="#4d96ff"><v-icon icon="mdi mdi-details" /></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
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
        },
        {
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
        },
        {
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
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped></style>
