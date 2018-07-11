import __scrollTo from 'coffeekraken-sugar/js/dom/scrollTo'
import __easingFn from 'coffeekraken-sugar/js/easings/easeInOutQuint'
import __dispatchEvent from 'coffeekraken-sugar/js/dom/dispatchEvent'
import __native from 'coffeekraken-sugar/js/core/sNativeWebComponent'

export default class SScrollToComponent extends __native(window.HTMLAnchorElement) {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps () {
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
       * Specify an offset in pixels
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

    }
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount () {
    super.componentMount()

    // listen for a click
    this.addEventListener('click', this._onClick.bind(this))
  }

  /**
   * On click on the component
   * @param   {MouseEvent}  e   The mouse click event
   */
  _onClick (e) {
    // check if need to prevent the default behavior or not
    if (!this.props.to) {
      e.preventDefault()
    }

    // scroll to the target
    this.scrollToTarget()
  }

  /**
   * Scroll to the target
   */
  scrollToTarget () {
    // get the target to scroll to
    const targetId = this.props.to || this.getAttribute('href')
    let targetElm
    if (targetId === '#') {
      targetElm = document.body
    } else {
      targetElm = document.querySelector(`#${targetId}`.replace('##', '#'))
    }

    // make sure we have a target
    if (!targetElm) return

    /**
     * @event
     * @name  s-scroll-to:start
     * Dispatched when the scroll process start
     */
    __dispatchEvent(this, `${this.componentNameDash}:start`)

    // scroll to target using the props
    __scrollTo(targetElm, this.props.duration, this.props.easing, this.props.offset, 'top', () => {
      /**
       * @event
       * @name  s-scroll-to:complete
       * Dispatched when the scroll process has complete
       */
      __dispatchEvent(this, `${this.componentNameDash}:complete`)
    })
  }
}
