var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResultsList = (function (_React$Component) {
  _inherits(SearchResultsList, _React$Component);

  function SearchResultsList() {
    _classCallCheck(this, SearchResultsList);

    _get(Object.getPrototypeOf(SearchResultsList.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(SearchResultsList, [{
    key: "render",
    value: function render() {
      var _this = this;

      return React.createElement(
        "ul",
        { className: "dropdown-menu", id: "autocomplete-items", onMouseEnter: function () {
            _this.props.setPreventHideDropdown();
          }, onMouseLeave: function () {
            _this.props.resetPreventHideDropdown();
          } },
        React.createElement("span", { className: "dropdown-arrow-top" }),
        React.createElement("span", { className: "dropdown-arrow-bottom" }),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "/search?q=" + this.props.term },
            React.createElement("i", { className: "fa fa-search" }),
            " Search for ",
            React.createElement(
              "strong",
              null,
              this.props.term
            )
          )
        ),
        this.renderPostHeading(),
        this.renderPosts(),
        this.renderUserHeading(),
        this.renderUsers(),
        this.renderTagHeading(),
        this.renderTags()
      );
    }
  }, {
    key: "renderPosts",
    value: function renderPosts() {
      return this.props.posts.slice(0, 3).map(function (post) {
        return React.createElement(SearchPostListItem, { key: post.id, post: post });
      });
    }
  }, {
    key: "renderUsers",
    value: function renderUsers() {
      return this.props.users.slice(0, 3).map(function (user) {
        return React.createElement(SearchUserListItem, { key: user.id, user: user });
      });
    }
  }, {
    key: "renderTags",
    value: function renderTags() {
      return this.props.tags.slice(0, 3).map(function (tag) {
        return React.createElement(SearchTagListItem, { key: tag.id, tag: tag });
      });
    }
  }, {
    key: "renderPostHeading",
    value: function renderPostHeading() {
      if (this.props.posts.length === 0) {
        return;
      }

      return React.createElement(
        "li",
        { className: "autocomplete-heading" },
        React.createElement(
          "h4",
          null,
          "Posts"
        )
      );
    }
  }, {
    key: "renderUserHeading",
    value: function renderUserHeading() {
      if (this.props.users.length === 0) {
        return;
      }

      return React.createElement(
        "li",
        { className: "autocomplete-heading" },
        React.createElement(
          "h4",
          null,
          "People"
        )
      );
    }
  }, {
    key: "renderTagHeading",
    value: function renderTagHeading() {
      if (this.props.tags.length === 0) {
        return;
      }

      return React.createElement(
        "li",
        { className: "autocomplete-heading" },
        React.createElement(
          "h4",
          null,
          "Tags"
        )
      );
    }
  }]);

  return SearchResultsList;
})(React.Component);