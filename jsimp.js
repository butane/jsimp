/******************************************************************************
The MIT License (MIT)

Copyright (c) 2015 Vivek Dinesh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
******************************************************************************/

function JSIMP () {
    this._imgData = new Array();
    this._debug = false;
}

JSIMP.prototype._pixel = function (r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};

JSIMP.prototype._fixPixel = function (pixel) {
    pixel.r = pixel.r>255?255:(pixel.r<0?0:Math.round(pixel.r));
    pixel.g = pixel.g>255?255:(pixel.g<0?0:Math.round(pixel.g));
    pixel.b = pixel.b>255?255:(pixel.b<0?0:Math.round(pixel.b));
    pixel.a = pixel.a>255?255:(pixel.a<0?0:Math.round(pixel.a));
    return pixel;
};

JSIMP.prototype._invertPixelColor = function (pixel) {
    pixel.r = 255 - pixel.r;
    pixel.g = 255 - pixel.g;
    pixel.b = 255 - pixel.b;
    return pixel;
};

JSIMP.prototype._greyScalePixel = function (pixel) {
    var midTone = Math.floor((pixel.r+pixel.g+pixel.b)/3);
    pixel.r = midTone;
    pixel.g = midTone;
    pixel.b = midTone;
    return pixel;
};

JSIMP.prototype._pixelBrightness = function (pixel, factor) {
    pixel.r += factor;
    pixel.g += factor;
    pixel.b += factor;
    return this._fixPixel(pixel);
};

JSIMP.prototype._pixelOpacity = function (pixel, factor) {
    pixel.a += factor;
    return this._fixPixel(pixel);
};

JSIMP.prototype.enableDebug = function() {
    debug = true;
};

JSIMP.prototype.disableDebug = function() {
    debug = false;
};

JSIMP.prototype.loadImgFromCanvas = function(canvas) {
    var ctx = canvas.getContext('2d');
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (data && data.data && data.data.length==(canvas.width*canvas.height*4)) {
        var p = 0;
        this._imgData = new Array();
        for (var row=0; row<canvas.height; row++) {
            this._imgData[row] = new Array();
            for (var col=0; col<canvas.width; col++) {
                this._imgData[row][col] = new this._pixel(data.data[p], data.data[p+1], data.data[p+2], data.data[p+3]);
                p+=4;
            }
        }
    }
    return true;
};

JSIMP.prototype.loadImgToCanvas = function(canvas) {
    var ctx = canvas.getContext('2d');
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (data && data.data && data.data.length==(canvas.width*canvas.height*4)) {
        var p = 0;
        for (var row = 0; row < canvas.height; row++) {
            for (var col = 0; col < canvas.width; col++) {
                if (this._imgData[row][col]) {
                    data.data[p] = this._imgData[row][col].r;
                    data.data[p+1] = this._imgData[row][col].g;
                    data.data[p+2] = this._imgData[row][col].b;
                    data.data[p+3] = this._imgData[row][col].a;
                }
                p += 4;
            }
        }
        ctx.putImageData(data, 0, 0);
    }
    return true;
};

JSIMP.prototype.invertColors = function() {
    for (var row = 0; row < this._imgData.length; row++) {
        for (var col = 0; col < this._imgData[0].length; col++) {
            this._imgData[row][col] = this._invertPixelColor(this._imgData[row][col]);
        }
    }
    return true;
};

JSIMP.prototype.greyScale = function() {
    for (var row = 0; row < this._imgData.length; row++) {
        for (var col = 0; col < this._imgData[0].length; col++) {
            this._imgData[row][col] = this._greyScalePixel(this._imgData[row][col]);
        }
    }
    return true;
};

JSIMP.prototype.brightness = function(factor) {
    for (var row = 0; row < this._imgData.length; row++) {
        for (var col = 0; col < this._imgData[0].length; col++) {
            this._imgData[row][col] = this._pixelBrightness(this._imgData[row][col], factor);
        }
    }
    return true;
};

JSIMP.prototype.opacity = function(factor) {
    for (var row = 0; row < this._imgData.length; row++) {
        for (var col = 0; col < this._imgData[0].length; col++) {
            this._imgData[row][col] = this._pixelOpacity(this._imgData[row][col], factor);
        }
    }
    return true;
};

if (typeof module !== 'undefined' && module) {
	module.exports = JSIMP;
}
