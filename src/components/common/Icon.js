import React from 'react';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconFa5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

export const Icon = ({ icon, type, size = 28, style, color='#fff' }) => {
  switch (type) {
    case 'ion': return <IconIon name={icon} size={size} color={color} style={style} />
    case 'fa': return <IconFa name={icon} size={size} color={color} style={style} />
    case 'fa5': return <IconFa5 name={icon} size={size} color={color} style={style} />
    default: return <IconMaterial name={icon} size={size} color={color} style={style} />
  }
};

export default Icon;