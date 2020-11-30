#### 接口调用问题
1. 环境上无法获取当前用户的权限信息（即无法得知用户被授权能查看的省市区县）/bigScreen/remuneration/gotoScheme 这个接口环境上不存在404，无法获取默认类型和用户accountCode
2. 查询视图对应指标的接口/channelBigScreen/modInfoList,{"viewCode": "9", "chnlType": "0000"},chnlType为'0000'时候第二（CJXN_0000_2），第三（CJXN_0000_3）个视图对应的指标都为空，查不出来;当chnlType为非”0000“时候返回空数组，没有指标
3. /channelBigScreen/common/orgInfoAuthorizedList这个接口传啥值都查不出数据，是否是权限问题（与问题一相关？）
4. 查询地图json数据接口/channel/map/assembleJsonObject，查不出数据，是否是权限问题（与问题一相关？）
   