import React from 'react';
import { View, useColorScheme } from 'react-native';
import * as Icons from '../assets/icons/';
import { IconName } from '../@types/icon';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name = 'Add', size = 32, color }: IconProps) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" não encontrado`);
    return null;
  }

  const colorScheme = useColorScheme() || 'light';
  const colorName = color || (colorScheme === 'dark' ? 'white' : 'black');

  return (
    <View>
      <IconComponent width={size} height={size} style={{ color: colorName }} />
    </View>
  );
};

export default Icon;
