import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Text,
} from '@ui-kitten/components';
import Manage from './Manage';
import NhaCungCap from './NhaCungCap';
import KhoHang from './KhoHang';
import NhanVien from './NhanVien';
import SanPham from './SanPham';
import NhapKhoHang from './NhapKhoHang';
import {StyleSheet} from 'react-native';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab
      title={() => <Text style={styles.bottomTab}>Quản lí</Text>}
    />
    <BottomNavigationTab
      title={() => <Text style={styles.bottomTab}>Nhập kho hàng</Text>}
    />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props: any) => <BottomTabBar {...props} />}>
    <Screen name="Quản lí" component={Manage} options={{headerShown: false}} />
    <Screen
      name="Nhập kho hàng"
      component={NhapKhoHang}
      options={{headerShown: false}}
    />
    <Screen
      name="Tất cả nhà cung cấp"
      component={NhaCungCap.ShowAll}
      options={{headerShown: false}}
    />
    <Screen
      name="Thêm nhà cung cấp"
      component={NhaCungCap.Create}
      options={{headerShown: false}}
    />
    <Screen
      name="Sửa nhà cung cấp"
      component={NhaCungCap.Edit}
      options={{headerShown: false}}
    />
    <Screen
      name="Tất cả kho hàng"
      component={KhoHang.ShowAll}
      options={{headerShown: false}}
    />
    <Screen
      name="Thêm kho hàng"
      component={KhoHang.Create}
      options={{headerShown: false}}
    />
    <Screen
      name="Sửa kho hàng"
      component={KhoHang.Edit}
      options={{headerShown: false}}
    />
    <Screen
      name="Tất cả nhân viên"
      component={NhanVien.ShowAll}
      options={{headerShown: false}}
    />
    <Screen
      name="Thêm nhân viên"
      component={NhanVien.Create}
      options={{headerShown: false}}
    />
    <Screen
      name="Sửa nhân viên"
      component={NhanVien.Edit}
      options={{headerShown: false}}
    />
    <Screen
      name="Tất cả sản phẩm"
      component={SanPham.ShowAll}
      options={{headerShown: false}}
    />
    <Screen
      name="Thêm sản phẩm"
      component={SanPham.Create}
      options={{headerShown: false}}
    />
    <Screen
      name="Sửa sản phẩm"
      component={SanPham.Edit}
      options={{headerShown: false}}
    />
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  bottomTab: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppNavigator;
