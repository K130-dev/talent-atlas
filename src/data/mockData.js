// Trip.com 真实的员工数据 Mock
// 基于 edw_emp_ful schema 和真实业务场景

export const mockEmployees = [
  {
    id: 1,
    emp_code: 'T002847',
    name: '张明辉',
    name_en: 'ZHANG MH',
    level: '7',
    level_value: 7,
    pstn_sqnc: 'T',
    pstn_sqnc_name: '技术/研发序列',
    bu_id: 'BU001',
    bu_name: 'BG-机票事业群',
    bu_cname: 'BG-机票事业群',
    dept_name: '平台技术部',
    team_name: '交易链路组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '硕士',
    is_high_edctn: 1,
    is_foreign_degree: 0,
    is_foreign_experience: 0,
    source: '社招',
    hire_date: '2018-06-15',
    tenure: 7,
    hasPermission: true,
    bpContact: 'hr-bp-ticket@trip.com',
    tags: ['分布式架构', '高并发系统', 'Java', '技术专家', '团队管理'],
    aiEvaluation: {
      mainWork:
        '机票事业群资深架构师，任职交易链路组。主导机票瞬时引擎与新一代交易中台的架构设计与落地，负责高并发场景下的容量规划、限流降级与线上稳定性；深度参与国际化机票系统在多地区的部署与合规改造，支撑核心交易链路日均亿级调用。',
      strengths:
        '分布式与高并发系统设计与调优经验丰富，曾将峰值 QPS 从 8 万提升至 25 万、P0 故障率显著下降；具备大规模国际化项目落地与跨团队推动能力；技术判断果断，团队管理与人才培养表现突出，多次获得 BU 技术突破奖，是团队公认的技术主心骨。',
      weaknesses:
        '对非机票核心域业务投入相对有限，部分历史系统重构周期长、协调成本高；对外技术布道与标准化文档沉淀仍有提升空间；在资源极度紧张时需更好平衡短期交付与长期技术债偿还。',
    },
    projects: `2024：主导机票瞬时引擎重构，峰值 QPS 从 8 万提升至 25 万，P0 故障率下降 80%
2023：设计并落地新一代交易中台，支持日均 500 万次机票查询，系统可用性达 99.99%
2022：主导双十一机票抢购系统优化，抢票成功率达到 99.2%，获得 BU 技术突破奖
2021：作为核心架构师参与国际化项目，支持 20+ 国家和地区机票系统上线`,
    evaluations: `2024年度（BU排名前15%）：技术深度卓越，主导的瞬时引擎项目是年度技术标杆，强烈推荐晋升
2023年度：持续高绩效，在交易中台项目中表现突出，是团队技术领军人物
2022年度：独立解决多个历史技术债务问题，技术决策前瞻性好`,
    peerFeedback: `协作过的同事评价：方案设计严谨靠谱，项目推进稳健，是"最不想离职的搭档"。多次被票选为"最佳技术搭档"称号。`,
    promotion: `2022年 6→7（提前半年晋升）
2019年 5→6`,
  },
  {
    id: 2,
    emp_code: 'T003129',
    name: '李雪琴',
    name_en: 'LI XQ',
    level: '6',
    level_value: 6,
    pstn_sqnc: 'T',
    pstn_sqnc_name: '技术/研发序列',
    bu_id: 'BU006',
    hasPermission: false,
    bpContact: 'hr-bp-fu@trip.com',
    bu_name: 'FU-技术中心',
    bu_cname: 'FU-技术中心',
    dept_name: '智能化研发部',
    team_name: '搜索算法组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '硕士',
    is_high_edctn: 1,
    is_foreign_degree: 0,
    is_foreign_experience: 0,
    source: '校招',
    hire_date: '2020-07-01',
    tenure: 5,
    tags: ['搜索算法', 'NLP', 'Python', '机器学习', '数据挖掘'],
    aiEvaluation: {
      mainWork:
        'FU 技术中心搜索算法组骨干，硕士背景。负责住宿搜索排序、召回与相关性策略，主导住宿搜索体验优化与 AB 测试体系建设；将 NLP 与语义召回能力落地到核心搜索链路，支撑长尾 query 与多业务场景下的搜索质量持续提升。',
      strengths:
        '搜索算法与 NLP 功底扎实，擅长排序、召回与实验设计；CTR、转化率与 GMV 等指标有显著可量化成果；数据驱动意识强，能快速与产品、工程协作推进迭代，是搜索方向的核心算法人才。',
      weaknesses:
        '对非搜索域业务（如支付、供应链）理解仍可加深；部分模型可解释性与业务方沟通成本偏高；在多人并行项目时优先级与排期管理需更精细。',
    },
    projects: `2024：住宿搜索排序算法优化，CTR 提升 23%，转化率提升 18%，直接带动 GMV 增长 1.2 亿
2023：设计并实现基于语义匹配的召回系统，解决长尾 query 召回不足问题，召回率提升 35%
2022：主导搜索体验优化项目，建立完整的 AB 测试体系，支撑搜索核心指标持续增长`,
    evaluations: `2024年度（BU排名前10%）：算法深度好，主导项目商业价值显著，是搜索算法的核心人才
2023年度：主导的语义搜索项目成为集团标杆案例
2022年度：快速成长为团队核心算法工程师，独立承担重点项目`,
    peerFeedback: `算法组同事称她为"搜索百科"，对搜索业务理解深入，能快速定位问题根因。代码 review 认真负责。`,
    promotion: `2022年 5→6
2020年 4→5（校招入职）`,
  },
  {
    id: 3,
    emp_code: 'T001056',
    name: '王建国',
    name_en: 'WANG JG',
    level: '8',
    level_value: 8,
    pstn_sqnc: 'T',
    pstn_sqnc_name: '技术/研发序列',
    bu_id: 'BU001',
    bu_name: 'BG-机票事业群',
    bu_cname: 'BG-机票事业群',
    dept_name: '技术管理部',
    team_name: '架构组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '本科',
    is_high_edctn: 1,
    is_foreign_degree: 1,
    is_foreign_experience: 1,
    source: '社招',
    hire_date: '2015-03-20',
    tenure: 11,
    tags: ['技术管理', '架构设计', '团队建设', '商业化', '高并发'],
    aiEvaluation: {
      mainWork:
        '机票事业群技术管理高层，负责事业群整体技术规划与重大架构决策。带领核心团队攻坚国际化、高并发与商业化场景，推动技术营收与平台能力建设；统筹多部门协作与资源分配，对关键项目交付与技术风险负责。',
      strengths:
        '兼具架构视野与商业化落地能力，技术决策稳健；在团队建设上培养多名骨干，跨部门影响力强；曾主导千万级大客户与国际化项目，在高压场景下仍能保持交付与口碑。',
      weaknesses:
        '管理幅度大，对一线代码细节与执行细节介入有限；部分创新项目推进依赖团队自驱，对执行偏弱的团队需更多过程管理；对外公开演讲与品牌曝光相对较少。',
    },
    projects: `2024：负责机票事业群整体技术规划，主导商业化技术方案落地，实现技术营收 3.2 亿
2023：带领 40 人核心团队完成多个技术攻坚，国际化项目支撑 20+ 国家上线
2022：推动开源社区建设，机票技术团队成为集团开源标杆团队
2021：主导千万级大客户定制化项目签约，单项目金额超 2000 万`,
    evaluations: `2024年度（BU排名前5%）：技术视野宽广，管理能力突出，是机票技术领域的领军人才
2023年度：超额完成商业化目标，培养出 3 名 7，团队技术氛围显著提升
2022年度：技术决策前瞻，规避多次重大技术风险，晋升 8 评审全票通过`,
    peerFeedback: `跨部门协作中评价极高："懂技术更懂业务，能站在公司角度思考问题，是真正的高级技术管理者。"`,
    promotion: `2022年 7→8（破格晋升）
2018年 6→7
2015年 5→6（社招入职定级）`,
  },
  {
    id: 4,
    emp_code: 'T003547',
    name: '陈晓燕',
    name_en: 'CHEN XY',
    level: '6',
    level_value: 6,
    pstn_sqnc: 'PT',
    pstn_sqnc_name: '产品序列',
    bu_id: 'BU002',
    bu_name: 'BG-大住宿事业群',
    bu_cname: 'BG-大住宿事业群',
    dept_name: '住宿产品部',
    team_name: '用户体验组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '本科',
    is_high_edctn: 1,
    is_foreign_degree: 0,
    is_foreign_experience: 0,
    source: '社招',
    hire_date: '2019-08-12',
    tenure: 6,
    tags: ['产品设计', '用户增长', '数据分析', 'A/B测试', '住宿业务'],
    aiEvaluation: {
      mainWork:
        '大住宿产品部骨干，负责频道体验、会员体系与增长相关产品线。主导住宿频道改版、会员积分与海外本地化等关键项目，通过 A/B 实验与数据分析驱动迭代，对业务指标与用户满意度双线负责。',
      strengths:
        '数据驱动与用户体验并重，能用数据讲清产品故事；多次获得业务增长与体验优化双成果，跨部门协作顺畅；需求抽象与方案设计能力突出，是团队信赖的产品负责人。',
      weaknesses:
        '对技术实现边界与排期评估偶有偏差，需与研发更早对齐；在强竞争与多目标并行时，优先级取舍有时不够果断；对 B 端与后台产品经验相对少于 C 端。',
    },
    projects: `2024：主导住宿频道改版设计，新版首页点击率提升 35%，转化率提升 22%
2023：通过数据挖掘发现长尾需求，推动多个功能优化，直接提升用户留存率 8%
2022：主导会员积分体系优化项目，付费转化率提升 40%，当年带来增量收入 5000 万
2021：独立负责海外住宿产品本地化，支持 10+ 国家/地区上线`,
    evaluations: `2024年度（BU排名前12%）：产品感觉敏锐，数据驱动决策能力强，是大住宿产品团队的核心
2023年度：主导的项目多次获得集团创新奖
2022年度：快速融入团队，独立承担核心模块，表现超出预期`,
    peerFeedback: `"总能提出让人眼前一亮的 idea，同时又能用数据说服团队，是最受欢迎的产品经理之一。"`,
    promotion: `2022年 5→6
2019年 4→5（社招入职）`,
  },
  {
    id: 5,
    emp_code: 'T002891',
    name: '刘志强',
    name_en: 'LIU ZQ',
    level: '7',
    level_value: 7,
    pstn_sqnc: 'T',
    pstn_sqnc_name: '技术/研发序列',
    bu_id: 'BU005',
    bu_name: 'MBU-商旅事业部',
    bu_cname: 'MBU-商旅事业部',
    dept_name: '企业服务部',
    team_name: '大客户组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '硕士',
    is_high_edctn: 1,
    is_foreign_degree: 0,
    is_foreign_experience: 0,
    source: '社招',
    hire_date: '2017-10-25',
    tenure: 8,
    tags: ['商旅系统', '企业级产品', 'Java', '大客户管理', '商业化'],
    aiEvaluation: {
      mainWork:
        '商旅事业部企业服务方向骨干，负责大客户系统与企业级交付。主导商旅核心系统重构与客户成功体系建设，从 0 到 1 沉淀行业解决方案；对接头部企业客户，支撑高并发订单与复杂合同场景，对续约率与签约金额等关键指标负责。',
      strengths:
        '技术与商务复合能力强，谈判与客户成功表现突出；续约率与签约金额在事业部内领先；能沉淀可复用的行业方案与交付方法论，团队作战与带人能力俱佳。',
      weaknesses:
        '对中小客户与标准化产品线的投入相对有限；部分技术方案偏业务定制，长期平台化成本需关注；在多头客户并行时资源协调压力较大。',
    },
    projects: `2024：主导商旅大客户系统重构，支持单客户日均 10 万+订单，企业客户续费率提升至 95%
2023：带领 5 人团队深耕企业客户市场，连续两年超额完成指标，签约金额超 8000 万
2022：从 0 到 1 建立客户成功体系，制定商旅行业解决方案标准
2021：主导首个千万级企业商旅项目签约，成为商旅行业标杆案例`,
    evaluations: `2024年度（BU排名前8%）：商业敏感度高，谈判能力强，是商旅事业部的 Top Sales Engineer
2023年度：培养 2 名 6，团队作战能力显著提升
2022年度：个人业绩位列商旅事业部第一`,
    peerFeedback: `"商旅团队的定海神针，再难搞的大客户到他手里都能搞定，是技术和商业的桥梁型人才。"`,
    promotion: `2023年 6→7（超额完成业绩）
2020年 5→6
2017年 5（社招入职定级）`,
  },
  {
    id: 6,
    emp_code: 'T004128',
    name: '赵敏',
    name_en: 'ZHAO M',
    level: '5',
    level_value: 5,
    pstn_sqnc: 'T',
    pstn_sqnc_name: '技术/研发序列',
    bu_id: 'BU003',
    bu_name: 'BG-旅游事业群',
    bu_cname: 'BG-旅游事业群',
    dept_name: '前端技术部',
    team_name: 'Web开发组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '本科',
    is_high_edctn: 1,
    is_foreign_degree: 0,
    is_foreign_experience: 0,
    source: '校招',
    hire_date: '2022-07-04',
    tenure: 3,
    tags: ['前端开发', 'React', 'TypeScript', '性能优化', 'Node.js'],
    aiEvaluation: {
      mainWork:
        '旅游事业群前端组骨干，React/TypeScript 技术栈扎实。负责旅游频道与核心业务模块的前端架构与交付，主导首屏性能优化、工程化与组件库建设；参与内部开源组件贡献，支撑多条业务线复用与迭代效率。',
      strengths:
        '性能优化与工程化意识强，LCP 等指标有明确改进成果；成长快、交付稳定，代码质量与 code review 口碑好；协作积极，能快速理解业务并落地技术方案。',
      weaknesses:
        '后端与全链路视角仍在积累，复杂 BFF 与网关场景需更多历练；在超大团队协作中推动标准统一时偶有困难；对视觉与交互细节的极致追求有时影响排期。',
    },
    projects: `2024：主导旅游频道首屏性能优化，LCP 从 3.2s 降至 1.8s，获集团前端创新奖
2023：独立完成多个重要业务模块的前端架构设计，建立统一组件库
2022：参与开源组件库建设，提交的 5 个组件被内部广泛使用`,
    evaluations: `2024年度（BU排名前20%）：成长速度快，技术栈全面，代码质量稳定，是前端团队的新生力量
2023年度：独立承接核心项目，表现超出预期
2022年度：校招入职，快速学习业务知识，展现出潜力`,
    peerFeedback: `"写代码思路清晰，code review 总是很仔细，是个值得信赖的同事。前端组最愿意合作的人之一。"`,
    promotion: `2023年 4→5（提前晋升）
2022年 3→4（校招入职）`,
  },
  {
    id: 7,
    emp_code: 'T002334',
    name: '孙伟',
    name_en: 'SUN W',
    level: '6',
    level_value: 6,
    pstn_sqnc: 'PT',
    pstn_sqnc_name: '产品序列',
    bu_id: 'BU004',
    bu_name: 'BG-火车票事业群',
    bu_cname: 'BG-火车票事业群',
    dept_name: '用户增长部',
    team_name: '活动运营组',
    location: '北京',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '本科',
    is_high_edctn: 1,
    is_foreign_degree: 0,
    is_foreign_experience: 0,
    source: '社招',
    hire_date: '2020-09-14',
    tenure: 5,
    tags: ['用户运营', '活动策划', '数据分析', '增长黑客', '火车票业务'],
    aiEvaluation: {
      mainWork:
        '火车票事业群用户增长与运营方向，负责大促活动、会员体系与新客获取等核心指标。基于数据洞察设计并落地运营策略，在春运等峰值场景下统筹资源与节奏，对 DAU、GMV 与用户留存等业务结果直接负责。',
      strengths:
        '数据敏感、策略清晰，大促与会员玩法经验丰富；能持续拉动 GMV 与留存，跨部门协同与执行力强；在高压节点下仍能保持策略落地与复盘沉淀。',
      weaknesses:
        '对底层技术与数据基建依赖较强，自建能力有限；在品牌与创意侧资源不足时，活动同质化风险需警惕；长期规划与短期 KPI 冲突时需更强取舍。',
    },
    projects: `2024：设计并执行的春节火车票营销活动，DAU 峰值达 5000 万，刷新历史记录
2023：通过数据挖掘发现业务机会，推动多个运营策略优化，直接提升 GMV 12%
2022：主导会员体系优化项目，付费转化率提升 40%，年度增量收入超 3000 万
2021：独立负责新客获取项目，首单转化率提升 25%`,
    evaluations: `2024年度（BU排名前10%）：数据敏感度高，策略清晰，执行力强，是火车票运营团队的顶梁柱
2023年度：独立承担核心业务指标，春节期间活动效果创历史新高
2022年度：快速学习业务知识，展现出潜力`,
    peerFeedback: `"数据分析能力强，总能从数据中发现业务机会，是运营团队最信赖的数据搭档。"`,
    promotion: `2022年 5→6
2020年 4→5（社招入职）`,
  },
  {
    id: 8,
    emp_code: 'T000892',
    name: '周莉',
    name_en: 'ZHOU L',
    level: '8',
    level_value: 8,
    pstn_sqnc: 'T',
    pstn_sqnc_name: '技术/研发序列',
    bu_id: 'BU006',
    bu_name: 'FU-技术中心',
    bu_cname: 'FU-技术中心',
    dept_name: '基础架构部',
    team_name: '中间件组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '博士',
    is_high_edctn: 1,
    is_foreign_degree: 1,
    is_foreign_experience: 1,
    source: '社招',
    hire_date: '2014-07-07',
    tenure: 12,
    tags: ['技术管理', '中间件', '架构', '团队建设', '云原生'],
    aiEvaluation: {
      mainWork:
        'FU 技术中心基础架构部负责人，博士背景。负责集团级微服务、消息队列与容器化改造等技术规划与落地，支撑全集团大规模服务稳定运行；统筹中间件团队建设、人才培养与跨 BU 技术协同，对可用性与演进路线负总责。',
      strengths:
        '技术与管理双强，中间件与云原生领域权威；在消息队列、稳定性与团队氛围建设上成果突出；技术决策稳健，培养多名骨干，跨部门话语权高。',
      weaknesses:
        '管理幅度大，对业务一线痛点响应有时滞后；部分演进项目周期长，业务方感知不强时易产生张力；对外技术品牌与开源影响力仍有提升空间。',
    },
    projects: `2024：负责基础架构部技术规划，主导微服务架构升级，支撑全集团 200+ 服务稳定运行
2023：设计并落地的新一代消息队列系统，支撑日均万亿级消息，零生产事故
2022：培养出 3 名 7，团队离职率降至 5% 以下，氛围建设获集团优秀
2021：主导容器化改造，公司应用全面上云，资源利用率提升 50%，年度节省成本 2000 万`,
    evaluations: `2024年度（集团排名前3%）：技术深度和管理能力兼备，是集团中间件领域的权威
2023年度：在团队管理和技术输出两方面均表现突出，是 FU 技术中心的核心人物
2022年度：技术决策稳健，培养出多名 7，是大家心中的"技术灯塔"`,
    peerFeedback: `"周老师是团队的技术灯塔，有她在大家心里都踏实，是最值得信赖的技术 leader。"`,
    promotion: `2020年 7→8
2016年 6→7
2014年 5→6（社招入职）`,
  },
  {
    id: 9,
    emp_code: 'T003891',
    name: '吴昊',
    name_en: 'WU H',
    level: '5',
    level_value: 5,
    pstn_sqnc: 'S',
    pstn_sqnc_name: '一线客服序列',
    bu_id: 'BU002',
    bu_name: 'BG-大住宿事业群',
    bu_cname: 'BG-大住宿事业群',
    dept_name: '客户服务部',
    team_name: '高星级酒店组',
    location: '深圳',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '本科',
    is_high_edctn: 1,
    is_foreign_degree: 0,
    is_foreign_experience: 0,
    source: '社招',
    hire_date: '2021-11-08',
    tenure: 4,
    tags: ['客户服务', '酒店业务', '投诉处理', '高星级酒店', '用户满意度'],
    aiEvaluation: {
      mainWork:
        '大住宿一线客服，专注高星级酒店场景与复杂客诉处理。负责重大投诉升级、赔付协商与品牌危机化解，参与客服智能化与 FAQ 机器人等项目；在峰值与大促时段保障服务体验与满意度指标。',
      strengths:
        '服务意识强，满意度与口碑在部门内突出；能在高压与情绪化场景下稳定沟通与交付；带教新人积极，多次获得用户表扬与内部表彰。',
      weaknesses:
        '职业路径偏执行，向质检、培训或运营转岗需系统能力补充；对部分业务规则与系统工具的深度仍可提高；长期重复高压工作带来的倦怠需关注。',
    },
    projects: `2024：高星级酒店客诉满意度达 98.5%，位列部门第一，年度 TOP 客服
2023：独立处理多起重大客诉事件，包括首次万元赔付协商，成功化解品牌危机
2022：参与客服智能化升级项目，推动 FAQ 机器人覆盖率提升至 70%
2021：作为骨干参与双十一大促，峰值时段客户满意度达历史最高`,
    evaluations: `2024年度（BU排名前5%）：服务意识强，问题解决能力突出，是高星级酒店客服的标杆
2023年度：多次收到用户锦旗和表扬信，是团队的服务之星
2022年度：快速成长为组内骨干，独立带教 2 名新员工`,
    peerFeedback: `"服务意识强，用户至上，是那种能让用户从生气到满意的客服，真正诠释了优质服务的含义。"`,
    promotion: `2023年 4→5（提前晋升）
2021年 3→4（社招入职）`,
  },
  {
    id: 10,
    emp_code: 'T002167',
    name: '郑晓丽',
    name_en: 'ZHENG XL',
    level: '7',
    level_value: 7,
    pstn_sqnc: 'PT',
    pstn_sqnc_name: '产品序列',
    bu_id: 'BU006',
    bu_name: 'FU-技术中心',
    bu_cname: 'FU-技术中心',
    dept_name: '数据产品部',
    team_name: '数据中台组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '硕士',
    is_high_edctn: 1,
    is_foreign_degree: 0,
    is_foreign_experience: 0,
    source: '校招',
    hire_date: '2018-07-02',
    tenure: 8,
    tags: ['数据产品', 'B端产品', '商业化', '数据中台', '平台化'],
    aiEvaluation: {
      mainWork:
        'FU 技术中心数据产品方向，负责数据中台规划、数据治理与 B 端商业化产品。主导开放平台与商业化方案设计，对接大客户定制化需求，推动数据能力在集团内多业务方落地，对收入与覆盖度等结果负责。',
      strengths:
        'B 端商业化与平台化能力强，商业感觉与产品规划能力突出；能平衡标准产品与定制需求，跨团队推动能力强；业绩与影响力在数据产品线领先。',
      weaknesses:
        '对底层数据工程与实时链路的细节掌控依赖协作方；在强监管与合规场景下的方案经验可继续积累；多项目并行时对团队梯队建设投入有限。',
    },
    projects: `2024：主导数据中台产品规划，建立完整的数据治理和产品体系，支撑 30+ 业务方
2023：设计的商业化数据方案，当年为公司带来 3000 万增量收入，超额完成 KPI
2022：推动开放平台建设，引入 50+ 合作伙伴，成为集团 B 端产品的标杆
2021：负责多个千万级大客户定制化需求的产品设计，满意度达 100%`,
    evaluations: `2024年度（集团排名前8%）：商业感觉好，产品规划能力强，是数据 B 端产品的核心人才
2023年度：商业化目标超额完成，产品影响力持续扩大
2022年度：独立承担战略产品线，表现出色`,
    peerFeedback: `"视野开阔，善于站在客户角度思考问题，是真正懂商业的产品人。与数据团队合作的首选搭档。"`,
    promotion: `2022年 6→7
2019年 5→6
2018年 4→5（校招入职）`,
  },
  {
    id: 11,
    emp_code: 'T003412',
    name: '黄文强',
    name_en: 'HUANG WQ',
    level: '6',
    level_value: 6,
    pstn_sqnc: 'T',
    pstn_sqnc_name: '技术/研发序列',
    bu_id: 'BU003',
    bu_name: 'BG-旅游事业群',
    bu_cname: 'BG-旅游事业群',
    dept_name: '研发部',
    team_name: '订单系统组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '本科',
    is_high_edctn: 1,
    is_foreign_degree: 0,
    is_foreign_experience: 0,
    source: '社招',
    hire_date: '2019-04-15',
    tenure: 7,
    tags: ['后端开发', 'Java', '分布式', '订单系统', '高可用'],
    aiEvaluation: {
      mainWork:
        '旅游事业群订单系统组后端骨干，负责核心交易链路的性能、稳定性与架构演进。主导订单系统性能优化与架构升级，建设全链路可观测与故障定位能力；参与大促保障与历史技术债治理，对 SLA 与峰值承载负责。',
      strengths:
        'Java 与分布式系统经验丰富，性能与稳定性治理能力强；可观测与故障定位能力突出，能啃硬骨头；交付靠谱，是订单域值得信赖的技术骨干。',
      weaknesses:
        '对前端与端上体验关注相对少；在跨域架构争议中有时过于坚持技术最优解，需增强业务折中沟通；文档与知识传承可更体系化。',
    },
    projects: `2024：负责旅游订单系统性能优化，峰值 QPS 提升 60%，响应时间降低 40%
2023：主导旅游订单架构升级，实现全链路可观测，故障定位时间从小时级降至分钟级
2022：独立解决多个历史遗留技术难题，系统稳定性从 99.5% 提升至 99.95%
2021：参与国庆黄金周大促保障，订单系统零故障，峰值处理能力达历史最高`,
    evaluations: `2024年度（BU排名前15%）：技术扎实，能啃硬骨头，是旅游订单系统的技术骨干
2023年度：在架构升级项目中表现突出，被评为年度优秀工程师
2022年度：快速成长，独立承担核心模块`,
    peerFeedback: `"代码质量高，问题排查思路清晰，是靠谱的技术搭档。订单组最让人放心的存在。"`,
    promotion: `2022年 5→6
2019年 4→5（社招入职）`,
  },
  {
    id: 12,
    emp_code: 'T001623',
    name: '林晓峰',
    name_en: 'LIN XF',
    level: '7',
    level_value: 7,
    pstn_sqnc: 'T',
    pstn_sqnc_name: '技术/研发序列',
    bu_id: 'BU006',
    bu_name: 'FU-技术中心',
    bu_cname: 'FU-技术中心',
    dept_name: '基础架构部',
    team_name: '云平台组',
    location: '上海',
    is_on_job: 1,
    is_china_mnlnd: 1,
    edctn_dgre: '硕士',
    is_high_edctn: 1,
    is_foreign_degree: 1,
    is_foreign_experience: 0,
    source: '社招',
    hire_date: '2016-09-12',
    tenure: 10,
    tags: ['架构设计', '云原生', 'Kubernetes', 'FinOps', 'DevOps'],
    aiEvaluation: {
      mainWork:
        'FU 技术中心云平台组骨干，云原生与 FinOps 方向专家。主导集团云原生改造、多云架构与 DevOps 体系建设，推动资源调度与成本优化；支撑海外站点与国际化业务的技术底座，对工程效率与云成本等核心指标负责。',
      strengths:
        'Kubernetes 与多云架构经验丰富，降本增效成果量化突出；能把复杂技术讲得清晰，推动跨团队落地；在 FinOps 与稳定性之间平衡能力好，获业务与管理层认可。',
      weaknesses:
        '部分项目依赖厂商与开源组件，自研内核能力可继续加强；在强业务迭代压力下，长期架构债偿还节奏偏慢；对外技术布道与专利等产出可更多。',
    },
    projects: `2024：主导集团云原生改造，应用全面上云，资源利用率提升 55%，年度节省云成本 3000 万
2023：设计并落地 DevOps 体系，交付效率提升 3 倍，支撑业务快速迭代
2022：负责多云架构规划，为公司国际化业务打下技术基础，支撑 30+ 海外站点
2021：主导 FinOps 项目，通过智能调度和资源优化，年度云成本节省超 2000 万`,
    evaluations: `2024年度（集团排名前5%）：云原生领域专家，推动集团技术架构演进，是 FU 的核心架构师
2023年度：在降本增效方面做出突出贡献，获集团技术创新奖
2022年度：DevOps 体系建设获公司创新奖，多云架构获 CTO 特别嘉奖`,
    peerFeedback: `"云原生领域的活字典，有技术难题找他准没错。是那种能把复杂技术讲得通俗易懂的人。"`,
    promotion: `2021年 6→7
2017年 5→6
2016年 5（社招入职定级）`,
  },
]

export const exampleQueries = [
  {
    id: 1,
    text: '帮我找个做过国际化项目的机票研发，最好是 P7 以上',
    icon: 'globe',
    description: '自然语言查询',
  },
  {
    id: 2,
    text: 'FU技术中心有没有做搜索算法和NLP的同学，想了解一下',
    icon: 'search',
    description: '找人问问',
  },
  {
    id: 3,
    text: '商旅事业部谁做大客户系统比较厉害的',
    icon: 'briefcase',
    description: '找人问问',
  },
  {
    id: 4,
    text: '有没有海归硕士，6 级以上的技术同学',
    icon: 'graduation-cap',
    description: '自然语言查询',
  },
  {
    id: 5,
    text: '客服里面哪几个满意度最高的',
    icon: 'star',
    description: '排序查询',
  },
]

// 真实 BU 列表（用于下拉筛选）
export const BU_OPTIONS = [
  'BG-机票事业群',
  'BG-大住宿事业群',
  'BG-旅游事业群',
  'BG-火车票事业群',
  'MBU-商旅事业部',
  'MBU-金融事业部',
  'FU-技术中心',
  'FU-市场营销部',
  'FU-内容中心',
  'FU-人力资源部',
]

// 职务序列
export const PSTN_SQNC_OPTIONS = [
  { code: 'T', name: '技术/研发序列' },
  { code: 'PT', name: '产品序列' },
  { code: 'S', name: '一线客服序列' },
  { code: 'P', name: '职能序列' },
]

// 学历
export const EDCTN_OPTIONS = ['博士', '硕士', '本科', '大专', '高中', '其他']
