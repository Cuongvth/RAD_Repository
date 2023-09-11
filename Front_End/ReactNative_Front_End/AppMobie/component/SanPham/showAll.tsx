import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {remove, getAll} from './useAPI';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import HeadNavigation from '../HeadNavigation';
import {Divider} from '@ui-kitten/components';

LogBox.ignoreAllLogs();

const ShowAll = () => {
  const tableHead = [
    'Tên sản phẩm',
    'Đơn vị tính',
    'Giá nhập',
    'Giá bán',
    'Xóa',
  ];
  const isFocused = useIsFocused();
  const [flag, setFlag] = useState(true);

  const [tableData, setTableData] = useState<
    Array<{
      maSanPham: Number;
      tenSanPham: String;
      donViTinh: String;
      giaNhap: Number;
      giaBan: Number;
      maNhaCungCap: Number;
    }>
  >([]);

  useFocusEffect(() => {
    if (!isFocused) {
      setFlag(true);
    }

    if (flag && isFocused) {
      fetchData();
      setFlag(false);
    }
  });

  const fetchData = async () => {
    setTableData(await getAll());
  };

  const handleButtonClick = async (maSanPham: Number) => {
    await remove(maSanPham);
    await fetchData();
  };

  return (
    <>
      <HeadNavigation></HeadNavigation>
      <Divider />
      <ScrollView>
        <Table borderStyle={{borderWidth: 1}} style={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows
            data={tableData.map(row => [
              row.tenSanPham,
              row.donViTinh,
              row.giaNhap,
              row.giaBan,
              <View>
                <TouchableOpacity
                  onPress={() => handleButtonClick(row.maSanPham)}>
                  <Text style={styles.btnXoa}>Xóa</Text>
                </TouchableOpacity>
              </View>,
            ])}
            style={styles.row}
            textStyle={styles.text}
          />
        </Table>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  head: {height: 50, backgroundColor: '#f1f8ff'},
  row: {height: 50},
  text: {textAlign: 'center', margin: 'auto', fontWeight: '700'},
  table: {margin: 10},
  btnXoa: {textAlign: 'center', color: 'red', fontWeight: 'bold'},
});

export default ShowAll;
