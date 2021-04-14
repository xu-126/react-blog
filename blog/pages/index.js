import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, List, BackTop, Affix, Pagination } from 'antd';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons'
import '../styles/pages/index.css'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import ViewRank from '../components/ViewRank'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Home = (list) =>  {
  
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 

  console.log(list)
  //---------主要代码-------------start
  const [ mylist , setMylist ] = useState(list.data);

    // 分页查询页面改变事件
    const pageHandleChange = async (pageNo, pageSize) => {
      const res = await axios({
        url: servicePath.getArticleList,
        method: 'post',
        data: {
          pageNo,
          pageSize
        }
      })
      setMylist(res.data.data);
    }
  return (
    <>
      <BackTop />
      <Head>
        <title>Home</title>
      </Head>
      <Affix offsetTop={0}>
        <Header/>
      </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>    
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname: '/detailed', query:{id: item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                    {/* {item.title} */}
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined />{item.release_time}</span>
                    <span><FolderOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.visit_count}人</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                  /> 
                </List.Item>
              )}
            />    
          </div>
          <Pagination
            defaultCurrent={1}
            total={list.total}
            pageSize={list.pageSize}
            onChange={pageHandleChange}
            // hideOnSinglePage
            style={{ float: 'right', marginRight: '50px' }}
          />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={6} xl={5}>
          <Author />
          <Advert />
          <ViewRank />
        </Col>
        <Footer />
      </Row>
  </>
  )
}

Home.getInitialProps = async(context) => {
  const promise = new Promise((resolve, reject) => {
    axios({
      url: servicePath.getArticleList,
      method: 'post',
      data: {
        pageNo: 1,
        pageSize: 6
      }
    })
    .then((res) => {
      resolve(res.data)
    })
  })

  return await promise
}

export default Home
