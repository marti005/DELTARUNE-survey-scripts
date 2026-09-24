// Used in multiple choice text questions to get the mode (most common answer) and the percentage of respondents
/**
 * @customfunction
 * */
function getModeText(range) {
  
   
  data = range.filter(e => e.join(""))
  if (!data || data.length === 0) {
    return "null (0.00%)";
  }

  const frequencies = {};
  let mostFrequentValue = data[0];
  let maxCount = 0;

  for (const item of data) {
    const normalizedString = item.toString().charAt(0).toUpperCase() + item.toString().slice(1);
    frequencies[normalizedString] = (frequencies[normalizedString] || 0) + 1;
    
    if (frequencies[normalizedString] > maxCount) {
      maxCount = frequencies[normalizedString];
      mostFrequentValue = normalizedString;
    }
  }

  const percentageValue = (maxCount / data.length) * 100;

  return `${mostFrequentValue.toString()} [${percentageValue.toFixed(2)}%]`;
}
