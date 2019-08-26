<!DOCTYPE html>
<html>
<head>
	<base href="/">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <link rel="manifest" href="./manifest.json">
    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">

    <title>Case Studies - South Corridor Study - Greater Nashville Regional Council</title>

	<link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css" rel="stylesheet" />
    <link href="./css/main.css" rel="stylesheet" />
</head>
<body>
    <header class="main-toolbar">
        <h1 class="toolbar__title">
            <a href="/" class="toolbar__link">
                <span class="toolbar__logo">Stroll Roll NE Denver</span>
            </a>
        </h1>
        <span class="spacer"></span>
    </header>
            
    <div id="app"></div>

    <footer class="main-footer">
        <p class="copyright">&copy; <%=DateTime.Now.Year%> Stroll Roll NorthEast Denver</p>
    </footer>
    <script src="./scripts/app-settings.js"></script>
    <script src="./scripts/main.js"></script>
</body>
</html>