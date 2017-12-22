const Bitcoin = require('./rpc/bitcoin');

(async function() {
  const account = new Bitcoin.PrivateKey('cNV6ixvKeywf6McKneEkgRv4NqjEVvwkQ6NGBLRxoPMoMgjgXh3e', Bitcoin.network);
  const pKey = account.toWIF();
  const address = account.toAddress();
  const script = Bitcoin.Script.buildPublicKeyHashOut(address);

  const utxos = await Bitcoin.utxo(address);

try {

  const tx = new Bitcoin.Transaction()
    .from(utxos, account.toPublicKey())
    .to(address, 10000)
    .fee(1000)
    .change(address)
    .sign(account);

    console.log(tx);
  } catch(err) {
    console.log(err);
  }
  // console.log(Bitcoin.Script.buildPublicKeyHashOut(address));

  // console.log(utxos);
})();
