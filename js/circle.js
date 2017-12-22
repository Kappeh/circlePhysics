let Circle = function(xpos, ypos, radius, mass, velx = 0, vely = 0)
{
	this.pos = new vec3(xpos, ypos, 1);
	this.vel = new vec3(velx, vely, 0);

	this.r = radius;
	this.m = mass;
}
Circle.prototype.update = function()
{
	this.vel = this.vel.add(GRAVITY);
	this.pos = this.pos.add(this.vel);

	// Collision detection and rection

	//Bound detection and reaction

	if(this.pos.x < 0 + this.r)
	{
		this.pos.x = 0 + this.r;
		this.vel.x *= -E;
	}
	if(this.pos.y < 0 + this.r)
	{
		this.pos.y = 0 + this.r;
		this.vel.y *= -E;
	}
	if(this.pos.x > WIDTH - this.r)
	{
		this.pos.x = WIDTH - this.r;
		this.vel.x *= -E;
	}
	if(this.pos.y > HEIGHT - this.r)
	{
		this.pos.y = HEIGHT - this.r;
		this.vel.y *= -E;
	}
}
Circle.prototype.draw = function()
{
	ctx.beginPath();
	ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
	ctx.fill();
}