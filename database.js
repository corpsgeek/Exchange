const dbPromise = idb.open('Currency-converter-db', 1, upgradeDB => {
    switch (upgradeDB.oldVersion) {
      case 0:
        upgradeDB.createObjectStore('currencyName-and-Symbol', { autoIncrement : true });
    }
  }).then(db => {
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const currency = myJson.results;
      currency.forEach(function({currencyName}) {
        console.log({currencyName});
    });

   
});
});