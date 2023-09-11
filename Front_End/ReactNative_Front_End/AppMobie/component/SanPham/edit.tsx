import React, {useState} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import {getAll, edit, getOne} from './useAPI';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {Button, Divider, Input} from '@ui-kitten/components';
import HeadNavigation from '../HeadNavigation';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as UseAPINhaCungCap from '../NhaCungCap/useAPI';

const Edit = () => {
  const [tenSanPham, setItemTenSanPham] = useState('');
  const [donViTinh, setItemDonViTinh] = useState('');
  const [giaNhap, setItemGiaNhap] = useState('0');
  const [giaBan, setItemGiaBan] = useState('0');
  const [maNhaCungCap, setItemMaNhaCungCap] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [items, setItems] = useState<
    Array<{
      label: String;
      value: String;
    }>
  >([]);
  const [itemsNhaCungCap, setItemsNhaCungCap] = useState<
    Array<{
      label: String;
      value: String;
    }>
  >([]);
  const [flag, setFlag] = useState(true);
  const isFocused = useIsFocused();

  const handleAddItem = async () => {
    if (isNaN(parseInt(giaNhap)) || isNaN(parseInt(giaBan))) {
      ToastAndroid.show('Dữ liệu không hợp lệ', ToastAndroid.SHORT);
      setItemGiaNhap('0');
      setItemGiaBan('0');
      return;
    }

    await edit(
      parseInt(selectedValue),
      tenSanPham,
      donViTinh,
      parseInt(giaNhap),
      parseInt(giaBan),
      parseInt(maNhaCungCap),
    );
  };

  const loadPicker = async () => {
    const lst = await getAll();
    const dropdownData = lst.map((item: any) => ({
      label: item.maSanPham.toString() + ' - ' + item.tenSanPham,
      value: item.maSanPham.toString(),
    }));
    setItems(dropdownData);
    const lstNhacungCap = await UseAPINhaCungCap.getAll();
    const dropdownDataNhacungCap = lstNhacungCap.map((item: any) => ({
      label: item.maNhaCungCap.toString() + ' - ' + item.tenNhaCungCap,
      value: item.maNhaCungCap.toString(),
    }));
    setItemsNhaCungCap(dropdownDataNhacungCap);
    if (lst.length > 0) {
      setSelectedValue(lst[0].maSanPham.toString());
      changePicker(lst[0].maSanPham);
    }
    if (lstNhacungCap.length > 0) {
      setItemMaNhaCungCap(lstNhacungCap[0].maNhaCungCap.toString());
    }
  };

  useFocusEffect(() => {
    if (!isFocused) {
      setFlag(true);
    }

    if (flag && isFocused) {
      loadPicker();
      setFlag(false);
    }
  });

  const changePicker = async (itemValue: Number) => {
    const obj = (await getOne(itemValue))[0];

    setItemTenSanPham(obj.tenSanPham);
    setItemDonViTinh(obj.donViTinh);
    setItemGiaNhap(obj.giaNhap);
    setItemGiaBan(obj.giaBan);
    setItemMaNhaCungCap(obj.maNhaCungCap.toString());
  };

  return (
    <>
      <HeadNavigation></HeadNavigation>
      <Divider />
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={items}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Chọn mã sản phẩm"
          searchPlaceholder="Search..."
          value={selectedValue}
          onChange={item => {
            setSelectedValue(item.value.valueOf());
            changePicker(parseInt(item.value.valueOf()));
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        />
        <Input
          style={styles.input}
          value={tenSanPham}
          onChangeText={setItemTenSanPham}
          placeholder="Tên sản phẩm"
        />
        <Input
          style={styles.input}
          value={donViTinh}
          onChangeText={setItemDonViTinh}
          placeholder="Đơn vị tính"
        />
        <Input
          style={styles.input}
          value={giaNhap.toString()}
          onChangeText={setItemGiaNhap}
          placeholder="Giá nhập"
        />
        <Input
          style={styles.input}
          value={giaBan.toString()}
          onChangeText={setItemGiaBan}
          placeholder="Giá bán"
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={itemsNhaCungCap}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Chọn mã nhà cung cấp"
          searchPlaceholder="Search..."
          value={maNhaCungCap}
          onChange={item => {
            setItemMaNhaCungCap(item.value.valueOf());
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        />
        <Button onPress={handleAddItem}>Sửa nhà cung cấp</Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 2,
    marginBottom: 16,
    borderRadius: 20,
  },
  dropdown: {
    marginBottom: 16,
    height: 40,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 20,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Edit;
