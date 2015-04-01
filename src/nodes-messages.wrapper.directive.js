(function () {
	'use strict';

	angular
		.module('nodes-messages.wrapper', ['nodes-messages.provider'])
		.directive('nodesMessagesWrapper', wrapper);

	/* @ngInject */
	function wrapper(nodesMessages) {

		var directive = {
			restrict: 'EA',
			replace: true,
			compile: compile,
			templateUrl: 'src/nodes-messages.wrapper.template.html'
		};
		return directive;

		function compile(tElem, tAttrs) {

			return function(scope) {
				// pænere end ..Pos!
				scope.hPos = nodesMessages.settings.horizontalPosition;
				scope.vPos = nodesMessages.settings.verticalPosition;

				scope.messages = nodesMessages.messages;
			};
		}

	}

})();
