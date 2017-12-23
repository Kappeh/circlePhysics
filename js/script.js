// Defining constants

const WIDTH = 800;
const HEIGHT = 800;

const NUM_CIRCLES = 5;
const GRAVITY = new vec3(0, 2, 0);
const E = 0.8;

const MIN_RADIUS = 50;
const MAX_RADIUS = 50;

const MIN_VEL = 0;
const MAX_VEL = 10;

const DEBUG_LINES = false;

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
		circles[i].update();
	}

	detectCollisions();

	for(let i = 0; i < circles.length; i++)
	{
		circles[i].draw();
	}

	requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

function detectCollisions()
{
	let collision = false;

	for(let i = 0; i < circles.length - 1; i++)
	{
		for(let j = i + 1; j < circles.length; j++)	
		{
			let totalRadii = circles[i].r + circles[j].r;
			let distance = (circles[i].pos.subtract(circles[j].pos)).abs();

			if(distance < totalRadii)
			{
				// Collision
				collisionResponse(i, j);
				collision = true;
			}
		}
	}

	return collision;
}

function collisionResponse(index1, index2)
{
	// Finding useful numbers and vectors

	let scalar = circles[index1].r / (circles[index1].r + circles[index2].r);
	let directionVector = circles[index2].pos.subtract(circles[index1].pos);
	let collisionPoint = circles[index1].pos.add(directionVector.multiply(scalar));
	let unitVector = directionVector.multiply(1 / directionVector.abs());
	let theta = Math.atan(directionVector.y / directionVector.x);

	// Setting new positions of circles so that they do not intersect

	circles[index1].pos = collisionPoint.add(unitVector.multiply(-circles[index1].r));
	circles[index2].pos = collisionPoint.add(unitVector.multiply(circles[index2].r));

	// Calculating new velocities

	let rotationMatrix = getRotationR(theta);
	let u0 = rotationMatrix.multiply(circles[index1].vel);
	let u1 = rotationMatrix.multiply(circles[index2].vel);

	let vx1 = (circles[index1].m * u0.x + circles[index2].m * u1.x + circles[index1].m * E * (u1.x - u0.x)) / (circles[index1].m + circles[index2].m);
	let vx0 = E * (u0.x - u1.x) + vx1;

	let v0 = new vec3(vx1, u0.y, 0);
	let v1 = new vec3(vx0, u1.y, 0);

	rotationMatrix = getRotationR(-theta);

	circles[index1].vel = rotationMatrix.multiply(v0);
	circles[index2].vel = rotationMatrix.multiply(v1);
}