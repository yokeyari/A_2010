import React from 'react';

export default function PageLink(props) {
  const page = props.page

  return (
    <div className="Page-link">
      <h4>{page.title}ほんとはページタイトル後で消す</h4>
      <div>
        ここはなにか画像？
      </div>
      <div>
        {page.body}
      </div>
    </div>
  )
}