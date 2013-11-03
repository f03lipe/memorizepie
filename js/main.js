
$(function () {
	function onResize() {
		$("#number-wrapper").height($(window).height());

		var d = (function calcDelta () {
			var old = $("#number").css('font-size');
			var inc = 2000;
			var h1 = $("#number").height();
			var w1 = $("#number").width();
			$("#number").css('font-size', '+='+inc);
			var h2 = $("#number").height();
			var w2 = $("#number").width();
			$("#number").css('font-size',"-="+inc);
			return {y: (h2-h1)/inc, x: (w2-w1)/inc};
		})();

		var incFont = Math.min(($('#number-wrapper').width()-$("#number").width())/d.x,
			($('#number-wrapper').height()-$("#number").height())/d.y);

		console.log(d, incFont);

		$("#number").css('font-size', '+='+incFont);
		$("#number-wrapper").css('margin-top', '-'+$("#number").height()/2+'px');
	}

	function update (x) {
		$("#number").html(x);
	}

	$(window).resize(onResize);
	setTimeout(onResize,500);

	var i = 6;
	update(pi.slice(0,6));
	$('.container').bind('click', getNext);

	function fadeInOut () {
		$("#number").addClass('is');
		setTimeout(function () {
			$("#number").removeClass('is');
		}, 200);
	}

	function getNext () {
		if (i>pi.length-1)
			update('BADASSS!');
		else {
			fadeInOut();
			update(pi.slice(i,(i+=5)));
		}
	}
		
	function getPrevious () {
		fadeInOut();
		i = Math.max(0,i-10); // i = i-10, at least 0;
		i = (i==1)?0:i;
		update(pi.slice(i,(i+=(i<5)?6:5)));
	}

	$(window).keydown(function (e) {
		var keyCode = e.keyCode || e.which,
		arrow = {left: 37, up: 38, right: 39, down: 40 };
		switch (keyCode) {
			case arrow.left: getPrevious(); break;
			case arrow.up: getPrevious(); break;
			case arrow.right: getNext(); break;
			case arrow.down: getNext(); break;
		}
	});
});
