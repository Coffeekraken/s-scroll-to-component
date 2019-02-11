import __scrollTo from "coffeekraken-sugar/js/dom/scrollTo";
import __easingFn from "coffeekraken-sugar/js/easings/easeInOutQuint";
import __dispatchEvent from "coffeekraken-sugar/js/dom/dispatchEvent";
import __native from "coffeekraken-sugar/js/core/sNativeWebComponent";
import __scrollTop from "coffeekraken-sugar/js/dom/scrollTop";
import __offset from "coffeekraken-sugar/js/dom/offset";
import { createHash } from "crypto";

export default class SScrollToComponent extends __native(
  window.HTMLAnchorElement
) {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
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
      easing: __easingFn
    };
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount() {
    super.componentMount();

    // listen for a click
    this.addEventListener("click", this._onClick.bind(this));
  }

  /**
   * On click on the component
   * @param   {MouseEvent}  e   The mouse click event
   */
  _onClick(e) {
    // scroll to the target
    this.scrollToTarget(e);
  }

  /**
   * Scroll to the target
   * @param   {MouseEvent}  e   The mouse click event
   */
  scrollToTarget(e) {
    // get the target to scroll to
    const to = this.props.to ? `#${this.props.to}`.replace("##", "#") : null;

    console.log("to", to);

    const targetId = to || this.getAttribute("href");
    const pathname = targetId.split("#")[0];
    const hash = targetId.split("#")[1];
    let targetElm;
    if (targetId === "#") {
      targetElm = document.body;
    } else if (hash) {
      targetElm = document.querySelector(`#${hash}`);
    } else {
      throw new Error(
        `The component ${
          this.componentNameDash
        } need at least an hash to point the scroll to...`
      );
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
    __dispatchEvent(this, `start`);

    // handle the offset
    let offset = this.props.offset;

    // handle custom offset with up:down offset syntax
    if (typeof this.props.offset === "string") {
      const offsets = this.props.offset.split(":");
      if (offsets.length === 2) {
        const scrollTop = __scrollTop();
        const targetOffset = __offset(targetElm);
        if (targetOffset.top > scrollTop) {
          offset = parseInt(offsets[1]);
        } else {
          offset = parseInt(offsets[0]);
        }
      }
    }

    // scroll to target using the props
    __scrollTo(
      targetElm,
      this.props.duration,
      this.props.easing,
      offset,
      "top",
      () => {
        /**
         * @event
         * @name  complete
         * Dispatched when the scroll process has complete
         */
        __dispatchEvent(this, `complete`);
      }
    );
  }
}
