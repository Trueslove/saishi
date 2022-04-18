import $http from './http'

import * as login from './login'



export default {
    getHome: () => $http('/zyPerformanceActivity/activityIndex', {}),
    ...login,
    // 新闻详情
    getNewsDetail: newsId => $http('/zyPerformanceActivityNews/getNewsDetail', {newsId}), 
    // 新闻搜索列表
    getNewsList: data => $http('/zyPerformanceActivityNews/seach',data),
    // 赛事列表(进行中 / 往期)
    getActivityList(type, page ) {
        // type = 0 进行中 : 1 往期
        let apisArr = ['/zyPerformanceActivity/activityList','/zyPerformanceActivity/activityListHistory']
        return $http(apisArr[type], type == 1 ? page : {})
    },
    // 个人中心基础数据
    getUser: () => $http('/userCenter/userCenterData', {}),
    // 编辑资料回显数据
    getUserData: () => $http('/userCenter/userData', {}),
    // 编辑用户信息
    edituserData: data => $http('/userCenter/editUserData', data),
    // 我的消息
    getMyMsgList: data => $http('/userCenter/getMyMsgList',data),
    // 更改消息状态
    msgsRead: data => $http('/userCenter/msgsRead',data),
    // 我的赛事列表
    myActivity: () => $http('/userCenter/getMyActivityList', {}),
    // 赛事详情
    activityDetail: performanceActivityId => $http('/zyPerformanceActivity/getActivityDetail',{ performanceActivityId }),
    // 我的作品
    getMyZPList: data => $http('/userCenter/getMyZPList',data),
    // 作品投票
    workVoting: performanceActivityEnrollWorkId => $http('/zyPerformanceActivityEnrollWork/workVoting', {performanceActivityEnrollWorkId}),
    // 我的奖项
    getMyCertifycateList: data => $http('/userCenter/getMyCertifycateList',data),
    // 查看证书
    getMyCertifycateByEnrollWorkId: data => $http('/userCenter/getMyCertifycateByEnrollWorkId',data),
    // 我的地址
    getAddressList: data => $http('/gift/exchange/address/list',data),
    // 地址编辑
    saveOrEdit: data => $http('/gift/exchange/address/saveOrEdit',data),
    // 地址获取
    getAddressDetail: data => $http('/family/products/address/getById',data),
    // 地址获取
    getActivityGroup: data => $http('/zyPerformanceActivityGroupCategory/optionList',data),
    // 主办方活动接口
    sponsorActivityList: circleId => $http('/zyPerformanceActivity/sponsorActivityList', { circleId }),
    // 赛事搜索
    searchActivity: data => $http('/zyPerformanceActivity/searchActivityList', data),
    // 赛事报名
    saveOrUpdateEnroll: data => $http('/zyPerformanceActivityEnroll/saveOrUpdateEnroll', data),
    // 热词列表
    searchHot: data => $http('/zyPerformanceActivityHotWord/allList', data),
    // 报名表单查询
    searchEnrollWorkForm: data => $http('/zyPerformanceActivityEnrollWork/searchEnrollWorkForm', data),
    // 赛事表单查询
    searchEnrollForm: data => $http('/zyPerformanceActivityEnroll/searchEnrollForm', data),
    // 作品表单提交
    saveOrUpdateEnrollWorkForm: data => $http('/zyPerformanceActivityEnrollWork/saveOrUpdateEnrollWorkForm', data),
    // 选手作品各组列表页
    userGroupWorkList: performanceActivityId => $http('/zyPerformanceActivityEnrollWork/userGroupWorkList', {performanceActivityId}),
    // 选手详情
    enrollDetail: performanceActivityEnrollId => $http('/zyPerformanceActivityEnroll/enrollDetail', { performanceActivityEnrollId}),
    // 作品管理列表
    enrollWorkListManage: data => $http('/zyPerformanceActivityEnrollWork/enrollWorkListManage', data),


    // 选手详情
    enrollDetail: performanceActivityEnrollId => $http('/zyPerformanceActivityEnroll/enrollDetail', { performanceActivityEnrollId}),

    // 晋级成绩
    promotionList: data => $http('/zyPerformanceActivityEnrollResultRecord/promotionList', data),
    // 作品成绩
    enrollWorkList: data => $http('/zyPerformanceActivityEnrollWork/enrollWorkList', data),
    // 作品详情
    workDetail: performanceActivityEnrollWorkId => $http('/zyPerformanceActivityEnrollWork/workDetail', { performanceActivityEnrollWorkId }),
    // 主题列表
    allThemeList: performanceActivityId => $http('/zyPerformanceTheme/allThemeList', { performanceActivityId }),
    // 晋级选项轮播图
    promotionSwipers: performanceActivityId => $http('/zyPerformanceActivityEnrollResultRecord/optionData', { performanceActivityId}),
   
   
   
    // 商品列表
    goodsList: data => $http('/family/products/list'),
    // 商品分类列表
    categoryList: data => $http('/jia/products/category/list', data),
    // 商品详情
    goodsInfo: data => $http('/family/products/info/data', data),
    // 确认下单
    confirmOrderDetail: data => $http('/family/products/confirmOrderDetail', data),
    // 下单支付
    getOrderMsg: data => $http('/family/wx/products/getOrderMsg', data),
    // 获取运费
    getYunfei: data => $http('/excludeYunFei/getYunfei', data),
    // 领取优惠券
    receive: data => $http('/cardBag/coupon/receive', data),
    // 收藏、取消收藏
    productsCollection: data => $http('/productsCollection/collectOrCancel/anon', data),
    // 获取该商品发货地信息
    resourceAddress: data => $http('/resourceAddress/getByProductId/anon', data),
    // 获取该商品是否存在体验活动
    getTrymsgByProId: data => $http('/products/try/home/getTrymsgByProId', data),
    // 获取该商品可使用的礼品卡信息-详情使用
    giftMainCard: data => $http('/giftMainCard/allPickCardForPro/anon', data),
}