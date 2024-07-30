import BigNumber from "bignumber.js";

export const truncate = (info: string, num: number) => {
    return info?.length > num ? info?.substr(0, num - 1) + "..." : info;
  };
  export const capitalizeSentence = (data: string) => {
    if (!data) return;
    const arr = data?.toLowerCase().split(" ");
    for (var i = 0; i < arr?.length; i++) {
      arr[i] = arr[i]?.charAt(0).toUpperCase() + arr[i].slice(1);
    }
    var str2 = arr?.join(" ");
    return str2;
  };
  
  export const ucFirst = (data: string) => {
    if (!data) return;
    return data?.charAt(0).toUpperCase() + data.slice(1);
  };
  
  export function currencyFormat(value: any = 0, dp: any = 4) {
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
  
  export function formatCurrency(price: any) {
    const output: any = Intl.NumberFormat("en-US", {
      maximumFractionDigits: 4,
    });
    return output.format(price);
  }
  
  export function formatCurrencyAmt(price: any, currency = "ngn") {
    const output = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
    return output;
  }