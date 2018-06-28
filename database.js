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
        let key;
        const currency = myJson.results;
    for( key in currency){
      const currName = `${currency[key].currencyName}`;
        const currSym = `${currency[key].currencySymbol}`;

      const tx = db.transaction('currencyName-and-Symbol', 'readwrite');
      tx.objectStore('currencyName-and-Symbol').put(currSym[key], currName[key] );
      return tx.complete;
    }

   
});
});