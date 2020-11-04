var stopwords = new Set(
  "i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(
    ','
  )
)

async function getData(input) {
  input = input.split('\\')[2]
  console.log(input)

  let tweets = []
  const response = await fetch(input)
  const data = await response.text()
  const rows = data.split('\n').slice(1)
  var wordDict = {}

  for (let i = 0; i < rows.length; i++) {
    let content = rows[i]
    let analysisVal = analyse(content)
    content = content.replace(/[^a-zA-Z ]/g, ' ')
    content = content.replace(/  +/g, ' ')
    tweets[i] = [content, analysisVal]

    let prewords = content
      .trim()
      .split(' ')
      .map((w) => w.toLowerCase())
    words = prewords.filter((w) => w && !stopwords.has(w) && w.length > 2)

    for (let word in words) {
      if (words[word] === '') {
        continue
      }

      if (!(words[word] in wordDict)) {
        wordDict[words[word]] = {
          text: words[word],
          size: 1,
          value: analysisVal,
          color: getColor(analysisVal),
        }
      } else {
        wordDict[words[word]]['size'] += 1
        wordDict[words[word]]['value'] += analysisVal
        wordDict[words[word]]['color'] = getColor(
          wordDict[words[word]]['value']
        )
      }
    }
  }

  var outPut = []
  for (dict in wordDict) {
    outPut.push(wordDict[dict])
  }

  return outPut
}

function getColor(value) {
  if (value > 0) {
    return 'green'
  } else if (value === 0) {
    return 'black'
  } else if (value < 0) {
    return 'red'
  }
}
