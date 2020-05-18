<?php
namespace Home\Controller;

use Think\Controller;

class ReadmsgController extends BaseController {


    /**
     * 得到所有树洞
     * @return [type] [description]
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
        $all_messages = $Message->where($where)->select();

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
     * @return [type] [description]
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
            $return_data['error_code'] = 2;
            $return_data['msg'] = '获取失败';

            $this->ajaxReturn($return_data);
        }
      

    }

}