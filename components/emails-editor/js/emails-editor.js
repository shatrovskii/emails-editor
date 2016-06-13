function emailsEditorController($scope, $element, $attrs, $timeout) {
	var ctrl = this;
	ctrl.element = $element[0];
	ctrl.inputValue = '';
	ctrl.input = ctrl.element.querySelector('.emails-editor__input');
	ctrl.inputBuffer = ctrl.element.querySelector('.emails-editor__input-buffer');
	ctrl.component = ctrl.element.querySelector('.emails-editor__component');

	ctrl.inputKeyDown = function($event) {
		var keyCode = $event.which || $event.keyCode;
		switch(keyCode) {
			case 8:
				ctrl.handleBackspace();
				break;
			case 13:
				ctrl.saveValue();
				break;
			default:
				if ($event.key === ',') ctrl.handleComma($event);
		} 
	};

	ctrl.handleComma = function($event) {
		$event.preventDefault();
		ctrl.saveValue();
	};

	ctrl.saveValue = function() {
		if (!ctrl.inputValue || !ctrl.inputValue.trim()) {
			return;
		}

		ctrl.onCreate({values: ctrl.inputValue});
		$timeout(ctrl.resetInput);
	};

	ctrl.handleBackspace = function() {
		var emails = ctrl.model.emails;
		if (!ctrl.inputValue && emails.length > 0) {
			ctrl.onDelete({'value': emails[emails.length - 1].value});
		}
	};

	ctrl.resetInput = function() {
		ctrl.inputValue = '';
		ctrl.resizeInput();
	};

	ctrl.resizeInput = function() {
		ctrl.inputBuffer.textContent = ctrl.inputValue;
		ctrl.input.style.width = ctrl.inputBuffer.clientWidth + 'px';
		ctrl.scrollToInput();
	};

	ctrl.focusInput = function() {
		ctrl.element.querySelector('.emails-editor__input').focus();
	};

	ctrl.scrollToInput = function() {
		ctrl.component.scrollTop = ctrl.component.scrollHeight;
	}

	ctrl.handlePaste = function($event) {
		$event.preventDefault();
		var pasteData = $event.clipboardData.getData('text/plain');
		ctrl.onCreate({values: pasteData});
	};

}

angular.module('emailsEditor', [])
.component('emailsEditor', {
	templateUrl: 'components/emails-editor/templates/emails-editor.html',
	controller: emailsEditorController,
	bindings: {
		model: '<',
		onCreate: '&',
		onDelete: '&'
	}
})
.factory('EmailsEditor', function() {
	var EmailsEditorItem = function(value) {
		this.value = value;
		this.valid = this.isValidEmail(value);
	}

	EmailsEditorItem.prototype.isValidEmail = function(value) {
		return (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).test(value);
	}

	var EmailsEditor = function(title) {
		this.title = title;
		this.emails = [];
	}

	EmailsEditor.prototype.containsValue = function(value) {
		return this.emails.some(function(email) {
			return email.value === value;
		});
	};

	EmailsEditor.prototype.addValue = function(value) {
		if (!this.containsValue(value)) this.emails.push(new EmailsEditorItem(value));	
	};

	EmailsEditor.prototype.addValues = function(values) {
		var newValues = values.split(',');
		var editor = this;
		newValues.forEach(function(value) {
			editor.addValue(value.trim());
		});
	};

	EmailsEditor.prototype.removeValue = function(value) {
		for (var i = 0; i < this.emails.length; i++) {
			if(this.emails[i].value === value) {
				this.emails.splice(i, 1);
				break;
			}
		}
	};

	return EmailsEditor;
});