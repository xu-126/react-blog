import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Switch, Select} from 'antd';
import axios from 'axios'
import {
  getArticleList,
  deleteArticle,
  getTypeInfo,
  getArticleByTypeId
} from './service';
import  servicePath  from '../config/apiUrl'

const { confirm } = Modal;
const { Option } = Select;

function ArticleList(props){
  const [list,setList]=useState([])
  const [articleTypeList, setArticleTypeList] = useState([]); // 文章类型
  const [selectType, setSelectType] = useState(''); // 文章类型

  //得到文章列表
  const getList = ()=>{
    getArticleList().then(res => {
      setList(res.data.list);
    });
  }
  
  // 获取文章类型信息列表
  const getTypeMessage = () =>{
    getTypeInfo().then(res => {
      const {data} = res.data;
      setArticleTypeList(data);
    })
  }

  // 选择展示相应类型的文章
  const handleSelect = (value) => {
    console.log('value',value,'data');
    if(value) {
      getArticleByTypeId(value).then(res => {
        const { data } = res.data;
        setSelectType(value);
        setList(data);
        console.log('value',value,'data', data);

      })
    } else {
      setSelectType('请选择文章类型');
      getList();
    }    
  }

  useEffect(() => {
    getList()
    getTypeMessage()
  }, [])

  //删除文章的方法
  const delArticle = (e,id)=>{
    e.stopPropagation();
    e.preventDefault()
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk() {
        axios(servicePath.delArticle+id,{ withCredentials: true}).then(
            res=>{ 
                message.success('文章删除成功')
                getList()
            }
            )
        // deleteArticle(id).then(res => {
        //   message.success('文章删除成功');
        //   // 如果前台并发量比较大的时候，尽量使用使用修改数组值的方式而不是再去数据库中进行查找
        //   getList();
        // })
      },
      onCancel() {
          message.success('没有任何改变')
      },
    });
  }

  //修改文章
  const updateArticle = (e,id,checked)=>{
    e.stopPropagation();
    e.preventDefault()
    props.history.push('/index/add/'+id)
  }

  return (
      <div>
          <div className="artical-heard">
            <Select allowClear placeholder='请选择文章类型' style={{ width: '150px' }} size="middle" onChange={handleSelect}>
              {articleTypeList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.typeName}
                </Option>
              ))}
            </Select>
            <Button type="primary" size="middle" style={{ float: 'right' }} onClick={() => props.history.push('/index/add/')}>添加文章</Button>
          </div>
           <List
              header={
                  <Row className="list-div">
                      <Col span={6}>
                          <b>标题</b>
                      </Col>
                      <Col span={4}>
                          <b>类别</b>
                      </Col>
                      <Col span={6}>
                          <b>发布时间</b>
                      </Col>
                      {/* <Col span={3}>
                          <b>集数</b>
                      </Col> */}
                      <Col span={4}>
                          <b>浏览量</b>
                      </Col>

                      <Col span={4}>
                          <b>操作</b>
                      </Col>
                  </Row>

              }
              bordered
              dataSource={list}
              renderItem={item => (
                  <List.Item>
                      <Row className="list-div">
                          <Col span={6}>
                              {item.title}
                          </Col>
                          <Col span={4}>
                           {item.typeName}
                          </Col>
                          <Col span={6}>
                              {item.release_time}
                          </Col>
                          {/* <Col span={3}>
                              共<span>{item.part_count}</span>集
                          </Col> */}
                          <Col span={4}>
                            {item.visit_count}
                          </Col>

                          <Col span={4}>
                            <Button type="primary" onClick={(e) => updateArticle(e,item.id)}>修改</Button>&nbsp;

                            <Button onClick={(e) => delArticle(e,item.id)}>删除 </Button>
                          </Col>
                      </Row>

                  </List.Item>
              )}
              />

      </div>
  )

}

export default ArticleList