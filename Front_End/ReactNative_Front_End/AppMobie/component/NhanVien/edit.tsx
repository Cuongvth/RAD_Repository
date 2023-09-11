import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {getAll, edit, getOne} from './useAPI';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {
  Button,
  Datepicker,
  Divider,
  Input,
  Radio,
  RadioGroup,
} from '@ui-kitten/components';
import HeadNavigation from '../HeadNavigation';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const Edit = () => {
  const [ho, setItemHo] = useState('');
  const [ten, setItemTen] = useState('');
  const [gioiTinh, setItemGioiTinh] = useState(true);
  const [ngaySinh, setItemNgaySinh] = useState(new Date());
  const [diaChi, setItemDiaChi] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [items, setItems] = useState<
    Array<{
      label: String;
      value: String;
    }>
  >([]);
  const [flag, setFlag] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const isFocused = useIsFocused();

  const handleAddItem = async () => {
    await edit(parseInt(selectedValue), ho, ten, gioiTinh, ngaySinh, diaChi);
  };

  const loadPicker = async () => {
    const lst = await getAll();
    const dropdownData = lst.map((item: any) => ({
      label: item.maNhanVien.toString() + ' - ' + item.ho + ' ' + item.ten,
      value: item.maNhanVien.toString(),
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
    console.log(obj);

    setItemHo(obj.ho);
    setItemTen(obj.ten);
    setItemGioiTinh(obj.gioiTinh);
    setItemNgaySinh(new Date(obj.ngaySinh));
    setItemDiaChi(obj.diaChi);
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
          value={ho}
          onChangeText={setItemHo}
          placeholder="Họ"
        />
        <Input
          style={styles.input}
          value={ten}
          onChangeText={setItemTen}
          placeholder="Tên"
        />
        <RadioGroup
          style={styles.radiogroup}
          selectedIndex={selectedIndex}
          onChange={index => {
            setSelectedIndex(index);
            setItemGioiTinh(index === 0 ? true : false);
          }}>
          <Radio>Nam</Radio>
          <Radio>Nữ</Radio>
        </RadioGroup>
        <Datepicker
          min={new Date(1800, 0, 0)}
          max={new Date(2050, 0, 0)}
          style={styles.datepicker}
          date={ngaySinh}
          onSelect={nextDate => setItemNgaySinh(nextDate)}
        />
        <Input
          style={styles.input}
          value={diaChi}
          onChangeText={setItemDiaChi}
          placeholder="Địa chỉ"
        />
        <Button onPress={handleAddItem}>Sửa nhân viên</Button>
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
  radiogroup: {
    width: '100%',
    marginBottom: 16,
  },
  datepicker: {
    width: '100%',
    marginBottom: 16,
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
