const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MarkelTrie = require('../utils/MerkleTree');
const wishList = require('../utils/niceList.json');

const trie = new MarkelTrie(wishList);

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = trie.getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name } = req.body;

  // TODO: prove that a name is in the list
  const index = wishList.findIndex((n) => n === name);
  const proof = trie.getProof(index);
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send('You got a toy robot!');
  } else {
    res.send('You are not on the list :(');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
