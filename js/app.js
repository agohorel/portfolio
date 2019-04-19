p5.disableFriendlyErrors = true;

let canvasDiv, w, h, cnv;

let numParticles, minParticles, maxParticles;
let increment = .1;
let scale = 20;
let cols, rows;
let zOffset = 0;
let particles = [];
let flowField = [];
let particleNerfCount = 0;

function getScreenArea() {
	// get the screen area in pixels
	let deviceWidth = window.outerWidth;
	let deviceHeight = window.outerHeight;
	let deviceArea = deviceWidth * deviceHeight;
	// get the pixel density
	let pixelDensity = window.devicePixelRatio;
	// factor in pixel density
	return deviceArea = deviceArea / pixelDensity;
}

function setupParticleRanges(){
	// lower bound is iphone 5 screen, upper bound is 4k display w/ 1:1 pixel density
	numParticles = Math.floor(map(getScreenArea(), 90880, 8294400, 100, 1000));
	minParticles = Math.floor(map(getScreenArea(), 90880, 8294400, 50, 500));
	maxParticles = Math.floor(map(getScreenArea(), 90880, 8294400, 400, 1000));

	console.log(`starting particles: ${numParticles}`);
	console.log(`min particles: ${minParticles}`);
	console.log(`max particles: ${maxParticles}`);
}

function setup() {
	canvasDiv = document.getElementById("p5-container");
	w = canvasDiv.offsetWidth;
	h = canvasDiv.offsetHeight;
	cnv = createCanvas(w, h);
	cnv.parent("p5-container");

	setupParticleRanges();

	bg(255);
	noiseSeed(2018);

	cols = floor(width / scale);
	rows = floor(height / scale);

	// create empty array to store vectors in
	flowField = new Array(cols * rows);

	// instantiate particle class
	for (let i = 0; i < numParticles; i++) {
		let x = random(width);
		let y = random(height);
		particles[i] = new Particle(x, y, i);
	}
	console.log(particles.length);
}

function draw() {
	frameCount % 2 === 0 ? bg(15) : bg(5);

	let xOffset = 0;
	for (let x = 0; x < cols; x++) {
		// reset yOffset each loop thru column
		let yOffset = 0;
		for (let y = 0; y < rows; y++) {
			// the " * 2" is to add more chaos to the angles
			let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 2;
			// get the index of current cell
			let index = x + y * cols;
			// create vector using angle var above
			let v = p5.Vector.fromAngle(angle);

			// set random magnitudes to add variation
			v.setMag(random(10));
			// set vectors in our stored array 
			flowField[index] = v;
			yOffset += increment;
		}
		xOffset += increment;
		// increment "time" more slowly, with some oscillation
		zOffset += increment * sin(xOffset) * 0.0075;
	}
	
	populationManager();

	for (let i = 0; i < particles.length; i++) {
		particles[i].follow(flowField);
		particles[i].update();
		particles[i].edges();
		particles[i].display();
	}

}

function Particle(xSpawnLoc, ySpawnLoc, index) {
	this.index = index;
	this.pos = createVector(xSpawnLoc, ySpawnLoc);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.maxSpeed = random(1, 6);
	this.thickness = 1;

	this.follow = function(vectors) {
		// get the grid coords of nearest vector
		let x = floor(this.pos.x / scale);
		let y = floor(this.pos.y / scale);
		// get the index of nearest vector
		let index = x + y * cols;
		// get nearest flowField vector
		let force = vectors[index];
		// apply flowField vector as force on particle
		this.applyForce(force);
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.thickness = abs(this.vel.x + this.vel.y * .0001);
	}

	this.edges = function() {
		if (this.pos.x > width 
			|| this.pos.y > height 
			|| this.pos.x < 0 
			|| this.pos.y < 0) {
				this.edgeReaction();
			}
	}

	this.edgeReaction = function (){
		// move out of bounds particle to random location 
		this.pos.x = random(width);
		this.pos.y = random(height);
	}

	this.display = function() {
		let xScaled = map(this.pos.x, 0, width, 0, 180);
		let yScaled = map(this.pos.y, 0, height, 0, 180);
		let variation = random(-20, 20);

		strokeWeight(this.thickness);
		stroke((xScaled + yScaled * .2) + variation, 
			    xScaled + variation * .25, 
			    yScaled + variation * .25, 
			    xScaled + yScaled * .5);
		

		line(this.pos.x, this.pos.y, this.pos.x, this.pos.y);
		line(width - this.pos.x, 
			 height - this.pos.y,
			 width - this.pos.x,
			 height - this.pos.y);
	}
}

function windowResized() {
	w = canvasDiv.offsetWidth;
	h = canvasDiv.offsetHeight;
	resizeCanvas(w, h);
	bg(255);
}

function bg(opacity){
	colorMode(RGB);
	noStroke();
	fill(0, opacity);
	rect(0, 0, width, height);
	colorMode(HSB, 100);
}

function populationManager(){
	if (frameRate() < 55 && particles.length > minParticles) {
		// remove particle
		particles.pop();
		particleNerfCount++;
	}

	if (frameRate() > 50 && particles.length < maxParticles){
		// if we keep having to remove particles, stop adding them
		if (particleNerfCount < 100){
			particles.push(new Particle(random(width), random(height), makeUniqueIndex()));
		}
	}
}

function makeUniqueIndex() {
	// prevent collisions by taking averaged sum of all previous particle indexes to generate unique ones
	let sum = 0;
	for (let i = 0; i < particles.length; i++) {
		sum += particles[i].index;
	}
	return sum / particles.length;
}