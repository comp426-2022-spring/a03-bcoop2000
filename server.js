const express = require('express')
const app = express()

// get command line args
const args = require('minimist')(process.argv.slice(2));

// could be command line argument...
const port = args.port || process.env.PORT || 5000

// make the server
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`)
  });

// bring all the functions from coin assignment
function coinFlip() {
  if (Math.random() > 0.5) {
    return "heads";
  } else {
    return "tails";
  }
}

function coinFlips(flips) {
  const res = [];
  for(let step = 0; step < flips; step++) {
    res[step] = coinFlip();
  }
  return res;
}

function countFlips(array) {
  let head_count = 0;
  let tail_count = 0;
  for(let step = 0; step < array.length; step++) {
    if (array[step] == "heads") {
      head_count++;
    } else if (array[step] == "tails") {
      tail_count++;
    }
  }
  if (head_count == 0) {
    return {'tails': tail_count}
  } else if (tail_count == 0) {
    return {'heads': head_count}
  } else {
    return {'heads': head_count, 'tails': tail_count}
  }
}

function flipACoin(call) {
  let flipped = coinFlip();
  let result = "lose";
  if (flipped == call) {
    result = "win";
  }
  return { call: call, flip: flipped, result: result };
}

// initial app status
app.get('/app', (req, res) => {
  res.status(200).end('OK')
  res.type('text/plain')
})

// endpoint for flip
app.get('/app/flip', (req, res) => {
  res.status(200).json({ 'flip': coinFlip() })
  res.type('application/json')
});

// endpoint for flips/:number
app.get('/app/flips/:number', (req, res) => {
  const raw = coinFlips(req.params.number)
  const summary = countFlips(raw)
  res.status(200).json({ 'raw': raw, 'summary': summary })
  res.type('application/json')
});

// endpoint for call/heads
app.get('/app/flip/call/heads', (req, res) => {
  res.status(200).json(flipACoin('heads'))
  res.type('application/json')
});

// endpoint for call/tails
app.get('/app/flip/call/tails', (req, res) => {
  res.status(200).json(flipACoin('tails'))
  res.type('application/json')
});


// non-existent endpoint handling
app.use(function (req, res) {
  res.status(404).end('404 NOT FOUND')
  res.type("text/plain")
});
