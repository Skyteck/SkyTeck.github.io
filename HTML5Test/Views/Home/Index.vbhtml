﻿<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Microphone Volume Level</title>
    <style>
        body {
            background-color: black;
            color: white; /* Set the text color to white for better readability */
        }
    </style>
</head>
<body>
    <h1>Microphone Volume Level</h1>
    <button id="startButton">Start</button>
    <div id="volumeLevel">Volume Level: Not Available</div>

    <label for="thresholdInput">Threshold (dB): </label>
    <input type="number" id="thresholdInput" value="-40">

    <img id="volumeIndicator" src="" alt="Volume Indicator" style="width: 330px; height: 215px;">

    <script>
        document.getElementById('startButton').addEventListener('click', async () => {
            try {
                // Request microphone access
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                // Create an audio context
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();

                // Create a media stream source
                const source = audioContext.createMediaStreamSource(stream);

                // Create a script processor node for analyzing the audio data
                const processor = audioContext.createScriptProcessor(2048, 1, 1);

                // Connect the source to the processor, and the processor to the context's destination
                source.connect(processor);
                processor.connect(audioContext.destination);

                // Calculate the volume level on audioprocess event
                processor.onaudioprocess = (event) => {
                    const input = event.inputBuffer.getChannelData(0);
                    let sum = 0.0;
                    for (let i = 0; i < input.length; ++i) {
                        sum += input[i] * input[i];
                    }
                    const rms = Math.sqrt(sum / input.length);
                    const db = 20 * Math.log10(rms);
                    document.getElementById('volumeLevel').innerText = `Volume Level: ${db.toFixed(2)} dB`;

                    // Get the threshold from the input
                    const threshold = parseFloat(document.getElementById('thresholdInput').value);

                    // Update the image based on the dB level
                    const volumeIndicator = document.getElementById('volumeIndicator');
                    if (db > threshold) {
                        volumeIndicator.src = "/Content/Assets/img/Coy/feeshOpen.png";
                    } else {
                        volumeIndicator.src = "/Content/Assets/img/Coy/feesh.png";
                    }
                };

            } catch (err) {
                console.error('Error accessing the microphone: ', err);
            }
        });
    </script>
</body>
</html>
