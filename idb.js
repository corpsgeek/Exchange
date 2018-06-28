// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}else{
  console.log("IndexedDb is up and running");
}

const dbName = "Currencies_Name";

var request = indexedDB.open(dbName, 1);

request.onerror = function(event) {
  // Handle errors.
  console.log("oops!, Database failed to create");
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  var currencyNameStore = db.createObjectStore("Currencies Name", { keyPath: "Currency Name" });
  var currenciesNameFetched;

  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var  currencyNameStore = db.transaction("Curencies Name", "readwrite");
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const currency = myJson.results;
      for(let key in currency){
        currenciesNameFetched = `${currency[key].currencyName}`;             
      }
         
    
    });
    currenciesNameFetched.forEach(function(currencyNames) {
      currencyNameStore.add(currencyNames);
    });
  };
};