let dbPromise;
window.addEventListener('load', function(){
  //Initializing service worker for  check
 if ('serviceWorker' in navigator) {
  
    navigator.serviceWorker
      .register('sw.js', { scope: '/Exchange/' })
      .then(function(registration) {
        console.log("Service Worker Registered");
      })
      .catch(function(err) {
        console.log("Service Worker Failed to Register", err);
      })
  
}

  fetch('https://free.currencyconverterapi.com/api/v5/currencies')
   .then(function(response) {
     return response.json();
   })
   .then(function(myJson) {
     const currency = myJson.results;
     for(let key in currency){
         document.getElementById("lists1").innerHTML += (`<option value = "${currency[key].id}">(${currency[key].currencySymbol})${currency[key].id} - ${currency[key].currencyName}</option>`)
        
     }
     for(let list in currency){
         document.getElementById("lists2").innerHTML += (`<option value = "${currency[list].id}">(${currency[list].currencySymbol})${currency[list].id} - ${currency[list].currencyName}</option>`)
        
     }
     dbPromise = idb.open('converter-DB', 1, function(upgradeDB){
      upgradeDB.createObjectStore('exchangeRate', {keyPath: 'id'});
     });
   });
 });







 let selectedValueOfList1 = 0;
 let selectedValueOfList2 = 0;
 function processList1(){
     //Storing currency value for first lists
      selectedValueOfList1 = document.getElementById("lists1").value;
  
     
 }
 let from;
 let to;
 let amount;
 let obj2;
 let rate;
 function processList2(){
     //Storing currency value for first lists
      selectedValueOfList2 = document.getElementById("lists2").value;
     
 }
 let conversionValue = 0;
 function conversion(){
 
from = document.getElementById("lists1").value;
to = document.getElementById("lists2").value;
 
 amount = document.getElementById("input-box").value;
 
 if(from.length >= 0 && to.length >= 0 && amount.length >= 0){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let obj = JSON.parse(this.responseText);
          //stores the currency id i format
          obj2 = from+'_'+to;
         
           rate = obj[obj2].val;
          //Sets the exchange rate in a input field
          document.getElementById("rates-box").value = rate;
 
          if(rate != undefined){
              //converting the inputed amount
              let convertedAmount =  parseFloat(amount * rate);
              
              document.getElementById("results-box").value = convertedAmount;
              
             }
             dbPromise.then(function(db){
              const tx = db.transaction('exchangeRate', 'readwrite');
              const exchangeRateStore = tx.objectStore('exchangeRate');
              exchangeRateStore.put({
                rate: rate,
                id: obj2
              });
              return tx.complete;
              return rate;
             }).catch(function(db){
               if(!Exchange_Rate){
                window.alert("Cannot convert this currencies offline");
               }
             });
            
        }
     }
 
  xmlhttp.open("GET", 'https://free.currencyconverterapi.com/api/v5/convert?q='+from+'_'+to+'&compact=y', true);
  xmlhttp.send();
     }

 }
 dbPromise.then(db => {
    const ratesStore = db.transaction('exchangeRate').objectStore('exchangeRate');
    let storedRate;
    ratesStore
      .openCursor()
      .then(function cursorIterate(cursor) {
        if (!cursor) return;
        storedRate = cursor.value;
        // Once we find the wanted rate, the cursor stops iterating
        return (
          cursor.value.id === `${from}_${to}` ||
          cursor.continue().then(cursorIterate)
        );
      })
      .then(isRateFound => {
        // returns undefined if not found, and returns the storedRate if found

        if (isRateFound && storedRate)
          // rate already stored
          convertedAmount = `${to} ${(
            storedRate.rate * amount
          ).toFixed(2)}`;
          else
            /*
            rate not found in IDB
            if the client is online the rate will be fetched and added to idb
            if offline the client will be shown an alert
            */
              return fetchRate(isRateFound).then(
                fetchedRate =>
                  (convertedAmount = `${to} ${(
                    fetchedRate * amount
                  ).toFixed(2)}`)
              );
        
       
      });
    });