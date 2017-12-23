let vec3 = function(x = 0, y = 0, z = 1)
{
	this.x = x;
	this.y = y;
	this.z = z;
}
vec3.prototype.copy = function()
{
	let result = new vec3();

	result.x = this.x;
	result.y = this.y;
	result.z = this.z;

	return result;
}
vec3.prototype.add = function(other)
{
	if(!(other instanceof vec3))
	{
		return null;
	}

	let result = new vec3();

	result.x = this.x + other.x;
	result.y = this.y + other.y;
	result.z = this.z + other.z;

	return result;
}
vec3.prototype.subtract = function(other)
{
	if(!(other instanceof vec3))
	{
		return null;
	}

	let result = new vec3();

	result.x = this.x - other.x;
	result.y = this.y - other.y;
	result.z = this.z - other.z;

	return result;
}
vec3.prototype.multiply = function(other)
{
	if(typeof other === 'number')
	{
		return this.multiplyScalar(other);
	}
	return null;
}
vec3.prototype.multiplyScalar = function(other)
{
	let result = new vec3();

	result.x = other * this.x;
	result.y = other * this.y;
	result.z = other * this.z;

	return result;
}
vec3.prototype.abs = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}