import React from 'react'
import { Tooltip, Button, ButtonProps } from 'antd'
import { TooltipPropsWithTitle } from 'antd/lib/tooltip'

interface HintProps {
  tooltipProps: TooltipPropsWithTitle
  buttonProps: ButtonProps
}

const Hint: React.FC<HintProps> = ({ tooltipProps, buttonProps }) => (
  <Tooltip {...tooltipProps} destroyTooltipOnHide={{ keepParent: false }}>
    <Button {...buttonProps} />
  </Tooltip>
)

export default Hint