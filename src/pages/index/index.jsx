import React, { useState, useEffect } from 'react';
import CustomTable from '@/components/table';
import styles from './style.less'

const Index = () => {
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    const data = [
      {
        name: '12',
        address: '开封',
        height: '200px',
        width: '200px'
      },
      {
        name: '12',
        address: '开封',
        height: '200px',
        width: '200px'
      },
      {
        name: '12',
        address: '开封',
        height: '200px',
        width: '200px'
      }
    ]
    setDataList(data);
  }, []);
  const columns = [
    {
      title: '名称',
      sortType: 'string',
      dataIndex: 'name'
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '高度',
      dataIndex: 'height'
    },
    {
      title: '宽度',
      dataIndex: 'width'
    },
  ]
  console.log(dataList)
  return (
    <div className={styles.container}>
      <CustomTable
        columns={columns}
        dataSource={dataList}
      />
    </div>
  )
}

export default Index