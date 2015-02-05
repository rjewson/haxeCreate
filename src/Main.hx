package ;

import creative.groups.Circle;
import engine.Engine;
import js.Browser;
import painter.CanvasRenderer.CanvasPainter;
import physics.constraints.Spring;
import physics.core.Particle;
import physics.core.ParticleGroup;
import physics.geometry.Vector2D;
import physics.modifiers.NormalForce;
import physics.ParticleEngine;
import renderer.LineRenderer;
import renderer.PointRenderer;

class Main 
{

	public static function main() {

        var engine = new Engine();

        var particleEngine = new ParticleEngine();
        particleEngine.painter = new CanvasPainter( cast Browser.document.getElementById("view") );
        engine.updateFunc = particleEngine.Update;

/*
        var particleGroup = new ParticleGroup();
        particleEngine.AddGroup(particleGroup);

        var c1 = new Particle();
        c1.isStatic = true;
        c1.SetStaticPosition(100,100);

        var p1 = new Particle();
        p1.SetStaticPosition(110,100);
        //p1.AddForce(new physics.geometry.Vector2D(21,-18));
        p1.AddModifier(new NormalForce(true,c1.position,1));

        var s1 = new Spring(c1,p1,1);

        particleGroup.AddParticle(c1,true);
        particleGroup.AddParticle(p1);
        particleGroup.AddConstraint(s1);

        //particleGroup.AddRenderer(new LineRenderer());
        particleGroup.AddRenderer(new PointRenderer());
*/

        var radius = 20;
        var sX = 50;
        var sY = 50;
        for (i in 0...10) {
            for (j in 0...10) {
                var circle = new Circle(new Vector2D((i*radius*2)+sX,(j*radius*2)+sY),radius);
                particleEngine.AddGroup(circle);
            }
        }
        // var circle = new Circle(new Vector2D(200,200),100);
        // particleEngine.AddGroup(circle);

        engine.start();

        Browser.document.getElementById("stopbutton").addEventListener("click",function(event){
            trace("stop");
            engine.stop();
        });
        Browser.document.getElementById("startbutton").addEventListener("click",function(event){
            trace("start");
            engine.start();
        });

    }	
    
}