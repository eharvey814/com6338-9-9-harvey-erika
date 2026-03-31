const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
function makePoemHTML(poemJSON) {
  const poem = poemJSON[0];
  const { title, author, lines } = poem;

  //tags for title & author
  const titleHTML = makeTag('h2')(title);
  const authorHTML = makeTag('h3')(makeTag('em')(`by ${author}`));

  // split lines into stanzas, then convert each stanza to a paragraph with <br> tags for line breaks
  const linesToStanzas = lines => lines.reduce((stanzas, line) => {
    if (line.trim() === '') {
      stanzas.push([])
    } else {
      stanzas[stanzas.length - 1].push(line)
    }
    return stanzas
  }, [[]])

  const stanzaToHTML = (stanzas) => makeTag('p')(stanzas.join('<br>'))

  //use pipe to build poem
  const poemBody = pipe(linesToStanzas, (stanzas) => stanzas.map(stanzaToHTML), (paragraphs) => paragraphs.join(''))(poem.lines);

  return titleHTML + authorHTML + poemBody
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
