import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {add} from './useAPI';
import HeadNavigation from '../HeadNavigation';
import {
  Button,
  Datepicker,
  Divider,
  Input,
  Radio,
  RadioGroup,
} from '@ui-kitten/components';

const Create = () => {
  const [ho, setItemHo] = useState('');
  const [ten, setItemTen] = useState('');
  const [gioiTinh, setItemGioiTinh] = useState(true);
  const [ngaySinh, setItemNgaySinh] = useState(new Date());
  const [diaChi, setItemDiaChi] = useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleAddItem = async () => {
    await add(ho, ten, gioiTinh, ngaySinh, diaChi);
    setItemHo('');
    setItemTen('');
    setItemGioiTinh(true);
    setItemNgaySinh(new Date());
    setItemDiaChi('');
  };

  return (
    <>
      <HeadNavigation></HeadNavigation>
      <Divider />
      <View style={styles.container}>
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
        <Button onPress={handleAddItem}>Thêm nhân viên</Button>
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
});

export default Create;
