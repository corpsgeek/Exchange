const dbPromise = idb.open('Currency-converter-db', 1, upgradeDB => {
    switch (upgradeDB.oldVersion) {
      case 0:
        upgradeDB.createObjectStore('currencyName-and-Symbol', {autoIncrement: true});
    }
  }).then(db => {
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
        let key;
        const currency = myJson.results;
    for( key in currency.currencyName){
     
      const tx = db.transaction('currencyName-and-Symbol', 'readwrite');
      tx.objectStore('currencyName-and-Symbol').put(currency.currencyName[key]);
      return tx.complete;
    }

   
});
});