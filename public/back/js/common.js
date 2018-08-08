 
//  公共js功能

 // 5. 判断用户是否登陆, 实现登陆拦截
    //前端不知道当前用户是否登录, 但是后台知道, 需要访问后台接口, 获取该用户登陆状态
    //(1) 用户已登陆, 让其继续访问
    //(2) 如果用户没登陆, 拦截到登陆页
// 一进入页面, 发送 ajax 请求, 获取当前用户登陆状态
// 如果是登陆页, 不需要登陆, 就可以访问, 不需要判断登陆状态

 //判断,如果地址直接输入除了login页面以外的页面拒绝访问
 if(location.href.indexOf("login.html")===-1){

   $.ajax({
     url:'/employee/checkRootLogin',
     type:'get',
     dataType:'json',
     success:function(info){
       console.log(info);
   
       //判断
       if(info.success){
         console.log('已登录');
       }
       if(info.error===400){
         //拉结到登录页
         location.href='login.html';
       }   
     }
   });

 };



      //  实现进度条功能测试

  //注册了全局事件,所有的ajax只要开始就会开启进度条
  $(document).ajaxStart(function(){
    console.log('请求开始');
    
    NProgress.start(); //开始进度条
  });
  //所有的ajax只要结束,延迟500ms结束进度条
  $(document).ajaxStop(function(){
    
    //设置定时器,假装一下
    setTimeout(function(){
      NProgress.done(); //结束进度条
    },2000);
    
  });





  //主页面功能
  $(function(){

    //分类菜单点击显示二级菜单
    $('.lt-left .category').click(function(){
      // alert('1');
    $('.lt-left .child').slideToggle();

    })

    //点击菜单栏隐藏侧边栏
    $('.lt-banner .left').on('click',function(){

      $('.lt-left').toggleClass('lt-hidebanner');
      $('.lt-content').toggleClass('lt-hidebanner');
      $('.lt-header').toggleClass('lt-hidebanner');
      
    })

    // 点击退出模态框功能
    $('.lt-header .right').on('click',function(){
      //显示模态框
      $('#lt-outmodal').modal('show');
    })

    //点击实现退出功能
    $('.lt-modal #lt-modal-out').on('click',function(){

      //退出需要发送ajax请求,用户退出后销毁该用户的信息
      $.ajax({
        url:'/employee/employeeLogout',
        type:'get',
        dataType:'json',
        success:function(info){
          console.log(info);
          //判断
          if(info.success){
            location.href='login.html';
          }
        }
      })
      
    })

     
  });



