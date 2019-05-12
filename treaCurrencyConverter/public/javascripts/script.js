// Fetch exchange rate data from api
var request = new XMLHttpRequest();
request.open('GET', '/api', true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    var currencies = [];
    Object.keys(data.rates).forEach(function(currency){
      document.querySelectorAll(".currency-list").forEach(function(el){
        el.options[el.options.length] = new Option(currency, data.rates[currency]);
      });
    });
  } else {
    // We reached our target server, but it returned an error
  }
};
request.onerror = function() {
  // There was a connection error of some sort
};
request.send();


//Calculate and output the new amount
function exchangeCurrency() {
  var amount = document.querySelectorAll(".amount")[0].value;
  var rateFrom = document.querySelectorAll(".currency-list")[0].value;
  var rateTo = document.querySelectorAll(".currency-list")[1].value;
  if ((amount - 0) != amount || (''+amount).trim().length == 0) {
    document.querySelectorAll(".results")[0].innerHTML = "0";
    document.querySelectorAll(".error")[0].style.display = '';
  } else {
    document.querySelectorAll(".error")[0].style.display = 'none';
    if (amount == undefined || rateFrom == "--Select--" || rateTo == "--Select--") {
      document.querySelectorAll(".results")[0].innerHTML = "0";
    } else {
      document.querySelectorAll(".results")[0].innerHTML = (amount * (rateTo * (1 / rateFrom))).toFixed(5);
    }
  }
}
