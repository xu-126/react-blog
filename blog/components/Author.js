import { Avatar, Divider } from 'antd'
import { YoutubeOutlined, GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import '../styles/components/author.css'

const Author =()=>{

  return (
    <div className="author-div comm-box">
      <div className='avatar'> 
        <Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg"  />
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