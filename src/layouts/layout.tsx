import { Input } from 'antd';
import React from 'react';
// return React.ReactNode[]
export const ActionComponent = (prop: any): React.ReactNode[] => {
    console.log(prop);
    return [
        <Input.Search
            key="search"
            style={{
                width: 200,
            }}
        />,
    ];
};
