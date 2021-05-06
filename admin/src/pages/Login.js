import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button ,Spin, message } from 'antd';
import { UserOutlined, KeyOutlined ,UnlockTwoTone, SmileTwoTone } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import '../static/css/Login.css';
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props){
  const [userName , setUserName] = useState('')
  const [password , setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false) 

  const checkLogin = ()=>{
    setIsLoading(true)
    if(!userName){
      message.error('用户名不能为空')
      setTimeout(() => {
        setIsLoading(false)
      },500)
      return false
    } else if(!password){
      message.error('密码不能为空')
      setTimeout(() => {
        setIsLoading(false)
      },500)
      return false
    }
    let dataProps = {
      'userName': userName,
      'password': password
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true   // 前后端共享 session
    }).then(res => {
      console.log('---------res----------',res);
      setIsLoading(false)
      if (res.data.data === '登录成功'){
        console.log('----res.data',res.data);
        localStorage.setItem('openId',res.data.openId)
        props.history.push('/index') // 页面跳转
      } else{
          message.error('用户名密码错误')
      }
    })

    setTimeout(() => {
      setIsLoading(false)
    },1000)
  }

  const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  );
  const HeartIcon = props => <Icon component={HeartSvg} {...props} />;

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="欢迎登录后台系统" bordered={true} style={{ width: 400 }} >
          <Input
            id="userName"
            size="large"
            placeholder="请输入用户名"
            prefix={<SmileTwoTone />}
            onChange={(e)=>{setUserName(e.target.value)}}
          /> 
          <br/><br/>
          <Input.Password
            id="password"
            size="large"
            placeholder="请输入密码"
            prefix={<UnlockTwoTone />}
            onChange={(e)=>{setPassword(e.target.value)}}
          />     
          <br/><br/>
          <Button type="ghost" size="large" block onClick={checkLogin} icon={<HeartIcon style={{ color: 'hotpink' }} />
}> 登录 </Button>
        </Card>
      </Spin>
  </div>
  )
}
export default Login