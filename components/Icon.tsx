import React, { FC } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

interface Props {
  iconName?: string;
}

const Icon: FC<Props> = ({ iconName }) => {
  const icon: ImageSourcePropType | null = iconName
    ? require(`../assets/images/${iconName}.svg`)
    : null;

  return (
    <View>
      {icon && <Image source={icon} />}
    </View>
  );
};

export default Icon;
