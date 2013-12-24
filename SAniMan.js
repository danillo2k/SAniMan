/* SAniMan

Simple Animation Manager 
- Danillo2k

*/

var AnimationManager = function(){
	this.defaults = {
		USE_TRANSITION: 'animation',
		EFFECT: 'slide' // define standard animation
	};
	this.queue  = [];
};

AnimationManager.prototype.animate = function () {
	if(this.peekNextItem() && this.peekNextItem().concurrent){
		setTimeout(function(){
			this.animate();
		}.bind(this), 1);
	}

	var options = this.dequeue();

	if(options && options.el) {

		// init
		options.effect = (options.effect)? options.effect : this.defaults.EFFECT;
		options.reverse = (options.reverse) ? 'reverse' : '';
		options.useTransition = (options.useTransition) ? options.useTransition : this.defaults.USE_TRANSITION;
		options.detectedTransitionEnd = this.detectTransitionEnd(options);

		// start
		options.useTransition = (options.useTransition)? options.useTransition : this.defaults.USE_TRANSITION;

		// add
		if(!options.concurrent){
			this.addListeners(function(){
				options.el.classList.remove('animated', options.effect);
				this.removeListeners(options);

				if(this.queue.length) {
					this.animate();
				}

			}, options);
		} else {
			this.addListeners(function(){
				options.el.classList.remove('animated', options.effect);
				this.removeListeners(options);
			}, options);
		}
		
		options.el.classList.add('animated', options.effect);


	} else {
		return false;
	}
};

AnimationManager.prototype.addListeners = function(endAnimateFunction, options) {
	options.endAnimate = endAnimateFunction.bind(this);
	options.el.addEventListener(options.detectedTransitionEnd, options.endAnimate, false);
};

AnimationManager.prototype.removeListeners = function(options) {
	options.el.removeEventListener(options.detectedTransitionEnd, options.endAnimate, false);
};

AnimationManager.prototype.peekNextItem = function(){
	return this.queue[1];
};

AnimationManager.prototype.detectTransitionEnd = function (options) {
	// Modernizr

	var data;
	var transitions;
	var el = document.createElement('transitionEndEl');

	if (options.useTransition === 'transition') {
		transitions = {
			'WebkitTransition':'webkitTransitionEnd',
			'MozTransition':'transitionend',
			'OTransition':'oTransitionEnd otransitionend',
			'msTransition':'MSTransitionEnd',
			'transition':'transitionend'
		};
	} else {
		transitions = {
			'WebkitAnimation':'webkitAnimationEnd',
			'MozAnimation':'animationend',
			'OAnimation':'oAnimationEnd oanimationendend',
			'msTransition':'MSAnimationEnd',
			'transition':'animationend'
		};
	}
	for(data in transitions){
		if( el.style[data] !== undefined ){
			return transitions[data];
		}
	}
};

AnimationManager.prototype.enqueue = function(item){
	if(Array.isArray(item)) {
		this.pushArray(item);
	} else {
		this.queue.push(item);
	}
	return this;
};

AnimationManager.prototype.pushArray = function (given_array) {
	given_array.forEach(function(data) {
		this.queue.push(data);
	},
	this);
};

AnimationManager.prototype.dequeue = function(options){
	if (this.queue.length === 0) {
		return undefined;
	}
	var item = this.queue[0];
	this.queue = this.queue.slice(1, this.queue.length);

	return item;
};

/*
	Queue idea by: Stephen Morley 
	transition detection by: Modernizr
	Concurrents: randynamic
*/
