app
.factory('randomEmail', function() {
	var getRandomEmail = function() {
		var box = Math.round(Math.random() * 3) + 2;
		var sld = Math.round(Math.random() * 3) + 2;
		var tld = 2;
		return getRandomString(box) + '@' + getRandomString(sld) + '.' + getRandomString(tld);
	};

	var getRandomString = function(max, min) {
		if (!max) return;
		min = min || 1;
		var string = "";
	    var charset = "abcdefghijklmnopqrstuvwxyz";

	    for(var i = min; i <= max; i++) {
	        string += charset.charAt(Math.floor(Math.random() * charset.length));
	    }

	    return string;
	};

	return getRandomEmail;
});