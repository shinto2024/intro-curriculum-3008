// Description:
//   TODO を管理できるボットです
// Commands:
//   ボット名 add      - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const bolt = require('@slack/bolt');
const dotenv = require('dotenv');
dotenv.config();
const todo = require('todo');

const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: 'debug'
});

app.message(/add (.+)/i, ({context, say}) => {
  const taskName = context.matches[1].trim();
  todo.add(taskName);
  say(`追加しました: ${taskName}`);
});

app.message(/done (.+)/i, ({context, say}) => {
  const taskName = context.matches[1].trim();
  todo.done(taskName);
  say(`完了にしました: ${taskName}`);
});
 
app.message(/del (.+)/i, ({context, say}) => {
  const taskName = context.matches[1].trim();
  todo.del(taskName);
  say(`削除しました: ${taskName}`);
});

app.message(/^list/i, ({context, say}) => {
  const list = todo.list().join('\n');
  if (list === "") {
    say("(TODO はありません)")
  } else {
    say(list);
  }
});

app.message(/donelist/i, ({context, say}) => {
  const donelist = todo.donelist().join('\n');
  if (donelist === "") {
    say("(完了した TODO はありません)");
  } else {
    say(donelist);
  }
});

app.start();