(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var Main = function() { };
Main.main = function() {
	var engine1 = new engine.Engine();
	var particleEngine = new physics.ParticleEngine();
	particleEngine.painter = new painter.CanvasPainter(window.document.getElementById("view"));
	engine1.updateFunc = $bind(particleEngine,particleEngine.Update);
	var radius = 20;
	var sX = 50;
	var sY = 50;
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < 10) {
			var j = _g1++;
			var circle = new creative.groups.Circle(new physics.geometry.Vector2D(i * radius * 2 + sX,j * radius * 2 + sY),radius);
			particleEngine.AddGroup(circle);
		}
	}
	engine1.start();
	window.document.getElementById("stopbutton").addEventListener("click",function(event) {
		console.log("stop");
		engine1.stop();
	});
	window.document.getElementById("startbutton").addEventListener("click",function(event1) {
		console.log("start");
		engine1.start();
	});
};
var Std = function() { };
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var physics = {};
physics.core = {};
physics.core.ParticleGroup = function() {
	this.particles = new Array();
	this.controlParticles = new Array();
	this.renderers = new Array();
};
physics.core.ParticleGroup.prototype = {
	OnAddedToEngine: function() {
	}
	,Update: function(painter) {
		var _g = 0;
		var _g1 = this.renderers;
		while(_g < _g1.length) {
			var renderer = _g1[_g];
			++_g;
			renderer.render(painter,this);
		}
	}
	,AddParticle: function(p,control) {
		if(control == null) control = false;
		if(control) this.controlParticles.push(p); else this.particles.push(p);
		this.engine.AddParticle(p);
	}
	,AddConstraint: function(c) {
		this.engine.AddConstraint(c);
	}
	,AddRenderer: function(r) {
		this.renderers.push(r);
	}
};
var creative = {};
creative.groups = {};
creative.groups.Circle = function(center,radius) {
	physics.core.ParticleGroup.call(this);
	this.center = center;
	this.radius = radius;
};
creative.groups.Circle.__super__ = physics.core.ParticleGroup;
creative.groups.Circle.prototype = $extend(physics.core.ParticleGroup.prototype,{
	OnAddedToEngine: function() {
		var centerParticle = new physics.core.Particle();
		centerParticle.isStatic = true;
		centerParticle.SetStaticPosition(this.center.x,this.center.y);
		physics.core.ParticleGroup.prototype.AddParticle.call(this,centerParticle,true);
		var p1 = new physics.core.Particle();
		p1.SetStaticPosition(this.center.x,this.center.y - this.radius);
		physics.core.ParticleGroup.prototype.AddParticle.call(this,p1);
		var p2 = new physics.core.Particle();
		p2.SetStaticPosition(this.center.x + this.radius,this.center.y);
		physics.core.ParticleGroup.prototype.AddParticle.call(this,p2);
		var p3 = new physics.core.Particle();
		p3.SetStaticPosition(this.center.x,this.center.y + this.radius);
		physics.core.ParticleGroup.prototype.AddParticle.call(this,p3);
		var p4 = new physics.core.Particle();
		p4.SetStaticPosition(this.center.x - this.radius,this.center.y);
		physics.core.ParticleGroup.prototype.AddParticle.call(this,p4);
		var stiffness = 1;
		physics.core.ParticleGroup.prototype.AddConstraint.call(this,new physics.constraints.Spring(centerParticle,p1,stiffness));
		physics.core.ParticleGroup.prototype.AddConstraint.call(this,new physics.constraints.Spring(centerParticle,p2,stiffness));
		physics.core.ParticleGroup.prototype.AddConstraint.call(this,new physics.constraints.Spring(centerParticle,p3,stiffness));
		physics.core.ParticleGroup.prototype.AddConstraint.call(this,new physics.constraints.Spring(centerParticle,p4,stiffness));
		stiffness = 0.5;
		physics.core.ParticleGroup.prototype.AddConstraint.call(this,new physics.constraints.Spring(p1,p2,stiffness));
		physics.core.ParticleGroup.prototype.AddConstraint.call(this,new physics.constraints.Spring(p2,p3,stiffness));
		physics.core.ParticleGroup.prototype.AddConstraint.call(this,new physics.constraints.Spring(p3,p4,stiffness));
		physics.core.ParticleGroup.prototype.AddConstraint.call(this,new physics.constraints.Spring(p4,p1,stiffness));
		stiffness = 1;
		p1.AddModifier(new physics.modifiers.NormalForce(true,centerParticle.position,Math.random() * stiffness));
		p2.AddModifier(new physics.modifiers.NormalForce(true,centerParticle.position,Math.random() * stiffness));
		p3.AddModifier(new physics.modifiers.NormalForce(true,centerParticle.position,Math.random() * stiffness));
		p4.AddModifier(new physics.modifiers.NormalForce(true,centerParticle.position,Math.random() * stiffness));
		var rF = 2;
		p1.AddModifier(new physics.modifiers.RandomForce(rF));
		p2.AddModifier(new physics.modifiers.RandomForce(rF));
		p3.AddModifier(new physics.modifiers.RandomForce(rF));
		p4.AddModifier(new physics.modifiers.RandomForce(rF));
		physics.core.ParticleGroup.prototype.AddRenderer.call(this,new renderer.LineRenderer());
		physics.core.ParticleGroup.prototype.AddRenderer.call(this,new renderer.CircleRenderer());
	}
});
var engine = {};
engine.Engine = function() {
	this.isRunning = false;
};
engine.Engine.prototype = {
	update: function(timestamp) {
		this.delta = timestamp - this.prevAnimationTime;
		this.prevAnimationTime = timestamp;
		if(this.updateFunc != null) this.updateFunc(1 / this.delta);
		this.rafID = window.requestAnimationFrame($bind(this,this.update));
		return false;
	}
	,start: function() {
		if(this.isRunning == true) return;
		this.isRunning = true;
		this.prevAnimationTime = this.animationStartTimestamp = window.performance.now();
		this.rafID = window.requestAnimationFrame($bind(this,this.update));
	}
	,stop: function() {
		if(this.isRunning == false) return;
		this.isRunning = false;
		window.cancelAnimationFrame(this.rafID);
	}
};
var painter = {};
painter.IPainter = function() { };
painter.CanvasPainter = function(canvas) {
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.context = this.canvas.getContext("2d");
};
painter.CanvasPainter.__interfaces__ = [painter.IPainter];
painter.CanvasPainter.prototype = {
	Clear: function() {
		this.context.clearRect(0,0,this.width,this.height);
	}
	,Begin: function(stokeWidth,colour) {
		this.context.save();
		this.context.beginPath();
		this.context.lineWidth = stokeWidth;
		this.context.strokeStyle = "rgba(0,0,0,1)";
	}
	,MoveTo: function(x,y) {
		this.context.moveTo(x,y);
	}
	,DrawLine: function(x1,y1,x2,y2) {
		this.context.moveTo(x1,y1);
		this.context.lineTo(x2,y2);
	}
	,DrawCircle: function(x,y,radius) {
	}
	,DrawQuadraticCurve: function(cp1x,cp1y,x,y) {
		this.context.quadraticCurveTo(cp1x,cp1y,x,y);
	}
	,End: function() {
		this.context.stroke();
		this.context.closePath();
		this.context.restore();
	}
};
physics.ParticleEngine = function() {
	this.particleGroups = new Array();
	this.particles = new Array();
	this.constraints = new Array();
	this.iterations = 5;
	this.position = new physics.geometry.Vector2D();
};
physics.ParticleEngine.prototype = {
	Update: function(dt) {
		this.painter.Clear();
		var _g = 0;
		var _g1 = this.particles;
		while(_g < _g1.length) {
			var particle = _g1[_g];
			++_g;
			particle.Update(dt);
		}
		var _g11 = 0;
		var _g2 = this.iterations;
		while(_g11 < _g2) {
			var i = _g11++;
			var _g21 = 0;
			var _g3 = this.constraints;
			while(_g21 < _g3.length) {
				var constraint = _g3[_g21];
				++_g21;
				constraint.resolve();
			}
		}
		var _g4 = 0;
		var _g12 = this.particleGroups;
		while(_g4 < _g12.length) {
			var group = _g12[_g4];
			++_g4;
			group.Update(this.painter);
		}
	}
	,AddParticle: function(p) {
		this.particles.push(p);
	}
	,AddConstraint: function(c) {
		this.constraints.push(c);
	}
	,AddGroup: function(group) {
		group.engine = this;
		this.particleGroups.push(group);
		group.OnAddedToEngine();
	}
};
physics.constraints = {};
physics.constraints.Constraint = function() {
};
physics.constraints.Constraint.prototype = {
	resolve: function() {
		return false;
	}
};
physics.constraints.Spring = function(p1,p2,stiffness,breakDelta) {
	if(breakDelta == null) breakDelta = 0.1;
	if(stiffness == null) stiffness = 0.5;
	physics.constraints.Constraint.call(this);
	this.p1 = p1;
	this.p2 = p2;
	this.breakDelta = breakDelta;
	this.stiffness = stiffness;
	this.restLength = this.length();
};
physics.constraints.Spring.__super__ = physics.constraints.Constraint;
physics.constraints.Spring.prototype = $extend(physics.constraints.Constraint.prototype,{
	resolve: function() {
		var dX = this.p1.position.x - this.p2.position.x;
		var dY = this.p1.position.y - this.p2.position.y;
		var deltaLength = Math.sqrt(dX * dX + dY * dY) + 0.00001;
		var diff = (deltaLength - this.restLength) / (deltaLength * (this.p1.invMass + this.p2.invMass));
		var factor = diff * this.stiffness;
		dX *= factor;
		dY *= factor;
		if(!this.p1.isStatic) {
			this.p1.position.x -= dX * this.p1.invMass;
			this.p1.position.y -= dY * this.p1.invMass;
		}
		if(!this.p2.isStatic) {
			this.p2.position.x += dX * this.p2.invMass;
			this.p2.position.y += dY * this.p2.invMass;
		}
		return true;
	}
	,length: function() {
		return this.p1.position.distance(this.p2.position);
	}
	,SetLength: function(len) {
		this.restLength = len;
	}
});
physics.core.Particle = function() {
	this.position = new physics.geometry.Vector2D();
	this.prevPosition = new physics.geometry.Vector2D();
	this.tempPosition = new physics.geometry.Vector2D();
	this.accumulatedForces = new physics.geometry.Vector2D();
	this.modifiers = new Array();
	this.isStatic = false;
	this.damping = 0.999;
	this.SetMass(1);
	this.Initalize();
};
physics.core.Particle.prototype = {
	Initalize: function() {
	}
	,Update: function(dt) {
		if(this.isStatic) return;
		var _g = 0;
		var _g1 = this.modifiers;
		while(_g < _g1.length) {
			var modifier = _g1[_g];
			++_g;
			modifier.update(this);
		}
		this.tempPosition.x = this.position.x;
		this.tempPosition.y = this.position.y;
		var nvX = (this.position.x - this.prevPosition.x + this.accumulatedForces.x * dt) * this.damping;
		var nvY = (this.position.y - this.prevPosition.y + this.accumulatedForces.y * dt) * this.damping;
		this.position.x += nvX;
		this.position.y += nvY;
		this.prevPosition.x = this.tempPosition.x;
		this.prevPosition.y = this.tempPosition.y;
	}
	,GetVelocity: function() {
		return this.position.minus(this.prevPosition);
	}
	,SetVelocity: function(value) {
		this.prevPosition.x = this.position.x - value.x;
		this.prevPosition.y = this.position.y - value.y;
	}
	,AddForce: function(force) {
		this.accumulatedForces.plusEquals(force.mult(this.invMass));
	}
	,AddMasslessForce: function(force) {
		this.accumulatedForces.plusEquals(force);
	}
	,SetMass: function(mass) {
		this.mass = mass;
		this.invMass = 1 / mass;
	}
	,SetStaticPosition: function(x,y) {
		this.position.x = this.prevPosition.x = x;
		this.position.y = this.prevPosition.y = y;
	}
	,Skew: function(delta) {
		this.position.plusEquals(delta);
		this.prevPosition.plusEquals(delta);
	}
	,AddConstraint: function(constraint) {
		this.constraints.push(constraint);
	}
	,RemoveConstraint: function(constraint) {
		HxOverrides.remove(this.constraints,constraint);
	}
	,AddModifier: function(m) {
		this.modifiers.push(m);
	}
};
physics.geometry = {};
physics.geometry.Vector2D = function(x,y) {
	if(y == null) y = .0;
	if(x == null) x = .0;
	this.x = x;
	this.y = y;
};
physics.geometry.Vector2D.fromString = function(str) {
	if(str == null) return null;
	var vectorParts = str.split(":");
	if(vectorParts == null || vectorParts.length != 2) return null;
	var xVal = Std.parseFloat(vectorParts[0]);
	var yVal = Std.parseFloat(vectorParts[1]);
	if(Math.isNaN(xVal) || Math.isNaN(yVal)) return null;
	return new physics.geometry.Vector2D(xVal,yVal);
};
physics.geometry.Vector2D.prototype = {
	setTo: function(x,y) {
		this.x = x;
		this.y = y;
		return this;
	}
	,copy: function(v) {
		this.x = v.x;
		this.y = v.y;
	}
	,dot: function(v) {
		return this.x * v.x + this.y * v.y;
	}
	,cross: function(v) {
		return this.x * v.y - this.y * v.x;
	}
	,plus: function(v) {
		return new physics.geometry.Vector2D(this.x + v.x,this.y + v.y);
	}
	,plus2: function(x,y) {
		return new physics.geometry.Vector2D(this.x + x,this.y + y);
	}
	,plusEquals: function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	,plusEquals2: function(x,y) {
		this.x += x;
		this.y += y;
		return this;
	}
	,minus: function(v) {
		return new physics.geometry.Vector2D(this.x - v.x,this.y - v.y);
	}
	,minus2: function(x,y) {
		return new physics.geometry.Vector2D(this.x - x,this.y - y);
	}
	,minusEquals: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	,minusEquals2: function(x,y) {
		this.x -= x;
		this.y -= y;
		return this;
	}
	,mult: function(s) {
		return new physics.geometry.Vector2D(this.x * s,this.y * s);
	}
	,multEquals: function(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}
	,times: function(v) {
		return new physics.geometry.Vector2D(this.x * v.x,this.y * v.y);
	}
	,times2: function(x,y) {
		return new physics.geometry.Vector2D(this.x * x,this.y * y);
	}
	,timesEquals: function(v) {
		this.x *= v.x;
		this.y *= v.y;
		return this;
	}
	,timesEquals2: function(x,y) {
		this.x *= x;
		this.y *= y;
		return this;
	}
	,div: function(s) {
		if(s == 0) s = 0.0001;
		return new physics.geometry.Vector2D(this.x / s,this.y / s);
	}
	,divEquals: function(s) {
		if(s == 0) s = 0.0001;
		this.x /= s;
		this.y /= s;
		return this;
	}
	,length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,lengthSqr: function() {
		return this.x * this.x + this.y * this.y;
	}
	,unit: function() {
		var t = Math.sqrt(this.x * this.x + this.y * this.y) + 1e-08;
		return new physics.geometry.Vector2D(this.x / t,this.y / t);
	}
	,unitEquals: function() {
		var t = Math.sqrt(this.x * this.x + this.y * this.y) + 1e-08;
		this.x /= t;
		this.y /= t;
		return this;
	}
	,leftHandNormal: function() {
		return new physics.geometry.Vector2D(this.y,-this.x);
	}
	,leftHandNormalEquals: function() {
		var t = this.x;
		this.x = this.y;
		this.y = -t;
		return this;
	}
	,rightHandNormal: function() {
		return new physics.geometry.Vector2D(-this.y,this.x);
	}
	,rightHandNormalEquals: function() {
		var t = this.x;
		this.x = -this.y;
		this.y = this.x;
		return this;
	}
	,distance: function(v) {
		var delta = new physics.geometry.Vector2D(v.x - this.x,v.y - this.y);
		return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
	}
	,distanceSqrd: function(v) {
		var dX = this.x - v.x;
		var dY = this.y - v.y;
		return dX * dX + dY * dY;
	}
	,clampMax: function(max) {
		var l = Math.sqrt(this.x * this.x + this.y * this.y);
		if(l > max) this.multEquals(max / l);
		return this;
	}
	,interpolate: function(v,t) {
		return this.mult(1 - t).plus(new physics.geometry.Vector2D(v.x * t,v.y * t));
	}
	,rotate: function(angle) {
		var a = angle * Math.PI / 180;
		var cos = Math.cos(a);
		var sin = Math.sin(a);
		return new physics.geometry.Vector2D(cos * this.x - sin * this.y,cos * this.y + sin * this.x);
	}
	,rotateEquals: function(angle) {
		var a = angle * Math.PI / 180;
		var cos = Math.cos(a);
		var sin = Math.sin(a);
		var rx = cos * this.x - sin * this.y;
		var ry = cos * this.y + sin * this.x;
		this.x = rx;
		this.y = ry;
		return this;
	}
	,isEquals: function(v) {
		return this.x == v.x && this.y == v.y;
	}
	,equalsZero: function() {
		return this.x == 0 && this.y == 0;
	}
	,clone: function() {
		return new physics.geometry.Vector2D(this.x,this.y);
	}
	,toString: function() {
		return this.x + ":" + this.y;
	}
};
physics.modifiers = {};
physics.modifiers.IModifier = function() { };
physics.modifiers.NormalForce = function(clockwise,reference,forceMagnitude) {
	this.clockwise = clockwise;
	this.reference = reference;
	this.forceMagnitude = forceMagnitude;
};
physics.modifiers.NormalForce.__interfaces__ = [physics.modifiers.IModifier];
physics.modifiers.NormalForce.prototype = {
	update: function(particle) {
		var f = this.reference.minus(particle.position).unit().rightHandNormal().mult(this.forceMagnitude);
		particle.AddForce(f);
	}
};
physics.modifiers.RandomForce = function(forceMagnitude) {
	this.forceMagnitude = forceMagnitude;
	this.force = new physics.geometry.Vector2D();
};
physics.modifiers.RandomForce.__interfaces__ = [physics.modifiers.IModifier];
physics.modifiers.RandomForce.prototype = {
	update: function(particle) {
		this.force.y = (Math.random() - 0.5) * this.forceMagnitude;
		particle.AddForce(this.force);
	}
};
var renderer = {};
renderer.IRenderer = function() { };
renderer.CircleRenderer = function() {
};
renderer.CircleRenderer.__interfaces__ = [renderer.IRenderer];
renderer.CircleRenderer.prototype = {
	render: function(painter,group) {
		painter.Begin(1,0);
		var pA = group.particles[0];
		var pB = group.particles[1];
		painter.MoveTo((pA.position.x + pB.position.x) * 0.5,(pA.position.y + pB.position.y) * 0.5);
		var i = group.particles.length;
		while(i-- > 0) {
			pA = group.particles[i];
			pB = group.particles[(i + 1) % group.particles.length];
			var rX = (Math.random() - 0.5) * 20;
			var rY = (Math.random() - 0.5) * 20;
			painter.DrawQuadraticCurve(pB.position.x,pB.position.y,(pA.position.x + pB.position.x) * 0.5,(pA.position.y + pB.position.y) * 0.5);
		}
		painter.End();
	}
};
renderer.LineRenderer = function() {
};
renderer.LineRenderer.__interfaces__ = [renderer.IRenderer];
renderer.LineRenderer.prototype = {
	render: function(painter,group) {
		painter.Begin(1,0);
		var _g = 0;
		var _g1 = group.particles;
		while(_g < _g1.length) {
			var particle = _g1[_g];
			++_g;
			painter.DrawLine(particle.prevPosition.x,particle.prevPosition.y,particle.position.x,particle.position.y);
		}
		painter.End();
	}
};
renderer.PointRenderer = function() {
};
renderer.PointRenderer.__interfaces__ = [renderer.IRenderer];
renderer.PointRenderer.prototype = {
	render: function(painter,group) {
		painter.Begin(1,0);
		var _g = 0;
		var _g1 = group.particles;
		while(_g < _g1.length) {
			var particle = _g1[_g];
			++_g;
			painter.DrawLine(particle.position.x,particle.position.y,particle.position.x + 1,particle.position.y + 1);
		}
		painter.End();
	}
};
var utils = {};
utils.Maths = function() { };
utils.Maths.toRad = function(deg) {
	return deg * 0.0174532925199432955;
};
utils.Maths.toDeg = function(rad) {
	return rad * 57.2957795130823229;
};
utils.Maths.Clamp = function(input,min,max) {
	if(input > max) return max; else if(input < min) return min; else return input;
};
utils.Maths.ScaleRectangleWithRatio = function(containerRect,itemRect) {
	var sX = containerRect.x / itemRect.x;
	var sY = containerRect.y / itemRect.y;
	var rD = containerRect.x / containerRect.y;
	var rR = itemRect.x / itemRect.y;
	if(rD < rR) return sX; else return sY;
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
utils.Maths.ZERO_TOLERANCE = 1e-08;
utils.Maths.RAD_DEG = 57.2957795130823229;
utils.Maths.DEG_RAD = 0.0174532925199432955;
utils.Maths.LN2 = 0.6931471805599453;
utils.Maths.LN10 = 2.302585092994046;
utils.Maths.PIHALF = 1.5707963267948966;
utils.Maths.PI = 3.141592653589793;
utils.Maths.PI2 = 6.283185307179586;
utils.Maths.EPS = 1e-6;
utils.Maths.SQRT2 = 1.414213562373095;
Main.main();
})();

//# sourceMappingURL=script.js.map