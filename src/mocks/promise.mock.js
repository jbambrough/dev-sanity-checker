/**
 * Return a mocked promise, with sinon stubs for each of the given methods.
 *
 * Example usage:
 *
 *    mockCheckoutPromise = require('promise.mock')('then', 'catch', 'finally'); // Create the mock promise
 *    mockCheckoutPromise.reset(); // Reset before every test
 *    mockCheckoutPromise.then.args[0][0](data); // Run the first specified `then` callback.
 *
 * @return {Object} The mocked promise
 */
module.exports = function() {
  var methods = Array.prototype.slice.call(arguments);
  var promise = {
    reset: function() {
      methods.forEach(function(method) {
        promise[method].reset();
      });
    }
  };

  methods.forEach(function(method) {
    promise[method] = sinon.stub().returns(promise);
  });

  return promise;
};
