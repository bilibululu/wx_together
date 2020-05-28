<?php
namespace Home\Controller;

use http\Message;
use Think\Controller;

class AccesstokenController extends Controller
{

    public function getTokenCurl()
    {

        $ispost = 0;
        $url = 'https://api.weixin.qq.com/cgi-bin/token';//请求url
        $paramsArray = array(
            'appid' => 'wxac754d940e45dff5',//你的appid
            'secret' => '195e4b33acc5bf6ec8700d2faf871cc3',//你的秘钥
            'grant_type' => 'client_credential'//微信授权类型,官方文档定义为 ： client_credential
        );
        $params = http_build_query($paramsArray);//生成URL参数字符串
        $httpInfo = array();

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36');

        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        if ($ispost) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
            curl_setopt($ch, CURLOPT_URL, $url);
        } else {
            if ($params) {
                curl_setopt($ch, CURLOPT_URL, $url . '?' . $params);
            } else {
                curl_setopt($ch, CURLOPT_URL, $url);
            }
        }
        $response = curl_exec($ch);
        if ($response === FALSE) {
            $return='false';
            $this->ajaxReturn($return);
        }
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $httpInfo = array_merge($httpInfo, curl_getinfo($ch));
        curl_close($ch);
        echo $response;
    }
}
