  //statusbar 下拉框 
/*  $('body').on('click','.status-bar-down',function(){
  	$('.admin-wrap').slideDown();
  	e.stopPropagation();
  })*/
 //用户下拉出现
 $('.status-bar-down').click(function(e){
 	$('.admin-wrap').show();
  	e.stopPropagation();
 });
  $(document).click(function(e){
  	$('.admin-wrap').hide();
  });
  //滚动 搜索条 fixed
    $(window).scroll(function(){
          var t=$(window).height();
          var s=$(this).scrollTop();
         if(s>55){
            $(".fixed-mn").css({position:"fixed",top:"0px"});
            $('.sliderbar').css({position:'fixed',top:'0px',marginLeft:'30px'});
          }
         else{
         	$(".fixed-mn").css({position:"static"});
         	$(".sliderbar").css({position:"static"});
         }
         
    });
        
	//下拉框 JS
		$('.nice-select').click(function(e){
		    $('.nice-select').find('ul').hide();
		    $(this).find('ul').show();
		   	e.stopPropagation();
		});
		$('.nice-select li').hover(function(e){
			$(this).toggleClass('on');
			e.stopPropagation();
		});
		$('.nice-select li').click(function(e){
			var val = $(this).text();
			$(this).parents('.nice-select').find('input').val(val).addClass('on');
			$('.nice-select ul').hide();
			e.stopPropagation();
		});
		$(document).click(function(){
			$('.nice-select ul').hide();
		});

  var favorites = {
  	
  	init: function(){
          this.editShow();
          this.addNewList();
		  		this.listsHover();
		  		this.deleteLites();
		  		this.slideDown();
		  		this.deleteWrap();
		  		this.addLites();
		  		this.backCourse();
  	},
  	//创建备课夹显示
    editShow:function(){
    	$('body').on('click','.course-add',function(){
    		 $(this).hide();
    		 $('.course-edit').show();
    	});
    },
    //创建新的备课夹
    addNewList:function(){
    	$('body').on('click','.btn-add-list',function(){
    		
    		 $('.resource-new-list').show().addClass('animate-add-height resource-border');
    		 $('.resource-new-list').find('.resource-up-header').addClass('border-bottom');
    		 $('.course-edit').hide();
    		 $('.course-back').show();
    		 var height = $('.resource-new-list').find('.resource-down').height() + 52;
    		 $('.resource-new-list').height(height);
    		 $('.resource-new-list').find('.resource-up-header').removeClass('down-select').addClass('top-select');
    		 $('.resource-new-list').siblings('.resource-wrap').hide();
    		 
    	});
    },
    //备课夹里内容排序
  	sort:function(){
  		var $li = $('.resource-border .resource-list li');
  		for (var i = 0; i<$li.length; i++) {
        	$li.eq(i).find('.resource-list-num').text(i+1);
  		}	
  	},
  	listsHover:function(){
  		$('body').on('mouseover','.resource-list li', function(){
			$(this).addClass('active');
		});
		$('body').on('mouseleave','.resource-list li', function(){
			$(this).removeClass('active');
		});
  	},
  	//增加备课夹内容
  	addLites:function(){
  		$('body').on('click','.btn-add-course',function(event){
  			if($(this).hasClass('btn-add-course-hov')){
  				return;
  			}
  			if($('.resource-wrap').hasClass('animate-add-height')){
  				var offset = $(".resource-border").offset(); 
	  			var img = "<img class='img-fly' src='img/admin/resource/fly.jpg'>"; //获取当前点击图片链接 
		        var flyer = $(img); //抛物体对象 
		        flyer.fly({ 
		            start: { 
		                left: event.pageX,//抛物体起点横坐标 
		                top: event.pageY //抛物体起点纵坐标 
		            }, 
		            end: { 
		                left: offset.left + 10,//抛物体终点横坐标 
		                top: offset.top + 10, //抛物体终点纵坐标 
		            }, 
		            onEnd: function() {
		            	 $(".img-fly").fadeOut(50).remove();
		            	this.destory();
		            
		            } 
		         });
	  			$(this).addClass('btn-add-course-hov');
	  			var html =  "<li class='clearfix'>"
				    			+"<span class='resource-list-num'>1</span>"
				    			+"<span class='resource-list-img'><img src='img/admin/resource/resource-img.png'/></span>"
				    			+"<span class='resource-list-info'>图片：蛋宝宝</span>"
				    			+"<span class='resource-list-delete glyphicon glyphicon-trash'></span>"
							+"</li>";
				$('.resource-list').prepend(html);
				var height = $('.animate-add-height').find('.resource-down').height() + 52;
        $('.animate-add-height').height(height);
				favorites.sort();
				var length = $('.resource-border').find('li').length;
				$('.resource-border').find('.resource-up-number em').text(length);
  			}else{
  				$('.course-info').slideDown();
  				$('.sliderbar').addClass('shake');
  				setTimeout(function(){
  					$('.course-info').slideUp();
  					$('.sliderbar').removeClass('shake');
  				},2000)
  			}
  		});
  	},
  	//删除备课夹里内容
  	deleteLites:function(){
  		$('body').on('click','.resource-list-delete',function(){
  			
  			var length = $(this).parents('.resource-list').find('li').length;
  			var wrapDown = $(this).parents('.resource-down');
  			var height;
        if( length > 5) {
        	 height = wrapDown.height() + 50;
        }else{
        	 height = wrapDown.height() - 15;
        }
        $(this).parents('.animate-add-height').height(height);
				var $li=$(this).parents('li');
				$li.remove();
				favorites.sort();	
		});
  	},
  	//备课夹展开
  	slideDown:function(){
  		$('body').on('click','.resource-up-header',function(){
  			$('.course-edit').hide();
  			var wrap = $(this).parents('.resource-wrap');
  			var wrapDown = $(this).siblings('.resource-down');
  			wrap.siblings(".resource-wrap").hide().addClass('animate-del-height').removeClass('resource-border animate-add-height');
  			wrap.siblings(".resource-wrap").find('.resource-up-header').removeClass('top-select border-bottom').addClass('down-select');
        $('.animate-del-height').height(52);
        $('.course-add').hide();
        $('.course-back').show();
			if($(this).hasClass('down-select')){
				$(this).addClass('border-bottom top-select').removeClass('down-select');
        wrap.addClass('animate-add-height resource-border').removeClass('animate-del-height');
        var height = wrapDown.height() + 52;
        $(this).parents('.animate-add-height').height(height);
       //
				var arr = ["list-item-1","list-item-2","list-item-3","list-item-4","list-item-5","list-item-6"];
				$(".lists-item").each(function(){
					for(var i = 0; i<arr.length ; i++){
						if($(this).attr('id') == arr[i]){
							$(this).find('.btn-add-course').addClass('btn-add-course-hov');
						}
					}
				});
			}
  		});
  	},
  	//返回备课夹
  	backCourse:function(){
  		$('body').on('click','.course-back',function(){
  			 $(this).hide();
  			 $('.course-add').show();
  			 $('.resource-wrap').show().removeClass('animate-add-height resource-border').addClass('animate-del-height');
  			 $('.animate-del-height').height(54);
  			 $('.resource-wrap').find('.resource-up-header').removeClass('border-bottom top-select').addClass('down-select');
  		});
  	},
  	//删除整个备课夹
  	deleteWrap:function(){
  		$('body').on('click','#delete-course',function(){
  			$(".resource-border").remove();
  			$('#delete-cancel').click();
  			$('.course-back').hide();
  			$('.course-add').show();
  			$('.resource-wrap').show();
		});
  	}
  }

  
 jQuery(function ($){
    favorites.init();
});

