$(function(){
	$('.link .button').hover(function(){
		var title = $(this).attr('data');
		$('.tip em').text(title);
		var pos = $(this).position().left+10;
		//获取到a标签,相对于最近相对定位的元素box的距离
		var dis = ($('.tip').outerWidth()-$(this).outerWidth())/2;
		//不能用width，tip的width没有定义
		$('.tip').css('left',pos-dis).animate({'top':145,'opacity':1},300);
	},function(){
		if(!$('.tip').is(':animated')){
			$('.tip').animate({'top':100,'opacity':0},300);
		}else{
			$('.tip').stop().animate();
			$('.tip').animate({'top':100,'opacity':0},300);
		}
	})
})