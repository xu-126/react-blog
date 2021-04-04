import React, { useState } from 'react'
import { Comment, Avatar, message, Form } from 'antd'

import axios from 'axios'

import Editor from './Editor'

import servicePath from '../config/apiUrl'

const MyComment = (props) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false); 

  const handleSubmit = (values) => {
    console.log('values:',{...values});
    setSubmitting(true)
    const commentInfo = {
      ...values,
      // nickname: values.nickname,
      // phone: values.phone,
      // content: values.content,
      articleId: props.articleId,
      release_time: new Date().toLocaleDateString().split('/').join('-')
    }
    axios({
      url: servicePath.addArticleComment,
      method: 'post',
      data: commentInfo
    }).then(res => {
      const { isSuccess=false } = res.data
      if(isSuccess) {
        setSubmitting(false);
        message.success('留言成功')
        form.resetFields();
      } else {
        message.error('留言失败')
      }
    })
  };

  return (
    <div>
      <Comment
        avatar={
          <Avatar
            src="http://blogimages.jspang.com/blogtouxiang1.jpg"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onSubmit={handleSubmit}
            submitting={submitting}
            form={form}
          />
        }
      />
    </div>
  );
}

export default MyComment;