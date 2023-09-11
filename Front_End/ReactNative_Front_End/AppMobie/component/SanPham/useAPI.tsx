import axios from 'axios';
import {ToastAndroid} from 'react-native';

const getAll = async () => {
  try {
    let config = {
      method: 'get',
      url: 'http://10.10.31.173:3000/sanpham/getall',
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Không thể tải dữ liệu', ToastAndroid.SHORT);
    throw error;
  }
};

const getOne = async (maSanPham: Number) => {
  try {
    let config = {
      method: 'get',
      url: `http://10.10.31.173:3000/sanpham/getone?maSanPham=${maSanPham}`,
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
  tenSanPham: String,
  donViTinh: String,
  giaNhap: Number,
  giaBan: Number,
  maNhaCungCap: Number,
) => {
  let config = {
    method: 'post',
    url: `http://10.10.31.173:3000/sanpham/add?&tenSanPham=${tenSanPham}&donViTinh=${donViTinh}&giaNhap=${giaNhap}&giaBan=${giaBan}&maNhaCungCap=${maNhaCungCap}`,
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
  maSanPham: Number,
  tenSanPham: String,
  donViTinh: String,
  giaNhap: Number,
  giaBan: Number,
  maNhaCungCap: Number,
) => {
  let config = {
    method: 'put',
    url: `http://10.10.31.173:3000/sanpham/update?maSanPham=${maSanPham}&tenSanPham=${tenSanPham}&donViTinh=${donViTinh}&giaNhap=${giaNhap}&giaBan=${giaBan}&maNhaCungCap=${maNhaCungCap}`,
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

const remove = async (maSanPham: Number) => {
  let config = {
    method: 'delete',
    url: `http://10.10.31.173:3000/sanpham/delete?maSanPham=${maSanPham}`,
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
