var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagFollowButton = (function (_React$Component) {
  _inherits(TagFollowButton, _React$Component);

  function TagFollowButton(props) {
    _classCallCheck(this, TagFollowButton);

    _get(Object.getPrototypeOf(TagFollowButton.prototype), "constructor", this).call(this, props);

    this.state = { following: this.props.following };
  }

  _createClass(TagFollowButton, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.renderButton()
      );
    }
  }, {
    key: "renderButton",
    value: function renderButton() {
      if (this.state.following) {
        return React.createElement(
          "button",
          {
            onClick: this.handleUnfollowClick.bind(this),
            className: "pull-right button green-inner-button unfollow-button",
            rel: "nofollow"
          },
          React.createElement(
            "span",
            { className: "top content" },
            "Following"
          ),
          React.createElement("br", null),
          React.createElement(
            "span",
            { className: "bottom content" },
            "Unfollow"
          )
        );
      } else {
        return React.createElement(
          "button",
          {
            onClick: this.handleFollowClick.bind(this),
            className: "pull-right button green-border-button follow-button",
            rel: "nofollow"
          },
          "Follow"
        );
      }
    }
  }, {
    key: "handleFollowClick",
    value: function handleFollowClick(event) {
      var _this = this;

      $.ajax({
        url: "/api/interests?tag_id=" + this.props.tag_id,
        method: 'POST',
        success: function () {
          _this.setState({
            following: true
          });
          PubSub.publish('TagFollowButton:onClick');
        }
      });
    }
  }, {
    key: "handleUnfollowClick",
    value: function handleUnfollowClick(event) {
      var _this2 = this;

      $.ajax({
        url: "/api/interests?tag_id=" + this.props.tag_id,
        method: 'DELETE',
        success: function () {
          _this2.setState({
            following: false
          });
          PubSub.publish('TagFollowButton:onClick');
        }
      });
    }
  }]);

  return TagFollowButton;
})(React.Component);

TagFollowButton.propTypes = {
  following: React.PropTypes.bool
};