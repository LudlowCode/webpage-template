var currencyData = [] //Global variable to house currency data. Inspect it in the console after the page has loaded.

/**
 * The function `populateCurrencyDataAsync` asynchronously fetches currency data from an API and stores
 * it in a variable.
 */
async function populateCurrencyDataAsync() {
  try {
    const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=e64435a2bdd146fb83869a4263fe645f');
    const data = await response.json();
    currencyData = data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * The function `convert` takes a value in GBP, converts it to euros using a fixed exchange rate of
 * 1.18, and displays the result in a designated input field.
 * @param from - A 3 character upper-case string international currency code, e.g. 'GBP' to represent the original currency.
 * @param to - A 3 character upper-case string international currency code, e.g. 'EUR' to represent the desired currency.
 */
function convert(from, to, data = currencyData){
  let rate = data['rates'][to] / data['rates'][from];
  console.log(rate);

  var euros = document.getElementById('gbp').value * rate;
  console.log(euros);
  document.getElementById('eur').value = Number(euros.toFixed(2));;
    
}

async function fetchImage(url) {
  const response = await fetch(url)
  const blob = await response.blob()
  
  return blob
}

async function downloadImage(url){
  const imageBlob = await fetchImage(url);
  const imageURL = URL.createObjectURL(imageBlob);

  console.log(imageBlob.slice(0, 100));
  console.log({imageBase64: imageURL});
  
  const imgElement = document.createElement('img');
  imgElement.src = imageURL;
  const container = document.getElementById("image-container").appendChild(imgElement);
}
