  //statusbar 下拉框 
/*  $('body').on('click','.status-bar-down',function(){
  	$('.admin-wrap').slideDown();
  	e.stopPropagation();
  })*/
 //用户下拉出现
 $('.status-bar-down').click(function(e){
 	$('.admin-wrap').slideDown();
  	e.stopPropagation();
 });
  $(document).click(function(e){
  	$('.admin-wrap').slideUp();
  });
  //滚动 搜索条 fixed
    $(window).scroll(function(){
          var t=$(window).height();
          var s=$(this).scrollTop();
         if(s>55){
            $(".fixed-mn").css({position:"fixed",top:"0px"});
          }
         else{
         	$(".fixed-mn").css({position:"static"});
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
  		    this.initNumber();
		  		this.listsHover();
		  		this.deleteLites();
		  		this.slideDown();
		  		this.deleteWrap();
		  		this.addLites();
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
    		var $siblingsWrap = $('.resource-new-list').siblings('.resource-wrap');
    		$siblingsWrap.addClass('animate-del-height').removeClass('resource-border');
    		$siblingsWrap.find('.resource-up-header').removeClass('border-bottom top-select').addClass('down-select');
    		$('.animate-del-height').height(52);
    		
    		 $('.resource-new-list').show().addClass('animate-add-height resource-border');
    		 $('.resource-new-list').find('.resource-up-header').addClass('border-bottom');
    		 $('.course-edit').hide();
    		 $('.course-add').show();
    		 var height = $('.resource-new-list').find('.resource-down').height() + 52;
    		 $('.resource-new-list').height(height);
    		 $('.resource-new-list').find('.resource-up-header').removeClass('down-select').addClass('top-select');
    		 
    		 
    		 
    	});
    },
    //备课夹里内容排序
  	sort:function(){
  		var $li = $('.resource-list li');
  		for (var i = 0; i<$li.length; i++) {
        	$li.eq(i).find('.resource-list-num').text(i+1);
  		}	
  	},
  	initNumber:function(){
  		var num = $('.resource-list li').length;
  		$('.resource-up-number em').text(num);
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
  			}else if($('.resource-wrap').hasClass('resource-border')){
  				var offset = $(".resource-wrap").offset(); 
	  			var img = "<img class='img-fly' src='img/members/resource/fly.jpg'>"; //获取当前点击图片链接 
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
				    			+"<span class='resource-list-img'><img src='img/members/resource/resource-img.png'/></span>"
				    			+"<span class='resource-list-info'>图片：蛋宝宝</span>"
				    			+"<span class='resource-list-delete glyphicon glyphicon-trash'></span>"
							+"</li>";
				$('.resource-list').prepend(html);
				favorites.sort();
				favorites.initNumber();
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
				favorites.initNumber();
				
		});
  	},
  	//备课夹展开
  	slideDown:function(){
  		$('body').on('click','.resource-up-header',function(){
  			var wrap = $(this).parents('.resource-wrap');
  			var wrapDown = $(this).siblings('.resource-down');
  			wrap.siblings(".resource-wrap").addClass('animate-del-height').removeClass('resource-border animate-add-height');
  			wrap.siblings(".resource-wrap").find('.resource-up-header').removeClass('top-select border-bottom').addClass('down-select');
        $('.animate-del-height').height(52);
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
			}else{
				wrap.removeClass('resource-border animate-add-height').addClass('animate-del-height');
				$(this).parents('.animate-del-height').height(52);
				$(this).removeClass('border-bottom top-select').addClass('down-select');
			}
  		});
  	},
  	//删除整个备课夹
  	deleteWrap:function(){
  		$('body').on('click','.resource-delete',function(){
  			var r = confirm('是否要删除当前整个文件夹');
		    if (r==true){
			   $(this).parents('.resource-wrap').remove();
			 }else{
			     return;
			 }
		});
  	}
  }

  
 jQuery(function ($){
    favorites.init();
});

