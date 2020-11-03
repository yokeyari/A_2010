import React from "react";

class PostMemos extends React.Component{

    render() {
        const memos = ["exciting!!","orz","wwwwww"];
        const listItems = memos.map((memo) =>
          <li>{memo}</li>
        );
        return(
            <div>
              <ul>{listItems}</ul>
            </div>
        )
    }
  }
  
  export default PostMemos;
  