var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserFollowContainer = (function (_React$Component) {
  _inherits(UserFollowContainer, _React$Component);

  function UserFollowContainer(props) {
    _classCallCheck(this, UserFollowContainer);

    _get(Object.getPrototypeOf(UserFollowContainer.prototype), "constructor", this).call(this, props);

    this.state = { followerCount: this.props.followerCount };
  }

  _createClass(UserFollowContainer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: this.props.className },
        React.createElement(
          "div",
          { className: "following-metadata" },
          React.createElement(
            "span",
            { className: "following-count" },
            this.renderFollowingCount()
          ),
          React.createElement(
            "span",
            { className: "follower-count" },
            this.renderFollowerCount()
          )
        ),
        this.renderFollowButton()
      );
    }
  }, {
    key: "renderFollowingCount",
    value: function renderFollowingCount() {
      if (this.props.overlayTrigger) {
        return React.createElement(OverlayTriggerButton, {
          text: "<b>" + this.props.followingCount + "</b> Following",
          apiEndpoint: "/api/following?user_id=" + this.props.followed_id,
          overlayHeading: this.props.username + " is Following" });
      } else {
        return React.createElement(
          "span",
          { className: "following-count" },
          React.createElement(
            "b",
            null,
            this.props.followingCount
          ),
          " Following"
        );
      }
    }
  }, {
    key: "renderFollowerCount",
    value: function renderFollowerCount() {
      if (this.props.overlayTrigger) {
        return React.createElement(OverlayTriggerButton, {
          text: "<b>" + this.state.followerCount + "</b> " + this.pluralizeFollower(),
          apiEndpoint: "/api/followers?user_id=" + this.props.followed_id,
          overlayHeading: this.props.username + " is Followed by" });
      } else {
        return React.createElement(
          "span",
          { className: "follower-count" },
          React.createElement(
            "b",
            null,
            this.state.followerCount
          ),
          " ",
          this.pluralizeFollower()
        );
      }
    }
  }, {
    key: "renderFollowButton",
    value: function renderFollowButton() {
      if (this.props.hideButton) {
        return;
      }

      return React.createElement(UserFollowButton, {
        following: this.props.following,
        followed_id: this.props.followed_id,
        onFollowerCountChange: this.handleFollowerCountChange.bind(this) });
    }
  }, {
    key: "handleFollowerCountChange",
    value: function handleFollowerCountChange(newCount) {
      this.setState({
        followerCount: newCount
      });
    }
  }, {
    key: "pluralizeFollower",
    value: function pluralizeFollower() {
      return this.state.followerCount > 1 || this.state.followerCount === 0 ? 'Followers' : 'Follower';
    }
  }]);

  return UserFollowContainer;
})(React.Component);

UserFollowContainer.propTypes = { following: React.PropTypes.bool,
  hideButton: React.PropTypes.bool,
  followed_id: React.PropTypes.number,
  followerCount: React.PropTypes.number,
  followingCount: React.PropTypes.number,
  username: React.PropTypes.string,
  overlayTrigger: React.PropTypes.bool
};

UserFollowContainer.defaultProps = {
  overlayTrigger: false
};