song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song_status1 = "";
scoreRightWrist = 0;
song_status2 = "";

function preload() {
     song1 = loadSound("music.mp3");
     song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(655, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Posenet is Initialized");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("blue");
    song_status1 = song1.isPlaying();
    song_status2 = song2.isPlaying();
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 30);
        song1.stop();
        if (song_status2 == false) {
            song2.play();
            document.getElementById("song_name_xxx").innerHTML = "Playing - Peter Pan song";
        } 
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 30);
        song2.stop();
        if (song_status2 == false) {
            song1.play();
            document.getElementById("song_name_xxx").innerHTML = "Playing - Harry Potter song";
        }
    }
}
function play() {
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left wrist X = " + leftWristX + ", Left wrist Y = " + leftWristY + "Right wrist X = " + rightWristX + ", Right wrist Y = " + rightWristY);
    }
}