import React,{ useState } from 'react';
import '../static/css/AdminIndex.css';
import { Layout, Menu, Breadcrumb, Dropdown, message, Avatar} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  ReadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Route } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import CommentsList from './CommentsList'
import { logout } from './service/index'

const { Header, Content, Footer, Sider } = Layout;

const AdminIndex = (props) => {
  const [collapsed, setCollapsed] = useState(false); // menu菜单闭合
  const [subMenu, setSubMenu] = useState('工作台'); // 子menu名称

  // 底部控制导航菜单的闭合
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  // 头部控制导航菜单的闭合
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // 菜单选择路由跳转函数
  const selectHandleMenu = (e) => {
    switch(e.key) {    
      case 'articleList':
        props.history.push('/index/list/');
        setSubMenu('文章管理');
        break;
      case 'comment':
        props.history.push('/index/comment/');
        setSubMenu('留言管理');
        break;
      case 'personal':
        props.history.push('/index/personal/');
        setSubMenu('个人管理');
        break;
      default:
        props.history.push('/index/');
        setSubMenu('工作台');
    }
  }

  // 退出登录
  const myLogout = () => {
    logout().then(res => {
      const { isSuccess } = res.data;
      if(isSuccess) {
        message.success('登出成功');
        props.history.push('/');
      } else {
        message.error('登出失败');
      }
    });
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={myLogout}>
        <LogoutOutlined /> 退出
      </Menu.Item>
    </Menu>
  );


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu defaultSelectedKeys={['workSpace']} mode="inline" onClick={selectHandleMenu}>
          <Menu.Item key="workSpace">
            <DesktopOutlined />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="comment">
            <MessageOutlined />
            <span>留言管理</span>
          </Menu.Item>
          <Menu.Item key="articleList">
            <ReadOutlined />
            <span>文章管理</span>
          </Menu.Item>
          <Menu.Item key="personal">
            <UserOutlined />
            <span>个人管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="header-left">
          {
            collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: '26px'}} onClick={toggle} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: '26px' }} onClick={toggle} />
            )
          }
          </div>
          <div className="header-right">
            <Dropdown overlay={menu} placement="bottomLeft">
              <span className="header-nickname">
                胖胖<DownOutlined />
              </span>
            </Dropdown>
            <Avatar src="http://blogimages.jspang.com/blogtouxiang1.jpg" size={45} />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{subMenu}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/add" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list" exact component={ArticleList} />
              <Route path="/index/comment/" exact component={CommentsList} />
              <Route path="/index/personal/" exact component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>System ©2021 Created by Jiaying Xu</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex;
