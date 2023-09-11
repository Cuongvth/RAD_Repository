import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {getAll, edit, getOne} from './useAPI';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {Button, Divider, Input} from '@ui-kitten/components';
import HeadNavigation from '../HeadNavigation';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const Edit = () => {
  const [diaChi, setItemDiaChi] = useState('');
  const [soDienThoai, setItemSoDienThoai] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [items, setItems] = useState<
    Array<{
      label: String;
      value: String;
    }>
  >([]);
  const [flag, setFlag] = useState(true);
  const isFocused = useIsFocused();

  const handleAddItem = async () => {
    await edit(parseInt(selectedValue), diaChi, soDienThoai);
  };

  const loadPicker = async () => {
    const lst = await getAll();
    const dropdownData = lst.map((item: any) => ({
      label: item.maKhoHang.toString() + ' - ' + item.diaChi,
      value: item.maKhoHang.toString(),
    }));
    setItems(dropdownData);
    if (lst.length > 0) {
      setSelectedValue(lst[0].maKhoHang.toString());
      changePicker(lst[0].maKhoHang);
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
    setItemDiaChi(obj.diaChi);
    setItemSoDienThoai(obj.soDienThoai);
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
          placeholder="Chọn mã kho hàng"
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
          value={diaChi}
          onChangeText={setItemDiaChi}
          placeholder="Địa chỉ"
        />
        <Input
          style={styles.input}
          value={soDienThoai}
          onChangeText={setItemSoDienThoai}
          placeholder="Số điện thoại"
        />
        <Button onPress={handleAddItem}>Sửa kho hàng</Button>
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
    paddingHorizontal: 8,
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
