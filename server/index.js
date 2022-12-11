const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

const server_merkle_root = new MerkleTree(niceList).getRoot();

app.post('/gift', (req, res) => {
  const {name, proof, client_merkle_root} = req.body;

  const MERKLE_ROOT = server_merkle_root === client_merkle_root ? server_merkle_root : "";

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
