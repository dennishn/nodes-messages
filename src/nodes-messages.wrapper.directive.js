(function () {
	'use strict';

	angular
		.module('nodes-messages.wrapper', ['nodes-messages.provider'])
		.directive('nodesMessagesWrapper', wrapper);

	/* @ngInject */
	function wrapper(messagesProvider) {

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
				scope.hPos = messagesProvider.settings.horizontalPosition;
				scope.vPos = messagesProvider.settings.verticalPosition;

				scope.messages = messagesProvider.messages;
			};
		}

	}

})();
