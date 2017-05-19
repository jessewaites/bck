var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagFollowersList = (function (_React$Component) {
  _inherits(TagFollowersList, _React$Component);

  function TagFollowersList(props) {
    _classCallCheck(this, TagFollowersList);

    _get(Object.getPrototypeOf(TagFollowersList.prototype), 'constructor', this).call(this, props);

    this.state = { followers: [] };
  }

  _createClass(TagFollowersList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this = this;

      this.fetchFollowers();
      this.token = PubSub.subscribe('TagFollowButton:onClick', function () {
        _this.fetchFollowers();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      PubSub.unsubscribe(this.token);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.renderFollowers()
      );
    }
  }, {
    key: 'fetchFollowers',
    value: function fetchFollowers() {
      var _this2 = this;

      $.ajax({
        url: '/api/tag_followers.json?tag_id=' + this.props.tagId,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          _this2.setState({ followers: data });
        }
      });
    }
  }, {
    key: 'renderFollowers',
    value: function renderFollowers() {
      return this.state.followers.map(function (follower) {
        return React.createElement(
          PopoverLink,
          { key: follower.id, user_id: follower.id, url: follower.urlPath },
          React.createElement('div', { dangerouslySetInnerHTML: { __html: follower.avatar_image_tag } })
        );
      });
    }
  }]);

  return TagFollowersList;
})(React.Component);