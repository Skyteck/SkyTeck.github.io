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

        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="life-tab" data-bs-toggle="tab" data-bs-target="#life" type="button" role="tab" aria-controls="contact" aria-selected="false">Life</button>
        </li>

    </ul>


    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="life" role="tabpanel" aria-labelledby="life-tab">
            <div class="d-flex justify-content-center">
                <canvas id="canvasLife" width="640" tabindex=3 height="640"></canvas></br>
            </div>
            <script type="module">
                import InitLife from "../Scripts/Apps/Life.js";
                InitLife('Diglett');
            </script>
        </div>
    </div>

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>
@*<script src='https://git.io/perlin.js'></script>*@
<script>
    document.body.addEventListener("contextmenu", function (evt) { evt.preventDefault(); return false; });
</script>

</html>
