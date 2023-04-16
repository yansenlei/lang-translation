# 名称
lang-translation

# 简介
lang-translation是一个多语言翻译工具，支持多种语言之间的互译。帮助你的多语言项目快速支持其它语言。

# 快速开始
1. 安装依赖：
```bash
npm install lang-translation -g
```

2. 运行程序：
```bash
lang-translation -s zh-CN -t en -m ./locales/zh.json
```

# 库的引入使用方式
1. 安装依赖：
```bash
npm install lang-translation
```

2. 引入模块：
```js
const langTranslation = require('lang-translation');
```

3. 使用方法：
```js
const translatedMessages = await translateMessages({
  messages,
  options: {
    sourceLanguage: 'zh-CN',
    targetLanguage: 'en'
  },
  onProcess: ({ translatedCount, totalCount, key }) => {
    // 每翻译一次则执行一次
  }
});
```

# 支持的参数

| 参数名 | 作用 | 默认值 |
| --- | --- | --- |
| -s, --source-language | 源语言 | 'zh-CN' |
| -t, --target-language | 目标语言 | 'en' |
| -m, --message-file | 消息文件路径 | './locales/en.json' |
| -h, --help | 显示帮助信息 | 无 |
| -p, --proxy | 代理服务器地址（包括端口） | 无 |
| -d, --delay | 翻译请求之间的延迟（毫秒），因为频繁请求会被限制IP | 500 |
