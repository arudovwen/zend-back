export function formatNumberAbbreviated(number) {
    if (typeof number !== 'number') {
      return 'Invalid input';
    }
  
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    } else if (number >= 100) {
      return (number / 100).toFixed(1) + 'h';
    } else {
      return number.toString();
    }
  }