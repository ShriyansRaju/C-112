Webcam.set({
    height: 320,
    width: 350,
    image_format: "jpeg",
    jpeg_quality: 100
})

Webcam.attach("#camera")

function takePhoto() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='myimage' src='" + data_uri + "'/>"
    })
}

console.log("ml5 version is =", ml5.version)

prediction1 = ""
prediction2 = ""

function speak() {
    var synth = window.speechSynthesis
    speak_data1 = "The first prediction is" + prediction1
    speak_data2 = "The second prediction is" + prediction2
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2)
    synth.speak(utterThis)
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dH79q1Oqh/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model is loaded")
}

function identifyEmotion() {
    img = document.getElementById("myimage")

    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    }

    else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label
        document.getElementById("result_emotion_name2").innerHTML = results[1].label
        prediction1 = results[0].label
        prediction2 = results[1].label
        speak()
        if (results[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;"
        }
        if (results[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;"
        }
        if (results[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128545;"
        }
        if (results[0].label == "Crying") {
            document.getElementById("update_emoji").innerHTML = "&#128546;"
        }
        if (results[1].label == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;"
        }
        if (results[1].label == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;"
        }
        if (results[1].label == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128545;"
        }
        if (results[1].label == "Crying") {
            document.getElementById("update_emoji2").innerHTML = "&#128546;"
        }
    }
}
