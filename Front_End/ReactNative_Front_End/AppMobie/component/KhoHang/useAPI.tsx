import axios from 'axios';
import {ToastAndroid} from 'react-native';

const getAll = async () => {
  try {
    let config = {
      method: 'get',
      url: 'http://10.10.31.173:3000/khohang/getall',
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Không thể tải dữ liệu', ToastAndroid.SHORT);
    throw error;
  }
};

const getOne = async (maKhoHang: Number) => {
  try {
    let config = {
      method: 'get',
      url: `http://10.10.31.173:3000/khohang/getone?maKhoHang=${maKhoHang}`,
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    ToastAndroid.show('Không thể tải dữ liệu', ToastAndroid.SHORT);
    throw error;
  }
};

const add = async (diaChi: String, soDienThoai: String) => {
  let config = {
    method: 'post',
    url: `http://10.10.31.173:3000/khohang/add?&diaChi=${diaChi}&soDienThoai=${soDienThoai}`,
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

const edit = async (maKhoHang: Number, diaChi: String, soDienThoai: String) => {
  let config = {
    method: 'put',
    url: `http://10.10.31.173:3000/khohang/update?maKhoHang=${maKhoHang}&diaChi=${diaChi}&soDienThoai=${soDienThoai}`,
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

const remove = async (maKhoHang: Number) => {
  let config = {
    method: 'delete',
    url: `http://10.10.31.173:3000/khohang/delete?maKhoHang=${maKhoHang}`,
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
