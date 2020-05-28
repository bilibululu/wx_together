<?php


namespace Home\Controller;

use http\Message;
use Think\Controller;
class DingyueController extends BaseController
{
    public function sendMsg()
    {
        //获取参数
        $access_token=$_GET["access_token"];
        $data=$_GET["data"];
        //拼接subscribeMessage.send的URL
        $api="https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token={$access_token}";
        //php post请求网络的方法
        function http_request($url,$data = null,$headers=array())
        {
            $curl = curl_init();
            if( count($headers) >= 1 ){
                curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            }
            curl_setopt($curl, CURLOPT_URL, $url);

            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);

            if (!empty($data)){
                curl_setopt($curl, CURLOPT_POST, 1);
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            }
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            $output = curl_exec($curl);
            curl_close($curl);
            return $output;
        }
        $str=http_request($api,$data);
        echo $str;
    }
}