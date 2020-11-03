const SERVER_URL  = "http://localhost:3001/";
const API_URL = SERVER_URL + "memos";


export async function fetchMemos() {
  const res = await fetch(API_URL);
  const json = await res.json();
  console.log(json);
  return json;

}

// function changeText(event) {
//   const inputText = event.target.value
//   this.setState({ inputText: inputText })
//   console.dir(inputText);
// }

export async function submitNewMemo(memo) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body:memo.body, time:memo.time})
  })
  return res;
}

export async function editMemo(memo) {
    const res = await fetch(API_URL+'/'+(memo.id), {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({body:memo.body })
    });
  return res;
}

export async function deleteMemo(memo) {
  const memoId = memo.id;
  const res = await fetch(API_URL +'/' +memoId, {
    method: "DELETE"
  });
  return res;
}
