const SERVER_URL = "https://movie-rails.herokuapp.com/api/v1/";

async function submitNewData(body, url) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({ text:memo.text, time:memo.time})
    body: JSON.stringify(body)
  })
  return res;
  //res.json: 成功{"data": data}, 失敗{"error": error_messages}
  //res.status: 成功200, 失敗400
}

async function editData(body, url) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return res;
  //res.json: 成功{"data": data}, 失敗{"error": error_messages}
  //res.status: 成功200, 失敗404
}

async function deleteData(url) {
  const res = await fetch(url, {
    method: "DELETE"
  });
  return res;
  //res.status: 成功200, 失敗404
}


//memoのapiクラス
export class MemoDetaSource {
  constructor() {
    this.API_URL = SERVER_URL + "memos";
  }

  //ページidに対応するメモの取得
  async fetchMemos(page_id) {
    const res = await fetch(this.API_URL+`?page_id=${page_id}`);
    try {
      const json = await res.json(); //メモが空の時例外
      console.log(json);
      return json; //{"memos": (memo)の配列}
    } catch(err) {
      //例外時の処理とreturn
    }
  }

  //メモの新規作成
  async submitNewMemo(memo) {
    const res = submitNewData({text:memo.text, time:memo.time},
                              this.API_URL+`?page_id=${memo.page_id}`);
    return res;
  }

  //メモの編集
  async editMemo(memo) {
    const res = editData({text:memo.text, time:memo.time},
                          this.API_URL+'/'+memo.id);
    return res;
  }

  //メモの削除
  async deleteMemo(memo_id) {
    const res = deleteData(this.API_URL +'/' +memo_id);
    return res;
  }
}

//userのapiクラス
export class UserDataSource {
  constructor() {
    this.API_URL = SERVER_URL + "users";
  }
  
  //userのログイン
  async loginUser(user) {
    const res = await fetch(this.API_URL+'/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email:user.email})
    })
    return res;
    //res.json 成功{"user":user}
    //res.status 成功200, 失敗400
  }

  //userの新規作成
  async submitNewUser(user) {
    const res = submitNewData({name: user.name, email: user.email},
                              this.API_URL)
    return res;
  }

  //userの編集
  async editUser(user) {
    const res = editData({name: user.name, email: user.email},
                          this.API_URL+'/'+user.id);
    return res;
  }

  //userの削除
  async deleteUser(user_id) {
    const res = deleteData(this.API_URL +'/' +user_id);
    return res;
  }
}

//pageのapiクラス
export class PageDataSource {
  constructor() {
    this.API_URL = SERVER_URL + "pages";
  }

  //user.idに対応するpageのindex
  async fetchPageIndex(user_id) {
    const res = await fetch(this.API_URL+`?user_id=${user_id}`);
    try {
      const json = await res.json(); //ページが空の時例外
      console.log(json);
      return json; //{"page_list": (page, "memos": (memoの配列でサイズ2未満)  の配列)}
    } catch(err) {
      //例外時の処理とreturn
    }
  }

  //pageの取得
  async fetchPage(page_id) {
    const res = await fetch(this.API_URL+`?page_id=${page_id}`);
    return res;
    //成功 200 {"page": page,  "keywords": xxxx配列}
    //失敗：404
  }

  async submitNewPage(page) {
    const res = submitNewData({url:page.url, title:page.url},
                              this.API_URL+`?user_id=${page.user_id}`);
    return res;
  }

  //ページの編集
  async edtiPage(page) {
    const res = editData({url:page.url, title:page.url},
                          this.API_URL+'/'+page.id);
    return res;
  }

  //ページの削除
  async deletePage(page_id) {
    const res = deleteData(this.API_URL +'/' +page_id);
    return res;
  }
}