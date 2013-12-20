SAniMan: Simple Animation Manager
===
Simple Animation Manager, is a simple animation manager that uses animation (css classes) that are added in sequence to the elements that needs to be animated. The manager listens to the "animation" or "transition" END event (webkit). 
An object /Array with objects containing the options, and element can be added to the queue ```.enqueue(obj); or .enqueue(array);``` or ```.enqueue(obj).enqueue(array);``` (chain in whatever order), and can be animated in sequence  ```.animate();```.

DEMO: http://jsfiddle.net/xj8Mj/7/

Animate-css
===
It could be used greatly in combination with:
https://github.com/daneden/animate.css (just add it to your html page and assign the classname as 'effect' to your object, or as data-effect='classname' attribute, when using the (very very very very beta, totally non optimised, Proof of concept scanner.)



create
===
```
var whatever = new AnimationManager();
```

Use:add to queue
===
```
whatever.enqueue(obj)
whatever.enqueue(array)
```


Chain:add to queue
===
```
whatever.enqueue(obj).enqueue(array)
```

Animate:
===
```
whatever.animate(); 
```

Concurrents
===
Added the possibility to animate multiple elements at the same time
```
obJ = {
  concurrent: true
}
```
* it should be noted that the first element can not have concurrent:true, because it has no element+animation to be concurrent to.

* no support for older browsers (that don't support transitionend/classList)


Chain:add to queue and animate
===
```
whatever.enqueue(obj).enqueue(array).animate();
```

Object structure 
===
```
obJ = {
  el: element, // element 
  effect: 'effect', // refers to classname
  reverse: true, // is this animation available in reversed order
  useTransition: true, // animation or transition
  concurrent: true // animation on current element will animate at the same time as the previous element
}
```


Array stucture
===
```
var array = [
  {
    el: element, // element 
    effect: 'effect', // refers to classname
    reverse: true, // is this animation available in reversed order
    useTransition: true, // animation or transition
    concurrent: true // animation on current element will animate at the same time as the previous element
  },
  {
    el: element, // element 
    effect: 'effect', // refers to classname
    reverse: true, // is this animation available in reversed order
    useTransition: true, // animation or transition
    concurrent: true // animation on current element will animate at the same time as the previous element
  }
]
```



=======================================
Simple Animation Manager:Scanner
=======================================

The Scanner, i just made quick and dirty for test purposes. (The animation manager needs an array or object, to process, all the scanner does is scan for data attributes and generates the Array, and sends it to the animation manager)

Data attributes can be added to the element, and the scanner scans the dom for the attributes. (it will process all, but use only those that are expected by the animation manager). It will auto-create an array with objects and add them to the animationManager queue. using ``` .animate(); ``` the animation will start.


DEMO: http://jsfiddle.net/ahL7Y/1/
Thats about it.

Expected: 
element + attributes:		

- data-animate="yes" 
- data-effect="effect"
- data-reverse="true/false"
- data-concurrent="true/false"
- data-type="animation/transition"
- data-time="duration" *

Create
===
```
whatever = new AnimationScanner();
```

Animate
===
```
whatever.animate();
```

* time not used yet, but it can easily be added.
* didn't do any optimisation,for scanner
