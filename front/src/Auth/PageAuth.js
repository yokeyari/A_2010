import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { UserInfoContext } from '../context';
import Main from '../Main/Main';
import Transition from "../Transition";
import Loading from "../Loading";
import { PageDataSource, MemoDataSource, BertDataSource } from '../Main/ProductionApi';
import { PinDrop } from '@material-ui/icons';

const pageDataSource = new PageDataSource();
const MemoAPI = new MemoDataSource();
const PageApi = new PageDataSource();
const BertApi = new BertDataSource();

export default function PageAuth(props) {
  const [page, setPage] = useState({ id: "" });
  const { token, user_id, page_id } = useParams();
  const { userInfo } = useContext(UserInfoContext);


  const mode = props.mode;

  useEffect(() => {
    if (mode == "user") {
      if (page_id) {
        pageDataSource.getPage(page_id)
          .then(res => {
            // console.log("page id  res", res)
            if (res.statusText == "OK") {
              res.json()
                .then(page => {
                  // console.log("getPage", page);
                  setPage(page);
                })
            } else {

            }
          });
      }
    } else {
      if (token) {
        pageDataSource.getPageByToken(token)
          .then(res => {
            // console.log("token res", res)
            if (res.statusText == "OK") {
              res.json()
                .then(page => {
                  // console.log("getPage", page);
                  setPage(page);
                })
            } else {

            }
          });
      }
    }
  }, [token, page_id, user_id]);



  if (page.id == "") {
    return <Loading open={true} />
  } else {
    if (mode == "user") {
      return (
        <Main mode="user" page_id={page.id} />
      )
    } else if (mode == "token") {
      return (
        <Main mode="token" token={token} page_id={page.id} />
      )
    }
  }
}

