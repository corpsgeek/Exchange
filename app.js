window.addEventListener('load', function(){
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
  });
});
let selectedValueOfList1 = 0;
let selectedValueOfList2 = 0;
function processList1(){
    //Storing currency value for first lists
     selectedValueOfList1 = document.getElementById("lists1").value;
 
    
}

function processList2(){
    //Storing currency value for first lists
     selectedValueOfList2 = document.getElementById("lists2").value;
    
}
let conversionValue = 0;
function conversion(){

let from = document.getElementById("lists1").value;
let to = document.getElementById("lists2").value;

let amount = document.getElementById("input-box").value;

if(from.length >= 0 && to.length >= 0 && amount.length >= 0){
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         let obj = JSON.parse(this.responseText);
         //stores the currency id i format
         let obj2 = from+'_'+to;
        
         let rate = obj[obj2].val;
         //Sets the exchange rate in a input field
         document.getElementById("rates-box").innerHTML = rate;

         if(rate != undefined){
             //converting the inputed amount
             let convertedAmount =  parseFloat(amount * rate);
             console.log(convertedAmount);
             document.getElementById("results-box").value = convertedAmount;
             
            }
       }
    }

 xmlhttp.open("GET", 'https://free.currencyconverterapi.com/api/v5/convert?q='+from+'_'+to+'&compact=y', true);
 xmlhttp.send();
    }
}

//Initializing service worker for  check
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js', {scope: '/'}).then(function(registration){

        console.log('Service worker registered', registration);
    }).catch(function(err){
        console.log("Oops!!, Service worker failed to register", err);
    })
}