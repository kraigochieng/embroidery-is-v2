import React from "react";

export default function menuItem(label: React.ReactElement<HTMLAnchorElement> | string, key: string, children: MenuItem[] | null): MenuItem {
    return {
        label,
        key,
        children
    }
}