import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const HomeIcon = ({ size = 24, color }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill={color} d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3z" />
  </Svg>
);

export const UserIcon = ({ size = 26, color }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5z"
    />
  </Svg>
);

export const ToolIcon = ({ size = 26, color }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill={color} d="M14.7 6.3l3 3L8 19H5v-3zM17 3l4 4-2.3 2.3-4-4z" />
  </Svg>
);
