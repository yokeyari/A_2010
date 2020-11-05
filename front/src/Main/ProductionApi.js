const SERVER_URL = "https://movie-rails.herokuapp.com/api/v1/";

async function createData(body, url) {
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

async function updateData(body, url) {
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
  API_URL = SERVER_URL + "memos";
  constructor() {
  }

  //ページidに対応するメモの取得
  async getMemoIndex(page_id) {
    const res = await fetch(this.API_URL + `?page_id=${page_id}`);
    try {
      const json = await res.json(); //メモが空の時例外
      console.log(json);
      return json; //{"memos": (memo)の配列}
    } catch (err) {
      //例外時の処理とreturn
    }
  }

  //メモの新規作成
  async createMemo(memo) {
    const res = createData({ text: memo.text, time: memo.time },
      this.API_URL + `?page_id=${memo.page_id}`);
    return res;
  }

  //メモの更新
  async updateMemo(memo) {
    const res = updateData({ text: memo.text, time: memo.time },
      this.API_URL + '/' + memo.id);
    return res;
  }

  //メモの削除
  async deleteMemo(memo) {
    const res = deleteData(this.API_URL + '/' + memo.id);
    return res;
  }
}

//userのapiクラス
export class UserDataSource {
  API_URL = SERVER_URL + "users";
  constructor() {
  }

  //userのログイン
    async loginUser(user) {
    const res = await fetch(this.API_URL + '/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email })
    })
    return res;
    //res.json 成功{"user":user}
    //res.status 成功200, 失敗400
  }

  async getUser(user_id) {
    const res = await fetch(this.API_URL+'/'+user_id);
    return res;
    //成功 200 {"user":user}
    //失敗：404
  }

  //userの新規作成
    async createUser(user) {
    const res = createData({ name: user.name, email: user.email },
      this.API_URL)
    return res;
  }

  //userの更新
    async updateUser(user) {
    const res = updateData({ name: user.name, email: user.email },
      this.API_URL + '/' + user.id);
    return res;
  }

  //userの削除
    async deleteUser(user) {
    const res = deleteData(this.API_URL + '/' + user.id);
    return res;
  }
}

//pageのapiクラス
export class PageDataSource {
  API_URL = SERVER_URL + "pages";
  constructor() {
  }

  //userに対応するpageのindex
    async getPageIndex(user) {
    const res = await fetch(this.API_URL + `?user_id=${user.id}`);
    try {
      const json = await res.json(); //ページが空の時例外
      console.log(json);
      return json; //{"page_list": (page, "memos": (memoの配列でサイズ2未満)  の配列)}
    } catch (err) {
      //例外時の処理とreturn
    }
  }

  //pageの取得
  async getPage(page_id) {
    const res = await fetch(this.API_URL+'/'+page_id);
    return res;
    //成功 200 {"page": page,  "keywords": xxxx配列}
    //失敗：404
  }

    async createPage(page) {
    const res = createData({ url: page.url, title: page.title },
      this.API_URL + `?user_id=${page.user_id}`);
    return res;
  }

  //pageの更新
    async updatePage(page) {
    const res = updateData({ url: page.url, title: page.url },
      this.API_URL + '/' + page.id);
    return res;
  }

  //pageの削除
    async deletePage(page) {
    const res = deleteData(this.API_URL + '/' + page.id);
    return res;
  }
}

//tagのapiクラス
export class TagDataSource {
  API_URL = SERVER_URL + 'tags';
  constructor() {
  }

  //自動tagの生成
    async createAutomatedTag(page_id) {
    const res = await fetch(this.API_URL + `/automate?page_id=${page_id}`);
    return res;
    //成功 200 {"tags": tagの配列}
    //失敗 404，500
  }

  //tag一覧の取得
    async getTagIndex(page_id) {
    const res = await fetch(this.API_URL + `?page_id=${page_id}`);
    return res;
    //成功 200 {"tags": tagの配列}
    //失敗 404
  }

  //手動tagの追加
    async createManualTag(tag) {
    const res = createData({ text: tag.text },
      this.API_URL + `?page_id=${tag.page_id}`);
    return res;
  }

  //手動タグの更新
    async updateManualTag(tag) {
    const res = updateData({ text: tag.text },
      this.API_URL + '/' + tag.id);
    return res;
  }

  //タグの削除
    async deleteTag(tag) {
    const res = deleteData(this.API_URL + '/' + tag.id);
    return res;
  }
}