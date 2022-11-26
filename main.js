song_1 = 0;
song_2 = 0;
left_wrist = 0;
left_wrist_y = 0;
left_wrist_x = 0;
right_wrist_y = 0;
right_wrist_x = 0;
score_left_wrist = 0;
score_right_wrist = 0;
song_1_status = "";
song_2_status = "";


function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("peter.mp3");

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    pose_net = ml5.poseNet(video, model_loaded);
    pose_net.on("pose", gotPoses);
}



function draw() {
    image(video, 0, 0, 600, 500);

    song_1_status = song_1.isPlaying();
    stroke(2);
    fill("black");

    if (left_wrist > 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        song_2.stop();

        if (song_1_status == false) {
            song_1.play();
            document.getElementById("song_playing").innerHTML = "Song name - Harry Potter";
        }
    }

    song_2_status = song_2.isPlaying();
    stroke(2);
    fill("black");

    if (left_wrist > 0.2) {
        circle(right_wrist_x, right_wrist_y, 20);
        song_1.stop();

        if (song_2_status == false) {
            song_2.play();
            document.getElementById("song_playing").innerHTML = "Song name - Peter Pan";
        }

    }

}

function model_loaded() {
    console.log("modle is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        score_left_wrist = results[0].pose.keypoints[9].score;


        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.x;


    }
}


function play_song(){
    song_1.play();
    song_1.setVolume(1);
    song_1.rate(1);
   
}
