
function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    cocossd = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("red1").innerHTML = "Stauts : detecting objects";

}

img="";
satatus="";
object =[];
sound="";
function preload() {
sound=loadSound("new_years_song.mp3");
}

function draw() {
    image(video,0,0,380,380);
    
    if(satatus !="") {
        r = random(255);
        g = random(255);
        b = random(255);
        cocossd.detect(video,gotResults);
        for(s=0; s < object.length; s++) {
            if(object[s].label=="person") {
            document.getElementById("red1").innerHTML = "Status : baby Detected";
            sound.stop();
            }
            else if(object[s].label != "person") {
                document.getElementById("red1").innerHTML = "Status :baby not Detected";
                sound.play();
            }
            else if(object.length<0) {
                document.getElementById("red1").innerHTML = "Status : baby not Detected";
                sound.play();
            }
           converting = floor(object[s].confidence * 100);
            text(object[s].label + " " + converting + "%", object[s].x+20,object[s].y+20);
            noFill();
            stroke(r,g,b);
            rect(object[s].x,object[s].y,object[s].width,object[s].height);
            
        }
    }

}
function modelLoaded() {
    console.log("model is set");
    satatus= true;
   
}

function gotResults(error,results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

                