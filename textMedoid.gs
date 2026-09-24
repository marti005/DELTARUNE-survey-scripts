// I mostly stole this script from a university group project that someone else wrote, so I don't know exactly how it all works
// The textMedoid() function was used to get the most representative answer in the open ended text questions
function tokenize(string) {
  return string
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .split(/\s+/)
    .filter((t) => {return t.length > 1 && !STOPWORDS.has(t)})
}

function normalize(v) {
  let norma = 0;
  for (let i = 0; i < v.length; i++) norma += v[i] * v[i];
  norma = Math.sqrt(norma);

  if (norma === 0) return v;
  const result = new Float64Array(v.length);
  for (let i = 0; i < v.length; ++i) result[i] = v[i]/norma;

  return result;
}

function similarity(v1, v2) {
  let s = 0;
  for (let i=0; i<v1.length; i++) s += v1[i] * v2[i];
  return s;
}

/**
 * @customfunction
 * */
function textMedioid(range) {
  data = range.filter(e => e.join(""))
  if (!data || data.length < 2) {
    return "null";
  }

  const N = data.length

  const tokensPerAnswer = data.map(tokenize)

  const vocabulary = new Map();
  const df = []

  tokensPerAnswer.forEach((tokens) => {
    const unique = new Set(tokens);
    unique.forEach((word) => {
      if (!vocabulary.has(word)) {
        vocabulary.set(word, vocabulary.size);
        df.push(1);
      } else 
        df[vocabulary.get(word)]++;
    })
  })

  const weightedWords = df.map((d) => {
    return Math.log(N/(1+d))+1
  })

  function vectorTFIDF(tokens) {
    const vector = new Float64Array(vocabulary.size);
    const count = {};
    tokens.forEach((t) => {
      count[t] = (count[t] || 0) + 1;
    });

    const totalTokens = tokens.length || 1;
    Object.keys(count).forEach((word) => {
      const idx = vocabulary.get(word);
      const tf = count[word] / totalTokens;
      vector[idx] = tf * weightedWords[idx];
    });
    return vector; 
  }

  const vectors = tokensPerAnswer.map(vectorTFIDF);
  const normVectors = vectors.map(normalize);

  const averageSimilitude = new Array(N).fill(0);
  for (let i=0; i<N; i++) {
    let sum = 0;
    for (let j=0; j<N; j++) {
      if (i !== j) sum += similarity(normVectors[i], normVectors[j]);
    }
    averageSimilitude[i] = sum / (N-1)
  }

  let bestIndex = 0;
  for (let i=1; i<N; i++) {
    if (averageSimilitude[i] > averageSimilitude[bestIndex] && tokensPerAnswer[i].length < 15) bestIndex = i;
  }

  return data[bestIndex]
}
