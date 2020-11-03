const SERVER_URL = "https://movie-rails.herokuapp.com/api/v1/";
const API_URL = SERVER_URL + "memos";


//ページidに対応するメモの取得、ページid必須、LocalApiの方には無かった
export async function fetchMemos(page_id) {
  const res = await fetch(API_URL+`?page_id=${page_id}`);
  try {
    const json = await res.json(); //メモが空の時例外
    console.log(json);
    return json; //{"memos": (memo)の配列}
  } catch(err) {
    //例外時の処理とreturn
  }
}

//ページidに対応するメモの新規作成、ページid必須、LocalApiの方には無かった
export async function submitNewMemo(memo, page_id) {
  const res = await fetch(API_URL+`?page_id=${page_id}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text:memo.body, time:memo.time}) //memoのデータベースに準拠するならmemo.body=>memo.text
  })
  return res
  //res.json: 成功{"memo": memo}, 失敗{"error": error_messages}
  //res.status: 成功200, 失敗400
}

//メモの編集
export async function editMemo(memo) {
    const res = await fetch(API_URL+'/'+(memo.id), {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text:memo.body, time:memo.time})
    });
  return res;
  //res.json: 成功{"memo": memo}, 失敗{"error": error_messages}
  //res.status: 成功200, 失敗404
}

//メモの削除
export async function deleteMemo(memo) {
  const memoId = memo.id;
  const res = await fetch(API_URL +'/' +memoId, {
    method: "DELETE"
  });
  return res;
  //res.status: 成功200, 失敗404
}
