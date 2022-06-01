import React, { PropsWithChildren } from 'react'
import { Collapse, CollapseProps } from 'antd'
import { CollapsePanelProps } from 'antd/lib/collapse/CollapsePanel'

interface CollapseInterface extends React.FC<PropsWithChildren<CollapseProps>> {
  Panel: React.FC<PropsWithChildren<CollapsePanelProps>>
}

const TypedCollapse: CollapseInterface = Collapse

export default TypedCollapse