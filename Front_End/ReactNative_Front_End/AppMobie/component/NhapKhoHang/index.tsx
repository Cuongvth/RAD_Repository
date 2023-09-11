import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import * as APISanPham from '../SanPham/useAPI';
import * as APINhanVien from '../NhanVien/useAPI';
import * as APIKhoHang from '../KhoHang/useAPI';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {Button, Input} from '@ui-kitten/components';
import {Row, Rows, Table} from 'react-native-table-component';
import {nhapKho} from './useAPI';

const App = () => {
  const [tableDataSanPham, setTableDataSanPham] = useState<
    Array<{
      maSanPham: Number;
      tenSanPham: String;
      donViTinh: String;
      giaNhap: Number;
      giaBan: Number;
      soLuongTon: Number;
      maNhaCungCap: Number;
    }>
  >([]);
  const [tableDataChiTietNhap, setTableDataChiTietNhap] = useState<
    Array<{
      maSanPham: Number;
      tenSanPham: String;
      donViTinh: String;
      giaNhap: Number;
      soLuongNhap: Number;
    }>
  >([]);
  const [maNhanVienItems, setItemsMaNhanVien] = useState<
    Array<{
      label: String;
      value: String;
    }>
  >([]);
  const [maKhoHangItems, setItemsMaKhoHang] = useState<
    Array<{
      label: String;
      value: String;
    }>
  >([]);
  const tableHead = [
    'Tên sản phẩm',
    'Đơn vị tính',
    'Giá nhập',
    'Số lượng nhập',
    'Xóa',
  ];
  const [selectedValue, setSelectedValue] = useState('');
  const [maNhanVien, setSelectedMaNhanVien] = useState('');
  const [maKhoHang, setSelectedMaKhoHang] = useState('');
  const [flag, setFlag] = useState(true);
  const isFocused = useIsFocused();
  const [soLuongNhap, setItemSoLuongNhap] = useState('0');

  const loadPicker = async () => {
    const lst = await APISanPham.getAll();
    setTableDataSanPham(lst);
    const lstMaNhanVien = await APINhanVien.getAll();
    const dropdownData = lstMaNhanVien.map((item: any) => ({
      label: item.maNhanVien.toString() + ' - ' + item.ho + ' ' + item.ten,
      value: item.maNhanVien.toString(),
    }));
    setItemsMaNhanVien(dropdownData);
    const lstKhoHang = await APIKhoHang.getAll();
    const dropdownDataKhoHang = lstKhoHang.map((item: any) => ({
      label: item.maKhoHang.toString() + ' - ' + item.diaChi,
      value: item.maKhoHang.toString(),
    }));
    setItemsMaKhoHang(dropdownDataKhoHang);
    if (lst.length > 0) {
      setSelectedValue(lst[0].maSanPham.toString());
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

  const pickerItems = tableDataSanPham.map(item => ({
    label: item.maSanPham.toString() + ' - ' + item.tenSanPham,
    value: item.maSanPham.toString(),
  }));

  const handleAddItem = async () => {
    if (isNaN(parseInt(soLuongNhap))) {
      ToastAndroid.show('Dữ liệu không hợp lệ', ToastAndroid.SHORT);
      setItemSoLuongNhap('0');
      return;
    }

    const sanPham = tableDataSanPham.find(
      c => c.maSanPham === parseInt(selectedValue),
    );

    const checkNull =
      typeof tableDataChiTietNhap.find(
        c => c.maSanPham === parseInt(selectedValue),
      ) === 'undefined';

    if (checkNull) {
      if (typeof sanPham === 'object') {
        setTableDataChiTietNhap([
          ...tableDataChiTietNhap,
          {
            maSanPham: sanPham.maSanPham,
            tenSanPham: sanPham.tenSanPham,
            donViTinh: sanPham.donViTinh,
            giaNhap: sanPham.giaNhap,
            soLuongNhap: parseInt(soLuongNhap),
          },
        ]);
      }
    } else {
      setTableDataChiTietNhap(
        tableDataChiTietNhap.map(c => {
          if (c.maSanPham === parseInt(selectedValue)) {
            c.soLuongNhap = c.soLuongNhap.valueOf() + parseInt(soLuongNhap);
            return c;
          }
          return c;
        }),
      );
    }
    setItemSoLuongNhap('0');
  };

  const handleAddList = async () => {
    await nhapKho(
      parseInt(maNhanVien),
      parseInt(maKhoHang),
      JSON.stringify(
        tableDataChiTietNhap.map(c => ({
          MaSanPham: c.maSanPham,
          SoLuongNhap: c.soLuongNhap,
        })),
      ),
    );
    setTableDataChiTietNhap([]);
  };

  const handleButtonClick = async (maSanPham: Number) => {
    setTableDataChiTietNhap(
      tableDataChiTietNhap.filter(c => c.maSanPham !== maSanPham),
    );
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={pickerItems}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Chọn mã sản phẩm"
        searchPlaceholder="Search..."
        value={selectedValue}
        onChange={item => {
          setSelectedValue(item.value.toString());
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
        value={soLuongNhap.toString()}
        onChangeText={setItemSoLuongNhap}
        placeholder="Số lượng tồn"
      />
      <Button onPress={handleAddItem}>Thêm</Button>
      <ScrollView>
        <Table borderStyle={{borderWidth: 1}} style={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows
            data={tableDataChiTietNhap.map(row => [
              row.tenSanPham,
              row.donViTinh,
              row.giaNhap,
              row.soLuongNhap,
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
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={maNhanVienItems}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Chọn mã nhân viên"
        searchPlaceholder="Search..."
        value={maNhanVien}
        onChange={item => {
          setSelectedMaNhanVien(item.value.valueOf());
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
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={maKhoHangItems}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Chọn mã kho hàng"
        searchPlaceholder="Search..."
        value={maKhoHang}
        onChange={item => {
          setSelectedMaKhoHang(item.value.valueOf());
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
      <Button onPress={handleAddList}>Nhập kho</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {height: 50, backgroundColor: '#f1f8ff'},
  row: {height: 50},
  text: {textAlign: 'center', margin: 'auto', fontWeight: '700'},
  table: {marginTop: 10, marginBottom: 10},
  btnXoa: {textAlign: 'center', color: 'red', fontWeight: 'bold'},
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

export default App;
