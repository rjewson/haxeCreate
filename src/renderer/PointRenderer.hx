
package renderer;

import painter.IPainter;
import physics.core.ParticleGroup;

class PointRenderer implements IRenderer
{

    public function new() {

    }

    public function render(painter:IPainter, group:ParticleGroup):Void {

        painter.Begin(1,0);
        for (particle in group.particles) {
            // trace(x+particle.position.x,y+particle.position.y);
            painter.DrawLine(particle.position.x,particle.position.y,particle.position.x+1,particle.position.y+1);

        }
        painter.End();
        
    }

}