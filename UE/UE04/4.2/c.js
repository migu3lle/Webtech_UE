/*
Webtech Übung 4.2 c) - Michael Gundacker
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
        console.log("\n")
    }
}

//Create two objects, then add functionality printMore() afterwards
myImage = new Image(100,300,12)
myImage2 = new Image(50,50,24)

//Add a new function to the prototype of image
Image.prototype.printMore = function(){
    this.print()
    console.log('Ratio = 1:' + this.height/this.width)
    console.log("\n")
}

//After the prototype functionality was extended during runtime
//we can invoke the new functions
myImage.printMore()
myImage2.printMore()
