import React from "react";
import { Link } from 'react-router-dom';
import { Tab } from "@mui/material";

interface LinkTabProps {
  label: string;
  to: string;  // Changing `href` to `to` for clarity and consistency with `Link` usage
}

// Using Link as component requires forwarding ref due to how MUI manages refs for its components
const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<LinkTabProps, 'label'>>((props, ref) => (
    <Link ref={ref as React.RefObject<HTMLAnchorElement>} {...props} />
));

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component={LinkBehavior}  // Using the custom LinkBehavior to handle ref forwarding
            label={props.label}
            to={props.to}  // Passing `to` directly to `LinkBehavior`
            value={props.to}  // Ensuring the value matches the `to` prop for selection logic in `Tabs`
        />
    );
}

export default LinkTab;
