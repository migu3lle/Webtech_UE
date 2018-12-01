/*
Webtech Übung 4.2 a) - Michael Gundacker
*/

//Objekt "image"

Image = {
    "width": 1920,
    "height" : 1080,
    "bitdepth" : 24,
    "rawsize" : 0,
    "megapixels" : 0,
    "computeSize" : function(){
        this.megapixels = (this.width * this.height) / 1000000
        //Calculation to get MebiBytes
        this.rawsize =  (this.width * this.height * this.bitdepth) / (Math.pow(2,20)*8)
    }

}

//Funktionsaufruf
Image.computeSize()

//Ausgabe der Instanzvariablen
console.log(Image.megapixels)
console.log(Image.rawsize)
