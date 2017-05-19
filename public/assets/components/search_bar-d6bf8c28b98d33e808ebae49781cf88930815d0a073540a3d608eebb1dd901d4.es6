var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = (function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    _get(Object.getPrototypeOf(SearchBar.prototype), "constructor", this).call(this, props);
  }

  _createClass(SearchBar, [{
    key: "render",
    value: function render() {
      var _this = this;

      return React.createElement(
        "form",
        { action: "/search", acceptCharset: "UTF-8", method: "get" },
        React.createElement("input", { name: "utf8", type: "hidden", value: "√" }),
        React.createElement(
          "button",
          { name: "button", type: "submit" },
          React.createElement("i", { className: "fa fa-search" })
        ),
        React.createElement("input", {
          onFocus: function () {
            return _this.props.showDropdown();
          },
          onBlur: function () {
            return _this.props.hideDropdown();
          },
          value: this.props.term,
          onChange: function (event) {
            _this.handleInputChange(event.target.value);
          },
          placeholder: "Search Travel Stories",
          autoComplete: "off",
          type: "search",
          name: "search[q]",
          id: "search_q" })
      );
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(term) {
      this.props.onSearchTermChange(term);
    }
  }]);

  return SearchBar;
})(React.Component);