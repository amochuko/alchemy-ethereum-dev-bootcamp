const axios = require('axios');
const MerkleTree = require('../utils/MerkleTree');
const wishList = require('../utils/niceList.json');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  // @ts-ignore
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: wishList[23],
  });

  console.log({ gift });
}

main();