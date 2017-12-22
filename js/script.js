// Defining constants

const WIDTH = 800;
const HEIGHT = 800;

const NUM_CIRCLES = 10;
const GRAVITY = new vec3(0, 2, 0);
const E = 0.8;

const MIN_RADIUS = 10;
const MAX_RADIUS = 50;

const MIN_VEL = 1;
const MAX_VEL = 0;

// Code

let canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;

let ctx = canvas.getContext("2d");

let circles = [];
for(let i = 0; i < NUM_CIRCLES; i++)
{
	let r = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
	let m = r * r * Math.PI;

	let x = Math.random() * (WIDTH - 2 * r) + r;
	let y = Math.random() * (HEIGHT - 2 * r) + r;

	let theta = Math.random() * 2 * Math.PI;
	let v = Math.random() * (MAX_VEL - MIN_VEL) + MIN_VEL;
	let vx = v * Math.cos(theta);
	let vy = v * Math.sin(theta);

	circles.push(new Circle(x, y, r, m, vx, vy));
}

function draw()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	for(let i = 0; i < circles.length; i++)
	{
		ctx.fillStyle = "#ffffff";
		circles[i].update();
		detectCollisions();
		circles[i].draw();
	}

	requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

function detectCollisions()
{
	for(let i = 0; i < circles.length - 1; i++)
	{
		for(let j = i + 1; j < circles.length; j++)	
		{
			let totalRadii = circles[i].r + circles[j].r;
			let distance = (circles[i].pos.subtract(circles[j].pos)).abs();

			if(distance < totalRadii)
			{
				// Collision
				collisionResponse(circles[i], circles[j]);
			}
		}
	}
}

function collisionResponse(circle0, circle1)
{
	// Finding useful numbers and vectors

	let scalar = circle0.r / (circle0.r + circle1.r);
	let directionVector = circle1.pos.subtract(circle0.pos);
	let collisionPoint = circle0.pos.add(directionVector.multiply(scalar));
	let unitVector = directionVector.multiply(1 / directionVector.abs());
	let theta = Math.atan(directionVector.y / directionVector.x);

	// Setting new positions of circles so that they do not intersect

	circle0.pos = collisionPoint.add(unitVector.multiply(-circle0.r));
	circle1.pos = collisionPoint.add(unitVector.multiply(circle1.r));

	// Calculating new velocities

	let rotationMatrix = getRotationR(theta);
	let u0 = rotationMatrix.multiply(circle0.vel);
	let u1 = rotationMatrix.multiply(circle1.vel);

	let vx1 = (circle0.m * u0.x + circle1.m * u1.x + circle0.m * E * (u1.x - u0.x)) / (circle0.m + circle1.m);
	let vx0 = E * (u0.x - u1.x) + vx1;

	let v0 = new vec3(vx0, u0.y, 0);
	let v1 = new vec3(vx1, u1.y, 0);

	rotationMatrix = getRotationR(-theta);

	circle0.vel = rotationMatrix.multiply(v0);
	circle1.vel = rotationMatrix.multiply(v1);
}