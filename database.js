

var dbPromise =	idb.open('rates', 1, function(upgradeDB) {
	  var ratesStore = upgradeDB.createObjectStore('rates', {
		keyPath: 'id', autoIncrement: true});
		fetch('https://free.currencyconverterapi.com/api/v5/currencies')
		.then(function(response) {
		  return response.json();
		})
		.then(function(myJson) {
          const currency = myJson.results;
          
         Object.values(currency).forEach(function(curr){
            console.log(curr);
            var tx = db.transaction('rates', 'readwrite');
            tx.objectStore('rates').add(curr);

         });
		  
		});
	});

