

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
			  
			  ratesStore.put({id: `${currency[key].id}`, name: 'coke', price: 10.99, quantity: 200});
			  
		  }
		  
		});
	});

