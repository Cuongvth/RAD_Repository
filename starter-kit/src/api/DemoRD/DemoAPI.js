import { HTTP } from "../HTTPs";

export function checkDataLocal(form) {
  return new Promise((resolve, reject) => {
    HTTP.post(`admin/nhandangtructiep`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function checkInData(id) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/nhandang?duLieuId=${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getDuLieu(page, pageSize) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getdulieu?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getCanCuoc(page, pageSize) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getcancuoc?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getCanCuocCount() {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getcancuoccount`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getBLX(page, pageSize) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getblx?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getOneCanCuoc(id) {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getonecancuoc?id=${id}`)
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
export function getBLXCount() {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getblxcount`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getDuLieuCount() {
  return new Promise((resolve, reject) => {
    HTTP.get(`admin/getdulieucount`)
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
        `admin/danhgiadulieublx?BLXID=${id}&isSo=${checkTruong[0]}&isHoTen=${checkTruong[1]}&isNoiCuTru=${checkTruong[3]}&isNgayThang=${checkTruong[2]}&isQuocTich=${checkTruong[4]}&isHang=${checkTruong[5]}&isMoTaXeDuocSuDung=${checkTruong[6]}&isNgayTrungTuyen=${checkTruong[7]}&isNgayDangKi=${checkTruong[8]}&isMatTruoc=${googleMatTruoc}&isMatSau=${googleMatSau}&isLoaiThe=${loaiThe}`,
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
