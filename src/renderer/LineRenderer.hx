
package renderer;

import painter.IPainter;
import physics.core.ParticleGroup;

class LineRenderer implements IRenderer
{

    public function new() {

    }

    public function render(painter:IPainter, group:ParticleGroup):Void {

        painter.Begin(1,0);
        for (particle in group.particles) {
            painter.DrawLine(particle.prevPosition.x,particle.prevPosition.y,particle.position.x,particle.position.y);
        }
        painter.End();
        
    }

}