

var dbPromise =	idb.open('rates', 1, function(upgradeDB) {
	  var ratesStore = upgradeDB.createObjectStore('rates', {
		keyPath: 'id', autoIncrement: true});
		fetch('https://free.currencyconverterapi.com/api/v5/currencies')
		.then(function(response) {
		  return response.json();
		})
		.then(function(myJson) {
          const currency = myJson.results;
          
          for (var loop = 0; loop < currency.length; loop++) {
           console.log(loop); 
          }
		  for(let key in currency){
              console.log(currency[key]);
            var tx = db.transaction('rates', 'readwrite');
            tx.objectStore('rates').add(currency[key]);

		  }
		  
		});
	});

