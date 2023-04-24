import React from 'react';
import { View } from 'react-native';
import * as Icons from '../assets/icons/'

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({ name = "Add", size = 32, color = "black" }: Props) {

  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" não encontrado`);
    
    return null;
  }

  return (
    <View>
      <IconComponent width={size} height={size} fill={color} />
    </View>
  )
}
