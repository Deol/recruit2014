(function($) {

    //全局变量       
    var Global = {
        section_num : 1,
        scrollDown : true
    };

    //函数节流，为了防止频繁调用某个函数的情况
    Global.throttle = function(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }
    window.resize = Global.throttle(function() {
        Global.reCal();
    });

    //第一部分分块出现
    var slipNum = function() {
        for (var i = 6; i >= 2; --i) {
            $('.area' + i).css({top:'-100%'}).animate({top:'0%'}, 200 * i);
        }
    };
    slipNum();

    //导航栏变换定位函数
    var switchTop = Global.throttle(function() {
        if(1 != Global.section_num) {
                $(".nav").animate({top:"0"},500,'jswing');
        }
        else {
            $(".nav").animate({top:"78%"},500,'jswing');

        }

        //导航栏选中时背景高亮函数
        if(1 == Global.section_num) {
                $("#partBtn1\ img").attr("src","./img/logoArea.png");

            }
        else{
            $("#partBtn1\ img").attr("src","./img/logoArea2.png");
        }
        
        for (var i = 1; i <= 7; i++) {
            $("#partBtn" + i).removeClass("btnChose" + i);
        }

        $("#partBtn" + Global.section_num).addClass("btnChose" + Global.section_num);

    },200);

    //判断鼠标滚动方向
    $(document).stop().on("mousewheel DOMMouseScroll", function(e) {
        var e0 = e.originalEvent,
            delta = e0.wheelDelta / 120 || e0.detail / -3,//鼠标向前滚是正数，向后滚是负数
            isMouseScrollDown = delta < 0 ? true : false;

        if (isMouseScrollDown) { //鼠标向下滚动
            Global.scrollDown = true;
            Global.scrollHandle();

        }else{
            Global.scrollDown = false;
            Global.scrollHandle();
        }

        e.preventDefault();
    });

    //处理鼠标滚动后的函数
    Global.scrollHandle = Global.throttle(function() {

        var targetScrollTopValue = Global.scrollDown ? Global.targetScrollTop(++Global.section_num) : Global.targetScrollTop(--Global.section_num);
        $("html,body").animate({scrollTop:targetScrollTopValue}, 500,'easeInOutCirc'); 

        switchTop();

    },200);

    //计算每个区域的高度
    Global.reCal = function() {
        //给主体内容添加高度
        var minHeight = 670;
        if($(window).height() < minHeight) {
            $(".realm").height(minHeight);
        }
        else
            $(".realm").height($(window).height());
        $("html,body").animate({scrollTop:Global.targetScrollTop(Global.section_num)}, 500,'easeInOutCirc');
    }

    //计算scrollTop要滚到的高度
    Global.targetScrollTop = function(n) {
        var TopValue;
        var minHeight = 670;
        if (n > 7) {
            Global.section_num = 7;
        }
        else
            if (n < 1) {
                Global.section_num = 1;
        }
        if($(window).height() < minHeight) {
            TopValue = minHeight * (Global.section_num-1);
        }
        else
            TopValue = $(window).height() * (Global.section_num-1);
        return TopValue;
    }

    window.onresize = Global.throttle(function() {
        Global.reCal();
    },50);

    //窗口重载之后初始化
    $(window).load(function() {
        Global.reCal();
        $("html,body").animate({scrollTop:0},100);
        Global.section_num = 1;
    });

    //自适应窗口
    $(window).resize(function() {
        Global.reCal();

    });

    //文档加载之后
    $(document).ready(function() {

        $("a[href='#']").click(function(e) {
            e.preventDefault();
            return false; 
        });
        
        Global.reCal();

        var btnNum;

        var chosen = function(btnNum) {

            var clickArea = ['#partBtn','.area']

            for (var i = clickArea.length - 1; i >= 0; i--) {

                $(clickArea[i] + btnNum).click(function(e) {

                    Global.section_num = btnNum;

                    switchTop();

                    $("body,html").stop().animate({scrollTop:Global.targetScrollTop(btnNum)},400,'easeInOutCirc',function() {
                    
                    });
                    e.preventDefault(); 
                    return false;
                });

            };
        };
            
        for (var j = 1; j <= 7; j++) {
            chosen(j);
        };

        //返回顶部
        $(".returnTop").click(function () {
                $("html,body").animate({scrollTop:0},400,function() {
                    Global.section_num = 1;
                });
        });

    });

    if (window.console) {
        console.log("\n是不是觉得还很有提升的空间？！地球的未来就交给你啦！加入我们吧！\n");
        console.log("发邮件给我们： gdutcscw@126.com\n");
    }

})(jQuery);