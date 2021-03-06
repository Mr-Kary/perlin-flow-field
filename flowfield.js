// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following

// MLK 12/7/21 Adapt the flowfield code from p5 to straight javascript


function FlowField(r) {
  // How large is each "cell" of the flow field
  this.resolution = r;
  // Determine the number of columns and rows based on sketch's width and height
  this.cols = canvas.width/this.resolution;
  this.rows = canvas.height/this.resolution;
  // A flow field is a two dimensional array of p5.Vectors
  // We can't make 2D arrays, but this is sort of faking it
  this.make2Darray = function(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
       array[i] = [];
    }
    return array;
  };
  this.field = this.make2Darray(this.cols);

  this.init = function() {
    // Reseed noise so we get a new flow field every time
    // Need to get noise working
    // noiseSeed(Math.floor(random(10000)));
    // noiseSeed(Math.floor(Math.random()*10000));
    noise.seed(Math.floor(Math.random()*10000));
    noise.seed(Math.random());
    var xoff = 0;
    for (var i = 0; i < this.cols; i++) {
      var yoff = 0;
      for (var j = 0; j < this.rows; j++) {
        // var theta = map(noise(xoff,yoff),0,1,0,TWO_PI);
        // var theta = noise(xoff,yoff) * Math.PI * 2;
        var theta = noise.perlin2(xoff,yoff) * Math.PI * 2;
        //var theta = map(sin(xoff)+cos(yoff),-2,2,0,TWO_PI);
        // Polar to cartesian coordinate transformation to get x and y components of the vector
        // this.field[i][j] = createVector(cos(theta),sin(theta));
        this.field[i][j] = new JSVector(Math.cos(theta),Math.sin(theta));
        yoff += 0.05;
      }
      xoff += 0.05;
    }
  };
  this.init();

  // Draw every vector
  this.display = function() {
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        drawVector(this.field[i][j],i*this.resolution,j*this.resolution,this.resolution-2);
      }
    }
  };

  // this.lookup = function(lookup) {
  //   var column = Math.floor(constrain(lookup.x/this.resolution,0,this.cols-1));
  //   var row = Math.floor(constrain(lookup.y/this.resolution,0,this.rows-1));
  //   //println(lookup.x);
  //   return this.field[column][row].copy();
  // };

  // Renders a vector object 'v' as an arrow and a location 'x,y'
  var drawVector = function(v, x, y, scayl) {
    // push();
    context.save();
    var arrowsize = 4;
    // Translate to location to render vector
    context.translate(x,y);
    // stroke(200,100);
    context.strokeStyle = "gray";
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    // rotate(v.heading());
    // context.rotate(v.heading());
    context.rotate(v.getDirection());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    var len = v.getMagnitude()*scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    // line(0,0,len,0);
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(len,0);
    context.stroke();
    //line(len,0,len-arrowsize,+arrowsize/2);
    //line(len,0,len-arrowsize,-arrowsize/2);
    // pop();
    context.restore();
  };
}
