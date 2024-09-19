export default function formatCurrency(price, dec = 8) {
  // Round down to the nearest integer based on the specified decimal places
  const factor = Math.pow(10, dec);
  const flooredPrice = Math.floor(price * factor) / factor;

  let value = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: dec,
  });

  return value.format(flooredPrice);
}
export function currencyFormat(value = 0, dp = 4) {
  const stringValue = String(value);
  const decimalPlaces = parseInt(dp, 10);

  try {
    const [beforePoint, afterPoint] = stringValue.split(".");

    // If there are no decimal places or afterPoint is undefined, use the original value
    if (!afterPoint) {
      return beforePoint;
    }

    const splitValue = afterPoint.slice(0, decimalPlaces);
    let output = `${beforePoint}.${splitValue}`;

    // Use BigNumber for precision
    output = new BigNumber(output).toFixed();

    return output;
  } catch (error) {
    // Handle errors (e.g., if the input is not a valid number)
    console.error(error);
    return value;
  }
}

export function formatAmtCurrency(price) {
  const output = Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  });
  return output.format(price);
}

export function formatCurrencyAmt(price, currency = "ngn") {
  const output = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
  return output;
}
