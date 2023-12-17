music1 = "";
music2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

status_music1 = "";
status_music2

function preload() {
    music1 = loadSound("music1.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results) {
    if(results.length > 0)
    {
    console.log(results);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist + "  " + "scoreRightWrist = " + scoreRightWrist);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#0000FF");
    stroke("#000000");

    status_music1 = music1.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if(status_music1 == "False")
        {
            music1.play();
            document.getElementById("song_name").innerHTML.value = "Treat You Better"
        }
    }

    status_music2 = music2.isPlaying();

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        music1.stop();
        if(status_music2 == "False")
        {
            music2.play();
            document.getElementById("song_name").innerHTML.value = "Bones"
        }
    }
}