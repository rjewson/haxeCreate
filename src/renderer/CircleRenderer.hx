
package renderer;

import painter.IPainter;
import physics.core.ParticleGroup;

class CircleRenderer implements IRenderer
{

    public function new() {

    }   

    public function render(painter:IPainter, group:ParticleGroup):Void {

        painter.Begin(1,0);

        var pA = group.particles[0];
        var pB = group.particles[1];

        painter.MoveTo( (pA.position.x+pB.position.x)*0.5 ,  (pA.position.y+pB.position.y)*0.5 );

        var i = group.particles.length;
        while (i-->0) {
            pA = group.particles[i];
            pB = group.particles[ ( i + 1 ) % ( group.particles.length ) ];
            var rX = (Math.random()-0.5)*20;
            var rY = (Math.random()-0.5)*20;
            painter.DrawQuadraticCurve(pB.position.x,pB.position.y, (pA.position.x+pB.position.x)*0.5 ,  (pA.position.y+pB.position.y)*0.5 );
        }

        painter.End();
        
    } 

}