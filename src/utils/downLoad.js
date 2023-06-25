import {showToast} from "vant";

function downLoadApp(){

    let isWeChat

    const ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        isWeChat = true
    } else {
        isWeChat = false
    }

    if(isWeChat){
        showToast("请点击右上角在浏览器中打开")
    }else {

        let appSource
        const u = navigator.userAgent;
        const isiOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isiOS) {
            appSource = 'ios'
        } else {
            appSource = 'android'
        }

        const IOSUrl = 'https://apps.apple.com/app/id1670056674'
        let AndroidUrl = 'https://boxpic.manghehe.com/apk/BingoBox.apk'
        const isHuawei = u.match(/huawei/i);
        const isHonor = u.match(/honor/i) ;
        const isVivo = u.match(/vivo/i);
        const isXiaomi = u.match(/mi\s/i);
        const isXiaomi2s = u.match(/mix\s/i);
        const isRedmi = u.match(/redmi/i);

        if(isHuawei || isHonor){
            AndroidUrl = 'https://url.cloud.huawei.com/m0V5TlFdg4?shareTo=qrcode'
        }else if(isXiaomi || isXiaomi2s || isRedmi){
            AndroidUrl = 'http://app.mi.com/details?id=com.hleen.bingobox'
        }else if(isVivo){
            AndroidUrl = 'https://h5coml.vivo.com.cn/h5coml/appdetail_h5/browser_v2/index.html?appId=3543783'
        }else {
            AndroidUrl = 'http://shouji.baidu.com/app/5004451444'
        }

        let ele = document.createElement('a')
        ele.download = 'bingobox'
        ele.style.display = 'none'
        ele.href = appSource === 'ios' ? IOSUrl : AndroidUrl
        document.body.appendChild(ele)
        ele.click()
        document.body.removeChild(ele)
    }
}
export default downLoadApp;
