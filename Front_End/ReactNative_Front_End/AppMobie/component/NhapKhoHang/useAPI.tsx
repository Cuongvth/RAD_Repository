import axios from 'axios';
import {ToastAndroid} from 'react-native';

const nhapKho = async (
  maNhanVien: Number,
  maKhoHang: Number,
  chiTietPhieuNhap: String,
) => {
  let config = {
    method: 'get',
    url: `http://10.10.31.173:3000/phieunhap/nhapkho?maNhanVien=${maNhanVien}&maKhoHang=${maKhoHang}&chiTietPhieuNhap=${chiTietPhieuNhap}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    ToastAndroid.show('Nhập kho thành công', ToastAndroid.SHORT);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Nhập kho không thành công', ToastAndroid.SHORT);
    throw error;
  }
};

export {nhapKho};
