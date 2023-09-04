import React from 'react'
import { Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function Loading() {
  return (
    <Space direction='vertical' style={{display: 'block'}} >
        <LoadingOutlined/>
        <p>Loading...</p>
    </Space>
  )
}
