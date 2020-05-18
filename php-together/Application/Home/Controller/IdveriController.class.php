<?php
namespace Home\Controller;
use Think\Controller;

class IdveriController extends BaseController //实名认证接口
{
    public function idVeri()
    {
        if (!$_POST['name']) { //校验参数是否存在
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '信息不足：姓名';
            $this->ajaxReturn($return_data);
        }
        if (!$_POST['sId']) { //校验参数是否存在
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '信息不足:学号';
            $this->ajaxReturn($return_data);
        }
        if (!$_POST['contact']) { //校验参数是否存在
            $return_data = array();
            $return_data['error_code'] = 3;
            $return_data['msg'] = '信息不足:微信号/qq号';
            $this->ajaxReturn($return_data);
        }
        if (!$_POST['openid']) { //校验参数是否存在
            $return_data= array();
            $return_data['error_code'] = 4;
            $return_data['msg'] = '信息不足:openid';
            $this->ajaxReturn($return_data);
        }
        
<<<<<<< HEAD
   

=======
        
        
>>>>>>> 1d1607e36392d2c0eb4fc649af8dce65d9b520f6
        //设置查询条件
        $pvsn=$_POST['sId']; //输入的学号
        $pname=$_POST['name'];     //输入的姓名
        $pcontact=$_POST['contact']; //输入的联系方式
        $popenid=$_POST['openid'];     //输入的openid
<<<<<<< HEAD
   
=======
      
>>>>>>> 1d1607e36392d2c0eb4fc649af8dce65d9b520f6
        //开始实名认证比较
        //以学号在verified表中查询数据并比较
        $verified=M('verified');//实例化数据表
        $find_data=$verified->where("vsn=$pvsn")//->field('vsn,vname')
                              ->find();
        $array1=$find_data["vsn"];//数组值一存放表中读出的学号
        $array2=$find_data["vname"];//数组值二存放表中读出的姓名
        $array=array($array1,$array2);//组装数组
        //在数组中查找是否有输入的名字，若有返回int(1)，否则返回bool(0).
        $Bool_data=array_search($pname,$array);

        if($find_data){ //首先判断能否找到学号
            if($Bool_data){  //其次判断名字是否匹配
                $certi=array(); //存储信息
                $certi['vwxoqq']=$pcontact;
                $certi['vopenid']=$popenid;
                $certi['vbool']=1;
                $result=$verified->where("vsn=$pvsn")->save($certi);
//                $result['vnickname']=$verified->where("vsn=$pvsn")->save($pnickname);
//                $result['vsex']=$verified->where("vsn=$pvsn")->save($pgender);
//                $result['vwxoqq']=$verified->where("vsn=$pvsn")->save($pcontact);
//                $result['vbool']=$verified->where("vsn=$pvsn")->save($certi);
                $return_data = array();
                $return_data['error_code'] = 0;
                $return_data['msg'] = '信息比对完成！实名认证成功！';
                $this->ajaxReturn($return_data);
            }
            else{
                $return_data = array();
                $return_data['error_code'] = 5;
                $return_data['msg'] = '实名认证失败！请输入真实信息！';
                $this->ajaxReturn($return_data);
            }
        }
        else{
            $return_data = array();
            $return_data['error_code'] = 5;
            $return_data['msg'] = '实名认证失败！请输入真实信息！';
            $this->ajaxReturn($return_data);
        }


    }
}
