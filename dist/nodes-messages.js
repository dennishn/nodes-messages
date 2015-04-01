/**
 * 
 * @version v1.0.0 - 2015-04-01
 * @link 
 * @author 
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
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
	message.$inject = ["nodesMessages", "$timeout"];

})();

(function () {
	'use strict';

	angular.module('nodes-messages', [
		'ngSanitize',
		'ngAnimate',
		'nodes-messages.provider',
		'nodes-messages.wrapper',
		'nodes-messages.message'
	]);

})();

(function () {
	'use strict';

	angular
		.module('nodes-messages.provider', [])
		.provider('nodesMessages', messagesProvider);

	function messagesProvider() {
		var messages = [],
			messageStack = [];

		var defaults = {
			type: 'success',
			dismissOnTimeout: true,
			timeout: 4000,
			dismissButton: false,
			dismissButtonHtml: '&times;',
			dismissOnClick: true,
			horizontalPosition: 'center',
			verticalPosition: 'top',
			maxNumber: 0
		};

		function Message(msg) {

			var id = Math.floor(Math.random()*1000);

			while (messages.indexOf(id) > -1) {
				id = Math.floor(Math.random()*1000);
			}

			this.id = id;
			this.type = defaults.type;
			this.dismissOnTimeout = defaults.dismissOnTimeout;
			this.timeout = defaults.timeout;
			this.dismissButton = defaults.dismissButton;
			this.dismissButtonHtml = defaults.dismissButtonHtml;
			this.dismissOnClick = defaults.dismissOnClick;

			angular.extend(this, msg);
			console.log(this)

		}

		this.configure = function(config) {
			angular.extend(defaults, config);
		};

		this.$get = [function() {
			return {
				settings: defaults,
				messages: messages,
				dismiss: function(id) {
					if (id) {

						for (var i = messages.length - 1; i >= 0; i--) {
							if (messages[i].id === id) {
								messages.splice(i, 1);
								messageStack.splice(messageStack.indexOf(id), 1);
								return;
							}
						}

					} else {

						while(messages.length > 0) {
							messages.pop();
						}

						messageStack = [];
					}
				},
				create: function(msg) {

					if (defaults.maxNumber > 0 &&
						messageStack.length >= defaults.maxNumber) {
						this.dismiss(messageStack[0]);
					}

					msg = (typeof msg === 'string') ? {content: msg} : msg;

					var newMsg = new Message(msg);

					if(defaults.verticalPosition === 'bottom') {
						messages.unshift(newMsg);
					} else {
						messages.push(newMsg);
					}

					messageStack.push(newMsg.id);

					return newMsg.id;
				}
			};
		}];
	}

})();

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
	wrapper.$inject = ["nodesMessages"];

})();

angular.module('nodes-messages').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('nodes-messages.message.template.html',
    "<div class=\"nodes-messages__message {{message.type}}\">\n" +
    "\n" +
    "\t<a class=\"nodes-messages__close-button\" ng-if=\"message.dismissButton\" ng-bind-html=\"message.dismissButtonHtml\" ng-click=\"!message.dismissOnClick && dismis()\"></a>\n" +
    "\n" +
    "\t<span class=\"nodes-messages__content\" ng-transclude=\"\"></span>\n" +
    "</div>"
  );


  $templateCache.put('nodes-messages.wrapper.template.html',
    "<div class=\"nodes-messages nodes-messages--{{hPos}}-{{vPos}}\">\n" +
    "\t<ul class=\"nodes-messages__list\">\n" +
    "\t\t<li ng-repeat=\"message in messages track by $index\" nodes-messages-message=\"message\">\n" +
    "\t\t\t<span ng-bind-html=\"message.content\"></span>\n" +
    "\t\t</li>\n" +
    "\t</ul>\n" +
    "</div>"
  );

}]);
