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

// 获取最近的对话历史记录
function getRecentHistory(messageHistory, count = 5) {
  if (!messageHistory || !Array.isArray(messageHistory)) {
    return [];
  }
  return messageHistory.slice(-count);
}

async function generateEvent(currentState, messageHistory) {
  // 只使用最近的5条对话历史
  const recentHistory = getRecentHistory(messageHistory, 5);
  
  const completion = await openai.createChatCompletion({
    model: OPENAI_CONFIG.model,
    messages: [
      { role: "system", content: EVENT_SYSTEM_PROMPT },
      { role: "user", content: `当前状态：${JSON.stringify(currentState)}\n历史对话：${JSON.stringify(recentHistory)}` }
    ],
    temperature: 0.8  // 增加随机性
  })

  return JSON.parse(completion.data.choices[0].message.content)
}

async function processUserChoice(message, currentState) {
  // 只使用最近的5条对话历史
  const recentHistory = getRecentHistory(currentState.messageHistory, 5);
  
  const completion = await openai.createChatCompletion({
    model: OPENAI_CONFIG.model,
    messages: [
      { role: "system", content: CHOICE_SYSTEM_PROMPT },
      { role: "user", content: `当前状态：${JSON.stringify({...currentState, messageHistory: recentHistory})}\n用户输入：${message}` }
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
      const eventData = await generateEvent(currentState, currentState.messageHistory || [])
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
      // 有用户输入时，处理用户选择
      const response = await processUserChoice(message, currentState)
      
      // 检查处理后的年龄是否超过100岁
      if (response.age >= 100) {
        return {
          success: true,
          data: {
            ...response,
            gameOver: true,
            currentNarrative: `你已经活到了${response.age}岁，完成了这一生的旅程。`,
            option1: '',
            option2: ''
          }
        }
      }
      
      console.log('用户输入:', message);
      console.log('用户状态:', currentState);
      console.log('模型输出:', response);
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
