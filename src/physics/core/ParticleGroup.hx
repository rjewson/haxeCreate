
package physics.core;

import painter.IPainter;
import physics.constraints.Constraint;
import physics.core.Particle;
import physics.geometry.Vector2D;
import physics.ParticleEngine;
import renderer.IRenderer;

class ParticleGroup 
{

    public var particles:Array<Particle>;
    public var controlParticles:Array<Particle>;
    public var renderers:Array<IRenderer>;
    public var engine:ParticleEngine;

    public function new() {
        particles = new Array<Particle>();
        controlParticles = new Array<Particle>();
        renderers = new Array<IRenderer>();
    }
    
    public function OnAddedToEngine():Void {
        
    }

    public function Update(painter:IPainter):Void {     
        for (renderer in renderers) {
            renderer.render(painter,this);
        }
    }

    public function AddParticle(p:Particle,control:Bool = false):Void {
        control ? controlParticles.push(p) : particles.push(p);
        engine.AddParticle(p);
    }

    public function AddConstraint(c:Constraint):Void {
        engine.AddConstraint(c);
    }

    public function AddRenderer(r:IRenderer):Void {
        renderers.push(r);
    }

}