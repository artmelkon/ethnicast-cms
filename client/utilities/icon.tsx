import React from "react";
import IconMoon, { IconProps } from "react-icomoon";
import iconSet from "selection/icon";

const Icon = (props: IconProps) => <IconMoon iconSet={iconSet} {...props} />;

export default Icon;
