var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserPopover = (function (_React$Component) {
  _inherits(UserPopover, _React$Component);

  function UserPopover() {
    _classCallCheck(this, UserPopover);

    _get(Object.getPrototypeOf(UserPopover.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(UserPopover, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "user-popover popover " + this.props.position, style: this.cssStyles() },
        React.createElement("div", { className: "po-buffer-top" }),
        React.createElement("div", { className: "po-buffer-bottom" }),
        React.createElement("div", { className: "arrow" }),
        React.createElement(
          "div",
          { className: "flex-container flex-space-btw up-main" },
          React.createElement(
            "div",
            { className: "up-metadata" },
            React.createElement(
              "h3",
              { className: "po-username" },
              React.createElement(
                "a",
                { href: this.props.user.urlPath },
                this.props.user.username
              )
            ),
            React.createElement(
              "h4",
              { className: "po-description" },
              this.props.user.description
            ),
            this.renderLocation()
          ),
          React.createElement("div", { dangerouslySetInnerHTML: this.renderAvatarImage() })
        ),
        React.createElement(UserFollowContainer, {
          following: this.props.user.isFollowing,
          followed_id: this.props.user.id,
          followerCount: this.props.user.followerCount,
          followingCount: this.props.user.followingCount,
          hideButton: this.props.user.hideButton,
          isSignedIn: this.props.user.isSignedIn,
          className: "flex-container flex-space-btw user-follow-container"
        })
      );
    }
  }, {
    key: "renderAvatarImage",
    value: function renderAvatarImage() {
      return { __html: this.props.user.avatar_image_tag };
    }
  }, {
    key: "renderLocation",
    value: function renderLocation() {
      if (this.props.user.location) {
        return React.createElement(
          "div",
          { className: "po-location" },
          React.createElement("i", { className: "fa fa-map-marker" }),
          this.props.user.location
        );
      }
    }
  }, {
    key: "cssStyles",
    value: function cssStyles() {
      if (this.props.position === "bottom") {
        return { transform: 'translate(-50%, 14px)' };
      } else {
        return { transform: 'translate(-50%, -100%)' };
      }
    }
  }]);

  return UserPopover;
})(React.Component);