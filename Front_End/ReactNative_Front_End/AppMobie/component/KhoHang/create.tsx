import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {add} from './useAPI';
import HeadNavigation from '../HeadNavigation';
import {Button, Divider, Input} from '@ui-kitten/components';

const Create = () => {
  const [diaChi, setItemDiaChi] = useState('');
  const [soDienThoai, setItemSoDienThoai] = useState('');

  const handleAddItem = async () => {
    await add(diaChi, soDienThoai);
    setItemDiaChi('');
    setItemSoDienThoai('');
  };

  return (
    <>
      <HeadNavigation></HeadNavigation>
      <Divider />
      <View style={styles.container}>
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
        <Button onPress={handleAddItem}>Thêm kho hàng</Button>
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
});

export default Create;
