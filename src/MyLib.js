function findNonOverlappingLCS(text1, text2) {
  // Split words ignoring punctuation and convert to lower case for case-insensitive comparison
  const words1 = text1
    .toLowerCase()
    .split(/[\s,.!?;:()“”"-]+/) // Split by whitespace and punctuation
    .filter(Boolean); // Remove empty strings
  
  const words2 = text2
    .toLowerCase()
    .split(/[\s,.!?;:()]+/)
    .filter(Boolean);
  const dp = Array.from({ length: words1.length + 1 }, () =>
    Array(words2.length + 1).fill(0)
  );
  //console.log('initial dp=', dp);

  // Fill the dp table
  for (let i = 1; i <= words1.length; i++) {
    for (let j = 1; j <= words2.length; j++) {
      if (words1[i - 1] === words2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = 0;
      }
    }
  }

  // Function to extract LCS using the filled dp table, ensuring non-overlapping
  function extractLCS() {
    const results = [];
    let used1 = Array(words1.length).fill(false);
    let used2 = Array(words2.length).fill(false);

    for (let len = Math.max(...dp.flat()); len > 0; len--) {
      // Start with the longest possible LCS
      for (let i = 1; i <= words1.length; i++) {
        for (let j = 1; j <= words2.length; j++) {
          if (dp[i][j] === len && !used1[i - 1] && !used2[j - 1]) {
            let subsequence = [];
            let k = len;
            let x = i,
              y = j;

            while (k > 0) {
              subsequence.unshift(words1[x - 1]); // Build the subsequence backwards
              used1[x - 1] = true; // Mark used in text1
              used2[y - 1] = true; // Mark used in text2
              x--;
              y--;
              k--;
            }

            results.push(subsequence.join(' '));
            break; // Break to ensure non-overlapping
          }
        }
      }
    }

    //console.log('text1=', text1);
    //console.log('words1=', words1);
    //console.log('used1=', used1);
    //console.log('text2=', text2);
    //console.log('words2=', words2);
    //console.log('used2=', used2);
    return [used1,used2]; //改为返回一个text中lcs词的位置数据，命中的为true
  }

  return extractLCS();
}

// Example usage
//const text1 = 'The Quick, Brown fox jumps over the lazy Dog.';
//const text2 = 'That quick dog! Jumps over the brown Fox.';
//const lcsList = findNonOverlappingLCS(text1, text2);
//console.log(lcsList);

function numberToWords(num) {
  if (num === 0) return 'zero';

  const under20 = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];
  const chunks = ['thousand', 'million', 'billion', 'trillion'];

  let words = [];

  function toWords(n, scaleIndex) {
    let result = '';
    let part = [];

    if (n > 99) {
      part.push(under20[Math.floor(n / 100) - 1] + ' hundred');
      n %= 100;
    }
    if (n > 19) {
      part.push(tens[Math.floor(n / 10)]);
      n %= 10;
    }
    if (n > 0) {
      part.push(under20[n - 1]);
    }

    result = part.join(' ');
    // Insert "and" between hundred and the last part if the last part exists
    if (part.length > 1) {
      result = part[0] + ' and ' + part.slice(1).join(' ');
    }

    return result
      ? result + (scaleIndex ? ' ' + chunks[scaleIndex - 1] : '')
      : '';
  }

  // Split number by thousands; handle each chunk
  let scaleIndex = 0;
  while (num > 0) {
    let chunk = num % 1000;
    if (chunk > 0) {
      words.unshift(toWords(chunk, scaleIndex));
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return words.join(' ').trim();
}

// Example Usage
//console.log(numberToWords(123)); // Outputs: "one hundred twenty three"
//console.log(numberToWords(12345)); // Outputs: "twelve thousand three hundred forty five"
//console.log(numberToWords(1234567)); // Outputs: "one million two hundred thirty four thousand five hundred sixty seven"

function replaceNumbersWithWords(text) {
  // Handle complex expressions with units and decimals but skip typical years
  text = text.replace(
    /\b(\d{1,3}(?:\.\d+)?|\d{5,}(?:\.\d+)?|\d+\.\d+)(?!\d)(?:\s?(billion|million|thousand))?\b/g,
    function (match, number, scale) {
      if (/^\d{4}$/.test(number) && !scale) {
        // Skip typical year format
        return match;
      }

      let parts = number.split('.');
      let integerPart = numberToWords(parseInt(parts[0]));
      let decimalPart = parts[1]
        ? parts
            .slice(1)
            .join('')
            .split('')
            .map((n) => numberToWords(parseInt(n)))
            .join(' ')
        : '';
      let scaleText = scale ? scale.trim() : '';

      if (decimalPart.length > 0) {
        return `${integerPart} point ${decimalPart}${
          scaleText ? ' ' + scaleText : ''
        }`;
      } else {
        return `${integerPart}${scaleText ? ' ' + scaleText : ''}`;
      }
    }
  );

  return text;
}

// Example Usage
//const paragraph =
//  'The area was bought for 3.5 million dollars in 1990. In 2020, the population reached 7.86 billion.';
//const convertText = replaceNumbersWithWords(paragraph);
//console.log(convertText);

function textToNumber(text) {
  const numWords = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };

  const multiplier = {
    hundred: 100,
    thousand: 1000,
    million: 1000000,
  };

  let numbers = text
    .toLowerCase()
    .split(/ and |,|-|\s/)
    .filter(Boolean);
  let result = 0,
    currentNum = 0;

  numbers.forEach(function (word) {
    if (multiplier[word]) {
      currentNum *= multiplier[word];
    } else {
      if (currentNum === 0) currentNum = numWords[word];
      else currentNum += numWords[word];
    }

    if (word === 'hundred' && currentNum !== 0) {
      result += currentNum;
      currentNum = 0;
    }
  });

  result += currentNum;
  return result;
}

function replaceTextualNumbers(text) {
  // Regular expression to identify possible number words
  const numberPattern =
    /((?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million)\s*)+/gi;

  // Replace identified number words with their numeral equivalents
  return text.replace(numberPattern, function (match) {
    return textToNumber(match);
  });
}

// Example Usage
//let sampleText =
// 'The Key Bridge took five years to construct in the 1970s, but now, crews are rushing to dismantle the remnants of the fallen Baltimore landmark. ';
//let convertedText = replaceTextualNumbers(sampleText);
//console.log(convertedText);
export { findNonOverlappingLCS, replaceNumbersWithWords };
