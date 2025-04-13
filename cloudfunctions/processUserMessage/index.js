const cloud = require('wx-server-sdk')
const { Configuration, OpenAIApi } = require('openai')
const { OPENAI_CONFIG, EVENT_SYSTEM_PROMPT, CHOICE_SYSTEM_PROMPT } = require('./config')
const { getTitle } = require('./titleConfig')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const configuration = new Configuration({
  apiKey: OPENAI_CONFIG.apiKey,
  basePath: OPENAI_CONFIG.baseURL
})
const openai = new OpenAIApi(configuration)

async function generateEvent(currentState, messageHistory) {
  const completion = await openai.createChatCompletion({
    model: OPENAI_CONFIG.model,
    messages: [
      { role: "system", content: EVENT_SYSTEM_PROMPT },
      { role: "user", content: `当前状态：${JSON.stringify(currentState)}\n历史对话：${JSON.stringify(messageHistory)}` }
    ],
    temperature: 0.8  // 增加随机性
  })

  return JSON.parse(completion.data.choices[0].message.content)
}

async function processUserChoice(message, currentState) {
  const completion = await openai.createChatCompletion({
    model: OPENAI_CONFIG.model,
    messages: [
      { role: "system", content: CHOICE_SYSTEM_PROMPT },
      { role: "user", content: `当前状态：${JSON.stringify(currentState)}\n用户选择：${message}` }
    ],
    temperature: 0.6
  })

  return JSON.parse(completion.data.choices[0].message.content)
}

exports.main = async (event, context) => {
  try {
    const { message, currentState } = event
    
    if (!message) {
      // 如果没有用户输入，生成新的随机事件
      const eventData = await generateEvent(currentState, currentState.messageHistory)
      return {
        success: true,
        data: {
          ...currentState,
          currentNarrative: eventData.event,
          option1: eventData.options[0],
          option2: eventData.options[1]
        }
      }
    } else {
      // 处理用户的选择
      const response = await processUserChoice(message, currentState)
      
      // 生成新的事件
      const eventData = await generateEvent(response, currentState.messageHistory)
      
      // 更新称号
      const title = getTitle(
        response.age,
        response.money,
        response.education,
        response.career
      )

      return {
        success: true,
        data: {
          ...response,
          title,
          currentNarrative: eventData.event,
          option1: eventData.options[0],
          option2: eventData.options[1]
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: error.message
    }
  }
}