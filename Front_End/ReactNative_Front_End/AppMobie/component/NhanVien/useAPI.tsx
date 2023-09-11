import axios from 'axios';
import {ToastAndroid} from 'react-native';

const getAll = async () => {
  try {
    let config = {
      method: 'get',
      url: 'http://10.10.31.173:3000/nhanvien/getall',
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Không thể tải dữ liệu', ToastAndroid.SHORT);
    throw error;
  }
};

const getOne = async (maNhanVien: Number) => {
  try {
    let config = {
      method: 'get',
      url: `http://10.10.31.173:3000/nhanvien/getone?maNhanVien=${maNhanVien}`,
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Không thể tải dữ liệu', ToastAndroid.SHORT);
    throw error;
  }
};

const add = async (
  ho: String,
  ten: String,
  gioiTinh: Boolean,
  ngaySinh: Date,
  diaChi: String,
) => {
  let config = {
    method: 'post',
    url: `http://10.10.31.173:3000/nhanvien/add?&ho=${ho}&ten=${ten}&gioiTinh=${gioiTinh}&ngaySinh=${ngaySinh}&diaChi=${diaChi}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    ToastAndroid.show('Thêm thành công', ToastAndroid.SHORT);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Thêm không thành công', ToastAndroid.SHORT);
    throw error;
  }
};

const edit = async (
  maNhanVien: Number,
  ho: String,
  ten: String,
  gioiTinh: Boolean,
  ngaySinh: Date,
  diaChi: String,
) => {
  let config = {
    method: 'put',
    url: `http://10.10.31.173:3000/nhanvien/update?maNhanVien=${maNhanVien}&ho=${ho}&ten=${ten}&gioiTinh=${gioiTinh}&ngaySinh=${ngaySinh}&diaChi=${diaChi}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    ToastAndroid.show('Sửa thành công', ToastAndroid.SHORT);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Sửa không thành công', ToastAndroid.SHORT);
    throw error;
  }
};

const remove = async (maNhanVien: Number) => {
  let config = {
    method: 'delete',
    url: `http://10.10.31.173:3000/nhanvien/delete?maNhanVien=${maNhanVien}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Xóa không thành công', ToastAndroid.SHORT);
    throw error;
  }
};

export {getAll, add, remove, edit, getOne};