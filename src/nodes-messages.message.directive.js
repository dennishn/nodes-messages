(function () {
	'use strict';

	angular
		.module('nodes-messages.message', ['nodes-messages.provider'])
		.directive('nodesMessagesMessage', message);

	/* @ngInject */
	function message(nodesMessages, $timeout) {

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
					nodesMessages.dismiss(scope.message.id);
				}, scope.message.timeout);
			}

			if (scope.message.dismissOnClick) {
				element.bind('click', function () {
					nodesMessages.dismiss(scope.message.id);
					scope.$apply();
				});
			}
		}

		function controller($scope, nodesMessages) {
			$scope.dismiss = function () {
				nodesMessages.dismiss($scope.message.id);
			};
		}

	}

})();
