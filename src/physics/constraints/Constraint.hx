package physics.constraints;
import physics.core.Particle;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class Constraint 
{

	public var p1 : Particle;
	public var p2 : Particle;

	public var remove : Bool;
	
	public var destroyCallback :  Constraint -> Void;
	
	public function new() 
	{
		
	}

	public function resolve() : Bool {
		return false;
	}
		
}