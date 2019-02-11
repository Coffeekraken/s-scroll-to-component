# Attributes

Here's the list of available attribute(s).

## to

Specify the scroll target id to scroll to.
The target must have an id.
If not specified, will take the link href attribute as target.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


## duration

Specify the duration of the scroll in ms

Type : **{ Integer }**

Default : **400**


## offset

Specify an offset in pixels.
This can also be in format "up:down" so you can have different offset depending on the scroll direction.

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0**


## easing

Specify an easing function to use

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **__easingFn**




# Methods


## scrollToTarget

Scroll to the target


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
e  |  **{ MouseEvent }**  |  The mouse click event  |  required  |


# Events


## start

Dispatched when the scroll process start


## complete

Dispatched when the scroll process has complete