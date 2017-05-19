var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LikeButton = (function (_React$Component) {
  _inherits(LikeButton, _React$Component);

  function LikeButton(props) {
    _classCallCheck(this, LikeButton);

    _get(Object.getPrototypeOf(LikeButton.prototype), "constructor", this).call(this, props);

    this.state = {
      liked: this.props.liked,
      likeCount: this.props.likeCount
    };

    this.onUnlikeClick = this.onUnlikeClick.bind(this);
    this.onLikeClick = this.onLikeClick.bind(this);
  }

  _createClass(LikeButton, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this = this;

      var _props = this.props;
      var likeableType = _props.likeableType;
      var likeableId = _props.likeableId;

      this.token = PubSub.subscribe('LikeButton:onClick', function (msg, data) {
        if (likeableType === data.type && likeableId === data.id) {
          _this.setState({ liked: data.liked, likeCount: data.count });
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
        { className: "like-button" },
        React.createElement(
          "div",
          { className: "like-button-wrapper" },
          this.renderLikeButton()
        ),
        this.renderLikeCount()
      );
    }
  }, {
    key: "renderLikeButton",
    value: function renderLikeButton() {
      if (this.state.liked) {
        return React.createElement(
          "button",
          { className: "unlike-button", onClick: this.onUnlikeClick },
          React.createElement("i", { className: "fa fa-heart animated bounceIn" }),
          React.createElement(
            "span",
            { className: "hide-text" },
            "Unlike"
          )
        );
      } else {
        return React.createElement(
          "button",
          { className: "like-button", onClick: this.onLikeClick },
          React.createElement("i", { className: "fa fa-heart-o" }),
          React.createElement(
            "span",
            { className: "hide-text" },
            "Like"
          )
        );
      }
    }
  }, {
    key: "renderLikeCount",
    value: function renderLikeCount() {
      if (this.state.likeCount === 0) {
        return;
      }
      if (this.props.disableOverlay) {
        return React.createElement(
          "span",
          { className: "like-count" },
          this.state.likeCount
        );
      }
      return React.createElement(
        "span",
        { className: "like-count", style: { cursor: 'pointer' } },
        React.createElement(OverlayTriggerButton, {
          text: this.state.likeCount,
          overlayHeading: this.props.overlayHeading,
          apiEndpoint: this.props.overlayEndpoint })
      );
    }
  }, {
    key: "onUnlikeClick",
    value: function onUnlikeClick(e) {
      var _this2 = this;

      $.ajax({
        url: this.props.unlikeEndpoint,
        method: 'DELETE',
        dataType: 'json',
        success: function (data) {
          _this2.setState({ liked: data.liked, likeCount: data.count });
          PubSub.publish('LikeButton:onClick', data);
        }
      });
    }
  }, {
    key: "onLikeClick",
    value: function onLikeClick(e) {
      var _this3 = this;

      $.ajax({
        url: this.props.likeEndpoint,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
          _this3.setState({ liked: data.liked, likeCount: data.count });
          PubSub.publish('LikeButton:onClick', data);
        }
      });
    }
  }]);

  return LikeButton;
})(React.Component);

LikeButton.propTypes = {
  liked: React.PropTypes.bool.isRequired,
  likeCount: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
  likeEndpoint: React.PropTypes.string.isRequired,
  unlikeEndpoint: React.PropTypes.string.isRequired,
  likeableType: React.PropTypes.string.isRequired,
  likeableId: React.PropTypes.number.isRequired,
  disableOverlay: React.PropTypes.bool,
  overlayHeading: React.PropTypes.string,
  overlayEndpoint: React.PropTypes.string
};

LikeButton.defaultProps = {
  disableOverlay: false
};