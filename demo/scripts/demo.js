/**
 * Author: Dennis Haulund Nielsen
 */
(function() {

	hljs.initHighlightingOnLoad();

	$(document).ready(function() {

		$('#navigation').ddscrollSpy({
			highlightclass: 'active',
			enableprogress: 'progress'
		});

		setTimeout(function() {
			$('.nodes-message-demo-static').addClass('js-in');
		}, 1000);

	});

})();
