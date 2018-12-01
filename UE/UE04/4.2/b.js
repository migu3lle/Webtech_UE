/*
Webtech Übung 4.2 b) - Michael Gundacker
*/

//Constructor function
//Note that every image object created will have it's own
//print() function in memory
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
    }
}

myImage = new Image(100,200,12)
myImage.print()

myImage2 = new Image(50,50,24)
myImage2.print()