/* SAniMan:Scanner

Simple Animation Manager:scanner 
- Danillo2k

*/

// dependent of AnimationManager
	/* draft 
		- quick and dirty draft
	
	/* expected
		- primary: data-animate="yes"

		- element
		- data-effect="effect"
		- data-reverse="true/false"
		- data-concurrent="true/false"
		- data-type="animation/transition"
		- data-time="duration" *
		- data-time="order" - if your using order all element should have the data attribute data-order=" "
	*/


var AnimationScanner = function () {

	this.scannedQueue = [];

	this.toAnimate = this.scan('data-animate');
	this.toAnimate.forEach(function(data) {
		this.extracted = this.extract(data);
		

		this.extObj = {
			el: data,
			effect: this.extracted.effect,
			reverse: this.extracted.reverse,
			useTransition: true,
			time: this.extracted.time,
			concurrent: this.extracted.concurrent
		};
		
		if (this.extracted.type === "animation") {
			this.extObj.useTransition = false;
		}

		if (this.extracted.concurrent === "yes") {
			this.extObj.concurrent = true;
		} else {
			this.extObj.concurrent = false;
		}

		if (this.extracted.order) {
			this.extracted.order = parseInt(this.extracted.order, 10);
			this.extObj.order = this.extracted.order;
		}

		this.scannedQueue.push(this.extObj);

	}, this);
	
};

AnimationScanner.prototype.scan = function(attribute) {
	var matchingElements = [];
	var allElements = document.getElementsByTagName('*');
	for (var i = 0; i < allElements.length; i++)
	{
		if (allElements[i].getAttribute(attribute))
		{
			matchingElements.push(allElements[i]);
		}
	}
	return matchingElements;
};

AnimationScanner.prototype.extract = function (el) {
	var data = {};
	[].forEach.call(el.attributes, function(attr) {
		if (/^data-/.test(attr.name)) {
			var camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
				return $1.toUpperCase();
			});
			data[camelCaseName] = attr.value;
		}
	});
	return data;
};

AnimationScanner.prototype.compare = function(a,b) {
	if (a.order < b.order)
		return -1;
	if (a.order > b.order)
		return 1;
	return 0;
};

AnimationScanner.prototype.sort = function () {
	for(var i = 0; i < this.scannedQueue.length; i++) {
		console.log(this.scannedQueue[i]);
		if (this.scannedQueue[i].order === 1) {
			this.scannedQueue.sort(this.compare);
		}
	}
};

AnimationScanner.prototype.animate = function () {
	this.sort();
	var animateScanner = new AnimationManager();
	animateScanner.enqueue(this.scannedQueue).animate();
};


/*
	getAttributes: stackoverflow: gilly3
	getAttributes: stackoverflow: kevinfahy
	
	This is just something i needed, far from perfect (POC), but if someone can use this, feel free to do so.
*/