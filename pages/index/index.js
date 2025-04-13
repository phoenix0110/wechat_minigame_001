// index.js
Page({
  data: {
    inputValue: '',
    title: '祖国的花朵',
    age: 18,
    career: '学生',
    money: 0,
    education: '高中',
    lifeStory: '你的人生故事即将开始...',
    messageHistory: [],
    option1: '',
    option2: '',
    currentNarrative: '你的人生正在展开...'
  },

  handleInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  onLoad: async function() {
    // 页面加载时获取第一个事件
    try {
      const result = await wx.cloud.callFunction({
        name: 'processUserMessage',
        data: {
          message: '',  // 空消息表示获取新事件
          currentState: {
            title: this.data.title,
            age: this.data.age,
            career: this.data.career,
            money: this.data.money,
            education: this.data.education,
            messageHistory: []
          }
        }
      })

      if (result.result.success) {
        const { data } = result.result
        this.setData({
          currentNarrative: data.currentNarrative,
          option1: data.option1,
          option2: data.option2
        })
      }
    } catch (error) {
      console.error('初始化失败:', error)
    }
  },  // 添加逗号

  async handleSubmit(message = '') {
    const userInput = message || this.data.inputValue.trim();

    if (!userInput) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '处理中...',
      mask: true
    })

    try {
      const { age, career, money, education, messageHistory } = this.data
      
      const result = await wx.cloud.callFunction({
        name: 'processUserMessage',
        data: {
          message: userInput,
          currentState: {
            age,
            career,
            money,
            education,
            messageHistory
          }
        }
      })

      if (!result || !result.result || !result.result.success) {
        throw new Error('处理失败')
      }

      const { data } = result.result
      
      const maxHistoryLength = 3;
      const newMessageHistory = [...this.data.messageHistory, {
        user: userInput,
        ai: {
          result: {
            lifeStory: data.lifeStory
          }
        }
      }].slice(-maxHistoryLength);

      // 构建累积的人生经历
      const fullLifeStory = newMessageHistory
        .map(msg => msg.ai.result.lifeStory)
        .filter(story => story)
        .join('\n\n');

      this.setData({
        title: data.title || this.data.title,
        age: data.age || this.data.age,
        career: data.career || this.data.career,
        money: data.money || this.data.money,
        education: data.education || this.data.education,
        lifeStory: fullLifeStory || '你的人生故事即将开始...',
        currentNarrative: data.currentNarrative,
        option1: data.option1,
        option2: data.option2,
        inputValue: '',
        messageHistory: newMessageHistory
      })

    } catch (error) {
      console.error('请求失败:', error)
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  },

  async handleOption1() {
    await this.handleSubmit(this.data.option1);
  },

  async handleOption2() {
    await this.handleSubmit(this.data.option2);
  }
})
