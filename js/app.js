var app = angular.module('testApp', ['emailsEditor'])
.controller('mainCtrl', ['EmailsEditor', 'randomEmail', '$window', 
	function(EmailsEditor, randomEmail, $window) {
		var ctrl = this;

		ctrl.emailsEditor = new EmailsEditor('Share \u201cBoard name\u201c with others');

		ctrl.addRandomEmail = function() {
			ctrl.emailsEditor.addValue(randomEmail());
		};

		ctrl.alertEmailsLength = function() {
			$window.alert(ctrl.emailsEditor.emails.length);
		};
}]);