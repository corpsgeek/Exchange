const dbPromise = idb.open('Currency-converter-db', 1, upgradeDB => {
    switch (upgradeDB.oldVersion) {
      case 0:
        upgradeDB.createObjectStore('currencyName-and-Symbol', { autoIncrement : true });
    }
  }).then(db => {
      
   
  });
