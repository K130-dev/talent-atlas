# Talent Atlas Demo - SPEC.md

> Demo 定位：给团队一个直观感知，展示"自然语言搜人"的核心体验和 Query 解析过程。

---

## 1. Concept & Vision

Talent Atlas 是一个**科技简约**的企业级人才搜索引擎。设计灵感来自精密仪器的操作面板——冷静克制、网格感强、几乎像航空航天级的干净。不是"AI 聊天"界面，而是精密、高效、可信赖的组织工具。

设计关键词：**Technical Blueprint · Grid-Precise · Signal Blue**

---

## 2. Design Direction

### 2.1 Aesthetic
- **Tone**: Technical Blueprint / Brutalist-minimal — 像精密仪器的操作面板，冷静克制
- **Reference**: Vercel Dashboard × Linear × 工程蓝图

### 2.2 Color Palette
| 用途 | 色值 |
|------|------|
| 主背景 | `#F8FAFC` 浅冷白 |
| 搜索区背景 | `#0F1623` 深冷黑 |
| 强调/信号 | `#00A6E4` 品牌蓝（仅关键时刻使用）|
| 边框/分割 | `#E2E8F0` 浅灰 |
| 文字主 | `#0F1623` |
| 文字副 | `#4A5568` |
| 文字弱 | `#A0AEC0` |

### 2.3 Typography
- **Display/Heading**: Manrope（几何无衬线，技术感）
- **Body**: IBM Plex Sans（极客企业感）
- **Mono**: JetBrains Mono（代码/标签）

### 2.4 Background Texture
搜索区使用微弱点阵纹理（dot grid），营造技术氛围

### 2.5 Motion
极度克制，仅功能性动画：fade + 微滑入，缓动 `cubic-bezier(0.16, 1, 0.3, 1)`

Demo 展示两个核心体验：
1. **搜索即所得**：输入自然语言，系统解析出你在找什么人，直接返回精准结果
2. **看见 AI 在思考**：Query 解析过程可视化，让团队理解 NLP 在做什么

---

## 2. Design Language

### 2.1 Aesthetic Direction
**"Golden Hour" Editorial** —— 灵感来自高端商业杂志的排版 + 黄金时刻的温暖光线。深色沉浸式搜索区 + 温暖米白内容区。

### 2.2 Color Palette
```css
--color-bg-dark: #1a1814;        /* 深邃暖黑，搜索区域背景 */
--color-bg-card: #faf8f5;        /* 温暖米白，内容卡片背景 */
--color-gold: #c9a55c;           /* 金沙色，主强调色 */
--color-gold-light: #e8d5a3;     /* 浅金，hover 状态 */
--color-amber: #b8860b;           /* 琥珀深金，次要强调 */
--color-text-primary: #2d2a26;   /* 深棕黑，主文字 */
--color-text-secondary: #6b6560; /* 中灰，副文字 */
--color-text-light: #f5f3ef;     /* 浅色文字，在深色背景上 */
--color-accent-blue: #5b8fb9;    /* 冷蓝，用于"结构化条件"标签 */
--color-accent-green: #7fb069;   /* 柔和绿，用于"语义匹配"标签 */
--color-border: #e8e4de;         /* 暖灰边框 */
```

### 2.3 Typography
- **Display Font**: `Fraunces` (Google Fonts) — 有机衬线，优雅独特，用于大标题和数字
- **Body Font**: `DM Sans` — 清晰现代，无衬线，用于正文和标签
- **Mono Font**: `JetBrains Mono` — 用于 Query 解析的代码展示

### 2.4 Spatial System
- 基础单位：4px
- 组件间距：16px / 24px / 32px / 48px
- 卡片圆角：12px
- 输入框圆角：24px（胶囊形）

### 2.5 Motion Philosophy
- **Page Load**: 搜索区域淡入（400ms），结果列表从下往上 stagger 进入（100ms 间隔）
- **Query 解析可视化**: 分步揭示，每解析出一个元素就弹出一个 tag（200ms spring）
- **结果悬停**: 卡片轻微上浮 + 阴影加深（150ms ease-out）
- **Card 展开**: 平滑高度过渡 + 内容淡入（300ms ease-out）
- 所有动画使用 `cubic-bezier(0.34, 1.56, 0.64, 1)` 弹簧曲线

### 2.6 Visual Assets
- **Icons**: Lucide Icons（线性风格，stroke-width: 1.5）
- **Decorative**: 细微噪点纹理叠加在深色背景上，增加质感
- **Favicon**: 金色 Atlas 图标（Atlas = 地图集 = 人才图谱）

---

## 3. Layout & Structure

### 3.1 整体布局
```
┌─────────────────────────────────────────────────────────────┐
│  Header: Logo + "Talent Atlas" + 副标题                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           搜索区域（深色沉浸式）                       │   │
│  │  ┌───────────────────────────────────────────────┐   │   │
│  │  │  🔍  输入自然语言 query...                    │   │   │
│  │  └───────────────────────────────────────────────┘   │   │
│  │                                                      │   │
│  │  Query 解析可视化区域（解析出的标签）                   │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐                   │   │
│  │  │ 级别:P6 │ │事业部:ES│ │做过新能│  ← 点击可编辑      │   │
│  │  └────────┘ └────────┘ └────────┘  │                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────┐   ┌──────────────────────────────────┐  │
│  │  结果统计      │   │  搜索结果列表                     │  │
│  │  找到 12 位    │   │  ┌────────────────────────────┐  │  │
│  │  匹配人才      │   │  │ Talent Card               │  │  │
│  │               │   │  │ 姓名 · 级别 · 事业部        │  │  │
│  │  ─────────    │   │  │ [匹配标签] [匹配标签]      │  │  │
│  │               │   │  │ 摘要文字...                 │  │  │
│  │  示例 Query   │   │  └────────────────────────────┘  │  │
│  │  ┌────────┐  │   │  ┌────────────────────────────┐  │  │
│  │  │query 1 │  │   │  │ Talent Card               │  │  │
│  │  └────────┘  │   │  │ ...                        │  │  │
│  │  ┌────────┐  │   │  └────────────────────────────┘  │  │
│  │  │query 2 │  │   │                                   │  │
│  │  └────────┘  │   └──────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Talent Card 展开详情
点击 Card 展开后：
- 左侧：员工基础信息（头像、姓名、级别、事业部、入职时间）
- 右侧：历史数据分 Tab 展示（项目经历 / 考核评价 / peer 反馈 / 晋升记录）
- 长文本自动折叠为"关键提炼"，悬停或点击展开

---

## 4. Features & Interactions

### 4.1 搜索输入
- **Placeholder**: "搜索人才... 例如：做过新能源项目的 P6 工程师"
- **实时解析**: 输入后 300ms 无变化，触发 Query 解析
- **键盘**: Enter 执行搜索，Escape 清空

### 4.2 Query 解析可视化
- **解析元素类型**:
  - 🔵 结构化条件（级别、事业部、技能）— 蓝色标签
  - 🟢 语义搜索词（项目、经历描述）— 绿色标签
- **交互**: 点击标签可编辑/删除，模拟人工修正

### 4.3 结果列表
- 显示匹配总分 + 分项得分（结构化匹配 / 语义相似度）
- 悬停高亮相关匹配词
- 按匹配度降序排列

### 4.4 Talent Card
- 显示：姓名、头像占位、级别、事业部、司龄
- 匹配标签高亮（为什么搜到你）
- 摘要：3行文本总结

### 4.5 Card 展开详情
- Tab 切换：项目经历 / 考核评价 / peer反馈 / 晋升记录
- 每条记录显示时间和关键内容
- "原始数据"折叠展示长文本

### 4.6 示例 Query 侧边栏
- 点击直接填充并执行搜索
- 预设 4-5 个不同场景的 query

---

## 5. Component Inventory

### 5.1 SearchInput
- **Default**: 深色背景，浅色文字，placeholder 渐隐
- **Focus**: 金色光晕边框，`box-shadow: 0 0 0 3px rgba(201, 165, 92, 0.3)`
- **Loading**: 右侧显示金色 spinner
- **Filled**: 右侧显示金色清除按钮

### 5.2 ParsedTag
- **结构化标签**: 蓝色背景 `#5b8fb9`，白色文字，左侧有 filter 图标
- **语义标签**: 绿色背景 `#7fb069`，白色文字，左侧有 sparkles 图标
- **Hover**: 轻微放大 + 边框高亮，可删除
- **Removable**: hover 显示 x 按钮

### 5.3 TalentCard
- **Default**: 米白背景，左侧金色竖条表示匹配度
- **Hover**: 上浮 4px，阴影加深
- **匹配标签**: 小圆角标签，背景为金色半透明 `rgba(201, 165, 92, 0.15)`

### 5.4 MatchScore
- 圆形进度环，金色填充
- 中心显示数字（0-100）

### 5.5 ExampleQuery
- 深色背景按钮，悬停边框变金色
- 左侧有 💡 图标

---

## 6. Technical Approach

### 6.1 Stack
- **Framework**: Vite + React 18
- **Styling**: Tailwind CSS v3 + CSS Variables（用于主题色）
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts（Fraunces, DM Sans, JetBrains Mono）

### 6.2 项目结构
```
talent-atlas/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── SearchInput.jsx
│   │   ├── ParsedTags.jsx
│   │   ├── TalentCard.jsx
│   │   ├── TalentDetail.jsx
│   │   ├── ResultList.jsx
│   │   ├── MatchScore.jsx
│   │   └── ExampleQueries.jsx
│   ├── data/
│   │   └── mockData.js
│   └── utils/
│       └── queryParser.js
```

### 6.3 Query 解析逻辑（Mock）
由于是 Demo，采用规则匹配模拟 NLP：
- 正则提取 "P[0-9]" → 级别
- 关键词匹配事业部：搜索 / 销售 / 运营 / 技术 / 产品 等
- 技能关键词：Java / Python / React / Vue / 架构 / 管理 等
- 剩余文本作为语义搜索词

### 6.4 Mock 数据
10-15 条员工记录，每条包含：
- 基本信息：姓名、头像（占位符）、级别、事业部、司龄
- 项目经历（长文本）
- 考核评价（文本）
- peer 反馈（文本）
- 晋升记录（文本）
- 标签（数组）

---

## 7. Demo Query 示例

| # | Query | 解析结果 |
|---|-------|----------|
| 1 | "做过新能源项目的 P6 工程师" | 级别=P6, 语义=新能源项目 |
| 2 | "搜索做过大型分布式系统的技术专家" | 语义=大型分布式系统, 级别=技术专家→P7+ |
| 3 | "P7 以上，有带团队经验，做过商业化产品" | 级别≥P7, 语义=带团队, 商业化产品 |
| 4 | "华东区域，签约超过 500 万的销售" | 区域=华东, 语义=签约500万 |
| 5 | "最近两年晋升过，表现优秀的 P6" | 语义=晋升, 时间=近两年, 级别=P6 |
