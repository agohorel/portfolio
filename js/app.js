let increment = .1;
let scale = 20;
let cols, rows;
let zOffset = 0;
let particles = new Array(500);
let flowField = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	background(227, 32, 64);
	colorMode(HSB, 100);
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

}

function Particle() {
	this.pos = createVector(random(width), random(height));
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
		if (this.pos.x > width) this.pos.x = 0;
		if (this.pos.y > height) this.pos.y = 0;
		if (this.pos.x < 0) this.pos.x = width;
		if (this.pos.y < 0) this.pos.y = height;
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
		line(width - this.pos.x, height - this.pos.y, width - this.pos.x, height - this.pos.y);
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