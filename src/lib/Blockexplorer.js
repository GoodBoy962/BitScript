'use strict';

const Bitcore = require('bitcore-lib');
// const fetch = require('../utils/utils').fetch;
const Fetch = require('node-fetch');

/**
 * Fetch url and get json
 * @param {...Object} args
 */
const fetch =
  (...args) =>
    Fetch(...args)
      .then(
        res =>
          res.json()
      );

module.exports = class Blockexplorer{

  /**
   * oprions.network - (testnet||livenet)
   * options.host - rpc url
   * @param {Object} options
   */
  constructor(options = {}){
    Object.assign(this, Bitcore);
    Object.assign(this, options);
  }

  addr(addr){
    return fetch(`${this.host}/api/addr/${addr}`)
  }

  balance(addr){
    return fetch(`${this.host}/api/addr/${addr}/balance`)
  }

  utxo(addr){
    return fetch(`${this.host}/api/addr/${addr}/utxo?noCache=1`)
  }

  txByAddr(addr){
    return fetch(`${this.host}/api/txs/?address=${addr}`)
  }

  tx(txid){
    return fetch(`${this.host}/api/tx/${txid}`)
  }

  txSend(rawtx){
    return fetch(`${this.host}/api/tx/send`, {
      method: 'POST',
      body: `rawtx=${rawtx}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  }

}
