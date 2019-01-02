module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-scroll-to-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
        <h1 class="h3 m-b-small">
          Coffeekraken s-scroll-to-component
        </h1>
        <p class="p m-b-bigger">
          Extension to the anchor tag that provide an easy way to specify a target to scroll to smoothly.
        </p>

        <a is="s-scroll-to" href="#my-cool-target" offset="100">Scroll to target</a>

        <div id="my-cool-target" style="position:relative; top:3000px; padding-bottom:2000px">
          I'm the target
          <a is="s-scroll-to" href="#">Scroll to top</a>
        </div>
			`
		},
		css : {
			language : 'sass',
			data : `
        @import 'node_modules/coffeekraken-sugar/index';
        @import 'node_modules/coffeekraken-s-typography-component/index';

        @include s-setup(());
        @include s-init();
        @include s-classes();
        @include s-typography-classes();

        body {
          padding: s-space(bigger);
        }
			`
		},
		js : {
			language : 'js',
			data : `
				import SScrollToComponent from './dist/index'
			`
		}
	}
}
