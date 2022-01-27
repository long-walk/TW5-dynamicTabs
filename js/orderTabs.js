/*\
title: $:/long-walk/TW5-dynamicTabs/orderTabs.js
type: application/javascript
module-type: macro

\*/
(function(){

"use strict";

exports.name = "orderTabs";
exports.params = [
	{ name:"mainTabsTiddler" },   /* mainTabsTiddler Tiddler */ 
	{ name:"direction" }  /* up = -1, down = 1 */
];
let fromName = "";

/*\
 * Sort the tiddlilist
 *
\*/
exports.run = function(mainTabsTiddler, direction) {
    try {
        var button = "";
        var selected = "";
        direction = Number(direction);
        
        var selector = "[data-tiddler-title=\"" + mainTabsTiddler + "\"] .tc-tab-buttons button";
        var selectedSelector = "[data-tiddler-title=\"" + mainTabsTiddler + "\"] .tc-tab-buttons .tc-tab-selected";

        if (document.querySelectorAll(selectedSelector)[0])
            selected = document.querySelectorAll(selectedSelector)[0].innerHTML.trim();
        
        var buttonList = document.querySelectorAll(selector);
        var buttonCount = buttonList.length;
        var from = Number($tw.wiki.getTiddler(selected).fields.order);
        var to = (from + direction);
        if ( to < 0 )
                to = 0;
        if ( to > buttonCount-1 )
                to = buttonCount-1;
        
        recursiveOrder(0, buttonList, from, to);
        
        return;
    } catch (err) {
        console.error(err.stack)
        return "(ERROR: " + err.message + ") ";
    }
};
    
function recursiveOrder(index, buttonList, from, to){
    // save the pre, current and previous tiddler Name
    try {
        var name = buttonList[index].innerHTML.trim();
        var preName = "";
        var postName = "";

        if (index > 0)
            preName = buttonList[index-1].innerHTML.trim();
        if(index < buttonList.length-1)
            postName = buttonList[index+1].innerHTML.trim();
        if (index == to)
            name = buttonList[from].innerHTML.trim();
        if (index == from)
            fromName = name; // Global variable

        // recusion  
        var status = 0;
        if (index < buttonList.length-1){
            status = recursiveOrder((index+1), buttonList, from, to);
        }

        // reorder tidlers
        if (index == from && status == 0){
            status--;
            name = preName;
        }else if (index == from){
            status--;
            name = postName;
        }else if (index == to){
            status++;
            name = fromName;
        }else if (status > 0){
            name = postName;
        }else if (status < 0){
            name = preName;
        }
        $tw.wiki.setText(name, "order", 0, index, {suppressTimestamp: true});
        return status;
    } catch (err) {
        console.error(err.stack)
    }
}
})();

