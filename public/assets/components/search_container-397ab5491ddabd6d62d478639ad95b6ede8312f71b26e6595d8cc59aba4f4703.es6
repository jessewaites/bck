var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchContainer = (function (_React$Component) {
  _inherits(SearchContainer, _React$Component);

  function SearchContainer(props) {
    _classCallCheck(this, SearchContainer);

    _get(Object.getPrototypeOf(SearchContainer.prototype), 'constructor', this).call(this, props);

    this.state = { preventHideDropdown: false, showDropdown: false, term: '', posts: [], users: [], tags: [] };
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);
  }

  _createClass(SearchContainer, [{
    key: 'search',
    value: function search(term) {
      var _this = this;

      this.setState({ term: term });

      $.ajax({
        url: '/api/autocomplete.json/?term=' + term,
        method: 'GET',
        success: function (data) {
          _this.setState({
            posts: data.posts,
            users: data.users,
            tags: data.tags
          });
        }
      });
    }
  }, {
    key: 'setPreventHideDropdown',
    value: function setPreventHideDropdown() {
      this.setState({ preventHideDropdown: true });
    }
  }, {
    key: 'resetPreventHideDropdown',
    value: function resetPreventHideDropdown() {
      this.setState({ preventHideDropdown: false });
    }
  }, {
    key: 'hideDropdown',
    value: function hideDropdown() {
      if (!this.state.preventHideDropdown) {
        this.setState({ showDropdown: false });
      }
    }
  }, {
    key: 'showDropdown',
    value: function showDropdown() {
      this.setState({ showDropdown: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(SearchBar, {
          showDropdown: this.showDropdown,
          hideDropdown: this.hideDropdown,
          term: this.state.term,
          onSearchTermChange: function (term) {
            _this2.search(term);
          }
        }),
        this.renderSearchResults()
      );
    }
  }, {
    key: 'renderSearchResults',
    value: function renderSearchResults() {
      if (!this.state.showDropdown || this.state.posts.length === 0 && this.state.users.length === 0 && this.state.tags.length === 0) {
        return;
      }

      return React.createElement(SearchResultsList, {
        setPreventHideDropdown: this.setPreventHideDropdown,
        resetPreventHideDropdown: this.resetPreventHideDropdown,
        term: this.state.term,
        posts: this.state.posts,
        users: this.state.users,
        tags: this.state.tags
      });
    }
  }]);

  return SearchContainer;
})(React.Component);