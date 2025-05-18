exports.OPENAI_CONFIG = {
  apiKey: 'sk-il1PeieWZQ3sMwq2nsp4rGOZmvpm5y6eyY9Y7Fx668zEY6KU',
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  baseURL: 'https://api.chatanywhere.tech/v1'
}

// 简化系统提示，减少token数量
exports.EVENT_SYSTEM_PROMPT = `你根据用户当前状态：
1. 生成一个出乎意料的随机事件，绝对不要和历史有重复（15-25字）
2. 每个事件以"你准备...？"结束
3. 提供两个不同选择方案（每个10-15字）

JSON格式返回：
{
  "event": "简短的事件描述",
  "options": [
    "选项1",
    "选项2"
  ]
}
`

exports.CHOICE_SYSTEM_PROMPT = `你根据用户输入和用户年龄、职业、金钱、教育和历史对话记录：
1. 模拟现实生活中可能发生的情况，并用第二人称来描述
2. 调整用户的年龄，职业，教育，和金钱
注意：
- 40岁前，年龄必须增加3-10岁，特殊事件下可以增长超过10岁，或者回到过去
- 40岁后，年龄必须增加10-15岁，特殊事件下可以增长超过15岁，或者回到过去
- 学历必须是高中、大学、硕士、博士之一，且学历不能倒退
- 金钱以万为单位
- 职业描述必须小于等于4个字
- 重视本次用户输入
- lifeStory必须15 - 25字，仅反映人生的变化
请严格只用中文，并只返回以下JSON格式：
{
"age": "", 
"career": "",
"money": "",
"education": "",
"lifeStory": ""
}
`