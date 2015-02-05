
package creative.groups;

import physics.constraints.Spring;
import physics.core.Particle;
import physics.core.ParticleGroup;
import physics.geometry.Vector2D;
import physics.modifiers.NormalForce;
import physics.modifiers.RandomForce;
import renderer.CircleRenderer;
import renderer.LineRenderer;
import renderer.PointRenderer;

class Circle extends ParticleGroup
{

    public var center:Vector2D;
    public var radius:Float;

    public function new(center:Vector2D,radius:Float) {
        super();
        this.center = center;
        this.radius = radius;
    }

    override public function OnAddedToEngine():Void {
        // js.Lib.debug();
        var centerParticle = new Particle();
        centerParticle.isStatic = true;
        centerParticle.SetStaticPosition(center.x,center.y);
        super.AddParticle(centerParticle,true);

        var p1 = new Particle();
        // p1.SetMass(0.5);
        p1.SetStaticPosition(center.x,center.y-radius);
        super.AddParticle(p1);

        var p2 = new Particle();
        // p1.SetMass(1.1);
        p2.SetStaticPosition(center.x+radius,center.y);
        super.AddParticle(p2);

        var p3 = new Particle();
        // p1.SetMass(0.5);
        p3.SetStaticPosition(center.x,center.y+radius);
        super.AddParticle(p3);

        var p4 = new Particle();
        // p1.SetMass(0.95);
        p4.SetStaticPosition(center.x-radius,center.y);
        super.AddParticle(p4);

        var stiffness:Float = 1;
        super.AddConstraint(new Spring(centerParticle,p1,stiffness));
        super.AddConstraint(new Spring(centerParticle,p2,stiffness));
        super.AddConstraint(new Spring(centerParticle,p3,stiffness));
        super.AddConstraint(new Spring(centerParticle,p4,stiffness));

        stiffness = 0.5;
        super.AddConstraint(new Spring(p1,p2,stiffness));
        super.AddConstraint(new Spring(p2,p3,stiffness));
        super.AddConstraint(new Spring(p3,p4,stiffness));
        super.AddConstraint(new Spring(p4,p1,stiffness));

        stiffness = 1;
        p1.AddModifier(new NormalForce(true,centerParticle.position,Math.random()*stiffness));
        p2.AddModifier(new NormalForce(true,centerParticle.position,Math.random()*stiffness));
        p3.AddModifier(new NormalForce(true,centerParticle.position,Math.random()*stiffness));
        p4.AddModifier(new NormalForce(true,centerParticle.position,Math.random()*stiffness));
        var rF = 2;
        p1.AddModifier(new RandomForce(rF));
        p2.AddModifier(new RandomForce(rF));
        p3.AddModifier(new RandomForce(rF));
        p4.AddModifier(new RandomForce(rF));

        super.AddRenderer(new LineRenderer());
        super.AddRenderer(new CircleRenderer());
    }

}