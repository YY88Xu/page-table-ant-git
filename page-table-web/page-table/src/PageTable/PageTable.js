import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  Table,
  message
} from 'antd';
import {
  getData
} from '../util/fetchData';
import {isEqual} from '../util/common'

const PageTable = (props) => {
  const abortControllerRef = useRef(new AbortController());
  // props 传入数据初始化
  const {
    url,
    columns,
    isPagination,
    params,
    type,
    pageInfo
  } = props;
  let {
    rowKey
  } = props;

  if (rowKey === undefined) {
    rowKey = 'ROW_ID';
  }

  //是否有分页
  let isPaginationTmp;
  if (isPagination === false) {
    isPaginationTmp = isPagination;
  } else {
    isPaginationTmp = true;
  }

  //持有的 state
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pageOpitons, setPageOptions] = useState({
    current: pageInfo && pageInfo.current ?  pageInfo.current : 1,
    pageSize: pageInfo && pageInfo.pageSize ? pageInfo.pageSize : 8
  });
  const [tableTotal, setTableTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);



  //取消请求
  useEffect(() => {
    return () => abortControllerRef.current.abort()
  }, []);

  useEffect(()=>{
    if(pageInfo && !isEqual(pageInfo, pageOpitons)){
      setPageOptions({
        current: pageInfo.current,
        pageSize: pageInfo.pageSize
      })
    }
  }, [pageInfo]);


  // 数据变化时发出请求
  useEffect(() => {
    setLoading(true);
    let query = {};
    if (isPaginationTmp) {
      Object.assign(query, params, pageOpitons);
    }
    getData(url, query, {
      signal: abortControllerRef.current.signal
    }).then(res => {
      if (res.success) {
        let result = res.data.list;
        if (Array.isArray(result)) {
          setDataSource(result.map((item, key) => {
            item['ROW_ID'] = key;
            return item;
          }));
        } else {
          result['ROW_ID'] = "1";
          const arr = [];
          arr.push(result);
          setDataSource(arr);
        }
        setTableTotal(res.data.total);
        setLoading(false);
      } else {
        message.error(res.msg);
      }
    }).catch(e => {
      console.log(e);
    })
  }, [url, params, pageOpitons]);



  // 分页
  const changePageOptions = (pagination, filters, sorter) => {
    if (pagination && pagination.current && pagination.pageSize) {
      setPageOptions({
        current: pagination.current,
        pageSize: pagination.pageSize
      })
    }
  };

  // check radio 勾选相关
  const isHad = (selectedRowKeys, key) => {
    let flag = false;
    for (let item of selectedRowKeys) {
      if (item === key) {
        flag = true;
      }
    }
    return flag;
  };

  //checkbox
  const onSelectChange = selectedRowKeys => {
    //有checkbox或者radio必须有rowKey
    const {
      rowKey
    } = props;
    const selectedRows = dataSource.filter(item => isHad(selectedRowKeys, item[rowKey]));
    setSelectedRowKeys(selectedRowKeys);
    const {
      onSelectChange
    } = props;
    onSelectChange(selectedRowKeys, selectedRows);
  };
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
    type: type, //checkbox  radio
    columnWidth: 30
  };

  //点击某一行
  const onRowClick = (record) => {
    const {
      rowKey,
      type
    } = props;
    const selKeys = selectedRowKeys.slice(0);
    if (selKeys.indexOf(record[rowKey]) >= 0) {
      selKeys.splice(selKeys.indexOf(record[rowKey]), 1);
    } else {
      if (type === 'radio') {
        //单选清空
        selKeys.splice(0, selKeys.length);
      }
      selKeys.push(record[rowKey]);
    }
    const selectedRows = dataSource.filter(item => isHad(selKeys, item[rowKey]));
    setSelectedRowKeys(selKeys);
    const {
      onSelectChange
    } = props;
    onSelectChange(selKeys, selectedRows);
  };

  return (
    type ?
    <Table
           onRow={record => {
             return {
               onClick: event => {
                 onRowClick(record);
               },
             };
           }}
           onChange={changePageOptions}
           rowSelection={rowSelection}
           pagination={
             isPaginationTmp ?
               {
                 current: pageOpitons.current,
                 pageSize: pageOpitons.pageSize,
                 total: tableTotal,
                 showTotal: total => `共 ${total} 条数据`,
                 showSizeChanger: true
               }: false
           }
           loading = {isLoading}
           columns={columns} dataSource={dataSource}  rowKey={ rowKey } 
    />
      :
    <Table
        onRow={record => {
          return {
            onClick: event => {
              onRowClick();
            },
          };
        }}
        onChange={changePageOptions}
        pagination={
          isPaginationTmp ?
            {
              current: pageOpitons.current,
              pageSize: pageOpitons.pageSize,
              total: tableTotal,
              showTotal: total => `共 ${total} 条数据`,
              showSizeChanger: true
            }: false
        }
        loading = {isLoading}
        columns={columns} dataSource={dataSource}  rowKey={ rowKey } 
      />
  )

}

export default PageTable;