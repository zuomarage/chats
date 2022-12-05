var note;
var a
var f
var t
var X
var Y
var X2
var Y2
let angle=0
function setup(){
	createCanvas(1920,1080, WEBGL);
	
	note = new p5.Oscillator();
	X = 50
	Y = 20
	X2 = 400
	Y2 = 200
	X3 = 700
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function draw() {
	background(20, 10, 120);

	push()
  normalMaterial()
  rotateX(angle)
  cone(70,90,5)
  
  pop()
  
  push()
  normalMaterial()
  rotateX(angle)
  rotateY(angle)
  rotateZ(angle)
  torus(120,30,5)
  pop()
  angle+=0.03

	
	
	//show the played notes
if (key == 'w'){
	 rotateX(2);
  torus(120,30,5);
      normalMaterial();
}
	if (key == 'x'){
	 rotateX(22);
  torus(120,30,225);
          normalMaterial();
}
	if (key == 'c'){
	 rotateX(112);
  torus(1120,30,5);
      normalMaterial();
	
}
	if (key == 'v'){
	 rotateY(2);
  torus(120,320,5);
          normalMaterial();
}
	if (key == 'b'){
	 rotateZ(112);
  torus(1120,30,5);
          normalMaterial();
}
	if (key == 'n'){
	 rotateX(1212);
  torus(1120,3220,5);
          normalMaterial();
}
	if (key == ','){
 rotateZ(2);
  torus(20,0,52);
          normalMaterial();
}
	if (key == ';'){
 rotateX(112);
      rotateY(566);
  torus(10,30,5);
          normalMaterial();
}
	
	
	
	//show the current note type
		if (key == 'a'){
	 rotateX(112);
  torus(1120,30,5);
              normalMaterial();
}
		if (key == 'z'){
 rotateX(12);
  torus(11,30,5);
              normalMaterial();
}
		if (key == 'e'){
 rotateZ(112);
  torus(120,30,5);
              normalMaterial();
}
		if (key == 'r'){
	 rotateX(112);
          rotateY(567);
  torus(1120,2230,5);
              normalMaterial();
}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function keyTyped() {
		if(keyIsPressed === true){
	note.start();
		}	 
	
	note.freq(f);
	note.setType(t);
	note.amp(a);
	
 
	if (key == 'w'){	//define the Do key
	f = 262
} 		
	if (key == 'x'){	//define the Re key
	f = 294
}		
	if (key =='c'){	//define the Mi key
	f = 329
} 	
	if (key == 'v'){	//define the Fa key
	f = 349
} 
	if (key =='b'){	//define the Sol key
	f = 392
} 
	if (key == 'n'){	//define the La key
	f = 440
} 
	if (key == ','){	//define the Si key
	f = 493
} 
	if (key == ';'){	//define the Do+ key
	f = 523
}
	
	
	
	
	
	if (key == 'a'){	// set the note type to sine
	t = 'sine'
	a = 0.4
}	
	if (key == 'z'){	// set the note type to square
	t = 'square'
	a = 0.05
}	
	if (key == 'e'){	// set the note type to triangle
	t = 'triangle'
	a = 0.3
}	
	if (key == 'r'){	// set the note type to sawtooth
	t = 'sawtooth'
	a= 0.05
}	
}
