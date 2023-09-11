import {Icon, IconElement} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export const BackIcon = (): IconElement => (
  <Icon style={styles.icon} name="arrow-ios-back-outline" />
);

export const ShowAllIcon = (): IconElement => (
  <Icon style={styles.iconMenu} name="list-outline" />
);

export const AddIcon = (): IconElement => (
  <Icon style={styles.iconMenu} name="plus-circle-outline" />
);

export const EditIcon = (): IconElement => (
  <Icon style={styles.iconMenu} name="edit-outline" />
);

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  iconMenu: {
    width: 15,
    height: 15,
  },
});
