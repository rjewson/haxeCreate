
package renderer;

import physics.core.ParticleGroup;
import painter.IPainter;

interface IRenderer 
{

    function render(painter:IPainter, group:ParticleGroup):Void;

}