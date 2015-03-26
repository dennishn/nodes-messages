(function () {
	'use strict';

	angular
		.module('nodes-messages.message', ['nodes-messages.provider'])
		.directive('nodesMessagesMessage', message);

	/* @ngInject */
	function message(messagesProvider) {

		var directive = {
			restrict: 'EA',
			transclude: true,
			templateUrl: 'src/nodes-messages.message.template.html',
			scope: {
				message: '=nodesMessagesMessage'
			},
			link: link,
			controller: controller
		};
		return directive;

		function link(scope, element) {
			if (scope.message.dismissOnTimeout) {
				$timeout(function () {
					messagesProvider.dismiss(scope.message.id);
				}, scope.message.timeout);
			}

			if (scope.message.dismissOnClick) {
				element.bind('click', function () {
					messagesProvider.dismiss(scope.message.id);
					scope.$apply();
				});
			}
		}

		function controller($scope, messagesProvider) {
			$scope.dismiss = function () {
				messagesProvider.dismiss($scope.message.id);
			};
		}

	}

})();
