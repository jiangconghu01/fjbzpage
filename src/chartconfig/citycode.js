const citys = {
  code: '350000',
  name: '福建省',
  orgCode: 59,
  level: 1,
  children: [
    {
      code: '350100',
      name: '福州市',
      orgCode: 591,
      level: 2,
      children: [
        { code: '350102', name: '鼓楼区' },
        { code: '350103', name: '台江区' },
        { code: '350104', name: '仓山区' },
        { code: '350105', name: '马尾区' },
        { code: '350111', name: '晋安区' },
        { code: '350112', name: '长乐区' },
        { code: '350121', name: '闽侯县' },
        { code: '350122', name: '连江县' },
        { code: '350123', name: '罗源县' },
        { code: '350124', name: '闽清县' },
        { code: '350125', name: '永泰县' },
        { code: '350128', name: '平潭县' },
        { code: '350181', name: '福清市' },
      ],
    },
    {
      code: '350200',
      name: '厦门市',
      orgCode: 592,
      level: 2,
      children: [
        { code: '350203', name: '思明区' },
        { code: '350205', name: '海沧区' },
        { code: '350206', name: '湖里区' },
        { code: '350211', name: '集美区' },
        { code: '350212', name: '同安区' },
        { code: '350213', name: '翔安区' },
      ],
    },
    {
      code: '350300',
      name: '莆田市',
      orgCode: 594,
      level: 2,
      children: [
        { code: '350302', name: '城厢区', orgCode: '401' },
        { code: '350303', name: '涵江区' },
        { code: '350304', name: '荔城区' },
        { code: '350305', name: '秀屿区' },
        { code: '350322', name: '仙游县' },
      ],
    },
    {
      code: '350400',
      name: '三明市',
      orgCode: 598,
      level: 2,
      children: [
        { code: '350402', name: '梅列区' },
        { code: '350403', name: '三元区', orgCode: '801' },
        { code: '350421', name: '明溪县' },
        { code: '350423', name: '清流县' },
        { code: '350424', name: '宁化县' },
        { code: '350425', name: '大田县' },
        { code: '350426', name: '尤溪县' },
        { code: '350427', name: '沙县' },
        { code: '350428', name: '将乐县' },
        { code: '350429', name: '泰宁县' },
        { code: '350430', name: '建宁县' },
        { code: '350481', name: '永安市' },
      ],
    },
    {
      code: '350500',
      name: '泉州市',
      orgCode: 595,
      level: 2,
      children: [
        { code: '350502', name: '鲤城区' },
        { code: '350503', name: '丰泽区' },
        { code: '350504', name: '洛江区' },
        { code: '350505', name: '泉港区' },
        { code: '350521', name: '惠安县' },
        { code: '350524', name: '安溪县' },
        { code: '350525', name: '永春县' },
        { code: '350526', name: '德化县' },
        { code: '350527', name: '金门县' },
        { code: '350581', name: '石狮市' },
        { code: '350582', name: '晋江市' },
        { code: '350583', name: '南安市' },
      ],
    },
    {
      code: '350600',
      name: '漳州市',
      orgCode: 596,
      level: 2,
      children: [
        { code: '350602', name: '芗城区' },
        { code: '350603', name: '龙文区' },
        { code: '350622', name: '云霄县' },
        { code: '350623', name: '漳浦县' },
        { code: '350624', name: '诏安县' },
        { code: '350625', name: '长泰县' },
        { code: '350626', name: '东山县' },
        { code: '350627', name: '南靖县' },
        { code: '350628', name: '平和县' },
        { code: '350629', name: '华安县' },
        { code: '350681', name: '龙海市' },
      ],
    },
    {
      code: '350700',
      name: '南平市',
      orgCode: 599,
      level: 2,
      children: [
        { code: '350702', name: '延平区', orgCode: '901' },
        { code: '350703', name: '建阳区' },
        { code: '350721', name: '顺昌县' },
        { code: '350722', name: '浦城县' },
        { code: '350723', name: '光泽县' },
        { code: '350724', name: '松溪县' },
        { code: '350725', name: '政和县' },
        { code: '350781', name: '邵武市' },
        { code: '350782', name: '武夷山市' },
        { code: '350783', name: '建瓯市' },
      ],
    },
    {
      code: '350800',
      name: '龙岩市',
      orgCode: 597,
      level: 2,
      children: [
        { code: '350802', name: '新罗区', orgCode: '701' },
        { code: '350803', name: '永定区' },
        { code: '350821', name: '长汀县' },
        { code: '350823', name: '上杭县' },
        { code: '350824', name: '武平县' },
        { code: '350825', name: '连城县' },
        { code: '350881', name: '漳平市' },
      ],
    },
    {
      code: '350900',
      name: '宁德市',
      orgCode: 593,
      level: 2,
      children: [
        { code: '350902', name: '蕉城区', orgCode: '301' },
        { code: '350921', name: '霞浦县' },
        { code: '350922', name: '古田县' },
        { code: '350923', name: '屏南县' },
        { code: '350924', name: '寿宁县' },
        { code: '350925', name: '周宁县' },
        { code: '350926', name: '柘荣县' },
        { code: '350981', name: '福安市' },
        { code: '350982', name: '福鼎市' },
      ],
    },
  ],
  cityArr: [],
  cityCodeArr: [],
  cityNameMap: {},
  cityCodeMap: {},
  cityOrgMap: {},
}
const level = {
  label: '福建省',
  value: '350000',
  children: [],
}
level.children = citys.children.map((ele) => {
  const child = ele.children.map((item) => {
    return {
      label: item.name,
      value: item.code,
    }
  })
  return {
    label: ele.name,
    value: ele.code,
    children: child,
  }
})
citys.level = [level]
citys.children.forEach((ele, index) => {
  citys.cityArr[index] = ele.name
  citys.cityCodeArr[index] = ele.orgCode
  citys.cityNameMap[ele.code] = ele.name
  citys.cityOrgMap[ele.orgCode] = ele.name
  citys.cityCodeMap[ele.name] = ele.code
})
export default citys
