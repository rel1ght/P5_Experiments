let CRYSTAL_SIZE = 100;
const SIDES = 6;
let XREPEATNUM = 3;
let YREPEATNUM = 5;
let PALETTE = [];
const DEFAULT_ANGLE = 360 / 6;
function windowResized() {
	console.log("resized!");
	resizeCanvas(windowWidth, windowHeight);
	background("black");
	fill("black");
	breakpointSize();
	draw();
}

function breakpointSize(windowWidth, windowHeight) {
	if (matchMedia("(min-width: 1400px)").matches) {
		XREPEATNUM = 6;
		CRYSTAL_SIZE = 150;
		// the viewport is at least 900 pixels wide
	} else if (matchMedia("(min-width: 1200px)").matches) {
		XREPEATNUM = 5;
		CRYSTAL_SIZE = 150;
		// the viewport is at least 900 pixels wide
	} else if (matchMedia("(min-width: 900px)").matches) {
		XREPEATNUM = 4;
		// the viewport is at least 900 pixels wide
	}
}

function setup() {
	// var windowWidth =
	// 	window.innerWidth ||
	// 	document.documentElement.clientWidth ||
	// 	document.body.clientWidth;
	// var windowHeight =
	// 	window.innerHeight ||
	// 	document.documentElement.clientHeight ||
	// 	document.body.clientHeight;
	breakpointSize(windowWidth, windowHeight);
	createCanvas(windowWidth, windowHeight, SVG);
	background("black");
	fill("black");

	PALETTE = [
		[
			color("rgba(211, 226, 219, .1"),
			color("rgba(146, 213, 230, .7)"),
			color("rgba(119, 45, 139, .7)"),
			color("rgba(90, 11, 77, .8)"),
			color("rgba(161, 239, 139, .9)"),
		],
		[
			color("rgba(87, 77, 104, .7"),
			color("rgba(163, 133, 96, .7)"),
			color("rgba(198, 161, 91, .7)"),
			color("rgba(242, 232, 109, .8)"),
			color("rgba(211, 223, 184, .9)"),
		],
		[
			color("rgba(133, 255, 158, .7"),
			color("rgba(32, 181, 32, .7)"),
			color("rgba(166, 244, 220, .7)"),
			color("rgba(186, 89, 166, .8)"),
			color("rgba(100, 63, 193, .7)"),
		],
		[
			color("rgba(175, 36, 36, .6"),
			color("rgba(33, 118, 255, .7)"),
			color("rgba(51, 161, 253, .7)"),
			color("rgba(253, 202, 64, .8)"),
			color("rgba(247, 152, 36, .7)"),
		],
	];

	//default is radian, change to degree
	angleMode(DEGREES);
	//create rectanges from center, not corner
	rectMode(CENTER);
	//no animations, don't need to repeatedly render
	noLoop();
}

function draw() {
	let widthGrid = width / XREPEATNUM;
	let heightGrid = height / YREPEATNUM;
	let x = widthGrid / 2;
	let y = heightGrid / 2;
	push();
	translate(x, y);
	let palette = PALETTE[randomGetter(PALETTE.length)];
	for (let i = 0; i < YREPEATNUM; i++) {
		push();
		for (let j = 0; j < XREPEATNUM; j++) {
			//console.log("X: ", x);
			drawShapes(palette);
			translate(widthGrid, 0);
			//x += widthGrid;
		}
		pop();
		//console.log("Y: ", y);
		translate(0, heightGrid);
		//y += heightGrid;
	}
	pop();
}
function drawShapes(palette) {
	push();
	//translate(width / 2, height / 2);
	rotate(30);
	outlineShapeMaker(palette);

	for (let i = 0; i < 10; i++) {
		shapesMaker(3, palette);
	}
	pop();
}

function scaffold() {
	noFill();
	stroke(0);

	//wrapping function calls in push/pop allows changes to be scoped
	push();
	stroke(PALETTE[0]);
	//changes origin point (0,0) to center of canvas
	translate(width / 2, height / 2);

	ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
	stroke(PALETTE[1]);
	for (let i = 0; i < SIDES; i++) {
		line(0, 0, 0, CRYSTAL_SIZE / 2);
		rotate(DEFAULT_ANGLE);
	}
	pop();
}
function shapeGenerator(
	strokeColor,
	fillColor,
	shapeSelector,
	shapeSize,
	shapePosition,
	shapeModifier,
	shapeModifier2
) {
	push();
	rectMode(CENTER);
	ellipseMode(CENTER);
	translate(0, shapePosition);
	stroke(strokeColor);
	fill(fillColor);
	switch (shapeSelector) {
		case 0:
			ellipse(
				0,
				0,
				shapeSize * shapeModifier,
				shapeSize * shapeModifier2
			);
			break;
		case 1:
			triangle(
				0,
				0,
				0,
				shapeSize * shapeModifier,
				shapeSize * shapeModifier2,
				0
			);
			break;
		case 2:
			rect(0, 0, shapeSize * shapeModifier, shapeSize * shapeModifier2);
			break;
		case 3:
			line(0, shapeSize, shapeSize, 0);
			break;
		case 4:
			point(0, 0);
	}
	pop();
}

function hexagon(posX, posY, radius) {
	const rotAngle = 360 / 6;
	beginShape();
	for (let i = 0; i < 6; i++) {
		const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle);
		vertex(thisVertex.x, thisVertex.y);
	}
	endShape(CLOSE);
}

function pointOnCircle(posX, posY, radius, angle) {
	const x = posX + radius * cos(angle);
	const y = posY + radius * sin(angle);
	return createVector(x, y);
}

function outlineShapeMaker(palette) {
	const strokeColor = palette[randomGetter(palette.length)];
	const weight = randomGetter(3);
	stroke(strokeColor);
	strokeWeight(weight);
	const hexagonTrue = randomGetter(2);

	if (hexagonTrue) {
		hexagon(0, 0, CRYSTAL_SIZE / 2);
	} else {
		ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
	}
}

function shapesMaker(range, palette) {
	let numShapes = SIDES * (randomGetter(range) + 1);
	let shapesAngle = 360 / numShapes;

	let strokeColor = palette[randomGetter(palette.length)];
	let fillColor = palette[randomGetter(palette.length)];
	let shapeSelector = randomGetter(4);
	let shapeSize = CRYSTAL_SIZE / (3 + randomGetter(2));
	let shapePosition = randomGetter(CRYSTAL_SIZE / 6);
	let shapeModifier = randomGetter(2) - 1.5;
	let shapeModifier2 = randomGetter(2) - 1.5;
	// console.log("numShapes: ", numShapes);
	// console.log("shapesAngle: ", shapesAngle);
	// console.log("strokeColor: ", strokeColor);
	// console.log("fillColor: ", fillColor);
	// console.log("shapeSelector: ", shapeSelector);
	// console.log("shapeSize: ", shapeSize);
	// console.log("shapePosition: ", shapePosition);
	// console.log("shapeModifier: ", shapeModifier);

	push();
	for (let i = 0; i < numShapes; i++) {
		shapeGenerator(
			fillColor,
			fillColor,
			shapeSelector,
			shapeSize,
			shapePosition,
			shapeModifier,
			shapeModifier2
		);
		rotate(shapesAngle);
	}
	pop();
}

function randomGetter(range) {
	const rando = floor(random(range));
	return rando;
}
