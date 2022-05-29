img="";
Status="";
objects=[];
ring="";
obj="";
 


 
function setup(){
    Canvas=createCanvas(500,420);
    Canvas.position(550,250);
    Video=createCapture(VIDEO);
    Video.hide();
    
}

function state(){
    obj=document.getElementById("name").value;
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects...";
    document.getElementById("number").innerHTML="LOADING...";
}

function modelLoaded(){
    console.log("Model is loaded");
    Status="true";
    }

function gotPoses(error,results){

    if (error){
        console.log("error");
    }
    else{
        console.log(results);
        objects=results;
    }
}


function draw() {
 
    image(Video,0,0,640,420);
    r=random(255);
    g=random(255);
    b=random(255);
 if (Status != ""){

    objectDetector.detect(Video,gotPoses);
     
  for (i= 0; i< objects.length; i++) {
        percentage=floor(objects[i].confidence*100);
        fill(r,g,b);
        text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);
        stroke(r,g,b);
        noFill();
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        if (objects[i].label==obj){
       document.getElementById("status").innerHTML="Status : Identified"
       document.getElementById("number").innerHTML=obj+" Found";
        Video.stop()
        objectDetector.detect(gotPoses);
        var synth =window.speechSynthesis;
    utter_this= new SpeechSynthesisUtterance(obj+"is found");
    synth.speak(utter_this);
    
      }
     
     else {
        
        document.getElementById("status").innerHTML="Status : Identified";
    document.getElementById("number").innerHTML=obj+" Not Found";
    var synth =window.speechSynthesis;
    utter_this= new SpeechSynthesisUtterance(obj+"is not found");
    synth.speak(utter_this);
    }

    }
}} 