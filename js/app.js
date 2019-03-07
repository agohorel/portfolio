let w, h;

let increment = .1;
let scale = 20;
let cols, rows;
let zOffset = 0;
let particles = new Array(500);
let flowField = [];

function setup() {
	w = windowWidth;
	h = windowHeight;
	createCanvas(w, h);
	pixelDensity(1);
	bg(100);
	noiseSeed(2018);

	cols = floor(width / scale);
	rows = floor(height / scale);

	// create empty array to store vectors in
	flowField = new Array(cols * rows);

	// instantiate particle class
	for (let i = 0; i < particles.length; i++) {
		particles[i] = new Particle();
	}
}

function draw() {
	if (frameCount % 3 === 0){
		bg(5);
	} else {
		bg(0);
	}

	let xOffset = 0;
	for (let x = 0; x < cols; x++) {
		// reset yOffset each loop thru column
		let yOffset = 0;
		for (let y = 0; y < rows; y++) {
			// the " * 4" is to add more chaos to the angles
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
		// increment "time" more slowly
		zOffset += increment * 0.001;
	}
	

	for (let i = 0; i < particles.length; i++) {
		particles[i].follow(flowField);
		particles[i].update();
		particles[i].edges();
		particles[i].display();
	}


	runBoids();
}

function Particle() {
	this.pos = createVector(random(width/2, width), random(height));
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
		this.thickness = this.vel.x + this.vel.y * .0001;
	}

	this.edges = function() {
		if (this.pos.x > width) this.pos.x = width/2;
		if (this.pos.y > height) this.pos.y = 0;
		if (this.pos.x < width/2) this.pos.x = width/2;
		if (this.pos.y < 0) this.pos.y = height;
	}

	this.display = function() {
		let xScaled = map(this.pos.x, width/2, width, 0, 180);
		let yScaled = map(this.pos.y, 0, height, 0, 180);
		let variation = random(-20, 20);

		strokeWeight(this.thickness);
		stroke((xScaled + yScaled * .2) + variation, 
			    xScaled + variation * .25, 
			    yScaled + variation * .25, 
			    xScaled + yScaled * .5);
		

		line(this.pos.x, this.pos.y, this.pos.x, this.pos.y);
		line(width/2 - this.pos.x, height - this.pos.y, width/2 - this.pos.x, height - this.pos.y);
	}
}

function showNoiseField(x, y, v){
	stroke(255);
	push();
	translate(x * scale, y * scale);
	rotate(v.heading());
	line(0, 0, scale, 0);
	pop();
}

/// BOIDS ///
/// BOIDS ///
/// BOIDS ///
/// BOIDS ///

let flock = [];
let num_boids = 15;

function runBoids(){
	colorMode(HSB);

	if (flock.length < num_boids && frameCount % 2 === 0){
		flock.push(new Boid());
	}

	for (let boid of flock){
		boid.update();
		boid.edges();
		boid.lines(flock);
	}
}

class Boid {
	constructor(){
		this.position = createVector(random(width/2), random(height));
		this.radius = random(3, 6);
		this.hue = random(0, 180);
		this.brightness = random(0, 100);
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(random(.01, 5));
		this.acceleration = createVector();
		this.maxSpeed = 10;
		this.perception = random(25, width/3);
		this.thickness = random(this.radius*.15, this.radius*.5);
		this.getsBrighter = true;
		this.getsBigger = true;
		this.maxRadius = random(6, 12);
		this.minRadius = random(1, 3);
	}

	edges(){
		if (this.position.x > width/2 + this.radius){
			this.position.x = 0;
		} else if (this.position.x < -this.radius){
			this.position.x = width;
		}

		if (this.position.y > height + this.radius){
			this.position.y = 0;
		} else if (this.position.y < -this.radius){
			this.position.y = height;
		}
	}

	lines(boids){
		stroke(osc(this.hue, 360), 0, osc(this.brightness, 100), osc(this.hue, 100));
		strokeWeight(this.thickness);
		let perceptionRadius = this.perception;
		for (let other of boids){
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			// check if surrounding boids are within "perceivable" range and that "other" is not "me"/"this"
			if (d < perceptionRadius && d > perceptionRadius*.75 && other != this){
				rotate(radians(osc(this.hue), 360));
				line(this.position.x, this.position.y, other.position.x, other.position.y);
			}
		}
	}

	update(){
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.acceleration.set(0, 0); // reset acceleration after each update
		this.radius = osc(this.hue, 2);
		this.thickness = this.radius*.5;
		this.hue += .0001;
		this.brightness += random(.001, 1);
	}
}

function osc(angle, scalar){
	return abs(sin(radians(angle)) * scalar);
}


function windowResized() {
	w = windowWidth;
	h = windowHeight;
	resizeCanvas(w, h);
	colorMode(RGB);
	background(227, 32, 64);
	colorMode(HSB);
}

function bg(opacity){
	colorMode(RGB);
	noStroke();
	fill(230, 230, 230, opacity);
	rect(0, 0, width/2, height);
	fill(227, 32, 64, opacity);
	rect(width/2, 0, width, height);
	colorMode(HSB, 100);
}