/*
Webtech Übung 4.3 - Michael Gundacker
*/

//Realization with ECMA Script 6 class definition

class Image{
    //Image Constructor
    constructor(width, height, bitdepth){
        this.width = width
        this.height = height
        this.bitdepth = bitdepth
        this.rawsize = (this.width * this.height * this.bitdepth) / (Math.pow(2,20)*8)
        this.megapixels = (this.width * this.height) / 1000000
    }
    print(){
        for(let key in this){
            console.log(key + ' = ' + this[key] + ', ')
        }
        console.log("\n")
    }
    printMore(){
        this.print()
        console.log('Ratio = 1:' + this.height/this.width)
        console.log("\n")
    }
}

class Video extends Image {
    //Video Constructor
    constructor(width, height, bitdepth, duration, framerate){
        //super() to call constructor of superclass
        super(width, height, bitdepth)
        this.duration = duration
        this.framerate = framerate
    }
    totalFrames(){
        return this.framerate * this.duration
    }
}

//Test implementation
let myVideo = new Video(100, 100, 24, 20, 25)
myVideo.print()
myVideo.printMore()
console.log(myVideo.totalFrames())

let myImage = new Image(100, 200, 12)
myImage.print()
myImage.printMore()
