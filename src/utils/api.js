const API = {
  sendMsg: '/api/boxLogin/web-center/sendMsg', //获取注册短信
  smsLogin: '/api/boxLogin/web-center/phone-num-login', //短信登入
  googleLogin: '/api/boxdata/web-center/user/google-login', //Google登录
  getUserState: '/api/boxdata/web-center/user/userState', //检查用户状态
  createNewUser: '/api/boxdata/web-center/user/newUser', //创建用户
  getBoxSimInfo: '/api/boxdata/web-center/box/boxSimInfo', //盒子信息
  getBoxGoodsList: '/api/boxdata/web-center/box/goods', //盒子商品列表（按等级获取）
  createOrder: '/api/boxdata/web-center/box/getOrder', // 创建订单
  completeOrder: '/api/boxdata/web-center/box/downOrder', // 完成订单
  getMyGoods: '/api/boxdata/web-center/box/myGoods', //我的商品列表
  getMyLastGoodsPic: '/api/boxdata/web-center/box/myLastGoodsPic', //上次获得商品图片
  getWinInfo: '/api/boxdata/web-center/box/winningNews', //11.获取中奖信息（每分钟获取一次，有值就替换原来的列表进行循环）
}

export default API
