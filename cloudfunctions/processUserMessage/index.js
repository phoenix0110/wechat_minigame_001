const cloud = require('wx-server-sdk')
const { Configuration, OpenAIApi } = require('openai')
const { OPENAI_CONFIG, SYSTEM_PROMPT } = require('./config')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const configuration = new Configuration({
  apiKey: OPENAI_CONFIG.apiKey,
  basePath: OPENAI_CONFIG.baseURL  // 添加 basePath 配置
})
const openai = new OpenAIApi(configuration)

exports.main = async (event, context) => {
  try {
    const { message, currentState } = event
    
    const completion = await openai.createChatCompletion({
      model: OPENAI_CONFIG.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `当前状态：${JSON.stringify(currentState)}\n用户输入：${message}` }
      ],
      temperature: OPENAI_CONFIG.temperature
    })

    // 获取 AI 的回复内容
    const aiResponse = completion.data.choices[0].message.content

    try {
      // 尝试解析 JSON
      const response = JSON.parse(aiResponse)
      return {
        success: true,
        data: response
      }
    } catch (parseError) {
      // 如果解析失败，构造一个基本响应
      console.error('JSON解析失败:', aiResponse)
      return {
        success: true,
        data: {
          reply: aiResponse,
          lifeStory: '生活继续...'
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