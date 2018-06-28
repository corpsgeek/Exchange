

var dbPromise =	idb.open('rates', 1, function(upgradeDB) {
	  var ratesStore = upgradeDB.createObjectStore('rates', {
		keyPath: 'id'});
		fetch('https://free.currencyconverterapi.com/api/v5/currencies')
		.then(function(response) {
		  return response.json();
		})
		.then(function(myJson) {
		  const currency = myJson.results;
		  for(let key in currency){
            var tx = db.transaction('rates', 'readwrite');
            tx.objectStore('rates').put(`${currency[key].id}`);

		  }
		  
		});
	});

