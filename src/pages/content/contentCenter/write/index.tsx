import React, { useState, useEffect } from "react";
import { Comment, Avatar, List, message } from "antd";
import moment from "moment";

import api from "@api/api-ins";
import MyComment from "@components/comment";
import style from "./style.module.less";

export default () => {
  const [list, setList] = useState<Array<object>>();

  useEffect(() => {
    getList();
  }, []);

  //提交评论
  const onSubmit = async (msg: string, callBack: Function) => {
    const res: any = await api.msgBoard.save.req({ msg: msg, token: "" });
    if (res.status === 200) {
      message.success("评论成功");
      getList();
      callBack();
    }
  };
  //获取评论列表
  const getList = async () => {
    const res: any = await api.msgBoard.list.req();
    if (res.status === 200) {
      setList(res.data);
    }
  };

  return (
    <div className={`card ${style.write}`}>
      <MyComment onSubmit={onSubmit} />
      <List
        dataSource={list}
        renderItem={(item: any) => (
          <li>
            <Comment
              author={<span>@{item.name}</span>}
              avatar={<Avatar src={item.headImg} alt={item.name} />}
              content={<p>{item.msg}</p>}
              datetime={<span>{moment(item.createTime).fromNow()}</span>}
            >
              {item.msg === "1111" && (
                <Comment
                  author={<span>{item.name}</span>}
                  avatar={<Avatar src={item.headImg} alt={item.name} />}
                  content={<p>{item.msg}</p>}
                  datetime={<span>{moment(item.createTime).fromNow()}</span>}
                />
              )}
            </Comment>
          </li>
        )}
      ></List>
    </div>
  );
};
