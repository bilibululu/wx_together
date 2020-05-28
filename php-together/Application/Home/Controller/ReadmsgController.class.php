<?php
namespace Home\Controller;

use Think\Controller;

class ReadmsgController extends BaseController {


    /**
     * 展示不同分区帖子
     * 
     */
   public function showMsg()
    {

        //实例化数据表
        $Message = M('post');//得到post表的操作对象
        //设置查询条件，要获取所有，所以不需要设置
        //按照时间倒序获取所有树洞

        //获取数据
        $area = $_POST['Parea'];
        $where = array();
        $where['parea'] = $area;
        //将帖子按时间排序 ->$where($where)是后加的
        $all_messages = $Message->where($where)->order('message_id desc')->select();

        // 将所有的时间戳转换成2020-04-22 12:00:00的形式
        foreach ($all_messages as $key => $message) {

            $all_messages[$key]['ptime'] = date('Y-m-d H:i:s', $message['ptime']);
        }
        $return_data = array(); //将查询条件组装成数组 声明一个空数组
        $return_data['error_code'] = 0;
        $return_data['msg'] = '数据获取成功';
        $return_data['data'] = $all_messages;
        $this->ajaxReturn($return_data);

        //dump($all_messages);


    }


    
       /**
     * 获取学号
     * 
     */
    public function getVsn(){
        $Message=M('verified');
        $vopenid=$_POST['vopenid'];
        $where=array();
        $where['vopenid']=$vopenid;
       // $result = $Message->where("vopenid=$vopenid")->field('vsn')->find();
        $result = $Message->where($where)->find();
        $vsn1=$result["vsn"];
        $vsn=intval($vsn1);
        
        if($result){
            //dump($vsn);
            $return_data=array();
            $return_data['error_code'] = 0;
            $return_data['msg'] = '获取成功';
            $return_data['sId']=$vsn;

            $this->ajaxReturn($return_data);
        }
        else{
            $return_data=array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '获取失败';

            $this->ajaxReturn($return_data);
        }
      

    }
    
    
    
    //获取popenid
     public function getPopenid(){
        $Message=M('post');
        $message_id=$_POST['message_id'];
        $where=array();
        $where['message_id']=$message_id;
        $result = $Message->where($where)->find();
        if($result){
            $return_data=array();
            $return_data['error_code'] = 0;
            $return_data['popenid'] = $result['popenid'];

            $this->ajaxReturn($return_data);
        }
        else{
            $return_data=array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '获取失败';

            $this->ajaxReturn($return_data);
        }
    }
    
    
    
    
    
    
    /*新表
     *对接看用户自己是否申请过帖子的功能
     *
     * */
   
   public function ifRequest(){
        //查看用户是否申请帖子
        //校验参数
        if (!$_POST['openid']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：openid';
            $this->ajaxReturn($return_data);
        }
       
        $ropenid=$_POST['openid'];//传申请人的openid
        $where = array();
        $where['ropenid'] = $ropenid;
        $request=M('request');//实例化数据表
        $find_msg=$request->where($where)->field('rmessageid')->select();

        if($find_msg){
            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['msg'] = '成功！';
            $return_data['msgid'] = $find_msg;
            $this->ajaxReturn($return_data);
        }
        else{
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '该用户尚未申请任何帖子！';
            $this->ajaxReturn($return_data);
        }
    }

    
     
    /**
     *返回我的申请界面信息
     * 
     */
    public function showMyrequest()
    {
        $request = M('request');
        $ropenid = $_POST['ropenid'];
        $where = array();
        $where['ropenid'] = $ropenid;
        $rmessage = $request->where($where)->field('rmessageid')->order('rmessageid desc')->select();
        if(!$rmessage){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = "该用户没有申请任何帖子！";
            $this->ajaxReturn($return_data);
        }

        $k = count($rmessage);
        for ($i = 0; $i < $k; $i++) {
            $message_id = $rmessage["$i"]['rmessageid'];
            $Post = M('post');
            $where2 = array();
            $where2['message_id'] = $message_id;
            $msg=array();
            $message=$Post->where($where2)->find();
            
            $where3 = array();
            $where3['rmessageid'] = $message_id;
            $state = $request->where($where3)->field('ifaccept')->find();
            

            $message['ptime'] = date('Y-m-d H:i:s', $message['ptime']);
            $final=array();
            $final['message_id']=$message['message_id'];
            $final['parea']=$message['parea'];
            $final['pheadport']=$message['pheadport'];
            $final['pnickname']=$message['pnickname'];
            $final['ptext']=$message['ptext'];
            $final['ptime']=$message['ptime'];
            $final['pvsn']=$message['pvsn'];
            $final['total_request']=$message['total_request'];
            

            $msg['data']=$final;
            $msg['state']=$state['ifaccept'];
            $result[$i] = $msg;
        }

        if($result){
            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['msg'] =$result;
            $this->ajaxReturn($return_data);
       }

    }

    
    
   //我的发布界面 展示每一条我发布的帖子和申请人信息
    public function showMypublish()
    {

        $Post = M('post');
        $request = M('request');
        $verified=M('verified');
        $popenid = $_POST['popenid'];
        $where = array();
        $where['popenid'] = $popenid;
        $message= $Post->where($where)->order('message_id desc')->select();
        foreach ($message as $key => $message1) {

            $message[$key]['ptime'] = date('Y-m-d H:i:s', $message1['ptime']);
        }
        if(!$message){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = "该用户没有发布任何帖子！";
            $this->ajaxReturn($return_data);
        }
        $k1 = count($message);

        for ($i = 0; $i < $k1; $i++) {
            $msg=array();
            $msg['data']=$message["$i"];
            $message_id = $message["$i"]['message_id'];
            $where2 = array();
            $where2['rmessageid'] = $message_id;
            $ropenids=$request->where($where2)->field('ropenid')->select();
            if($ropenids) {
                $k2 = count($ropenids);
               // dump($k2);
                for ($j = 0; $j < $k2; $j++) {
                    $vopenid = $ropenids["$j"]['ropenid'];
                    $where3 = array();
                    $where3['vopenid'] = $vopenid;
                    $manmsg = array();
                    $manmsg = $verified->where($where3)->field('vsn,vname,vopenid,vwxoqq')->find();
                    
                    $where4 =array();
                    $where4['ropenid'] = $vopenid;
                    $where4['rmessageid'] = $message_id;
                    $state = $request->where($where4)->field('ifaccept')->find();
                    
                    $msg['manmsg'][$j]['vsn']=$manmsg['vsn'];
                    $msg['manmsg'][$j]['vname']=$manmsg['vname'];
                    $msg['manmsg'][$j]['vopenid']=$manmsg['vopenid'];
                    $msg['manmsg'][$j]['contact']=$manmsg['vwxoqq'];
                    $msg['manmsg'][$j]['state']=$state['ifaccept'];
                    
                }
                
               
            }
            else{
                $msg['manmsg']=0;
            }
            
            $result[$i] = $msg;
        }



        if ($result) {
            

           $this->ajaxReturn($result);
        } else {
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '获取失败';

            $this->ajaxReturn($return_data);
        }
        //返回result

    }
}