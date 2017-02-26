function onClick(info, tab){
    console.log("item" info.menuItemId + "was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
}

var options = ["TimeGrid","Ubill","Grades"];

for(var i = 0; i < options.length; i++){
    var context = options[i];
    var title = "Test: " + context;
    var id = chrome.contextMenus.create({"title":title,"context":[context],"onclick":onClick});
    console.log(context);
}