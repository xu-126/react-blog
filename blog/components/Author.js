import { Avatar, Divider } from 'antd'
import { YoutubeOutlined, GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import '../styles/components/author.css'

const Author =()=>{

  return (
    <div className="author-div comm-box">
      <div className='avatar'> 
        <Avatar size={100} src='https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-e3311554-de59-4b07-a22c-5c29c1d9c006.png' />
      </div>
      <div className="author-introduction">
      因为美好的东西都是免费的，比如水、阳光和空气，所以本站视频全部免费。
        <Divider>社交账号</Divider>
        <Avatar size={26} icon={<YoutubeOutlined />}  className="account" />
        <Avatar size={26} icon={<GithubOutlined />} className="account"  />
        <Avatar size={26} icon={<QqOutlined />}  className="account" />
        <Avatar size={26} icon={<WechatOutlined />}  className="account"  />
      </div>
    </div>
  )

}

export default Author;