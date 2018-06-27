	
var idbSupported = false;
var db;
 
document.addEventListener("DOMContentLoaded", function(){
 
    if("indexedDB" in window) {
        idbSupported = true;
    }
 
    if(idbSupported) {
        var openRequest = indexedDB.open("test",1);
 
        openRequest.onupgradeneeded = function(e) {
            console.log("Upgrading...");
        }
 
        openRequest.onsuccess = function(e) {
            console.log("Success!");
            db = e.target.result;
        }
 
        openRequest.onerror = function(e) {
            console.log("Error");
            console.dir(e);
        }
 
    }
 
},false);