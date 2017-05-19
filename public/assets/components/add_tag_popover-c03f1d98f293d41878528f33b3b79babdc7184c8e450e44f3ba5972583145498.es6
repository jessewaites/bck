var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddTagPopover = (function (_React$Component) {
  _inherits(AddTagPopover, _React$Component);

  function AddTagPopover(props) {
    _classCallCheck(this, AddTagPopover);

    _get(Object.getPrototypeOf(AddTagPopover.prototype), "constructor", this).call(this, props);
    this.state = { tagName: '' };
  }

  _createClass(AddTagPopover, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "add-tag-popover popover top" },
        React.createElement("div", { className: "arrow" }),
        React.createElement(
          "h3",
          { className: "popover-title" },
          "Add your interest"
        ),
        React.createElement(
          "div",
          { className: "popover-content" },
          React.createElement(
            "form",
            { onSubmit: this.handleAddTag.bind(this) },
            React.createElement(
              "div",
              { className: "input-group" },
              React.createElement("input", {
                type: "text",
                value: this.state.tagName,
                onChange: this.handleInputChange.bind(this),
                className: "form-control"
              }),
              React.createElement(
                "span",
                {
                  className: "input-group-addon add-button",
                  onClick: this.handleAddTag.bind(this)
                },
                "Add"
              )
            )
          )
        )
      );
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(e) {
      this.setState({ tagName: e.target.value });
    }
  }, {
    key: "handleAddTag",
    value: function handleAddTag(e) {
      e.preventDefault();
      if (this.state.tagName.length) {
        $.ajax({
          url: "/api/tags?tag_name=" + this.state.tagName,
          method: 'POST',
          dataType: 'json',
          success: function (data) {
            PubSub.publish('TagFollowButton:onClick');
          }
        });
        this.props.closePopover();
      }
    }
  }]);

  return AddTagPopover;
})(React.Component);