var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OverlayTriggerButton = (function (_React$Component) {
  _inherits(OverlayTriggerButton, _React$Component);

  function OverlayTriggerButton(props) {
    _classCallCheck(this, OverlayTriggerButton);

    _get(Object.getPrototypeOf(OverlayTriggerButton.prototype), 'constructor', this).call(this, props);

    this.handleOpenClick = this.handleOpenClick.bind(this);
  }

  _createClass(OverlayTriggerButton, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        null,
        React.createElement('span', { dangerouslySetInnerHTML: { __html: this.props.text }, onClick: this.handleOpenClick })
      );
    }
  }, {
    key: 'handleOpenClick',
    value: function handleOpenClick(event) {
      /** Notify UserOverlay component **/
      PubSub.publish('OverlayTriggerButton:onClick', {
        endpoint: this.props.apiEndpoint,
        overlayHeading: this.props.overlayHeading
      });
    }
  }]);

  return OverlayTriggerButton;
})(React.Component);

OverlayTriggerButton.propTypes = {
  text: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  overlayHeading: React.PropTypes.string,
  apiEndpoint: React.PropTypes.string.isRequired
};