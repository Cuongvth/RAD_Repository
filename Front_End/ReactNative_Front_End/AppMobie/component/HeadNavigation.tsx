import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {BackIcon} from './Icon';
import {useNavigation, useRoute} from '@react-navigation/native';

const HeadNavigation = () => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <TopNavigation
      title={useRoute().name}
      alignment="center"
      accessoryLeft={BackAction}
    />
  );
};

export default HeadNavigation;
