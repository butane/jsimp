# jsimp
JavaScript Image Processor

##Installation
HTML
```html
<body>
  ...
  <script type="text/javascript" src="/path/to/jsimp.js"></script>
</body>
```

##Usage
In your HTML, create the canvas element and add the code that loads the required image on the canvas.
```html
<canvas id="canvas"></canvas>
<script type="text/javascript">
/*
* Code that loads the required image on the canvas.
*/
</script>
```
Once the image is loaded on the canvas, you can create the JSIMP object and start processing the image.
```javascript
var canvas = document.getElementById('canvas');

//Create a JSIMP object
var jsImp = new JSIMP();

//Load image data from the canvas.
jsImp.loadImgFromCanvas(canvas);

//Do the processing
jsImp.invertColors();
jsImp.greyScale();

//Load the processed image back to the canvas
jsImp.loadImgToCanvas(canvas);
```

##License
Code released under the [MIT License](https://github.com/butane/jsimp/blob/master/LICENSE).
