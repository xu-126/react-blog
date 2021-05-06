import React from 'react'
import Head from 'next/head'
import {Row, Col , Affix, Breadcrumb  } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';
import axios from 'axios'
import moment from 'moment'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import MyComment from '../components/MyComment'
import Footer from '../components/Footer'
import '../styles/pages/detailed.css'

// import ReactMarkdown from 'react-markdown'
// import MarkNav from 'markdown-navbar';
// import 'markdown-navbar/dist/navbar.css';

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from '../components/tocify.tsx'; // 菜单栏

import  servicePath  from '../config/apiUrl'

const Detailed = (props) => {

  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  // ### 文章段落标题展示
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix">
              <h${level}>${text}</h${level}>
            </a>\n`;
  };
  
  marked.setOptions({
    renderer: renderer,  // 自定义菜单渲染
    gfm: true,         // 是否保持github样式
    pedantic: false,  // markdown 容错
    sanitize: false,  // 元素输出 不忽略html
    tables: true,    
    breaks: false,    // 是否支持换行符 
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;   // 自动检测
    }
  }); 

  let html = marked(props.content)
  
  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href={`/list?id=${props.typeId}`}>{props.typeName}</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                  {props.title}
                </div>

                <div className="list-icon center">
                  <span><CalendarOutlined />{moment(props.release_time).format('YYYY-MM-DD')}</span>
                  <span><FolderOutlined />{props.typeName}</span>
                  <span><FireOutlined />{props.visit_count}人</span>
                </div>

                <div className="detailed-content" 
                  dangerouslySetInnerHTML={{__html: html}}
                >
                </div>

             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {
                tocify && tocify.render()
              }
            </div>
          </Affix>
        </Col>
      </Row>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={13}>
          <MyComment articleId={props.id} />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={6} xl={5}></Col>
      </Row>
      <Footer/>

   </>
  )
}

Detailed.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios(servicePath.getArticleById + id).then(
      (res)=>{
        // console.log('title...', title)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed;