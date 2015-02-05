package physics.core;

import physics.constraints.Constraint;
import physics.geometry.Vector2D;
import physics.modifiers.IModifier;

/**
 * ...
 * @author rje
 */

class Particle
{
	
	public var position:Vector2D;
	public var prevPosition : Vector2D; 
	public var tempPosition : Vector2D; 
	
	private var accumulatedForces : Vector2D;
	
	public var mass : Float;
	public var invMass : Float;
	public var damping : Float;
		
	public var constraints : Array<Constraint>;
	public var modifiers : Array<IModifier>;
		
	public var createdMS:Float;

	public var isStatic:Bool;
	
	public function new() 
	{
		position = new Vector2D();
		prevPosition = new Vector2D();
		tempPosition = new Vector2D();
		accumulatedForces = new Vector2D();
		modifiers = new Array<IModifier>();
		isStatic = false;
		damping = 0.999;
		SetMass(1);		
		Initalize();
	}
	
	public function Initalize():Void {
		
	}
	
	public function Update(dt:Float):Void {
		if (isStatic)
			return;

		for (modifier in modifiers)
			modifier.update(this);

		// tempPosition.copy(position);
		tempPosition.x = position.x;
		tempPosition.y = position.y;

		// var nv : Vector2D = velocity.plus(accumulatedForces.multEquals(deltaTime));
		var nvX : Float = ((position.x - prevPosition.x) + (accumulatedForces.x * dt)) * damping;
		var nvY : Float = ((position.y - prevPosition.y) + (accumulatedForces.y * dt)) * damping;

		// position.plusEquals(nv);
		position.x += nvX;
		position.y += nvY;

		// prevPosition.copy(tempPosition);
		prevPosition.x = tempPosition.x;
		prevPosition.y = tempPosition.y;		
	}
	
	inline public function GetVelocity() : Vector2D {
		return position.minus(prevPosition);
	}

	inline public function SetVelocity(value : Vector2D) : Void {
		prevPosition.x = position.x - value.x;
		prevPosition.y = position.y - value.y;
	}
	
	public function AddForce(force:Vector2D):Void {
		accumulatedForces.plusEquals(force.mult(invMass));
	}
	
	public function AddMasslessForce(force : Vector2D) : Void {
		accumulatedForces.plusEquals(force);
	}	
	
	
	public function SetMass(mass : Float) : Void {
		this.mass = mass;
		this.invMass = 1 / mass;
	}
	
	public function SetStaticPosition(x:Float, y:Float) : Void {
		position.x = prevPosition.x = x;
		position.y = prevPosition.y = y;
	}

	public function Skew(delta : Vector2D) : Void {
		position.plusEquals(delta);
		prevPosition.plusEquals(delta);
	}

	public function AddConstraint(constraint:Constraint):Void {
		constraints.push(constraint);
	}

	public function RemoveConstraint(constraint:Constraint):Void {
		constraints.remove(constraint);
	}
	
	public function AddModifier(m:IModifier):Void {
		modifiers.push(m);
	}
	
}