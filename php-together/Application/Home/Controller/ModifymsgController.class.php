<?php
namespace Home\Controller;

use Think\Controller;

class ModifymsgController extends BaseController
{


    /**
     * 发布帖子（将贴子信息存储到数据库）
     */
    public function storeMsg()
    {
        //校验参数是否存在
        if (!$_POST['Psn']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足:Psn';

            $this->ajaxReturn($return_data);
        }

        if (!$_POST['Pnickname']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足:Pnickname';

            $this->ajaxReturn($return_data);
        }

        if (!$_POST['Pface']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：Pface';

            $this->ajaxReturn($return_data);
        }


        if (!$_POST['Ptext']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：Ptext';

            $this->ajaxReturn($return_data);
        }

       
        if (!$_POST['Parea']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：Parea';

            $this->ajaxReturn($return_data);
        }
        
        if (!$_POST['Popenid']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：Popenid';

            $this->ajaxReturn($return_data);
        }

        
        $Message = M('post');
        //设置表插入数据
        $data = array();
        $data['pvsn'] = $_POST['Psn'];
        $data['pnickname'] = $_POST['Pnickname'];
        $data['popenid'] = $_POST['Popenid'];
        $data['pheadport'] = $_POST['Pface'];
        $data['ptext'] = $_POST['Ptext'];
        
        $data['parea'] = $_POST['Parea'];
        $data['ptime'] = time();
        //插入函数
        $result = $Message->add($data);

        if ($result) {

            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['mes'] = '数据添加成功';

            $this->ajaxReturn($return_data);
        } else {
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['mes'] = '数据添加失败';

            $this->ajaxReturn($return_data);
        }

        //dump($_POST);

    }
    
    
    
    
    /*
	对接申请按钮（点按钮，存储申请人和帖子编号）
	
	*/
    

    public function doRequest()
    {
        //校验参数
        if (!$_POST['message_id']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：message_id';
            $this->ajaxReturn($return_data);
        }

        if (!$_POST['openid']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：openid';
            $this->ajaxReturn($return_data);
        }

        $Post = M('post');
        $request=M('request');
        //查询条件
        $where1 = array();
        $where1['message_id'] = $_POST['message_id'];
        $message1 = $Post->where($where1)->find();

        //判断存在这条帖子
        if (!$message1) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '指定动态不存在';
            $this->ajaxReturn($return_data);
        }

        //构造保存的数据
        $data1 = array();
        if($message1['total_request']>=0){
            $data1['total_request'] = $message1['total_request'] + 1;
        }


        //构造保存的条件
        //保存
        $result1 = $Post->where($where1)->save($data1);//增加申请人数
        $data2 = array();
        $data2['ropenid'] = $_POST['openid'];
        $data2['rmessageid'] = $_POST['message_id'];
        $result2= $request->add($data2);         //保存申请信息

        $verified=M('verified');//实例化数据表
        $where2=array();
        $where2['vopenid']=$_POST['openid'];
        $message2 = $verified->where($where2)->find();
        $result3=array();                         //返回前端的订阅消息的data
        $result3['name']=$message2['vname'];
        $result3['sId']=$message2['vsn'];
        $result3['contact']=$message2['vwxoqq'];
        $result3['text']=$message1['ptext'];

        if ($result1&&$result2&&$message2) {
            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['msg'] = '申请信息保存成功，返回成功';
            $return_data['data']=$result3;
            $this->ajaxReturn($return_data);
        } else {
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '数据失败';
            $this->ajaxReturn($return_data);
        }
    }
    
    
   /*
   
   对接同意按钮（点同意，改变该申请人申请状态）
   */
    
    
     public function acptRequest(){
        if (!$_POST['ropenid']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：ropenid';
            $this->ajaxReturn($return_data);
        }
        if (!$_POST['message_id']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：message_id';
            $this->ajaxReturn($return_data);
        }

        $Post = M('post');
        $message_id = $_POST['message_id'];
        $openid=$_POST['ropenid'];
        $where3 = array();
        $where3['message_id'] = $message_id;
        $getpstate=$Post->where($where3)->field('pstate')->find();

        $request=M('request');
        $where = array();
        $where['rmessageid'] = $message_id;
        $ropenids=$request->where($where)->field('ropenid')->select();
        if($ropenids) {
            $k = count($ropenids);
            for ($j = 0; $j < $k; $j++) {
                $ropenid = $ropenids["$j"]['ropenid'];
                $Bool=strcmp($openid,$ropenid);
                if($Bool==0){
                    $data1= array();
                    $data1['ifaccept'] = 1;
                    $where1=array();
                    $where1['ropenid'] = $openid;
                    $where1['rmessageid'] = $message_id;
                    $result = $request->where($where1)->save($data1);
                }
                if($Bool&&$getpstate['pstate']){
                    $data2= array();
                    $data2['ifaccept'] = 2;
                    $where1=array();
                    $where1['ropenid'] = $ropenid;
                    $where1['rmessageid'] = $message_id;
                    $result = $request->where($where1)->save($data2);
                }
            }
        }
        else{
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '出错了！';
            $this->ajaxReturn($return_data);
        }

        
        if ($result){
            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['msg'] = '申请人状态已更新！';
            $this->ajaxReturn($return_data);
        }
        else{
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '申请人状态更新失败！';
            $this->ajaxReturn($return_data);
        }
        
    }
    
	
	
    
	/*
	对接完成按钮，用户点击完成改变组队状态和被拒绝申请人状态
	
	*/
    

    public function finishMsg(){
       if (!$_POST['message_id']) {
           $return_data = array();
           $return_data['error_code'] = 1;
           $return_data['msg'] = '参数不足：message_id';
           $this->ajaxReturn($return_data);
       }
       $Post = M('post');
       $request=M('request');

       $where1 = array();
       $where1['message_id'] = $_POST['message_id'];
       $message1 = $Post->where($where1)->find();

       //判断存在这条帖子
       if (!$message1) {
           $return_data = array();
           $return_data['error_code'] = 1;
           $return_data['msg'] = '指定动态不存在';
           $this->ajaxReturn($return_data);
       }

       //构造保存的数据
       $data1 = array();
       if($message1['pstate']>=0){
           $data1['pstate'] = $message1['pstate'] + 1;
       }
       //构造保存的条件
       //保存
       $result1 = $Post->where($where1)->save($data1);//更新帖子状态
       $where2 = array();
       $where2['rmessageid'] = $_POST['message_id'];
       $ropenids=$request->where($where2)->field('ropenid,ifaccept')->select();
       if($ropenids) {
           $k = count($ropenids);
           for ($j = 0; $j < $k; $j++) {
               $state = $ropenids["$j"]['ifaccept'];
             
               if(!$state){
                   $data= array();
                   $data['ifaccept'] = 2;
                   $where3=array();
                   $where3['ropenid'] = $ropenids["$j"]['ropenid'];
                   $where3['rmessageid'] = $_POST['message_id'];
                   $result2 = $request->where($where3)->save($data);
               }

           }
       }
       else{
           $return_data = array();
           $return_data['error_code'] = 2;
           $return_data['msg'] = '出错了！';
           $this->ajaxReturn($return_data);
       }



       if ($result1&&$result2){
           $return_data = array();
           $return_data['error_code'] = 0;
           $return_data['msg'] = '帖子状态、被拒绝的申请人已更新！';
           $this->ajaxReturn($return_data);}
        if (!$result1){
           $return_data = array();
           $return_data['error_code'] = 3;
           $return_data['msg'] = '帖子状态更新失败！';
           $this->ajaxReturn($return_data);}
        }
      
   
    
    
    


}
