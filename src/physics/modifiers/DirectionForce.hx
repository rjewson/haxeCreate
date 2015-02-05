
package physics.modifiers;

import physics.core.Particle;
import physics.geometry.Vector2D;

class DirectionForce implements IModifier
{

    public var clockwise:Bool;
    public var reference:Vector2D;
    public var forceMagnitude:Float;

    public function new(clockwise:Bool,reference:Vector2D,forceMagnitude:Float) {
        this.clockwise = clockwise;
        this.reference = reference;
        this.forceMagnitude = forceMagnitude;
    }

    public function update(particle:Particle):Void {
        var f = reference.minus(particle.position).unit().mult(forceMagnitude);
        particle.AddForce(f);
    }


}