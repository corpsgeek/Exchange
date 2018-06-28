const dbPromise = idb.open('Currency-converter-db', 1, upgradeDB => {
    switch (upgradeDB.oldVersion) {
      case 0:
        upgradeDB.createObjectStore('currencyName-and-Symbol');
    }
  }).then(db => {
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
        const currency = myJson.results;
    Object.values(currency).forEach(function(curr){
        const tx = db.transaction('currencyName-and-Symbol', 'readwrite');
        tx.objectStore('currencyName-and-Symbol').add(curr);
    })
   
});
});