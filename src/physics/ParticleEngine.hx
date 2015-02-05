package physics;

import physics.constraints.Constraint;
import physics.core.Particle;
import physics.core.ParticleGroup;
import painter.IPainter;
import physics.geometry.Vector2D;
import renderer.IRenderer;

/**
 * ...
 * @author rje
 */

class ParticleEngine 
{
		
    public var particleGroups:Array<ParticleGroup>;

    public var particles:Array<Particle>;
    public var constraints:Array<Constraint>;
    // public var renderers:Array<IRenderer>;

    public var iterations:Int;

    public var position:Vector2D;

    public var painter:IPainter;

    public function new() {
        particleGroups = new Array<ParticleGroup>();
        particles = new Array<Particle>();
        constraints = new Array<Constraint>();
        // renderers = new Array<IRenderer>();

        iterations = 5;
        position = new Vector2D();
    }
    
    public function Update(dt:Float):Void {     

        painter.Clear();

        for (particle in particles) {
            particle.Update(dt);
        }

        for (i in 0...iterations) {
            for (constraint in constraints) {
                constraint.resolve();
            }
        }

        for (group in particleGroups) {
            // js.Lib.debug();
            group.Update(painter);
        }
    }

    public function AddParticle(p:Particle):Void {
        particles.push(p);
    }

    public function AddConstraint(c:Constraint):Void {
        constraints.push(c);
    }

    public function AddGroup(group:ParticleGroup) {
        group.engine = this;
        particleGroups.push(group);
        group.OnAddedToEngine();
    }

}