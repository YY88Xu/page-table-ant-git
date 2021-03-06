import PageTable from './PageTable/PageTable'
import React, {useState} from 'react';
import { Button } from 'antd';
const BasePageTable = ()=>{
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
          },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: '爱好',
            dataIndex: 'hobbies',
            key: 'hobbies',
          },
          {
              title: '操作',
              key: 'action',
              render: (record)=><a onClick={(e)=>{e.stopPropagation();alertMsg(record)}}>提示</a>
          }
    ];
    const [params, setParams] = useState({});
    const [url, setUrl] = useState("http://localhost:8081/pageTable/v1/famousInfo");
    const [pageInfo, setPageInfo] = useState({current: 2, pageSize: 3})
    const onSelectChange = (val, row)=>{
        console.log(val, row);
    }
    const alertMsg = (record)=>{
        alert(record.name);
    }
    const search=()=>{
        setParams({
            address: '韩国'
        });
        // setPageInfo({
        //     current: 1, pageSize: 10
        // })
    }

    return (
        <div>
            <Button onClick={search}>search</Button>
            <PageTable url={url} 
            type="radio" columns={columns} params={params}
            rowKey="id"  pageInfo={pageInfo}
            onSelectChange={onSelectChange}/>
        </div>
    )
}

export default BasePageTable;