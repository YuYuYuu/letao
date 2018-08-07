 
//  公共js功能



      //  实现进度条功能测试
  //注册了全局事件,所有的ajax只要开始就会开启进度条
  $(document).ajaxStart(function(){
    NProgress.start(); //开始进度条
  });
  //所有的ajax只要结束,延迟500ms结束进度条
  $(document).ajaxStop(function(){
    //设置定时器,假装一下
    setTimeout(function(){
      NProgress.done(); //结束进度条
    },500);
  });
