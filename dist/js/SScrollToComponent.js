"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _scrollTo = require("coffeekraken-sugar/js/dom/scrollTo");

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _easeInOutQuint = require("coffeekraken-sugar/js/easings/easeInOutQuint");

var _easeInOutQuint2 = _interopRequireDefault(_easeInOutQuint);

var _dispatchEvent = require("coffeekraken-sugar/js/dom/dispatchEvent");

var _dispatchEvent2 = _interopRequireDefault(_dispatchEvent);

var _sNativeWebComponent = require("coffeekraken-sugar/js/core/sNativeWebComponent");

var _sNativeWebComponent2 = _interopRequireDefault(_sNativeWebComponent);

var _scrollTop = require("coffeekraken-sugar/js/dom/scrollTop");

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _offset = require("coffeekraken-sugar/js/dom/offset");

var _offset2 = _interopRequireDefault(_offset);

var _crypto = require("crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SScrollToComponent = function (_native) {
  _inherits(SScrollToComponent, _native);

  function SScrollToComponent() {
    _classCallCheck(this, SScrollToComponent);

    return _possibleConstructorReturn(this, (SScrollToComponent.__proto__ || Object.getPrototypeOf(SScrollToComponent)).apply(this, arguments));
  }

  _createClass(SScrollToComponent, [{
    key: "componentMount",


    /**
     * Mount component
     * @definition    SWebComponent.componentMount
     * @protected
     */
    value: function componentMount() {
      _get(SScrollToComponent.prototype.__proto__ || Object.getPrototypeOf(SScrollToComponent.prototype), "componentMount", this).call(this);

      // listen for a click
      this.addEventListener("click", this._onClick.bind(this));
    }

    /**
     * On click on the component
     * @param   {MouseEvent}  e   The mouse click event
     */

  }, {
    key: "_onClick",
    value: function _onClick(e) {
      // scroll to the target
      this.scrollToTarget(e);
    }

    /**
     * Scroll to the target
     * @param   {MouseEvent}  e   The mouse click event
     */

  }, {
    key: "scrollToTarget",
    value: function scrollToTarget(e) {
      var _this2 = this;

      // get the target to scroll to
      var to = this.props.to ? ("#" + this.props.to).replace("##", "#") : null;

      console.log("to", to);

      var targetId = to || this.getAttribute("href");
      var pathname = targetId.split("#")[0];
      var hash = targetId.split("#")[1];
      var targetElm = void 0;
      if (targetId === "#") {
        targetElm = document.body;
      } else if (hash) {
        targetElm = document.querySelector("#" + hash);
      } else {
        throw new Error("The component " + this.componentNameDash + " need at least an hash to point the scroll to...");
      }

      // make sure we have a target
      if (!targetElm) return;

      // prevent the default behavior of the link
      e.preventDefault();

      /**
       * @event
       * @name  start
       * Dispatched when the scroll process start
       */
      (0, _dispatchEvent2.default)(this, "start");

      // handle the offset
      var offset = this.props.offset;

      // handle custom offset with up:down offset syntax
      if (typeof this.props.offset === "string") {
        var offsets = this.props.offset.split(":");
        if (offsets.length === 2) {
          var scrollTop = (0, _scrollTop2.default)();
          var targetOffset = (0, _offset2.default)(targetElm);
          if (targetOffset.top > scrollTop) {
            offset = parseInt(offsets[1]);
          } else {
            offset = parseInt(offsets[0]);
          }
        }
      }

      // scroll to target using the props
      (0, _scrollTo2.default)(targetElm, this.props.duration, this.props.easing, offset, "top", function () {
        /**
         * @event
         * @name  complete
         * Dispatched when the scroll process has complete
         */
        (0, _dispatchEvent2.default)(_this2, "complete");
      });
    }
  }], [{
    key: "defaultProps",

    /**
     * Default props
     * @definition    SWebComponent.defaultProps
     * @protected
     */
    get: function get() {
      return {
        /**
         * Specify the scroll target id to scroll to.
         * The target must have an id.
         * If not specified, will take the link href attribute as target.
         * @attribute
         * @type  {String}
         */
        to: null,

        /**
         * Specify the duration of the scroll in ms
         * @attribute
         * @type  {Integer}
         */
        duration: 400,

        /**
         * Specify an offset in pixels.
         * This can also be in format "up:down" so you can have different offset depending on the scroll direction.
         * @attribute
         * @type  {Number}
         */
        offset: 0,

        /**
         * Specify an easing function to use
         * @attribute
         * @type  {Function}
         */
        easing: _easeInOutQuint2.default
      };
    }
  }]);

  return SScrollToComponent;
}((0, _sNativeWebComponent2.default)(window.HTMLAnchorElement));

exports.default = SScrollToComponent;