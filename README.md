# Talent Atlas

企业内部人才搜索引擎，支持自然语言混合检索（结构化字段 + 非结构化文本）。

## 背景

服务于企业内部 3 万名员工的 talent 检索系统。历史积累了大量非结构化文本数据（项目经历、优劣势等），需要支持自然语言查询，混合结构化与非结构化检索。

## 核心功能

- **自然语言解析**：输入自然语言 query，自动解析出结构化条件（级别、事业部、技能）和语义搜索词
- **混合检索**：结构化字段 + 非结构化文本的联合检索
- **Query 解析可视化**：实时展示解析结果，便于理解和修正
- **Talent Card**：展示员工基础信息和匹配标签
- **详情面板**：展开查看员工项目经历、考核评价、peer 反馈、晋升记录等

## 技术栈

- **Framework**: Vite + React 18
- **Styling**: Tailwind CSS v3
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Manrope, IBM Plex Sans, JetBrains Mono (Google Fonts)

## 项目结构

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
│   │   ├── ExampleQueries.jsx
│   │   ├── SlideOver.jsx
│   │   ├── CustomQueryModal.jsx
│   │   └── AddSemanticKeywordModal.jsx
│   ├── data/
│   │   └── mockData.js
│   └── utils/
│       ├── queryParser.js
│       ├── semanticVectorMock.js
│       ├── aiEvaluation.js
│       └── highlightText.js
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 搜索示例

| Query | 解析结果 |
|-------|----------|
| "做过新能源项目的 P6 工程师" | 级别=P6, 语义=新能源项目 |
| "搜索做过大型分布式系统的技术专家" | 语义=大型分布式系统, 级别=技术专家→P7+ |
| "P7 以上，有带团队经验，做过商业化产品" | 级别≥P7, 语义=带团队, 商业化产品 |

## 设计关键词

**Technical Blueprint · Grid-Precise · Signal Blue**

设计灵感来自精密仪器的操作面板——冷静克制、网格感强、几乎像航空航天级的干净。不是"AI 聊天"界面，而是精密、高效、可信赖的组织工具。

## 状态说明

当前版本为 **Demo 定位**，展示"自然语言搜人"的核心体验和 Query 解析过程：

- Mock 数据（10-15 条员工记录）
- Mock Query 解析逻辑（规则匹配，非真实 NLP）
- Mock 语义向量（模拟 embedding 近邻扩展）

## 数据来源（规划中）

- **数据源**：Workday + HR Plus 系统 → Hive
- **员工信息宽表**：基础信息
- **标签宽表**：技能/特长标签
- **文本字段**：考核、peer 评价、晋升、目标、主管评价等

## 核心技术难点（规划中）

1. **混合检索**：结构化字段 + 非结构化文本的联合检索
2. **文本向量化**：历史积累的文本数据高效 embedding
3. **检索效果**：模糊文本的召回与排序
4. **性能**：3 万人数据规模的检索延迟

---

*Trip.com Group Internal Use Only*
