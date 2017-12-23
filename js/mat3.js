let mat3 = function()
{
	this.values = [];
	for(let i = 0; i < 9; i++)
	{
		this.values.push(0);
	}
}
mat3.prototype.copy = function()
{
	let result = new mat3();

	for(let i = 0; i < 9 ; i++)
	{
		result.values[i] = this.values[i];
	}

	return result;
}
mat3.prototype.add = function(other)
{
	if(!(other instanceof mat3))
	{
		return null;
	}

	let result = new mat3();

	for(let i = 0; i < 9; i++)
	{
		result[i] = this.values[i] + other.values[i];
	}

	return result;
}
mat3.prototype.subtract = function(other)
{
	if(!(other instanceof mat3))
	{
		return null;
	}

	let result = new mat3();

	for(let i = 0; i < 9; i++)
	{
		result[i] = this.values[i] - other.values[i];
	}

	return result;
}
mat3.prototype.multiply = function(other)
{
	if(other instanceof mat3)
	{
		return this.multiplyMatrix(other);
	}
	if(other instanceof vec3)
	{
		return this.multiplyVector(other);
	}
	if(typeof other === 'number')
	{
		return this.multiplyScalar(other);
	}
}
mat3.prototype.multiplyVector = function(other)
{
	let result = new vec3(0, 0, 0);


	for(let i = 0; i < 3; i++)
	{
		for(let j = 0; j < 3; j++)
		{
			let temp;

			if(j == 0)
				temp = other.x;
			if(j == 1)
				temp = other.y;
			if(j == 2)
				temp = other.z;

			if(i == 0)
				result.x += this.values[i + 3 * j] * temp;
			if(i == 1)
				result.y += this.values[i + 3 * j] * temp;
			if(i == 2)
				result.z += this.values[i + 3 * j] * temp;
		}	
	}

	return result;
}
mat3.prototype.multiplyMatrix = function(other)
{
	let result = new mat3();

	for(let i = 0; i < 3; i++)
	{
		for(let j = 0; j < 3; j++)
		{
			for(let k = 0; k < 3; k++)
			{
				result.values[i + 3 * j] += this.values[i + 3 * k] * other.values[k + 3 * j];
			}
		}
	}

	return result;
}
mat3.prototype.multiplyScalar = function(other)
{
	let result = this.copy();

	for(let i = 0; i < 9; i++)
	{
		result.values[i] *= other;
	}

	return result;
}

function getIdentity()
{
	let result = new mat3();

	for(let i = 0; i < 9; i += 4)
	{
		result.values[i] = 1;
	}

	return result;
}
function getTranslation(x, y)
{
	let result = getIdentity();

	result.values[6] = x;
	result.values[7] = y;

	return result;
}
function getScale(x, y)
{
	let result = new mat3();

	result.values[0] = x;
	result.values[4] = y;
	result.values[8] = 1;

	return result;
}
function getRotationR(theta)
{
	let result = new mat3();

	result.values[0] = Math.cos(theta);
	result.values[1] = -Math.sin(theta);
	result.values[3] = Math.sin(theta);
	result.values[4] = Math.cos(theta);
	result.values[8] = 1;

	return result;
}
function getRotationD(theta)
{
	let result = new mat3();
	let phi = theta * Math.PI / 180;

	result.values[0] = Math.cos(phi);
	result.values[1] = -Math.sin(phi);
	result.values[3] = Math.sin(phi);
	result.values[4] = Math.cos(phi);
	result.values[8] = 1;

	return result;
}