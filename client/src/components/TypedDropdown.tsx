import React, { PropsWithChildren } from 'react'
import { Dropdown, DropDownProps } from 'antd'

interface DropdownInterface extends React.FC<PropsWithChildren<DropDownProps>> {}

const TypedDropdown: DropdownInterface = Dropdown

export default TypedDropdown