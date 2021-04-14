import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Affix, Breadcrumb, BackTop, Pagination } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';

import axios from 'axios'
import moment from 'moment'

import marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import servicePath from '../config/apiUrl'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import ViewRank from '../components/ViewRank'
import Footer from '../components/Footer'

import '../styles/pages/list.css'

const MyList = (list) => {
  const [ mylist , setMylist ] = useState(list.data.data)
  const renderer = new marked.Renderer()
  
  // 重新渲染页面
  useEffect(() => {
    setMylist(list.data.data)
  }, [list.id])

  marked.setOptions({
    renderer: renderer, // 可以通过自定义的Renderer渲染出自定义的格式
    gfm:true, // 启动类似与github样式的markdown
    pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误
    sanitize: false, // 原始输出，忽略HTML标签
    tables: true, // 支持github形式的表格，使用时必须打开gfm选项
    breaks: false, // 支持github换行符，使用时必须打开gfm选项
    smartLists: true, // 优化列表输出，使你的样式更好看一些
    smartypants: false,
    highlight: function (code) { // 代码高亮显示规则
            return highlightjs.highlightAuto(code).value;
    }
  })

  // 分页查询页面改变事件
  const pageHandleChange = async (pageNo, pageSize) => {
    const res = await axios({
      url: servicePath.getListById,
      method: 'post',
      data: {
        id: list.id,
        pageNo,
        pageSize,
      }
    })
    setMylist(res.data.data);
  }

  return (
    <div>
      <BackTop />
      <Head>
        <title>List</title>
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={13}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{mylist ? mylist[0].typeName : '暂无该类别文章'}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List 
            header={<div className="list-header">最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detail', query: {id: item.id} }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined /> {moment(item.release_time).format('YYYY-MM-DD')}</span> 
                  <span><FolderOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.visit_count} 人</span>
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                ></div>
              </List.Item>
            )}
          />
          <Pagination
            defaultCurrent={1}
            pageSize={list.data.pageSize}
            total={list.data.total}
            onChange={pageHandleChange}
            style={{ float: 'right', marginRight: '50px' }}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={6} xl={5}>
          <Author />
          <Advert />
          <ViewRank />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

MyList.getInitialProps = async(context) => {
  const { id } = context.query // 获取上层页面跳转传递的id

  const promise = new Promise((resolve) => {
    axios({
      url: servicePath.getListById,
      method: 'post',
      data: {
        id,
        pageNo: 1,
        pageSize: 6
      }
    })
    .then((res) => {
      resolve(res.data)
    })
  })

  return {
    id,
    data: await promise
  }
}

export default MyList
