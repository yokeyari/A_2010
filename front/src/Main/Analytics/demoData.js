const dummy_browseTimes = [
  { user_id: 1, time: 1, total_play: 5, total_write_memo: 3, total_else: 0 },
  { user_id: 1, time: 2, total_play: 4, total_write_memo: 3, total_else: 0 },
  { user_id: 1, time: 3, total_play: 3, total_write_memo: 3, total_else: 0 },
  { user_id: 1, time: 4, total_play: 2, total_write_memo: 3, total_else: 0 },
  { user_id: 1, time: 5, total_play: 1, total_write_memo: 3, total_else: 0 },
  { user_id: 2, time: 1, total_play: 5, total_write_memo: 3, total_else: 0 },
  { user_id: 2, time: 2, total_play: 4, total_write_memo: 3, total_else: 0 },
  // {user_id: 2, time: 3, total_play: 3, total_write_memo: 3, total_else: 0},
  { user_id: 2, time: 4, total_play: 2, total_write_memo: 3, total_else: 0 },
  { user_id: 2, time: 5, total_play: 1, total_write_memo: 3, total_else: 0 },
]
const dummy_browseDays = [
  { user_id: 1, day: 1, total_play: 5, total_write_memo: 3, total_else: 0 },
  { user_id: 1, day: 2, total_play: 4, total_write_memo: 3, total_else: 0 },
  { user_id: 1, day: 3, total_play: 3, total_write_memo: 3, total_else: 0 },
  { user_id: 1, day: 4, total_play: 2, total_write_memo: 3, total_else: 0 },
  { user_id: 1, day: 5, total_play: 1, total_write_memo: 3, total_else: 0 },
  { user_id: 2, day: 1, total_play: 5, total_write_memo: 3, total_else: 0 },
  { user_id: 2, day: 2, total_play: 4, total_write_memo: 3, total_else: 0 },
  { user_id: 2, day: 3, total_play: 3, total_write_memo: 3, total_else: 0 },
  { user_id: 2, day: 4, total_play: 2, total_write_memo: 3, total_else: 0 },
  { user_id: 2, day: 5, total_play: 1, total_write_memo: 3, total_else: 0 },
]
const dummy_memos = [
  { user_id: 1, text: "今日はいい天気", time: 0 },
  { user_id: 1, text: "今日はいい天気", time: 1 },
  { user_id: 1, text: "今日は悪い天気", time: 2.5 },
  { user_id: 1, text: "今日は悪い天気", time: 3 },
  { user_id: 2, text: "今日はいい天気", time: 2 },
  { user_id: 2, text: "今日はいい天気", time: 1.8 },
  { user_id: 2, text: "今日は悪い天気", time: 2.2 },
  { user_id: 2, text: "今日は悪い天気", time: 3.5 },
]

export {dummy_browseTimes, dummy_browseDays, dummy_memos};