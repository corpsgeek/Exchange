const dbPromise = idb.open('Currency-converter-db', 1, upgradeDB => {
    var RatesStore = upgradeDB.createObjectStore('currencyRates');
  }).then(db => {
  
  
});