var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FollowSuggestionsContainer = (function (_React$Component) {
  _inherits(FollowSuggestionsContainer, _React$Component);

  function FollowSuggestionsContainer(props) {
    _classCallCheck(this, FollowSuggestionsContainer);

    _get(Object.getPrototypeOf(FollowSuggestionsContainer.prototype), 'constructor', this).call(this, props);

    this.state = {
      users: [],
      activeUsers: []
    };
  }

  _createClass(FollowSuggestionsContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this = this;

      this.fetchUsers();
      this.token = PubSub.subscribe('UserFollowButton:onClick', function (message, data) {
        _this.removeUser(data.followed_id);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      PubSub.unsubscribe(this.token);
    }
  }, {
    key: 'fetchUsers',
    value: function fetchUsers() {
      var _this2 = this;

      $.ajax({
        url: '/api/follow_suggestions.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          var newActives = data.slice(0, 3);
          _this2.setState({
            activeUsers: newActives,
            users: [].concat(_toConsumableArray(data.slice(3)), _toConsumableArray(newActives))
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'follow-suggestions-container border-top' },
        React.createElement(
          'div',
          { className: 'suggestions-header' },
          React.createElement(
            'h4',
            { className: 'small-heading' },
            'People to follow'
          ),
          React.createElement(
            'a',
            { className: 'refresh-link pull-right', onClick: this.refreshActiveUsers.bind(this) },
            'Refresh'
          )
        ),
        React.createElement(
          'div',
          null,
          this.renderSuggestions()
        )
      );
    }
  }, {
    key: 'renderSuggestions',
    value: function renderSuggestions() {
      if (this.state.users.length === 0) {
        return React.createElement(
          'h5',
          null,
          'You are following all users!'
        );
      }
      return this.state.activeUsers.map(function (user) {
        return React.createElement(
          React.addons.CSSTransitionGroup,
          {
            key: user.id,
            transitionName: 'suggestion',
            transitionAppear: true,
            transitionAppearTimeout: 500,
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 300
          },
          React.createElement(SuggestionItem, _extends({ key: user.id }, user))
        );
      });
    }
  }, {
    key: 'refreshActiveUsers',
    value: function refreshActiveUsers() {
      var newActives = this.state.users.slice(0, 3);
      this.setState({
        activeUsers: newActives,
        users: [].concat(_toConsumableArray(this.state.users.slice(3)), _toConsumableArray(newActives))
      });
    }
  }, {
    key: 'removeUser',
    value: function removeUser(id) {
      var filteredUsers = this.state.users.filter(function (user) {
        if (user.id === id) {
          removedUser = user;
        }
        return user.id !== id;
      });

      this.setState({
        users: filteredUsers
      });
    }
  }]);

  return FollowSuggestionsContainer;
})(React.Component);