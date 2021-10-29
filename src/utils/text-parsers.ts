


function parseCatererOpeningsText(openingsData) {

  const openingLabel = `${openingsData?.label.field} ${openingsData?.label.value}`;

  return openingLabel;
}

function parseFormatedText(format: string, values: string[]) {
  const vsprintf = require('sprintf-js').vsprintf;

  return vsprintf(format, values);
}


function formatPrice(price: string | number, currencySymbol = '€') {
  const formattedPrice = new Number(price).toFixed(2);
  return `${formattedPrice}${currencySymbol}`;
}

export {
  parseCatererOpeningsText,
  parseFormatedText,
  formatPrice,
}