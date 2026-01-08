import { type Config } from 'prettier'
export { version } from '../package.json'

const config: Config = {
  printWidth: 120,
  // 不使用Tab缩进
  useTabs: false,
  // 不添加非必要分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSameLine: false,
  // 修改 Markdown 样式
  proseWrap: 'never',
  // 尽可能省略箭头函数括号
  arrowParens: 'avoid',
  // 忽略 HTML 中空白字符
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: ['*.css', '*.less', '*.scss', '*.sass'],
      options: {
        singleQuote: false,
      },
    },
  ],
}

export const {
  printWidth,
  useTabs,
  semi,
  singleQuote,
  quoteProps,
  jsxSingleQuote,
  trailingComma,
  bracketSameLine,
  proseWrap,
  arrowParens,
  htmlWhitespaceSensitivity,
  overrides,
} = config

export default config
