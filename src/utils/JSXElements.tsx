import { Tooltip, TooltipProps } from "react-bootstrap";

export const TooltipBtn = (props: TooltipProps, text: string) => (
    <Tooltip {...props}>
        {text}
    </Tooltip>
);