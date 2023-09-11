import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  LogBox,
} from 'react-native'; // Thêm import Text
import {Table, Row, Rows} from 'react-native-table-component';
import {remove, getAll} from './useAPI';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import HeadNavigation from '../HeadNavigation';
import {Divider} from '@ui-kitten/components';

LogBox.ignoreAllLogs();

const ShowAll = () => {
  const tableHead = ['Tên', 'Địa chỉ', 'Số điện thoại', 'Xóa'];
  const isFocused = useIsFocused();
  const [flag, setFlag] = useState(true);

  const [tableData, setTableData] = useState<
    Array<{
      maNhaCungCap: Number;
      tenNhaCungCap: string;
      diaChi: string;
      soDienThoai: string;
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

  const handleButtonClick = async (maNhaCungCap: Number) => {
    await remove(maNhaCungCap);
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
              row.tenNhaCungCap,
              row.diaChi,
              row.soDienThoai,
              <View>
                <TouchableOpacity
                  onPress={() => handleButtonClick(row.maNhaCungCap)}>
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
