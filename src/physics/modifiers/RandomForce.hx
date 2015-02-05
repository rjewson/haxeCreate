
package physics.modifiers;

import physics.core.Particle;
import physics.geometry.Vector2D;

class RandomForce implements IModifier
{

    public var forceMagnitude:Float;
    public var force:Vector2D;

    public function new(forceMagnitude:Float) {
        this.forceMagnitude = forceMagnitude;
        this.force = new Vector2D();
    }

    public function update(particle:Particle):Void {
        //force.x = (Math.random()-0.5) * forceMagnitude;
        force.y = (Math.random()-0.5) * forceMagnitude;
        particle.AddForce(force);
    }

}