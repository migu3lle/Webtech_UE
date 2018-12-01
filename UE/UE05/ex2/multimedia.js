/*
Webtech Übung 5.2 - Modules
Michael Gundacker 1646765
*/

//'use strict'

//Export the class 'Image' as default
export default class Image{
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

//Export the class 'Video'
export class Video extends Image {
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
