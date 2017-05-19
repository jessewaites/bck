var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserOverlay = (function (_React$Component) {
  _inherits(UserOverlay, _React$Component);

  function UserOverlay(props) {
    _classCallCheck(this, UserOverlay);

    _get(Object.getPrototypeOf(UserOverlay.prototype), 'constructor', this).call(this, props);

    this.state = {
      isOpen: false,
      users: [],
      currentPage: null,
      nextPage: null,
      endpoint: '',
      overlayHeading: ''
    };

    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  _createClass(UserOverlay, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this = this;

      this.token = PubSub.subscribe('OverlayTriggerButton:onClick', function (msg, data) {
        var endpoint = data.endpoint;
        var overlayHeading = data.overlayHeading;

        _this.fetchUsers(endpoint, overlayHeading);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      PubSub.unsubscribe('OverlayTriggerButton:onClick');
    }
  }, {
    key: 'fetchUsers',
    value: function fetchUsers(endpoint, overlayHeading) {
      var _this2 = this;

      $.ajax({
        url: endpoint,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          if (data.length) {
            _this2.setState({
              isOpen: true,
              users: data,
              currentPage: data[0].currentPage,
              nextPage: data[0].nextPage,
              endpoint: endpoint,
              overlayHeading: overlayHeading
            });
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'overlay overlay-hugeinc ' + (this.state.isOpen ? 'open' : '') },
        React.createElement(
          'button',
          { className: 'overlay-close', onClick: this.handleCloseClick },
          React.createElement('span', { className: 'glyphicon glyphicon-remove' })
        ),
        React.createElement(
          'nav',
          { className: 'users-overlay' },
          React.createElement(
            'h2',
            { className: 'grayed-heading center' },
            this.state.overlayHeading
          ),
          React.createElement(
            'ul',
            null,
            this.renderUsers(),
            React.createElement(
              'li',
              { className: 'pagination-button-group' },
              this.renderPrevButton(),
              this.renderNextButton()
            )
          )
        )
      );
    }
  }, {
    key: 'renderUsers',
    value: function renderUsers() {
      var _this3 = this;

      return this.state.users.map(function (user) {
        return React.createElement(
          'li',
          { key: user.id },
          React.createElement('div', { dangerouslySetInnerHTML: _this3.renderAvatarImage(user) }),
          React.createElement(
            'a',
            { href: user.urlPath, className: 'overlay-user-info' },
            React.createElement(
              'strong',
              null,
              user.username
            ),
            React.createElement(
              'p',
              null,
              user.description
            )
          ),
          _this3.renderUserFollowButton(user)
        );
      });
    }
  }, {
    key: 'renderAvatarImage',
    value: function renderAvatarImage(user) {
      return { __html: user.avatar_image_tag };
    }
  }, {
    key: 'renderUserFollowButton',
    value: function renderUserFollowButton(user) {
      if (user.isSelf || !window.userSignedIn) {
        return;
      }
      return React.createElement(UserFollowButton, { following: user.following, followed_id: user.id });
    }
  }, {
    key: 'renderPrevButton',
    value: function renderPrevButton() {
      if (this.state.currentPage > 1) {
        return React.createElement(
          'a',
          { className: 'button', onClick: this.handlePrevClick },
          'Prev'
        );
      }
    }
  }, {
    key: 'renderNextButton',
    value: function renderNextButton() {
      if (this.state.nextPage !== null) {
        return React.createElement(
          'a',
          { className: 'button', onClick: this.handleNextClick },
          'Next'
        );
      }
    }
  }, {
    key: 'handleCloseClick',
    value: function handleCloseClick(event) {
      this.setState({
        isOpen: false,
        users: [],
        currentPage: null,
        nextPage: null,
        endpoint: '',
        overlayHeading: ''
      });
    }
  }, {
    key: 'handlePrevClick',
    value: function handlePrevClick() {
      var _this4 = this;

      $.ajax({
        url: this.state.endpoint + '&page=' + (this.state.currentPage - 1),
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          _this4.setState({
            users: data,
            currentPage: data[0].currentPage,
            nextPage: data[0].nextPage
          });
        }
      });
    }
  }, {
    key: 'handleNextClick',
    value: function handleNextClick() {
      var _this5 = this;

      $.ajax({
        url: this.state.endpoint + '&page=' + this.state.nextPage,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          _this5.setState({
            users: data,
            currentPage: data[0].currentPage,
            nextPage: data[0].nextPage
          });
        }
      });
    }
  }]);

  return UserOverlay;
})(React.Component);