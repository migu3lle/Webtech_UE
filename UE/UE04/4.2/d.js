/*
Webtech Übung 4.2 d) - Michael Gundacker
*/

//Image Constructor function
function Image(width, height, bitdepth){
    this.width = width
    this.height = height
    this.bitdepth = bitdepth
    this.rawsize = (this.width * this.height * this.bitdepth) / (Math.pow(2,20)*8)
    this.megapixels = (this.width * this.height) / 1000000
    this.print = function(){
        for(key in this){
            console.log(key + ' = ' + this[key] + ', ')
        }
        console.log("\n")
    }
}
//Add a new function to the prototype of Image
Image.prototype.printMore = function(){
    this.print()
    console.log('Ratio = 1:' + this.height/this.width)
    console.log("\n")
}

//Video Constructor function
function Video(width, height, bitdepth, duration, framerate){
    Image.call(this, width, height, bitdepth)
    this.duration = duration
    this.framerate = framerate
}

//Set prototype to Image
//This is needed in order to invoke myVideo.printMore() in the last line
Video.prototype = Object.create(Image.prototype)
//Set constructor back to Video
Video.prototype.constructor = Video

//Add a new function to the prototype of Video
Video.prototype.totalFrames = function(){
    return this.framerate * this.duration
}

let myVideo = new Video(100, 100, 24, 10, 25)
myVideo.print()
//Possible since Video Prototype was set to Image Prototype 
myVideo.printMore()