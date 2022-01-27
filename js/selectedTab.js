/*\
title: $:/long-walk/TW5-dynamicTabs/selectedTab.js
type: application/javascript
module-type: macro

\*/
(function(){

"use strict";

exports.name = "selectedTab";
exports.params = [{name:"mainTabsTiddler"}];

/*\
Return the Selected Tab 
\*/
exports.run = function(mainTabsTiddler) {
	try {
		var out = "";
		var selector = "[data-tiddler-title=\"" + mainTabsTiddler + "\"] .tc-tab-buttons .tc-tab-selected";

		if (document.querySelectorAll(selector)[0])
			out = document.querySelectorAll(selector)[0].innerHTML.trim();
		return out;
	} catch (err) {
		console.error(err.message + ": " + err.stack)
		return "(ERROR: " + err.message + ") ";
	}
};
})();
