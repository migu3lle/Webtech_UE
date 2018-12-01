/*
Webtech Übung 5.2 - Modules
Michael Gundacker 1646765
*/

'use strict'

/*
It's important to change the HTML file script type to "module"
*/

//import myDefault (Image) from "./multimedia.js"
//import Video with alias 'Movie' from "./multimedia.js"
import myDefault, { Video as Movie } from "./multimedia.js"

let newImage = new myDefault(100, 100, 24)
newImage.print()
newImage.printMore()

let newVideo = new Movie(1920, 1080, 24, 10, 25)
newVideo.print()
newVideo.printMore()