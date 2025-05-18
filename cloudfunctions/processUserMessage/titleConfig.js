const EDUCATION_LEVELS = {
  '高中': 1,
  '大专': 2,
  '本科': 3,
  '硕士': 4,
  '博士': 5,
  'MBA': 5
};

const titles = [
  // 特殊难以达成的称号 - 放在最前面优先判断
  {
    name: '传奇人物',
    condition: (age, money, education, career) => 
      age > 60 && money >= 800 && education === '博士' // 降低条件：8亿富翁博士
  },
  {
    name: '人生巅峰',
    condition: (age, money, education, career) => 
      age > 40 && money >= 400 && EDUCATION_LEVELS[education] >= 4 && career && (career.includes('总裁') || career.includes('CEO')) // 降低条件：4亿高管
  },
  {
    name: '隐世高人',
    condition: (age, money, education, career) => 
      age > 50 && money >= 80 && career === '隐士' // 降低条件
  },
  {
    name: '时代先驱',
    condition: (age, money, education, career) => 
      career && career.includes('发明家') && money >= 40 // 降低条件
  },
  {
    name: '商业传奇',
    condition: (age, money, education, career) => 
      money >= 250 && career && (career.includes('企业家') || career.includes('创始人')) // 降低条件
  },
  {
    name: '世外高人',
    condition: (age, money, education, career) => 
      age > 65 && EDUCATION_LEVELS[education] >= 4 && career && career.includes('修行者') // 降低条件
  },
  {
    name: '跨界大师',
    condition: (age, money, education, career) => 
      education === '博士' && career && (career.includes('艺术家') || career.includes('音乐家')) && money >= 15 // 降低条件
  },
  {
    name: '传世宗师',
    condition: (age, money, education, career) => 
      age > 55 && career && career.includes('大师') && money >= 25 // 降低条件
  },
  {
    name: '科技先知',
    condition: (age, money, education, career) => 
      EDUCATION_LEVELS[education] >= 4 && career && career.includes('科学家') && money >= 40 // 降低条件
  },
  {
    name: '人间清醒',
    condition: (age, money, education, career) => 
      age > 30 && money >= 8 && money < 20 && career === '自由职业' && EDUCATION_LEVELS[education] >= 3 // 降低条件
  },
  
  // 新增外星人相关称号
  {
    name: '星际使者',
    condition: (age, money, education, career) => 
      career && career.includes('天文') && money >= 30 && EDUCATION_LEVELS[education] >= 4
  },
  {
    name: '外星接头人',
    condition: (age, money, education, career) => 
      career && (career.includes('UFO') || career.includes('天文')) && money >= 5 && money < 30
  },
  {
    name: '星际旅行家',
    condition: (age, money, education, career) => 
      career && career.includes('宇航员') && money >= 20
  },
  {
    name: '太空殖民者',
    condition: (age, money, education, career) => 
      career && career.includes('太空') && money >= 100
  },
  {
    name: '星际企业家',
    condition: (age, money, education, career) => 
      career && career.includes('航天') && money >= 200
  },
  
  // 新增玄幻相关称号
  {
    name: '修仙者',
    condition: (age, money, education, career) => 
      age > 40 && career && career.includes('修行') && money < 5 && money >= 1
  },
  {
    name: '灵气大师',
    condition: (age, money, education, career) => 
      career && career.includes('气功') && age > 50 && money >= 5 && money < 15
  },
  {
    name: '玄学大师',
    condition: (age, money, education, career) => 
      career && (career.includes('算命') || career.includes('风水')) && money >= 15 && money < 30
  },
  {
    name: '通灵者',
    condition: (age, money, education, career) => 
      career && career.includes('灵媒') && money >= 3 && money < 15
  },
  {
    name: '超能力者',
    condition: (age, money, education, career) => 
      career && career.includes('魔术师') && money >= 20 && money < 40
  },
  
  // 新增武侠相关称号
  {
    name: '武林高手',
    condition: (age, money, education, career) => 
      career && career.includes('武术') && age > 35 && money >= 3 && money < 20
  },
  {
    name: '侠客',
    condition: (age, money, education, career) => 
      career && (career.includes('保镖') || career.includes('武术')) && money < 3 && money >= 1
  },
  {
    name: '武当掌门',
    condition: (age, money, education, career) => 
      career && career.includes('武术教练') && age > 45 && money >= 10 && money < 30
  },
  {
    name: '少林高僧',
    condition: (age, money, education, career) => 
      career && career.includes('僧人') && age > 40 && money < 1
  },
  {
    name: '剑道宗师',
    condition: (age, money, education, career) => 
      career && career.includes('剑道') && age > 50 && money >= 5 && money < 25
  },
  
  // 新增更多职业相关称号
  {
    name: '网红达人',
    condition: (age, money, education, career) => 
      career && (career.includes('主播') || career.includes('网红')) && money >= 20 && money < 50 && age < 35
  },
  {
    name: '电竞选手',
    condition: (age, money, education, career) => 
      career && career.includes('电竞') && age < 30 && money >= 10 && money < 50
  },
  {
    name: '美食家',
    condition: (age, money, education, career) => 
      career && (career.includes('厨师') || career.includes('美食评论')) && money >= 5 && money < 30
  },
  {
    name: '时尚达人',
    condition: (age, money, education, career) => 
      career && (career.includes('模特') || career.includes('设计师')) && money >= 10 && money < 40
  },
  {
    name: '旅行家',
    condition: (age, money, education, career) => 
      career && (career.includes('旅行') || career.includes('导游')) && money >= 5 && money < 20
  },
  
  // 新增金钱细分等级相关称号
  {
    name: '亿万富翁',
    condition: (age, money, education, career) => 
      money >= 1000 && !(age > 60 && education === '博士') // 避免与传奇人物重叠
  },
  {
    name: '千万富翁',
    condition: (age, money, education, career) => 
      money >= 100 && money < 1000 && !(money >= 250 && career && (career.includes('企业家') || career.includes('创始人'))) // 避免与商业传奇重叠
  },
  {
    name: '百万富翁',
    condition: (age, money, education, career) => 
      money >= 50 && money < 100 && !(career && career.includes('投资'))
  },
  {
    name: '小康之家',
    condition: (age, money, education, career) => 
      money >= 10 && money < 50 && !(career && (career.includes('员工') || career.includes('创始人')))
  },
  {
    name: '负翁',
    condition: (age, money, education, career) => 
      money < 0 && age > 25
  },
  
  // 年龄相关称号
  {
    name: '祖国的花朵',
    condition: (age, money, education, career) => 
      age <= 18 && career === '学生'
  },
  {
    name: '职场新韭菜',
    condition: (age, money, education, career) => 
      age < 25 && career && career.includes('实习')
  },
  {
    name: '人生赢家',
    condition: (age, money, education, career) => 
      money >= 80 && age < 35 && !(career && (career.includes('总裁') || career.includes('CEO') || career.includes('企业家') || career.includes('创始人')))
  },
  {
    name: '养生专家',
    condition: (age, money, education, career) => 
      age > 50 && money >= 5 && money < 30 && !(career && career.includes('大师'))
  },
  
  // 财富相关称号
  {
    name: '月光族',
    condition: (age, money, education, career) => 
      age > 18 && money < 0.1 && money >= 0 && !(career && career.includes('投资'))
  },
  {
    name: '韭菜斗士',
    condition: (age, money, education, career) => 
      money < 0.1 && career && career.includes('投资')
  },
  {
    name: '理财达人',
    condition: (age, money, education, career) => 
      money >= 50 && money < 100 && career && career.includes('投资')
  },
  {
    name: '打工皇帝',
    condition: (age, money, education, career) => 
      money >= 10 && money < 50 && career && career.includes('员工')
  },
  
  // 教育相关称号
  {
    name: '内卷王者',
    condition: (age, money, education, career) => 
      EDUCATION_LEVELS[education] >= 4 && age < 30 && money < 1
  },
  {
    name: '卷王',
    condition: (age, money, education, career) => 
      age < 30 && EDUCATION_LEVELS[education] >= 4 && money >= 5 && money < 20
  },
  {
    name: '学术带师',
    condition: (age, money, education, career) => 
      education === '博士' && career && career.includes('教授') && money < 20
  },
  {
    name: '知识带货人',
    condition: (age, money, education, career) => 
      EDUCATION_LEVELS[education] >= 4 && career && career.includes('主播') && money < 20
  },
  
  // 职业相关称号
  {
    name: '数字游民',
    condition: (age, money, education, career) => 
      career === '自由职业' && money >= 3 && money < 10 && age <= 30
  },
  {
    name: '元宇宙居民',
    condition: (age, money, education, career) => 
      career && career.includes('程序') && money >= 4 && money < 20
  },
  {
    name: '赛博未来人',
    condition: (age, money, education, career) => 
      career && (career.includes('AI') || career.includes('人工智能')) && money < 50
  },
  {
    name: '硅基生命体',
    condition: (age, money, education, career) => 
      career && career.includes('工程师') && money >= 5 && money < 20
  },
  {
    name: '996战士',
    condition: (age, money, education, career) => 
      career && career.includes('程序') && money >= 3 && money < 5
  },
  {
    name: '社畜战士',
    condition: (age, money, education, career) => 
      age > 22 && money < 2 && career && career.includes('职员')
  },
  {
    name: '创业先锋',
    condition: (age, money, education, career) => 
      money >= 10 && money < 50 && career && career.includes('创始人')
  },
  {
    name: '人生导师',
    condition: (age, money, education, career) => 
      age > 40 && money >= 20 && money < 50 && EDUCATION_LEVELS[education] >= 3
  },
  
  // 生活态度相关称号
  {
    name: '摆烂大师',
    condition: (age, money, education, career) => 
      age > 25 && money < 0.3 && (!career || career === '无业')
  },
  {
    name: '躺平大师',
    condition: (age, money, education, career) => 
      money < 0.5 && age > 25 && age <= 30 && career === '自由职业'
  },
  {
    name: '躺平使者',
    condition: (age, money, education, career) => 
      age > 30 && money < 0.5 && career === '自由职业'
  },
  
  // 新增生活态度相关称号
  {
    name: '佛系青年',
    condition: (age, money, education, career) => 
      age >= 20 && age < 30 && money >= 0.5 && money < 3 && career && !career.includes('实习')
  },
  {
    name: '人间烟火',
    condition: (age, money, education, career) => 
      age > 35 && money >= 3 && money < 8 && EDUCATION_LEVELS[education] <= 3
  },
  {
    name: '知足常乐',
    condition: (age, money, education, career) => 
      age > 45 && money >= 1 && money < 10 && !(career && (career.includes('大师') || career.includes('专家')))
  },
  {
    name: '岁月静好',
    condition: (age, money, education, career) => 
      age > 55 && money >= 2 && money < 15 && !(career && career.includes('大师'))
  },
  
  // 默认称号 - 放在最后
  {
    name: '打工人',
    condition: (age, money, education, career) => 
      age > 18 && money < 1 && career && career !== '学生' && !career.includes('实习')
  }
];

function getTitle(age, money, education, career) {
  for (const title of titles) {
    if (title.condition(age, money, education, career)) {
      return title.name;
    }
  }
  return '平凡人';  // 默认称号
}

module.exports = {
  getTitle,
  titles  // 导出titles数组以便其他模块使用
};