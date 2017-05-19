var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationsContainer = (function (_React$Component) {
  _inherits(NotificationsContainer, _React$Component);

  function NotificationsContainer(props) {
    _classCallCheck(this, NotificationsContainer);

    _get(Object.getPrototypeOf(NotificationsContainer.prototype), 'constructor', this).call(this, props);

    this.state = {
      newNotificationCount: 0,
      notifications: [],
      nextPage: null
    };
  }

  _createClass(NotificationsContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.fetchNotifications();
      // TODO: set timer to poll
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return React.createElement(
        'div',
        { className: 'notification-container' },
        React.createElement(
          'a',
          { className: 'dropdown-toggle ' + (this.state.newNotificationCount > 0 ? 'active' : ''),
            onClick: function () {
              return _this.handleMarkAsTouched();
            },
            'data-toggle': 'dropdown', role: 'button', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
          this.renderNotificationIcon()
        ),
        React.createElement(
          'div',
          {
            className: 'dropdown-menu',
            ref: function (ref) {
              _this.dropdownRef = ref;
            }
          },
          React.createElement('span', { className: 'dropdown-arrow-top' }),
          React.createElement('span', { className: 'dropdown-arrow-bottom' }),
          React.createElement(
            'div',
            { className: 'notification-header' },
            React.createElement(
              'span',
              null,
              'Notifications'
            ),
            React.createElement(
              'a',
              { className: 'pull-right mark-all-as-read',
                onClick: function (e) {
                  return _this.handleMarkAllAsRead(e);
                } },
              'Mark All as Read'
            )
          ),
          React.createElement(
            'ul',
            {
              onScroll: function () {
                return _this.handleScroll();
              },
              ref: function (ref) {
                _this.notificationsListRef = ref;
              },
              className: 'notifications-list' },
            this.renderNotificationItems(),
            this.loadMoreButton()
          )
        )
      );
    }
  }, {
    key: 'fetchNotifications',
    value: function fetchNotifications() {
      var _this2 = this;

      $.ajax({
        url: "/api/notifications.json",
        dataType: "JSON",
        method: "GET",
        success: function (data) {
          _this2.setState({
            newNotificationCount: data.new_notification_count,
            nextPage: data.next_page,
            notifications: data.notifications
          });
        }
      });
    }
  }, {
    key: 'renderNotificationIcon',
    value: function renderNotificationIcon() {
      if (this.state.newNotificationCount > 0) {
        return React.createElement(
          'span',
          { id: 'new-notifications-count' },
          this.state.newNotificationCount
        );
      } else {
        return React.createElement('i', { className: 'fa fa-bell-o notification-bell', id: 'bell' });
      }
    }
  }, {
    key: 'renderNotificationItems',
    value: function renderNotificationItems() {
      if (!this.state.notifications.length) {
        return React.createElement(
          'div',
          { className: 'no-notifications' },
          React.createElement(
            'div',
            { className: 'speech-bubble' },
            'Nothing to see here...'
          ),
          React.createElement('span', { className: 'speech-arrow-top' }),
          React.createElement('span', { className: 'speech-arrow-bottom' }),
          React.createElement(
            'div',
            { className: 'ringer' },
            React.createElement(
              'svg',
              { id: 'Layer_1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 119.4 128.6' },
              React.createElement('circle', { className: 'eye blink', cx: '41.8', cy: '72.2', r: '4.5' }),
              React.createElement('circle', { className: 'eye blink', cx: '78.2', cy: '72.2', r: '4.5' }),
              React.createElement('path', { className: 'mouth smile', d: 'M43.3 84.2c4.8 4.2 10.5 6.6 16.8 6.6s12-2.4 16.8-6.6H43.3z' }),
              React.createElement(
                'g',
                null,
                React.createElement('path', { className: 'bell-jar', d: 'M118.7 100.3c0 2.4-.9 4.6-2.7 6.3-1.8 1.8-3.9 2.7-6.3 2.7H78.1c0 5-1.8 9.2-5.3 12.8-3.5 3.5-7.8 5.3-12.8 5.3-5 0-9.2-1.8-12.8-5.3s-5.3-7.8-5.3-12.8H10.4c-2.4 0-4.6-.9-6.3-2.7-1.8-1.8-2.7-3.9-2.7-6.3 2.4-2 4.5-4 6.4-6.2 1.9-2.2 3.9-5 6-8.4 2.1-3.5 3.8-7.2 5.3-11.2 1.4-4 2.6-8.8 3.5-14.5.9-5.7 1.4-11.8 1.4-18.3 0-7.1 2.8-13.8 8.3-19.9C37.8 15.7 45 11.9 54 10.6c-.4-.9-.6-1.8-.6-2.8 0-1.9.7-3.5 2-4.8 1.3-1.3 2.9-2 4.8-2s3.5.7 4.8 2c1.3 1.3 2 2.9 2 4.8 0 .9-.2 1.9-.6 2.8 8.9 1.3 16.2 5 21.7 11.2 5.5 6.1 8.3 12.8 8.3 19.9 0 6.5.5 12.6 1.4 18.3.9 5.7 2.1 10.5 3.5 14.5s3.2 7.7 5.3 11.2c2.1 3.5 4.1 6.3 6 8.4 1.6 2.2 3.7 4.2 6.1 6.2zm-104.5 0h91.7C93.4 86.2 87.1 66.6 87.1 41.6c0-2.4-.6-4.9-1.7-7.4s-2.8-5-4.9-7.3c-2.1-2.3-5-4.2-8.6-5.7-3.6-1.5-7.6-2.2-12-2.2s-8.4.7-12 2.2-6.5 3.4-8.6 5.7c-2.1 2.3-3.7 4.7-4.9 7.3s-1.7 5-1.7 7.4c.2 25-6 44.6-18.5 58.7zm46.9 20.3c0-.8-.4-1.1-1.1-1.1-2.8 0-5.2-1-7.2-3s-3-4.4-3-7.2c0-.8-.4-1.1-1.1-1.1-.8 0-1.1.4-1.1 1.1 0 3.4 1.2 6.4 3.6 8.8 2.4 2.4 5.3 3.6 8.8 3.6.8 0 1.1-.3 1.1-1.1z' })
              )
            )
          )
        );
      }

      return this.state.notifications.map(function (notification) {
        return React.createElement(NotificationItem, _extends({ key: notification.id }, notification));
      });
    }

    // Keep this as a fallack fro handleScroll
  }, {
    key: 'loadMoreButton',
    value: function loadMoreButton() {
      var _this3 = this;

      if (this.state.nextPage === null) {
        return;
      }
      return React.createElement(
        'li',
        { className: 'load-more' },
        React.createElement(
          'a',
          { onMouseOver: function () {
              return _this3.handleLoadMore();
            } },
          React.createElement('i', { className: 'fa fa-spinner fa-pulse' })
        )
      );
    }
  }, {
    key: 'handleMarkAsTouched',
    value: function handleMarkAsTouched() {
      var _this4 = this;

      if (this.state.newNotificationCount === 0) {
        return;
      }
      $.ajax({
        url: '/api/notifications/mark_as_touched',
        method: 'POST',
        dataType: 'JSON',
        success: function () {
          _this4.setState({
            newNotificationCount: 0
          });
        }
      });
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var scrollHeight = $(this.notificationsListRef)[0].scrollHeight;
      var OFFSET = 50;
      var scrollTop = $(this.notificationsListRef).scrollTop();
      if (scrollHeight - (scrollTop + OFFSET) < $(this.notificationsListRef).innerHeight()) {
        this.handleLoadMore();
      }
    }
  }, {
    key: 'handleMarkAllAsRead',
    value: function handleMarkAllAsRead() {
      var _this5 = this;

      $(this.dropdownRef).parent().addClass('open'); // workaround jquery dropdown
      $.ajax({
        url: '/api/notifications/mark_all_as_read',
        method: 'POST',
        dataType: 'json',
        success: function () {
          _this5.setState({
            notifications: _this5.state.notifications.map(function (notification) {
              return _extends({}, notification, { unread: false });
            })
          });
        }
      });
    }
  }, {
    key: 'handleLoadMore',
    value: function handleLoadMore() {
      var _this6 = this;

      if (this.fetching || !this.state.nextPage) {
        return;
      }
      this.fetching = true;
      $.ajax({
        url: '/api/notifications.json/?page=' + this.state.nextPage,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          _this6.fetching = false;
          _this6.setState({
            newNotificationCount: data.new_notification_count,
            nextPage: data.next_page,
            notifications: [].concat(_toConsumableArray(_this6.state.notifications), _toConsumableArray(data.notifications))
          });
        }
      });
    }
  }]);

  return NotificationsContainer;
})(React.Component);