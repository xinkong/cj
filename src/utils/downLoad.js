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
        let ele = document.createElement('a')
        ele.download = 'bingobox'
        ele.style.display = 'none'
        ele.href = appSource === 'ios' ? IOSUrl : 'https://boxpic.manghehe.com/apk/BingoBox.apk'
        document.body.appendChild(ele)
        ele.click()
        document.body.removeChild(ele)
    }
}
export default downLoadApp;
