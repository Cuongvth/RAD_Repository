import axios from 'axios';
import {ToastAndroid} from 'react-native';

const getAll = async () => {
  try {
    let config = {
      method: 'get',
      url: 'http://10.10.31.173:3000/nhacungcap/getall',
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Không thể tải dữ liệu', ToastAndroid.SHORT);
    throw error;
  }
};

const getOne = async (maNhaCungCap: Number) => {
  try {
    let config = {
      method: 'get',
      url: `http://10.10.31.173:3000/nhacungcap/getone?maNhaCungCap=${maNhaCungCap}`,
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Không thể tải dữ liệu', ToastAndroid.SHORT);
    throw error;
  }
};

const add = async (ten: String, diaChi: String, soDienThoai: String) => {
  let config = {
    method: 'post',
    url: `http://10.10.31.173:3000/nhacungcap/add?tenNhaCungCap=${ten}&diaChi=${diaChi}&soDienThoai=${soDienThoai}`,
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
  maNhaCungCap: Number,
  ten: String,
  diaChi: String,
  soDienThoai: String,
) => {
  let config = {
    method: 'put',
    url: `http://10.10.31.173:3000/nhacungcap/update?maNhaCungCap=${maNhaCungCap}&tenNhaCungCap=${ten}&diaChi=${diaChi}&soDienThoai=${soDienThoai}`,
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

const remove = async (maNhaCungCap: Number) => {
  let config = {
    method: 'delete',
    url: `http://10.10.31.173:3000/nhacungcap/delete?maNhaCungCap=${maNhaCungCap}`,
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
