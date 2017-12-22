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
