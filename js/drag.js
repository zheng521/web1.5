$(function() {
		function Pointer(x, y) {
			this.x = x ;
			this.y = y ;
		}
		function Position(left, top) {
			this.left = left ;
			this.top = top ;
		}
	
		$(".favorites-list .favorites-lists-item").each(function(i) {
			this.init = function() { // ³õÊ¼»¯
				this.box = $(this).parent();
				$(this).attr("index", i).css({
					position : "absolute",
					left : this.box.offset().left,
					top : this.box.offset().top
				}).appendTo(".favorites-list") ;
				$(this).find('.favorites-item-number').html( parseInt($(this).attr("index")) + 1);
				
				this.drag();
			},
			this.move = function(callback) {  // ÒÆ¶¯
				$(this).stop(true).animate({
					left : this.box.offset().left,
					top : this.box.offset().top
				}, 500, function() {
					if(callback) {
						callback.call(this) ;
					}
				}) ;
			},
			this.collisionCheck = function() {
				var currentItem = this ;
				var direction = null ;
				$(this).siblings(".favorites-lists-item").each(function() {
					if(
						currentItem.pointer.x > this.box.offset().left &&
						currentItem.pointer.y > this.box.offset().top &&
						(currentItem.pointer.x < this.box.offset().left + this.box.width()) &&
						(currentItem.pointer.y < this.box.offset().top + this.box.height())
					) {
						// ·µ»Ø¶ÔÏóºÍ·½Ïò
						if(currentItem.box.offset().top < this.box.offset().top) {
							direction = "down" ;
						} else if(currentItem.box.offset().top > this.box.offset().top) {
							direction = "up" ;
						} else {
							direction = "normal" ;
						}
						this.swap(currentItem, direction) ;
					}
				}) ;
			},
			this.swap = function(currentItem, direction) { // ½»»»Î»ÖÃ
				if(this.moveing) return false ;
				var directions = {
					normal : function() {
						var saveBox = this.box ;
						this.box = currentItem.box ;
						currentItem.box = saveBox ;
						this.move() ;
						$(this).attr("index", this.box.index()) ;
						$(currentItem).attr("index", currentItem.box.index()) ;
					},
					down : function() {
						// ÒÆµ½ÉÏ·½
						var box = this.box ;
						var node = this ;
						var startIndex = currentItem.box.index() ;
						var endIndex = node.box.index(); ;
						for(var i = endIndex; i > startIndex ; i--) {
							var prevNode = $(".favorites-list .favorites-lists-item[index="+ (i - 1) +"]")[0] ;
							node.box = prevNode.box ;
							$(node).attr("index", node.box.index()) ;
							node.move() ;
							node = prevNode ;
						}
						currentItem.box = box ;
						$(currentItem).attr("index", box.index()) ;
					},
					up : function() {
						// ÒÆµ½ÉÏ·½
						var box = this.box ;
						var node = this ;
						var startIndex = node.box.index() ;
						var endIndex = currentItem.box.index(); ;
						for(var i = startIndex; i < endIndex; i++) {
							var nextNode = $(".favorites-list .favorites-lists-item[index="+ (i + 1) +"]")[0] ;
							node.box = nextNode.box ;
							$(node).attr("index", node.box.index()) ;
							node.move() ;
							node = nextNode ;
						}
						currentItem.box = box ;
						$(currentItem).attr("index", box.index()) ;
					}
				}
				directions[direction].call(this) ;
			},
			this.drag = function() { // ÍÏ×§
				var $that = $(this);

				var oldPosition = new Position() ;
				var oldPointer = new Pointer() ;
				var isDrag = false ;
				var currentItem = null ;
				$(this).mousedown(function(e) {
					e.preventDefault() ;
					oldPosition.left = $(this).position().left ;
					oldPosition.top =  $(this).position().top ;
					oldPointer.x = e.clientX ;
					oldPointer.y = e.clientY ;
					isDrag = true ;
					
					currentItem = this ;
					
				});
				$(document).mousemove(function(e) {
					var currentPointer = new Pointer(e.clientX, e.clientY) ;
					if(!isDrag) return false ;
					$(currentItem).css({
						"opacity" : "0.8",
						"z-index" : 999
					});
					var left = currentPointer.x - oldPointer.x + oldPosition.left ;
					var top = currentPointer.y - oldPointer.y + oldPosition.top ;
					$(currentItem).css({
						left : left,
						top : top
					}) ;
					currentItem.pointer = currentPointer ;
					// ¿ªÊ¼½»»»Î»ÖÃ
					
					currentItem.collisionCheck() ;
					
					
				}) ;
				$(document).mouseup(function() {
					if(!isDrag) return false ;
					isDrag = false ;
					currentItem.move(function() {
						$(this).css({
							"opacity" : "1",
							"z-index" : 0
						}) ;
					}) ;
					
		            
					var length = $that.parent().children('.favorites-lists-item').length;
					for( var i = 0;i<length; i++){
						var num = parseInt($that.parent().children('.favorites-lists-item').eq(i).attr('index')) + 1 ;
						$that.parent().children('.favorites-lists-item').eq(i).find('.favorites-item-number').html(num);
					}
				});
			}
			this.init();
		});
	//鼠标滑过 添加边框
	$('body').on('mouseover','.favorites-lists-item', function(){
		$(this).addClass('favorites-lists-item-hover');
	});
	$('body').on('mouseleave','.favorites-lists-item', function(){
		$(this).removeClass('favorites-lists-item-hover');
	});
	//点击选中
	$('body').on('click','.favorites-lists-item', function(){

		if($(this).find('.favorites-select').hasClass('favorites-select-hover')){
			$(this).find('.favorites-select').removeClass('favorites-select-hover');
		}else{
			$(this).find('.favorites-select').addClass('favorites-select-hover');
		}
	});
	//全选
	$('body').on('click','.btn-select-all',function(){
		$('.favorites-lists-item').find('.favorites-select').addClass('favorites-select-hover');
	});
	//删除
	$('body').on('click','.btn-delete',function(){
		$(".favorites-list .favorites-lists-item").each(function(i){
			var $checkbox =  $(this).find('.favorites-select');
			if($checkbox.hasClass('favorites-select-hover')){
				$(this).remove();
			}
		});
	});
	//改变窗口大小 页面重新刷新	 
		$(window).resize(function(){
			location.reload();
		});
	});