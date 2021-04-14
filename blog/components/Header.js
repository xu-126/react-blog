import React,{ useState, useEffect } from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu } from 'antd'
import {
  HomeOutlined,
  SmileOutlined,
  HighlightOutlined,
  ContainerOutlined,
  LayoutOutlined
} from '@ant-design/icons';
import {useRouter} from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
  const [navArr, setNavArr] = useState([])
  const router = useRouter();

//跳转到列表页
  const handleClick = (e)=>{
    if(e.key === '0'){
      router.push('/index')
    }else{
      console.log('list:',e.key);
      router.push('/list?id='+e.key)
    }
  }

  useEffect(() => {
    // 获取文章类别信息
    const fetchData = async () => {
      await axios(servicePath.getTypeInfo).then(res => {
        const data = res.data.data
        setNavArr(data)
      })
    }
    fetchData()
  }, [])

  // 获取相应的类别图标
  const getIcon = (text) => {
    switch(text) {
      case 'LayoutOutlined':
        return <LayoutOutlined />
      case 'ContainerOutlined':
        return <ContainerOutlined />
      case 'SmileOutlined':
        return <SmileOutlined />
      case 'HighlightOutlined':
        return <HighlightOutlined />
      default: 
        return <HomeOutlined />
    }
  }


  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">
            <Link href={{pathname:'/index'}}>
              <a> 技术胖</a>
            </Link>
          </span>
          <span className="header-txt">专注前端开发,每年100集免费视频。</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={8}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <HomeOutlined />
              首页
            </Menu.Item>
            {
              navArr.map(item => {
                return (
                  <Menu.Item key={item.id}>
                    {getIcon(item.iconType)}
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
  </div>
 )
}

export default Header