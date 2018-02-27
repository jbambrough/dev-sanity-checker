/**
 * Create an object with sinon stubs for each of the given methods.
 *
 * Example usage:
 *
 *     objectMock = require('object.mock');
 *     mockUserService = objectMock('get', 'login', 'editUser');
 *
 * This is equivalent to:
 *
 *     mockUserService = {
 *       get: sinon.stub(),
 *       login: sinon.stub(),
 *       editUser: sinon.stub()
 *     };
 *
 * @return {Object} The new object containing all of the stubbed methods.
 */
module.exports = function() {
  var methods = Array.prototype.slice.call(arguments);

  return methods.reduce(function(object, method) {
    object[method] = sinon.stub();

    return object;
  }, {});
};
