<?php


namespace Home\Controller;

use Think\Controller;

class GetuserinfoController extends BaseController {  //获取openid接口+验证openid是否存储的接口（是否实名认证）
    public function getOpenid()   //解密获取openid传至小程序前端
    {
        $code = $_GET['code'];
        //配置appid
        $appid = "wxac754d940e45dff5";
        //配置appscret
        $secret = "195e4b33acc5bf6ec8700d2faf871cc3";
        //api接口
        $api = "https://api.weixin.qq.com/sns/jscode2session?appid={$appid}&secret={$secret}&js_code={$code}&grant_type=authorization_code";
        //获取GET请求
        function httpGet($url)
        {
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_TIMEOUT, 500);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
            curl_setopt($curl, CURLOPT_URL, $url);
            $res = curl_exec($curl);
            curl_close($curl);
            return $res;
        }
        //发送
        $str = httpGet($api);
        echo $str;
    }



    public function ifOpenid(){     //验证数据库中openid是否存在（即是否已经实名认证）
        if (!$_POST['id']) { //校验参数是否存在
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '小程序端没有传递openid！';
            $this->ajaxReturn($return_data);
        }
        $verified=M('verified');
        $openid=$_POST['id'];
        $find_openid=$verified->where("vopenid='$openid'")->find(); //在数据库中查找openid
        if($find_openid){
            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['msg'] = '您已经完成了实名认证！';
            $this->ajaxReturn($return_data);
        }
        else{
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '您尚未完成实名认证！请完成！';
            $this->ajaxReturn($return_data);
        }

    }


}
