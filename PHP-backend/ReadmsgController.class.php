<?php
namespace Home\Controller;

use Think\Controller;

class ReadmsgController extends BaseController {


    /**
     * 得到所有树洞
     * @return [type] [description]
     */
    public function readMsg()
    {

        //实例化数据表
        $Message = M('post');//得到post表的操作对象
        //设置查询条件，要获取所有，所以不需要设置
        //按照时间倒序获取所有树洞

        //获取数据
        $area = $_POST['Pquyu'];
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



}
