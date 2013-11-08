
// main.js for memorizepie, @f03lipe

var msgs = {
	300: 'There\'s a limit for how far we can go, did d\'ya know that?',
	700: 'You can\'t possibly have memorized all of this.',
	1800: 'Go on, I\'m sure you\'re just pressing → anyways.',
	3500: 'I won\'t bother with you no more.',
	7000: 'See, the digits here are finite, but it\'s still going to take you a long time to get there...',
}

$(function () {

	function onResize() {
		$("#number-wrapper").height($(window).height());

		/* Calculate x,y changes per font-size unit to an element size. */
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

		/* Change to fit #number-wrapper. */
		var incFont = Math.min(($('#number-wrapper').width()-$("#number").width())/d.x,
			($('#number-wrapper').height()-$("#number").height())/d.y);
		$("#number").css('font-size', '+='+incFont);
		$("#number-wrapper").css('margin-top', '-'+$("#number").height()/2+'px');
	}

	var step = 5;

	function updateCount(x) {
		$("#number").html(x);
		$(".info #dcount").html(i-1-step);
		$(".info #count").html((i-1-step)/step);
		var y = i-i%50 || 0;
		while (y > 200) {
			// break;
			if (msgs[y]) {
				$(".info #msg").html(msgs[y]);
				return;
			}
			y -= 50;
		}
		$(".info #msg").html('');
	}

	function fadeInOut () {
		$("#number").addClass('is');
		setTimeout(function () {
			$("#number").removeClass('is');
		}, 200);
	}

	function getNext () {
		if (i>pi.length-1)
			updateCount('BADASSS!');
		else {
			fadeInOut();
			updateCount(pi.slice(i,(i+=5)));
		}
	}
		
	function getPrevious () {
		fadeInOut();
		i = Math.max(0,i-10); // i = i-10, at least 0;
		i = (i==1)?0:i;
		updateCount(pi.slice(i,(i+=step+((i<step)?1:0))));
	}

	$(window).resize(onResize);
	setTimeout(onResize,500);

	var i = 6;
	updateCount(pi.slice(0,6));
	$('.container').bind('click', getNext);

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
