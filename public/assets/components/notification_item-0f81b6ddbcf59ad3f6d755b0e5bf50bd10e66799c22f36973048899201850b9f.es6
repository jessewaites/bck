var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationItem = (function (_React$Component) {
  _inherits(NotificationItem, _React$Component);

  function NotificationItem(props) {
    _classCallCheck(this, NotificationItem);

    _get(Object.getPrototypeOf(NotificationItem.prototype), 'constructor', this).call(this, props);

    this.state = { unread: this.props.unread };
  }

  _createClass(NotificationItem, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        unread: nextProps.unread
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return React.createElement(
        'li',
        {
          className: this.state.unread ? 'unread-notification' : '',
          onClick: function () {
            return _this.handleMarkAsRead();
          } },
        React.createElement(
          'a',
          { href: this.props.url },
          React.createElement('span', { dangerouslySetInnerHTML: { __html: this.props.actor_avatar_img_tag } }),
          React.createElement(
            'div',
            { className: 'notification-metadata' },
            this.notificationContent(),
            React.createElement('br', null),
            React.createElement(
              'small',
              null,
              this.notificationIcon(),
              ' ',
              this.props.time_ago
            )
          )
        )
      );
    }
  }, {
    key: 'notificationContent',
    value: function notificationContent() {
      var _props = this.props;
      var actor = _props.actor;
      var action = _props.action;
      var type = _props.type;

      switch (type) {
        case 'post':
          return actor + ' ' + action + ' ' + type;
        case 'user':
          return actor + ' ' + action;
        case 'response':
          return actor + ' ' + action + ' ' + type;
      }
    }

    // FIXME: this is tightly coupled to action.
  }, {
    key: 'notificationIcon',
    value: function notificationIcon() {
      switch (this.props.action) {
        case 'liked your':
          return React.createElement('i', { className: 'fa fa-heart-o' });
        case 'started following you':
          return React.createElement('i', { className: 'fa fa-user' });
        case 'responded to your':
        case 'also commented on a':
          return React.createElement('i', { className: 'fa fa-commenting-o' });
      }
    }
  }, {
    key: 'handleMarkAsRead',
    value: function handleMarkAsRead(id) {
      var _this2 = this;

      $.ajax({
        url: '/api/notifications/' + this.props.id + '/mark_as_read',
        method: 'POST',
        dataType: 'json',
        success: function () {
          _this2.setState({
            unread: false
          });
        }
      });
    }
  }]);

  return NotificationItem;
})(React.Component);