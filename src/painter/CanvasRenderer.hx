
package painter;

import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;

class CanvasPainter implements IPainter
{

    public var canvas:CanvasElement;
    public var context:CanvasRenderingContext2D;
    public var width:Int;
    public var height:Int;

    public function new(canvas:CanvasElement) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = this.canvas.getContext2d();
    }

    public function Clear():Void {
        context.clearRect(0,0,width,height);        
         // context.fillStyle = 'rgba(255,0,0,0.1)';
         // context.fillRect(0, 0, canvas.width, canvas.height);

        // context.globalCompositeOperation = 'source-in';
        // context.fillStyle = 'rgba(128,128,128,0.85)';
        // context.fillRect(0, 0, canvas.width, canvas.height);

        // var lastImage = context.getImageData(0,0,width,height);
        // var pixelData = lastImage.data;
        // var i = 3;
        // while (i<pixelData.length) {
        //     pixelData[i] -= 1;
        //     i+=4;
        // }
        // context.putImageData(lastImage,0,0);
        // context.globalCompositeOperation = 'lighter';
    }

    public function Begin(stokeWidth:Float,colour:UInt):Void {
        context.save();
        context.beginPath();
        context.lineWidth = stokeWidth;
        context.strokeStyle="rgba(0,0,0,1)";
    }

    public function MoveTo(x:Float,y:Float):Void {
        context.moveTo(x,y);
    }

    public function DrawLine(x1:Float,y1:Float,x2:Float,y2:Float):Void {
        // js.Lib.debug();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
    }

    public function DrawCircle(x:Float,y:Float,radius:Float):Void {
    }

    public function DrawQuadraticCurve(cp1x:Float,cp1y:Float,x:Float,y:Float):Void {
        context.quadraticCurveTo(cp1x,cp1y,x,y);
    }


    public function End():Void {
        context.stroke();
        context.closePath();
        context.restore();
    }

}