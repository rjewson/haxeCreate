package physics.constraints;
import physics.core.Particle;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class Spring extends Constraint
{

	public var stiffness : Float;
	var restLength : Float;
	var breakDelta : Float;
	
	public function new(p1 : Particle, p2 : Particle, stiffness : Float = 0.5, breakDelta : Float = 0.1) 
	{
		super();
		this.p1 = p1;
		this.p2 = p2;
		this.breakDelta = breakDelta;
		this.stiffness = stiffness;
		restLength = length();		
	}

	override public function resolve() : Bool {
		// if ((!p1 || !p1.active || !p1 || !p1.active) ) return false;
//js.Lib.debug();

		// var deltaLength : Float = length + 0.00001;
		//trace(p1.position + "-" + offset1);
		var dX : Float = (p1.position.x) - (p2.position.x);
		var dY : Float = (p1.position.y) - (p2.position.y);
		var deltaLength : Float = Math.sqrt(dX * dX + dY * dY) + 0.00001;
		
		// if (deltaLength-restLength >= breakDelta) {
		// 	trace(offset1);
		// 	trace("Break "+deltaLength+" "+breakDelta);
		// 	remove = true;
		// 	return false;
		// }

		var diff : Float = (deltaLength - restLength) / (deltaLength * (p1.invMass + p2.invMass));
		// var delta : Vector2D = p1.pos.minus(p2.pos);
		// var dmds : Vector2D = delta.mult(diff * stiffness);
		var factor : Float = diff * stiffness;
		// dX,dY is now dmds
		dX *= factor;
		dY *= factor;

		// if (!p1.fixed) p1.pos.minusEquals(dmds.mult(p1.invMass));
		if (!p1.isStatic) {
			p1.position.x -= dX * p1.invMass;
			p1.position.y -= dY * p1.invMass;
		}
		// if (!p2.fixed) p2.pos.plusEquals(dmds.mult(p2.invMass));
		if (!p2.isStatic) {
			p2.position.x += dX * p2.invMass;
			p2.position.y += dY * p2.invMass;
		}
		return true;
	}

	public function length() : Float {
		// return p1.position.plus(offset1).distance(p1.position.plus(offset2));
		return p1.position.distance(p2.position);
	}

	public function SetLength(len : Float) : Void {
		restLength = len;
	}
	
}