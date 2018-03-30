$(function () {
    $('.container').fullpage({
    	// 默认顶部对齐
        verticalCentered:false,
        //右侧的导航
        navigation:true,
        navigationColor:'#fff',
        navigationPosition:'left',
        //配置纵向每一屏的颜色 数组的方式
        sectionsColor:["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        // 滚完成后 执行回调
        afterLoad:function(link,index){
        	// 显示 "更多" 操作区域
            if(index<8){
            $('.more').fadeIn();
                
            }
        	//给当前的屏幕加载 now类名 执行动画
        	// console.log($(this));当前屏
        	$(this).addClass('now'); 
        },
        // 离开屏幕的回调函数
        onLeave:function(index,nextIndex,direction){
            // 隐藏 "更多"操作区域
            $('.more').hide();
            // 第二屏到第三屏沙发动画
            if(index==2 && nextIndex==3){
               $('.section:eq(1) .sofa').addClass('animated');
               	
            }else if(index==3&&nextIndex==4){
            	$('.section:eq(2) .sofa').addClass('animated');
            }else if(index==5&&nextIndex==6){
                $('.section:eq(4) .sofa').addClass('animated');
                $('.section:eq(5) .box').addClass('animated');
            }else if(index==6&&nextIndex==7){
                $('.section:eq(6) .star img').each(function(i,item){
                    $(item).delay(i*500).fadeIn();
                });
            }
        },
        // 控制动画切换时间
        scrollingSpeed:1000,
        // 页面架构加载完成
        afterRender:function(){
        	// 监听第四屏购物车的动画结束事件
        	$('.section:eq(3) .cart').on('animationend',function(){
        		// 显示收货容器
        		//fadeIn([speed],[easing],[fn]) 200,linear|swing callback
        		$('.section:eq(3) .address').fadeIn(500,'linear',function(){
                     $(this).find('img:eq(1)').fadeIn();
        		});
        		// 换个文字显示
        		$('.section:eq(3) .text img:eq(0)').hide();
        		$('.section:eq(3) .text img:eq(1)').fadeIn(500);
        	});
        	//点击更多切换下一屏
        	// $('.more').click(function(){
        	// 	$.fn.fullpage.moveSectionDown();
        	// });
        	$('.more').on('click',function(){
        	// 	that指向插件对象 插件对象没有moveSectionDown
        	// 	指向插件对象fullpage jquery插件
        	// 	$.fn jquery提供扩展第三方方法(插件方法)的入口
        	// 	$.fn.fullpage=function(){}
        	// 	$.fn.fullpage.moveSectionDown=function(){}封装插件更多的方法
        		$.fn.fullpage.moveSectionDown();
        	});
            // 第八屏的需求
            $('.section:eq(7)').on('mousemove',function(e){
                $(this).find('.hand').css({
                    left:e.pageX,
                    top:e.pageY+30
                });
            }).on('click','.again',function(){
                $.fn.fullpage.moveTo(1);
                $('.section.now').removeClass('now');
                $('.section').find('animated').removeClass('animated');
                $('.section').find('[style]').removeAttr('style');
            })
        }
    });
})
