<?php
namespace Home\Controller;

use Think\Controller;

class ModifymsgController extends BaseController
{


    /**
     * 发布新树洞
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

    public function do_like()
    {
        //校验参数
        if (!$_POST['message_id']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：message_id';
            $this->ajaxReturn($return_data);
        }

        if (!$_POST['psn']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：psn';
            $this->ajaxReturn($return_data);
        }

        $Message = M('post');

        //查询条件
        $where = array();
        $where['message_id'] = $_POST['message_id'];
        $message = $Message->where($where)->find();

        //判断存在这条帖子
        if (!$message) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '指定动态不存在';
            $this->ajaxReturn($return_data);
        }

        //构造保存的数据
        $data = array();
        if($message['total_likes']>=0){
            $data['total_likes'] = $message['total_likes'] + 1;
        }
//        if ($message['total_likes']<=1) {
//            $data['total_likes'] = $message['total_likes'] + 1;
//        } else {
//            $data['total_likes'] =1;
//        }

        //构造保存的条件
        $where = array();
        $where['message_id'] = $_POST['message_id'];
        //保存
        $result = $Message->where($where)->save($data);
        dump($result);
        if ($result) {
            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['msg'] = '数据保存成功';
            $return_data['data']['message_id'] = $_POST['message_id'];
            $return_data['data']['total_likes'] = $_POST['total_likes'];

            $this->ajaxReturn($return_data);
        } else {
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '数据保存失败';
            $this->ajaxReturn($return_data);
        }
    }
}
