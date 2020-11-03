import React from 'react';

import PageLink from './PageLink'

export default function PageList(props){
  const pages = props.pages.map(page=>{
    // ここにGridの要素とかを定義する感じ？
    // <Grid item>  とか？しらんけど．PageLinkの中身をいじっても良い．
    return (
      <PageLink
      key = {page.id}
      page= {page}
    />
    )
  });

  return(
    // ここにGridとかを定義する感じ？
    <div className="Page-list">
      {pages}
    </div>
  )
}