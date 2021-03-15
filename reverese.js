// utility function that just waits the specified duration and resolves
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));

// a map of the currently active locks
const locks = {};

// productId: the key to lock on
// transaction: an async function that performs the transaction
// timeout: how long to keep retrying before throwing
async function withLock (productId, transaction, timeout) {

  // if there's already a lock on this id...
  if (locks[productId]) {

    // and we've exhausted the timeout…
    if (timeout <= 0) {
      // throw an error
      throw new Error('Unable to acquire lock');
    }

    // otherwise wait 100ms…
    await sleep(100);

    // …and try again, reducing the timeout
    return withLock(productId, transaction, timeout - 100);
  }

  // no existing lock on this productId; proceed.
  try {
    // establish the lock so other calls on this id have to wait
    locks[productId] = true;

    // perform the transaction
    return await transaction();
  }
  finally {
    // and release the lock
    delete locks[productId];
  }
}

try {
    const result = await withLock(productId, async () => {
      // perform checkout, update mongo, deduct inventory, whatever
      
    }, 2000);
  }
  catch (e) {
    // something went wrong, possibly a lock timeout
  }