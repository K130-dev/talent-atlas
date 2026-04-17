/**
 * 侧栏「工作网络」展示用：协作关系、对接方等（mock 按员工 id 稳定生成）
 */

const RELATIONS = [
  '项目协作',
  '双周对齐',
  '技术评审',
  '业务对接',
  '矩阵汇报',
  '联合值班',
  '需求评审',
  '数据共建',
]

const NAME_POOL = [
  '李静',
  '陈凯',
  '王颖',
  '刘洋',
  '赵磊',
  '周婷',
  '马超',
  '孙悦',
  '胡斌',
  '郭蕾',
  '何峰',
  '罗珊',
  '丁浩',
  '韩雪',
  '冯涛',
  '邓琳',
]

const ORG_HINTS = [
  '同事业部',
  'FU 技术中心',
  '数据平台',
  '安全与合规',
  '企业效率部',
  '市场营销',
  '客服体验',
]

/**
 * @param {object} employee
 * @returns {{ id: string, name: string, relation: string, org: string, weight: number }[]}
 */
export function buildWorkNetwork(employee) {
  if (Array.isArray(employee.workNetwork) && employee.workNetwork.length > 0) {
    return employee.workNetwork
  }

  const n = employee.id ?? 0
  const team = employee.team_name || '项目组'
  const bu = employee.bu_cname || '本事业部'

  const count = 6
  const usedNames = new Set()
  return Array.from({ length: count }, (_, i) => {
    const k = (n * 13 + i * 17) % 997
    let nameIdx = (n * 5 + i * 11) % NAME_POOL.length
    let name = NAME_POOL[nameIdx]
    let guard = 0
    while (usedNames.has(name) && guard < NAME_POOL.length) {
      nameIdx = (nameIdx + 1) % NAME_POOL.length
      name = NAME_POOL[nameIdx]
      guard++
    }
    usedNames.add(name)
    const relation = RELATIONS[(n + i) % RELATIONS.length]
    const org =
      i < 2
        ? `${team}`
        : i < 4
          ? `${bu}`
          : ORG_HINTS[(n + i) % ORG_HINTS.length]

    return {
      id: `wn-${n}-${i}`,
      name,
      relation,
      org,
      weight: 40 + (k % 55),
    }
  })
}
