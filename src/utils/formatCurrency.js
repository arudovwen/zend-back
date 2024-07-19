export default function formatCurrency(price, dec=0) {
    let value = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: dec,
    });
    return value.format(price);
  }
  