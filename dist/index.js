'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      CallExpression: function CallExpression(path) {
        var helper = new _Helper2.default(path, t);

        // Only do this if we find a view model (not declared already)
        if (path.scope.hasBinding(helper.vmName()) || !helper.isViewModel()) return;

        helper.addImportDeclaration('React', 'react');

        var _helper$classMethodsA = helper.classMethodsAndProperties();

        var _helper$classMethodsA2 = _slicedToArray(_helper$classMethodsA, 2);

        var classMethods = _helper$classMethodsA2[0];
        var classProperties = _helper$classMethodsA2[1];


        helper.addConstructor(classMethods);

        var componentName = path.node.callee.name;
        var identifier = t.identifier(componentName);
        var objectIdentifier = t.identifier('React');
        var propertyIdentifier = t.identifier('Component');
        var memberExpression = t.memberExpression(objectIdentifier, propertyIdentifier, false);
        var classBody = t.classBody(classMethods);
        var classDeclaration = t.classDeclaration(identifier, memberExpression, classBody, []);
        var exportDeclaration = t.exportNamedDeclaration(classDeclaration, []);
        path.replaceWith(exportDeclaration);
      }
    }
  };
};

var _Helper = require('./Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }