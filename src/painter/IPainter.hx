
package painter;

interface IPainter 
{

    function Clear():Void;
    function Begin(stokeWidth:Float,colour:UInt):Void;
    function MoveTo(x:Float,y:Float):Void;
    function DrawLine(x1:Float,y1:Float,x2:Float,y2:Float):Void;
    function DrawCircle(x:Float,y:Float,radius:Float):Void;
    function DrawQuadraticCurve(cp1x:Float,cp1y:Float,x:Float,y:Float):Void;
    function End():Void;

    var width(default,default):Int;
    var height(default,default):Int;


}