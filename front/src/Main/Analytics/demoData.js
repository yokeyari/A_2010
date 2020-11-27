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
  { user_id: 1, day: new Date("2020-11-21").getTime(), total_play: 120, total_write_memo: 3, total_else: 30 },
  { user_id: 1, day: new Date("2020-11-22").getTime(), total_play: 0, total_write_memo: 0, total_else: 0 },
  { user_id: 1, day: new Date("2020-11-23").getTime(), total_play: 0, total_write_memo: 0, total_else: 0 },
  { user_id: 1, day: new Date("2020-11-26").getTime(), total_play: 60, total_write_memo: 1, total_else: 100 },
  { user_id: 1, day: new Date("2020-11-27").getTime(), total_play: 90, total_write_memo: 0, total_else: 150 },
  { user_id: 2, day: new Date("2020-11-19").getTime(), total_play: 150, total_write_memo: 1, total_else: 40 },
  { user_id: 2, day: new Date("2020-11-20").getTime(), total_play: 40, total_write_memo: 2, total_else: 30 },
  { user_id: 2, day: new Date("2020-11-25").getTime(), total_play: 60, total_write_memo: 2, total_else: 50 },
  { user_id: 2, day: new Date("2020-11-26").getTime(), total_play: 90, total_write_memo: 1, total_else: 30 },
  { user_id: 2, day: new Date("2020-11-27").getTime(), total_play: 100, total_write_memo: 0, total_else: 40 },
]
const dummy_memos = [
  { user_id: 1, text: "今日はいい天気", time: 0 },
  { user_id: 1, text: "今日はいい天気", time: 30 },
  { user_id: 1, text: "今日は悪い天気", time: 43 },
  { user_id: 1, text: "今日は悪い天気", time: 30 },
  { user_id: 2, text: "今日はいい天気", time: 120 },
  { user_id: 2, text: "今日はいい天気", time: 180 },
  { user_id: 2, text: "今日は悪い天気", time: 62 },
  { user_id: 2, text: "今日は悪い天気", time: 95 },
]

export {dummy_browseTimes, dummy_browseDays, dummy_memos};