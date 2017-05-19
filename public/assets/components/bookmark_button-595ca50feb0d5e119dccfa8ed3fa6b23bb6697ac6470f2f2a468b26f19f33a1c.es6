var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BookmarkButton = (function (_React$Component) {
  _inherits(BookmarkButton, _React$Component);

  function BookmarkButton(props) {
    _classCallCheck(this, BookmarkButton);

    _get(Object.getPrototypeOf(BookmarkButton.prototype), "constructor", this).call(this, props);

    this.state = { bookmarked: this.props.bookmarked };

    this.onUnbookmarkClick = this.onUnbookmarkClick.bind(this);
    this.onBookmarkClick = this.onBookmarkClick.bind(this);
  }

  _createClass(BookmarkButton, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this = this;

      var _props = this.props;
      var bookmarkableType = _props.bookmarkableType;
      var bookmarkableId = _props.bookmarkableId;

      this.token = PubSub.subscribe('BookmarkButton:onClick', function (msg, data) {
        if (bookmarkableType === data.type && bookmarkableId === data.id) {
          _this.setState({ bookmarked: data.bookmarked });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "bookmark-button-wrapper" },
        this.renderBookmarkButton()
      );
    }
  }, {
    key: "renderBookmarkButton",
    value: function renderBookmarkButton() {
      if (this.state.bookmarked) {
        return React.createElement(
          "button",
          { className: "unbookmark-button", onClick: this.onUnbookmarkClick },
          React.createElement("i", { className: "fa fa-bookmark" }),
          React.createElement(
            "span",
            { className: "hide-text" },
            "Unbookmark"
          )
        );
      } else {
        return React.createElement(
          "button",
          { className: "bookmark-button", onClick: this.onBookmarkClick },
          React.createElement("i", { className: "fa fa-bookmark-o" }),
          React.createElement(
            "span",
            { className: "hide-text" },
            "Bookmark"
          )
        );
      }
    }
  }, {
    key: "onUnbookmarkClick",
    value: function onUnbookmarkClick(e) {
      var _this2 = this;

      $.ajax({
        url: this.props.unbookmarkEndpoint,
        method: 'DELETE',
        dataType: 'json',
        success: function (data) {
          _this2.setState({ bookmarked: data.bookmarked });
          PubSub.publish('BookmarkButton:onClick', data);
        }
      });
    }
  }, {
    key: "onBookmarkClick",
    value: function onBookmarkClick(e) {
      var _this3 = this;

      $.ajax({
        url: this.props.bookmarkEndpoint,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
          _this3.setState({ bookmarked: data.bookmarked });
          PubSub.publish('BookmarkButton:onClick', data);
        }
      });
    }
  }]);

  return BookmarkButton;
})(React.Component);

BookmarkButton.propTypes = {
  bookmarked: React.PropTypes.bool.isRequired,
  unbookmarkEndpoint: React.PropTypes.string.isRequired,
  bookmarkEndpoint: React.PropTypes.string.isRequired,
  bookmarkableType: React.PropTypes.string.isRequired,
  bookmarkableId: React.PropTypes.number.isRequired
};