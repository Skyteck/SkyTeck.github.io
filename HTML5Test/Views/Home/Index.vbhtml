<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <script src="~/Scripts/jquery-3.4.1.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="/Scripts/modernizr-2.8.3.js"></script>
    <style type="text/css">
        #outer {
            width: 100%;
            display: flex;
            justify-content: center;
        }

        #outerSCS {
            width: 100%;
            display: flex;
            justify-content: center;
        }
    </style>

    <title> Sky's fun projects</title>
</head>
<body>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        @*<li class="nav-item" role="presentation">
            <button class="nav-link " id="vroom-tab" data-bs-toggle="tab" data-bs-target="#RayCast" type="button" role="tab" aria-controls="RayCast" aria-selected="true">RayCast</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="vroom-tab" data-bs-toggle="tab" data-bs-target="#vroom" type="button" role="tab" aria-controls="vroom" aria-selected="true">Vroom</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="cloth-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Cloth</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="wallpaper-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Wallpaper</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link " id="Virus-tab" data-bs-toggle="tab" data-bs-target="#Virus" type="button" role="tab" aria-controls="Virus" aria-selected="false">Virus</button>
        </li>*@
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="perlin-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Perlin</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="amazing-tab" data-bs-toggle="tab" data-bs-target="#amazing" type="button" role="tab" aria-controls="contact" aria-selected="false">Amazing</button>
        </li>
    </ul>


    <div class="tab-content" id="myTabContent">
        @*<div class="tab-pane fade  " id="RayCast" role="tabpanel" aria-labelledby="RayCast-tab">
            <div class="d-flex justify-content-center">
                <canvas id="canvasRayCast" width="640" tabindex=0 height="640"></canvas><br />
            </div>
            <br />
            <script type="module">
                import InitRayCast from "../Scripts/Apps/RayCast.js";
                InitRayCast('Diglett');
            </script>
        </div>*@
        @*<div class="tab-pane fade  " id="vroom" role="tabpanel" aria-labelledby="vroom-tab">
            <div class="d-flex justify-content-center">
                <canvas id="canvasVroom" width="640" tabindex=4 height="640"></canvas><br />
            </div>
            <br />W to go forward. S to brake and reverse. A turn left. D turn right.
            <script type="module">
                import InitVroom from "../Scripts/Apps/vroom.js";
                InitVroom('Diglett');
            </script>
        </div>*@
        @*<div class="tab-pane fade " id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="d-flex justify-content-center">
                <canvas id="canvasString" width="640" tabindex=1 height="640"></canvas><br />
            </div>
            <input type="checkbox" id="cbDots" / value="true">Show dots to click and move?<br />
            <input type="checkbox" id="cbCircles" />Show dot tether range?<br />
            <input type="checkbox" id="cbGravity" />Gravity?<br />
            <input type="text" id="txtGrav" value="0.2" />Gravity power?<br />
            <input type="text" id="txtStrLength" value="10" />String Length?<br />
            <input type="text" id="txtPullStr" value="1.25" />Pull strength?<br />
            <script type="module">
                import InitCloth from "../Scripts/Apps/Clothtest.js";
                InitCloth('Diglett');
            </script>
        </div>*@
        @*<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="d-flex justify-content-center">
                <canvas id="canvasWallpaper" width="640" tabindex=2 height="640"></canvas><br />
            </div>
            <script type="module">
                import InitWallpaper from "../Scripts/Apps/Wallpaper.js";
                InitWallpaper('Diglett');
            </script>

            <input type="text" id="txtDots" value="100" />Dots? (A value higher than 600 might kill your browser)<br />
            <input type="button" id="btnApplyDots" value="Apply" />
        </div>*@
        @*<div class="tab-pane fade  " id="Virus" role="tabpanel" aria-labelledby="Virus-tab">
            <div class="d-flex justify-content-center">
                <canvas id="canvasVirus" width="640" tabindex=4 height="640"></canvas><br />
            </div>
            <br />
            <script type="module">
                import InitVirus from "../Scripts/Apps/Virus.js";
                InitVirus('Diglett');
            </script>
            <input type="text" id="txtHumans" value="750" />How many humans?<br />
            <input type="text" id="txtVPercent" value="1" />% chance to start infected<br />
            <input type="text" id="txtVSpreadP" value="20" />% chance to infect other<br />
            <input type="text" id="txtSpreadDist" value="5" />Infection range in pixels<br />
            <input type="text" id="txtDieT" value="10" />Chance to die per second<br />
            <input type="text" id="txtHealP" value="20" />chance to heal per second<br />
            <input type="button" id="btnApplyVirus" value="Apply" />
        </div>*@
        <div class="tab-pane fade" id="perlin" role="tabpanel" aria-labelledby="contact-tab">
            <div class="d-flex justify-content-center">
                <canvas id="canvasPerlin" width="640" tabindex=3 height="640"></canvas></br>
            </div>
            <script type="module">
                import InitPerlin from "../Scripts/Apps/Perlintest.js";
                InitPerlin('Diglett');
            </script>
        </div>
        <div class="tab-pane fade show active" id="perlin" role="tabpanel" aria-labelledby="amazing-tab">
            <div class="d-flex justify-content-center">
                <canvas id="canvasAmazing" width="640" tabindex=3 height="640"></canvas></br>
            </div>
            <script type="module">
                import InitAmazing from "../Scripts/Apps/Amazing.js";
                InitAmazing('Diglett');
            </script>
        </div>
    </div>




    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>
<script src='https://git.io/perlin.js'></script>
<script>
    document.body.addEventListener("contextmenu", function (evt) { evt.preventDefault(); return false; });
</script>

</html>
