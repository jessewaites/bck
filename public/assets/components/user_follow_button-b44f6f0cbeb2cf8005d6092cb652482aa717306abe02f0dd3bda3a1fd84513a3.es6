var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserFollowButton = (function (_React$Component) {
  _inherits(UserFollowButton, _React$Component);

  function UserFollowButton(props) {
    _classCallCheck(this, UserFollowButton);

    _get(Object.getPrototypeOf(UserFollowButton.prototype), "constructor", this).call(this, props);

    this.state = { following: this.props.following };
  }

  _createClass(UserFollowButton, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this = this;

      this.token = PubSub.subscribe('UserFollowButton:onClick', function (msg, data) {
        if (_this.props.followed_id === data.followed_id) {
          _this.setState({ following: data.following });
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      PubSub.unsubscribe(this.token);
    }
  }, {
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

      if (window.userSignedIn === false) {
        return React.createElement(
          "a",
          { href: "", className: "button green-border-button follow-button", onClick: this.openOverlay },
          "Follow"
        );
      }

      if (this.state.following) {
        return React.createElement(
          "button",
          {
            className: "button green-inner-button unfollow-button",
            onClick: this.handleUnfollowClick.bind(this),
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
            className: "button green-border-button follow-button",
            rel: "nofollow"
          },
          "Follow"
        );
      }
    }

    // FIXME: this is not really a React way. Maybe create an Overlay and
    // TriggerOverlayButton components?
  }, {
    key: "openOverlay",
    value: function openOverlay(event) {
      event.preventDefault();
      $('[data-behavior="overlay"]').addClass('open');
    }
  }, {
    key: "handleFollowClick",
    value: function handleFollowClick(event) {
      var _this2 = this;

      $.ajax({
        url: "/api/relationships?followed_id=" + this.props.followed_id,
        method: 'POST',
        success: function (data) {
          _this2.setState({
            following: true
          });

          if (_this2.props.onFollowerCountChange) {
            _this2.props.onFollowerCountChange(data.followerCount);
          }
          PubSub.publish('UserFollowButton:onClick', {
            followed_id: _this2.props.followed_id,
            following: true
          });
        }
      });
    }
  }, {
    key: "handleUnfollowClick",
    value: function handleUnfollowClick(event) {
      var _this3 = this;

      $.ajax({
        url: "/api/relationships?followed_id=" + this.props.followed_id,
        method: 'DELETE',
        success: function (data) {
          _this3.setState({
            following: false
          });

          if (_this3.props.onFollowerCountChange) {
            _this3.props.onFollowerCountChange(data.followerCount);
          }
          PubSub.publish('UserFollowButton:onClick', {
            followed_id: _this3.props.followed_id,
            following: false
          });
        }
      });
    }
  }]);

  return UserFollowButton;
})(React.Component);

UserFollowButton.propTypes = {
  following: React.PropTypes.bool
};