// index.js
Page({
  data: {
    inputValue: '',
    title: '初出茅庐',
    age: 18,
    career: '学生',
    money: 0,
    education: '高中',
    lifeStory: '你的人生故事即将开始...',
    messageHistory: [],
    option1: '',
    option2: '',
    currentNarrative: '你的人生正在展开...',
    gameOver: false,
    achievedTitles: []  // 添加已达成称号的数组
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

  async handleSubmit(e) {
    // 检查是否是事件对象
    let userInput = '';
    if (typeof e === 'object' && e.type === 'tap') {
      // 如果是点击事件，获取输入框的值
      userInput = this.data.inputValue.trim();
      console.log('从输入框获取的用户输入:', userInput);
    } else {
      // 如果是从选项传入的字符串
      userInput = e || '';
      console.log('从选项获取的用户输入:', userInput);
    }
 
    if (!userInput) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }

    // 清空输入框
    this.setData({
      inputValue: ''
    });

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
      
      // 检查游戏是否结束
      if (data.gameOver) {
        // 记录最终称号
        const updatedAchievedTitles = [...this.data.achievedTitles];
        if (data.title && !updatedAchievedTitles.includes(data.title)) {
          updatedAchievedTitles.push(data.title);
        }
        
        this.setData({
          title: data.title || this.data.title,
          age: data.age || this.data.age,
          career: data.career || this.data.career,
          money: data.money || this.data.money,
          education: data.education || this.data.education,
          currentNarrative: data.currentNarrative,
          gameOver: true,
          achievedTitles: updatedAchievedTitles
        });
        return;
      }
      
      const newMessageHistory = [...this.data.messageHistory, {
        user: userInput,
        ai: {
          result: {
            lifeStory: data.lifeStory
          }
        }
      }];

      // 构建累积的人生经历
      const fullLifeStory = newMessageHistory
        .map((msg, index) => {
          // 如果消息已经有年龄范围，直接使用
          if (msg.ageRange) {
            return `【${msg.ageRange}】${msg.ai.result.lifeStory}`;
          }
          
          // 为新消息计算年龄范围
          let startAge, endAge;
          if (index === 0) {
            // 第一条消息
            startAge = 18;
            endAge = newMessageHistory.length > 1 ? 
              (newMessageHistory[1].startAge || data.age) : data.age;
          } else if (index === newMessageHistory.length - 1) {
            // 最新的消息
            startAge = newMessageHistory[index - 1].endAge || this.data.age;
            endAge = data.age;
          } else {
            // 中间的消息
            startAge = newMessageHistory[index - 1].endAge || this.data.age;
            endAge = newMessageHistory[index + 1].startAge || data.age;
          }
          
          // 保存年龄范围到消息对象
          newMessageHistory[index].startAge = startAge;
          newMessageHistory[index].endAge = endAge;
          newMessageHistory[index].ageRange = `${startAge}岁-${endAge}岁`;
          
          // 修复格式，确保没有多余空格
          return `【${startAge}岁-${endAge}岁】${msg.ai.result.lifeStory.trim()}`;
        })
        .filter(story => story)
        .join('\n\n');  // 使用两个换行符分隔

      // 记录新称号
      const updatedAchievedTitles = [...this.data.achievedTitles];
      if (data.title && !updatedAchievedTitles.includes(data.title)) {
        updatedAchievedTitles.push(data.title);
      }

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
        messageHistory: newMessageHistory,
        achievedTitles: updatedAchievedTitles
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

  // 添加查看称号的方法
  viewTitles() {
    wx.navigateTo({
      url: `/pages/titles/titles?achievedTitles=${JSON.stringify(this.data.achievedTitles)}`
    });
  },

  // 重启游戏时清空称号记录
  restartGame() {
    this.setData({
      inputValue: '',
      title: '初出茅庐',
      age: 18,
      career: '学生',
      money: 0,
      education: '高中',
      lifeStory: '你的人生故事即将开始...',
      messageHistory: [],
      gameOver: false
    });
    
    // 重新加载初始事件
    this.onLoad();
  },

  async handleOption1() {
    await this.handleSubmit(this.data.option1);
  },

  async handleOption2() {
    await this.handleSubmit(this.data.option2);
  }
})
