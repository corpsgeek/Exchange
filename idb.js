import idb from'idb';

idb.open('Currencydb', 1, function(upgradeDb){
  var keyValStore = upgradeDb.createObjectStore('keyval');
  keyValStore.put('hello', 'greeting');  
})