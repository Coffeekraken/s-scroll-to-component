# Properties


## to:

Specify the scroll target id to scroll to.
The target must have an id.
If not specified, will take the link href attribute as target.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


## duration:

Specify the duration of the scroll in ms

Type : **{ Integer }**

Default : **400**


## offset:

Specify an offset in pixels.
This can also be in format "up:down" so you can have different offset depending on the scroll direction.

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0**


## easing:

Specify an easing function to use

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


# Methods


## scrollToTarget

Scroll to the target


# Events


## s-scroll-to:start

Dispatched when the scroll process start


## s-scroll-to:complete

Dispatched when the scroll process has complete