# Talent Atlas

> 企业级人才搜索引擎 - 自然语言混合检索 Demo

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)

## 1. 项目概述

Talent Atlas 是一款面向企业内部的**智能人才搜索引擎**，支持自然语言混合检索（结构化字段 + 非结构化文本）。系统能够解析自然语言 Query，自动提取结构化条件（级别、事业部、技能等）与语义搜索词，返回精准匹配的人才列表。

### 核心价值

- **自然语言优先**：用户无需记忆复杂的检索语法，用自然语言描述即可精准找人
- **可解释的 AI**：Query 解析过程实时可视化，让用户理解 AI 在做什么
- **混合检索能力**：结构化数据与文本向量的联合检索与排序

### 目标用户

- HR 招聘团队
- 业务部门负责人
- 技术管理者
- 内部人才调配负责人

---

## 2. 功能特性

### 2.1 核心功能

| 功能 | 描述 |
|------|------|
| **自然语言搜索** | 输入自然语言描述，如"做过新能源项目的 P6 工程师"，系统自动解析并检索 |
| **Query 解析可视化** | 实时展示解析出的结构化条件（蓝色标签）和语义搜索词（绿色标签） |
| **Talent Card** | 展示员工基础信息、匹配度评分、匹配标签和摘要 |
| **详情面板** | 展开查看员工项目经历、考核评价、Peer 反馈、晋升记录等 |
| **示例 Query** | 预设多种场景的 Query 示例，点击即可执行搜索 |

### 2.2 交互细节

- **实时解析**：输入后 300ms 无变化自动触发解析
- **标签编辑**：点击解析出的标签可进行删除或修正
- **键盘支持**：`Enter` 执行搜索，`Escape` 清空输入
- **卡片悬停**：上浮效果 + 阴影加深
- **Tab 切换**：详情面板支持多维度信息切换

---

## 3. 技术架构

### 3.1 技术栈

| 层级 | 技术选型 |
|------|----------|
| **构建工具** | Vite 5.0 |
| **前端框架** | React 18.2 |
| **样式方案** | Tailwind CSS 3.4 + CSS Variables |
| **动画库** | Framer Motion 11 |
| **图标库** | Lucide React |
| **字体** | Manrope / IBM Plex Sans / JetBrains Mono |

### 3.2 项目结构

```
talent-atlas/
├── index.html                 # HTML 入口
├── package.json               # 依赖配置
├── vite.config.js             # Vite 配置
├── tailwind.config.js         # Tailwind 配置
├── postcss.config.js          # PostCSS 配置
├── SPEC.md                    # 详细设计规范
├── public/
│   └── favicon.svg            # 网站图标
└── src/
    ├── main.jsx               # React 入口
    ├── App.jsx                 # 根组件
    ├── index.css               # 全局样式
    ├── components/
    │   ├── SearchInput.jsx           # 搜索输入框
    │   ├── ParsedTags.jsx             # 解析标签展示
    │   ├── TalentCard.jsx             # 人才卡片
    │   ├── TalentDetail.jsx           # 人才详情面板
    │   ├── ResultList.jsx             # 结果列表
    │   ├── MatchScore.jsx             # 匹配度环形评分
    │   ├── ExampleQueries.jsx          # 示例查询
    │   ├── SlideOver.jsx              # 侧边抽屉
    │   ├── CustomQueryModal.jsx        # 自定义 Query 弹窗
    │   ├── AddSemanticKeywordModal.jsx # 语义关键词弹窗
    │   └── AiSummaryHighlight.jsx      # AI 摘要高亮
    ├── data/
    │   └── mockData.js          # Mock 数据（10-15 条员工记录）
    └── utils/
        ├── queryParser.js       # Query 解析逻辑
        ├── semanticVectorMock.js # 语义向量模拟
        ├── aiEvaluation.js     # AI 评分模拟
        └── highlightText.js    # 文本高亮工具
```

---

## 4. 快速开始

### 4.1 环境要求

- Node.js >= 16.0
- npm >= 8.0

### 4.2 安装与启动

```bash
# 克隆项目
git clone https://github.com/your-org/talent-atlas.git
cd talent-atlas

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

开发服务器默认运行在 `http://localhost:5173`

### 4.3 搜索示例

| # | Query | 解析结果 |
|---|-------|----------|
| 1 | "做过新能源项目的 P6 工程师" | 级别=P6, 语义=新能源项目 |
| 2 | "搜索做过大型分布式系统的技术专家" | 级别=技术专家→P7+, 语义=大型分布式系统 |
| 3 | "P7 以上，有带团队经验，做过商业化产品" | 级别≥P7, 语义=带团队, 商业化产品 |
| 4 | "华东区域，签约超过 500 万的销售" | 区域=华东, 语义=签约500万 |
| 5 | "最近两年晋升过，表现优秀的 P6" | 级别=P6, 时间=近两年, 语义=晋升 |

---

## 5. 设计规范

### 5.1 设计理念

**Technical Blueprint · Grid-Precise · Signal Blue**

设计灵感来自精密仪器的操作面板——冷静克制、网格感强、几乎像航空航天级的干净。不是"AI 聊天"界面，而是精密、高效、可信赖的组织工具。

### 5.2 色彩系统

| 用途 | 色值 | 说明 |
|------|------|------|
| 主背景 | `#F8FAFC` | 浅冷白 |
| 搜索区背景 | `#0F1623` | 深冷黑 |
| 强调/信号 | `#00A6E4` | 品牌蓝 |
| 边框/分割 | `#E2E8F0` | 浅灰 |
| 文字主 | `#0F1623` | 深色文字 |
| 文字副 | `#4A5568` | 次要文字 |
| 文字弱 | `#A0AEC0` | 弱化文字 |

### 5.3 字体系统

| 用途 | 字体 | 特点 |
|------|------|------|
| Display/Heading | Manrope | 几何无衬线，技术感 |
| Body | IBM Plex Sans | 极客企业感 |
| Mono | JetBrains Mono | 代码/标签展示 |

### 5.4 动效规范

- **缓动曲线**：`cubic-bezier(0.16, 1, 0.3, 1)`
- **功能性动画**：仅 fade + 微滑入，克制不喧哗
- **Query 解析**：分步揭示，每解析出一个元素弹出 tag（200ms spring）

---

## 6. 数据说明

### 6.1 Demo 数据状态

当前版本为 **Demo 定位**，包含：

- **Mock 数据**：10-15 条员工记录
- **Mock Query 解析**：基于规则的正则匹配，非真实 NLP
- **Mock 语义向量**：模拟 embedding 近邻扩展

### 6.2 员工数据 Schema

```javascript
{
  id: string,              // 员工 ID
  name: string,            // 姓名
  avatar: string,          // 头像 URL
  level: string,           // 职级 (P5-P9)
  bu: string,             // 事业部
  tenure: string,          // 司龄
  joinDate: string,        // 入职日期
  projects: [              // 项目经历
    {
      name: string,
      duration: string,
      description: string
    }
  ],
  evaluations: [],         // 考核评价
  peerFeedback: [],       // Peer 反馈
  promotions: [],          // 晋升记录
  tags: []                // 技能标签
}
```

---

## 7. 未来规划

### 7.1 数据层

- **数据源对接**：Workday + HR Plus 系统 → Hive
- **员工信息宽表**：基础信息
- **标签宽表**：技能/特长标签
- **文本字段**：考核、Peer 评价、晋升、目标、主管评价等

### 7.2 核心技术

| 难点 | 描述 |
|------|------|
| **混合检索** | 结构化字段 + 非结构化文本的联合检索 |
| **文本向量化** | 历史积累的文本数据高效 embedding |
| **检索效果** | 模糊文本的召回与排序优化 |
| **性能优化** | 3 万人数据规模的亚秒级检索延迟 |

---

## 8. 贡献指南

欢迎提交 Issue 和 Pull Request。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 9. 许可证

本项目采用 [MIT License](LICENSE)。

---

*Internal Use Only*
