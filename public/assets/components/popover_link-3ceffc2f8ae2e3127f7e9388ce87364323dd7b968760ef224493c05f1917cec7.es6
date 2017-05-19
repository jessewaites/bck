var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopoverLink = (function (_React$Component) {
  _inherits(PopoverLink, _React$Component);

  function PopoverLink(props) {
    _classCallCheck(this, PopoverLink);

    _get(Object.getPrototypeOf(PopoverLink.prototype), "constructor", this).call(this, props);

    this.state = { showPopover: false, user: null, position: null };
  }

  _createClass(PopoverLink, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "span",
        { className: "popover-link",
          onMouseEnter: this.handleMouseEnter.bind(this),
          onMouseLeave: this.handleMouseLeave.bind(this)
        },
        React.createElement(
          "a",
          { href: this.props.url },
          this.props.children
        ),
        this.renderPopover()
      );
    }
  }, {
    key: "renderPopover",
    value: function renderPopover() {
      if (this.state.showPopover) {
        return React.createElement(UserPopover, {
          user: this.state.user,
          position: this.state.position
        });
      } else {
        return;
      }
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter(event) {
      var _this = this;

      var position = undefined;
      var POPOVER_HEIGHT = 200;
      if (POPOVER_HEIGHT + 30 > event.clientY) {
        this.position = "bottom";
      } else {
        this.position = "top";
      }
      this.timeoutID = setTimeout(function () {
        $.ajax({
          url: "/api/users/" + _this.props.user_id,
          method: 'GET',
          success: function (data) {
            _this.setState({ user: data, showPopover: true, position: _this.position });
          }
        });
      }, 450);
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave(event) {
      var _this2 = this;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
        this.timeoutID = null;
      }
      setTimeout(function () {
        _this2.setState({ showPopover: false, position: null });
      }, 180);
    }
  }]);

  return PopoverLink;
})(React.Component);