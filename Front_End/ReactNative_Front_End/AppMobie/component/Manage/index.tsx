import React from 'react';
import {
  Divider,
  Drawer,
  DrawerGroup,
  DrawerItem,
  IndexPath,
} from '@ui-kitten/components';
import HeadNavigation from '../HeadNavigation';
import {AddIcon, EditIcon, ShowAllIcon} from '../Icon';

const DrawerSimpleUsageShowcase = ({navigation}: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <>
      <HeadNavigation></HeadNavigation>
      <Divider />
      <Drawer
        selectedIndex={selectedIndex}
        onSelect={index => {
          setSelectedIndex(index);
          switch (index.section) {
            case 0:
              switch (index.row) {
                case 0:
                  navigation.navigate('Tất cả nhà cung cấp');
                  break;
                case 1:
                  navigation.navigate('Thêm nhà cung cấp');
                  break;
                case 2:
                  navigation.navigate('Sửa nhà cung cấp');
                  break;
                default:
                  break;
              }
              break;
            case 1:
              switch (index.row) {
                case 0:
                  navigation.navigate('Tất cả kho hàng');
                  break;
                case 1:
                  navigation.navigate('Thêm kho hàng');
                  break;
                case 2:
                  navigation.navigate('Sửa kho hàng');
                  break;
                default:
                  break;
              }
              break;
            case 2:
              switch (index.row) {
                case 0:
                  navigation.navigate('Tất cả nhân viên');
                  break;
                case 1:
                  navigation.navigate('Thêm nhân viên');
                  break;
                case 2:
                  navigation.navigate('Sửa nhân viên');
                  break;
                default:
                  break;
              }
              break;
            case 3:
              switch (index.row) {
                case 0:
                  navigation.navigate('Tất cả sản phẩm');
                  break;
                case 1:
                  navigation.navigate('Thêm sản phẩm');
                  break;
                case 2:
                  navigation.navigate('Sửa sản phẩm');
                  break;
                default:
                  break;
              }
              break;
            default:
              break;
          }
        }}>
        <DrawerGroup title="Nhà cung cấp">
          <DrawerItem title="Xem tất cả" accessoryLeft={ShowAllIcon} />
          <DrawerItem title="Thêm nhà cung cấp" accessoryLeft={AddIcon} />
          <DrawerItem title="Sửa nhà cung cấp" accessoryLeft={EditIcon} />
        </DrawerGroup>
        <DrawerGroup title="Kho hàng">
          <DrawerItem title="Xem tất cả" accessoryLeft={ShowAllIcon} />
          <DrawerItem title="Thêm kho hàng" accessoryLeft={AddIcon} />
          <DrawerItem title="Sửa kho hàng" accessoryLeft={EditIcon} />
        </DrawerGroup>
        <DrawerGroup title="Nhân viên">
          <DrawerItem title="Xem tất cả" accessoryLeft={ShowAllIcon} />
          <DrawerItem title="Thêm nhân viên" accessoryLeft={AddIcon} />
          <DrawerItem title="Sửa nhân viên" accessoryLeft={EditIcon} />
        </DrawerGroup>
        <DrawerGroup title="Sản phẩm">
          <DrawerItem title="Xem tất cả" accessoryLeft={ShowAllIcon} />
          <DrawerItem title="Thêm sản phẩm" accessoryLeft={AddIcon} />
          <DrawerItem title="Sửa sản phẩm" accessoryLeft={EditIcon} />
        </DrawerGroup>
      </Drawer>
    </>
  );
};

export default DrawerSimpleUsageShowcase;
