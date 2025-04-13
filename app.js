App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-4g0b3awl2f4c0c86',  // 这里填入你的云环境ID
        traceUser: true
      })
    }
  }
})
