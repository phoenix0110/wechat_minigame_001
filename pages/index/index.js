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
    messageHistory: []
  },

  handleInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  async handleSubmit() {
    if (!this.data.inputValue.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '处理中...',
      mask: true  // 添加遮罩，防止用户重复操作
    })

    try {
      const { inputValue, name, age, career, money, education, messageHistory } = this.data
      
      const result = await wx.cloud.callFunction({
        name: 'processUserMessage',
        data: {
          message: inputValue,
          currentState: {
            name,
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
      
      this.setData({
        title: data.title || this.data.title,
        age: data.age || this.data.age,
        career: data.career || this.data.career,
        money: data.money || this.data.money,
        education: data.education || this.data.education,
        lifeStory: data.lifeStory || this.data.lifeStory,
        inputValue: '',
        messageHistory: [...this.data.messageHistory, {
          user: inputValue,
          ai: data.reply
        }]
      })

    } catch (error) {
      console.error('请求失败:', error)
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    } finally {
      // 确保在所有情况下都会执行 hideLoading
      try {
        wx.hideLoading()
      } catch (e) {
        console.error('关闭loading失败:', e)
      }
    }
  }
})
