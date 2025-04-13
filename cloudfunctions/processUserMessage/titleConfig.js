const EDUCATION_LEVELS = {
  '小学': 1,
  '初中': 2,
  '高中': 3,
  '大专': 4,
  '本科': 5,
  '硕士': 6,
  '博士': 7
};

const titles = [
  {
    name: '祖国的花朵',
    condition: (age, money, education, career) => 
      age <= 18 && career === '学生'
  },
  {
    name: '打工人',
    condition: (age, money, education, career) => 
      age > 18 && money < 10000 && career !== '学生'
  },
  {
    name: '月光族',
    condition: (age, money, education, career) => 
      age > 18 && money < 1000
  },
  {
    name: '数字游民',
    condition: (age, money, education, career) => 
      career === '自由职业' && money > 30000
  },
  {
    name: '元宇宙居民',
    condition: (age, money, education, career) => 
      career.includes('程序') && money > 40000
  },
  {
    name: '打工皇帝',
    condition: (age, money, education, career) => 
      money > 100000 && career.includes('员工')
  },
  {
    name: '知识带货人',
    condition: (age, money, education, career) => 
      EDUCATION_LEVELS[education] >= 5 && career.includes('主播')
  },
  {
    name: '赛博未来人',
    condition: (age, money, education, career) => 
      career.includes('AI') || career.includes('人工智能')
  },
  {
    name: '硅基生命体',
    condition: (age, money, education, career) => 
      career.includes('工程师') && money > 50000
  },
  {
    name: '摆烂大师',
    condition: (age, money, education, career) => 
      age > 25 && money < 3000 && !career
  },
  {
    name: '人生导师',
    condition: (age, money, education, career) => 
      age > 40 && money > 200000 && EDUCATION_LEVELS[education] >= 5
  },
  {
    name: '韭菜斗士',
    condition: (age, money, education, career) => 
      money < 1000 && career.includes('投资')
  },
  {
    name: '养生专家',
    condition: (age, money, education, career) => 
      age > 50 && money > 50000
  },
  {
    name: '职场新韭菜',
    condition: (age, money, education, career) => 
      age < 25 && career.includes('实习')
  },
  {
    name: '内卷王者',
    condition: (age, money, education, career) => 
      EDUCATION_LEVELS[education] >= 6 && age < 30 && money < 10000
  },
  {
    name: '躺平大师',
    condition: (age, money, education, career) => 
      money < 5000 && age > 25 && career === '自由职业'
  },
  {
    name: '996战士',
    condition: (age, money, education, career) => 
      career.includes('程序') && money > 30000 && money < 50000
  },
  {
    name: '人生赢家',
    condition: (age, money, education, career) => 
      money > 1000000 && age < 35
  },
  {
    name: '学术带师',
    condition: (age, money, education, career) => 
      education === '博士' && career.includes('教授')
  },
  {
    name: '躺平使者',
    condition: (age, money, education, career) => 
      age > 25 && money < 5000 && career === '自由职业'
  },
  {
    name: '卷王',
    condition: (age, money, education, career) => 
      age < 30 && EDUCATION_LEVELS[education] >= 6 && money > 50000
  },
  {
    name: '理财达人',
    condition: (age, money, education, career) => 
      money > 500000 && career.includes('投资')
  },
  {
    name: '社畜战士',
    condition: (age, money, education, career) => 
      age > 22 && money < 20000 && career.includes('职员')
  },
  {
    name: '创业先锋',
    condition: (age, money, education, career) => 
      money > 100000 && career.includes('创始人')
  },
  // ... 继续添加更多称号配置
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
  getTitle
};