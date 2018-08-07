// 检验插件初始化  
$(function () {
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $('#form').bootstrapValidator({

    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //设置校验规则
    fields: {

      username: {
        // 校验规则
        validators: {
          //非空验证
          notEmpty: {
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须为2-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空",
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "用户密码必须6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }

    }
  })

});


    //处理响应结果
//表单校验成功,注册表单校验成功的事件，阻止默认提交，使用ajax提交
$('#form').on("success.form.bv", function (e) {

  //阻止表单的默认提交
  e.preventDefault();
  //使用ajax进行提交
  $.ajax({
    url: '/employee/employeeLogin',
    dataType: 'json',
    type: 'post',
    data: $('#form').serialize(), //这里data不用单个传参,只需要获得表单序列化
    success: function (info) {
      console.log(info);

      //判断
      // 如果成功的话
      if (info.success) {
        location.href = "index.html"
      }

      // 1. 打印info,输入的用户名及密码符合长度要求,但数据库没有这个用户名,打印error===1000
      if (info.error === 1000) {
        //如果用户名不存在,需要将表单状态设置成校验失败的状态
        // 插件方法 updateStatus
        // 参数1: 字段名称
        // 参数2: 校验状态, VALID成功的, INVALID失败的, NOT_VALIDATED未校验的
        // 参数3: 指定校验规则, 可以设置提示信息
        $('form').data("bootstrapValidator").updateStatus('username','INVALID','callback');
      }
      // 1. 打印info,输入的用户名及密码符合长度要求,但数据库用户名密码错误,打印error===1001
      if(info.error === 1001){
        $('form').data("bootstrapValidator").updateStatus('password','INVALID','callback');
      }
    }
  })
});


    //重置功能
// 点击重置按钮时，还需要重置表单的错误提示信息
$("[type='reset']").on('click',function (){
  
  //重置表单演示
  $('#form').data('bootstrapValidator').resetForm();
});

