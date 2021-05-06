import React,{ useState, useEffect } from 'react';
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
import Personal from './Personal/index'
import { logout } from './service/index'
import MyAvatar from './Personal/components/MyAvatar';
import {
  getUserInfo,
  updateUserInfo
} from './Personal/service/index';


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
  const [userInfo, setUserInfo] = useState({}); // 用户个人信息

  useEffect(() => {
    getUserMessage()
  }, []);
   /**
   * 获取用户个人信息
   */
    const getUserMessage = () => {
      getUserInfo().then(res => {
        const { data } = res.data;
        setUserInfo(data[0]);
      })
    }
  
    /**
     * 更新用户相关个人信息
     */
    const updateUserMessage = (params) => {
      const data = { ...params, id: params.id }; //这个需要显示的传递id，数据库中为Id不符合传递要求
      updateUserInfo(data).then(res => {
        const { isSuccess } = res.data;
        if(isSuccess) {
          setUserInfo({...data});
          message.success('信息更新成功');
        } else {
          message.error('信息没有发生变化');
        }
      })
    }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">{`${collapsed ? 'BLOG' : 'BLOG后台管理系统'}`}</div>
        <Menu defaultSelectedKeys={['workSpace']}  mode="inline" onClick={selectHandleMenu}>
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
                天很蓝<DownOutlined />
              </span>
            </Dropdown>
            {/* <div className="header-avatar">
              { userInfo.avatar && (
                <MyAvatar imgUrl={userInfo.avatar} updateUserMessage={updateUserMessage} userInfo={userInfo}/>)
              }
            </div> */}
            <Avatar size={50} src='https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-e3311554-de59-4b07-a22c-5c29c1d9c006.png' />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{subMenu}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Route path="/index/add" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list" exact component={ArticleList} />
              <Route path="/index/comment/" exact component={CommentsList} />
              <Route path="/index/personal/" exact component={Personal} />
              <Route path="/index/" exact component={AddArticle} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>System ©2021 Created by Jiaying Xu</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex;
