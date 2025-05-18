// titles.js
Page({
  data: {
    titles: [],
    achievedCount: 0,
    totalCount: 0,
    beatPercentage: 0 // 添加打败百分比数据
  },

  onLoad: function(options) {
    // 解析传递过来的已达成称号
    const achievedTitles = options.achievedTitles ? JSON.parse(options.achievedTitles) : [];
    
    // 直接定义所有称号列表
    const allTitles = [
      // 特殊难以达成的称号
      '传奇人物', '人生巅峰', '隐世高人', '时代先驱', '商业传奇', 
      '世外高人', '跨界大师', '传世宗师', '科技先知', '人间清醒',
      
      // 外星人相关称号
      '星际使者', '外星接头人', '星际旅行家', '太空殖民者', '星际企业家',
      
      // 玄幻相关称号
      '修仙者', '灵气大师', '玄学大师', '通灵者', '超能力者',
      
      // 武侠相关称号
      '武林高手', '侠客', '武当掌门', '少林高僧', '剑道宗师',
      
      // 更多职业相关称号
      '网红达人', '电竞选手', '美食家', '时尚达人', '旅行家',
      
      // 金钱细分等级相关称号
      '亿万富翁', '千万富翁', '百万富翁', '小康之家', '负翁',
      
      // 年龄相关称号
      '祖国的花朵', '职场新韭菜', '人生赢家', '养生专家',
      
      // 财富相关称号
      '月光族', '韭菜斗士', '理财达人', '打工皇帝',
      
      // 教育相关称号
      '内卷王者', '卷王', '学术带师', '知识带货人',
      
      // 职业相关称号
      '数字游民', '元宇宙居民', '赛博未来人', '硅基生命体',
      '996战士', '社畜战士', '创业先锋', '人生导师',
      
      // 生活态度相关称号
      '摆烂大师', '躺平大师', '躺平使者', '佛系青年', 
      '人间烟火', '知足常乐', '岁月静好', '打工人', '平凡人'
    ].map(name => ({
      name: name,
      achieved: achievedTitles.includes(name)
    }));

    // 计算打败的百分比
    const achievedCount = achievedTitles.length;
    const totalCount = allTitles.length;
    
    // 修改为倒金字塔型的百分比计算逻辑
    // 达成称号越多，打败的人数百分比越高
    let beatPercentage = 0;
    if (achievedCount === 0) {
      beatPercentage = 0;
    } else {
      // 设计成倒金字塔结构：获得1个称号打败1%的人，获得64个称号打败100%的人
      // 使用非线性函数计算百分比
      const maxTitles = 64; // 理论上的最大称号数
      beatPercentage = 1 + (99 * Math.pow(achievedCount / maxTitles, 0.6));
      
      // 确保不超过99.9%
      beatPercentage = Math.min(99.9, beatPercentage);
    }
    
    // 保留一位小数
    beatPercentage = Math.round(beatPercentage * 10) / 10;

    this.setData({
      titles: allTitles,
      achievedCount: achievedCount,
      totalCount: totalCount,
      beatPercentage: beatPercentage
    });
  },
  
  goBack: function() {
    wx.navigateBack();
  }
});