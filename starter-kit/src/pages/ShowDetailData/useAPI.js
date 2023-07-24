import { HTTP } from "@/api/httpOCR";

export function getOneCanCuoc(id) {
  return new Promise((resolve, reject) => {
    HTTP.get(`getonecancuoc?id=${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getOneBLX(id) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getoneblx?id=${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function danhGiaDuLieu(
  id,
  type,
  googleMatTruoc,
  googleMatSau,
  checkTruong,
  loaiThe,
) {
  if (type == 4) {
    return new Promise((resolve, reject) => {
      HTTP.get(
        `danhgiadulieublx?BLXID=${id}&isSo=${checkTruong[0]}&isHoTen=${checkTruong[1]}&isNoiCuTru=${checkTruong[3]}&isNgayThang=${checkTruong[2]}&isQuocTich=${checkTruong[4]}&isHang=${checkTruong[5]}&isMoTaXeDuocSuDung=${checkTruong[6]}&isNgayTrungTuyen=${checkTruong[7]}&isNgayDangKi=${checkTruong[8]}&isMatTruoc=${googleMatTruoc}&isMatSau=${googleMatSau}&isLoaiThe=${loaiThe}`,
      )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else if (type == 1) {
    return new Promise((resolve, reject) => {
      HTTP.get(
        `admin/danhgiadulieucccd?CCCDID=${id}&isSo=${checkTruong[0]}&isHoTen=${checkTruong[1]}&isCoGiaTriDen=${checkTruong[5]}&isNgayThang=${checkTruong[2]}&isGioiTinh=${checkTruong[3]}&isQuocTich=${checkTruong[4]}&isQueQuan=${checkTruong[7]}&isvnm=${checkTruong[10]}&isNoiThuongTru=${checkTruong[6]}&isDacDien=${checkTruong[8]}&isNgayDangKi=${checkTruong[9]}&isMatTruoc=${googleMatTruoc}&isMatSau=${googleMatSau}&isLoaiThe=${loaiThe}`,
      )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
