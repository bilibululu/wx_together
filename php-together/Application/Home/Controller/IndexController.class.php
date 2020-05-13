<?php
namespace Home\Controller;

use Think\Controller;
class IndexController extends BaseController {
	
    /**
     * 测试函数
     * @return [type] [description]
     */
    public function test(){
        $verified=M('verified');
        $certi=array();
        $certi['vbool']=1;
        $where=array();
        $where['vsn']=$_POST['StudentId'];
        $result=$verified->where($where)->save($certi);
        dump($result);
    }

}

