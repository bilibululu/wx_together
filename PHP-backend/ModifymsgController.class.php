<?php


namespace Home\Controller;
use Think\Controller;

class ModifymsgController extends BaseController
{


    /**
     * 保存发布的新树洞
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

        if (!$_POST['Pphoto']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：Pphoto';

            $this->ajaxReturn($return_data);
        }


        if (!$_POST['Pquyu']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：Pquyu';

            $this->ajaxReturn($return_data);
        }

        $Message = M('post');
        //设置表插入数据
        $data = array();
        $data['psn'] = $_POST['Psn'];
        $data['pface'] = $_POST['Pface'];
        $data['ptext'] = $_POST['Ptext'];
        $data['pphoto'] = $_POST['Pphoto'];
        $data['parea'] = $_POST['Pquyu'];
//        $data['total_request'] = 0;//请求数
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

        dump($_POST);

    }


    /**
     * 删除动态
     * @return [type] [description]
     */
    public function deleteMsg()
    {

        //校验参数
        if (!$_POST['message_id']) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：message_id';
            $this->ajaxReturn($return_data);
        }

        //实例化数据表
        $Message = M('post');

        //设置条件
        $where = array();
        $where['message_id'] = $_POST['message_id'];

        //删除
        $result = $Message->where($where)->delete();

        if ($result) {
            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['msg'] = '动态删除成功';

            $this->ajaxReturn($return_data);
        } else {
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '动态删除失败';

            $this->ajaxReturn($return_data);
        }
    }

}

