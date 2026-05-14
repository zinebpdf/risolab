
let img;
let ditherType = 'floydsteinberg';
let yellow;
let pink;
let blue;
let black;
let red;
let forest;
let input ;
let imgLoaded = false;


let freq = 3;
let deg = 45;
let intese = 90;
let col = "jaune";
let typeTrame = ['line', 'square', 'circle', 'ellipse', 'cross'];
let trame = 0;

function preload() {
    img = loadImage('media/test-tomate.jpg'); //insérer l'image
}


function setup() {
    pixelDensity(1);
      background(255);
   createCanvas(innerWidth, innerHeight);

yellow = new Riso("YELLOW");
pink = new Riso("FLUORESCENTPINK");
red = new Riso("RED");
blue = new Riso("BLUE");
forest = new Riso("FOREST");
black = new Riso("BLACK");

input = createFileInput(handleFile);
//noLoop();
}


function draw(){


background(255);
clearRiso();

// paramètre pour le type de halftone : LINE, SQUARE, CIRCLE, ELLIPSE, CROSS
// les paramètres dans l'odre pour le haftone : line dots, frequency 3, angle 45, intensity 90.
// paramètres pour les sliders - int c'est car ce sont des valeurs numériques
    freq = int(document.getElementById("frequence").value); 
    deg = int(document.getElementById("angle").value); 
    intense = int(document.getElementById("intensite").value);

        
        if (col == "jaune") {
            let halftonedYellow = halftoneImage(img, typeTrame[trame] , freq, deg, intense);
            yellow.image(halftonedYellow, 0, 0);
        }

        
        if (col == "rouge") {
            let halftonedRed = halftoneImage(img, typeTrame[trame] , freq, deg, intense);
            red.image(halftonedRed, 0, 0);
        }

         if (col == "rose") {
            let halftonedPink = halftoneImage(img, typeTrame[trame] , freq, deg, intense);
            pink.image(halftonedPink, 0, 0);
        }
        
        if (col == "bleu"){
        let halftonedBlue = halftoneImage(img, typeTrame[trame] , freq, deg, intense);
        blue.image(halftonedBlue, 0, 0);
    }

        if (col == "vert"){
        let halftonedForest = halftoneImage(img, typeTrame[trame] , freq, deg, intense);
        forest.image(halftonedForest, 0, 0);
    }

        if (col == "noir"){
        let halftonedBlack = halftoneImage(img, typeTrame[trame] , freq, deg, intense);
        black.image(halftonedBlack, 0, 0);
    }
 drawRiso();
}




// fonction pour changer la couleur en cliquant sur le nom
function changer_couleur(c) {
col = c;
}

// fonction pour exporter les fichiers (.jpeg ou .png) en niveaux de gris
function keyPressed() {
    if (key === 's') {
        exportRiso();
    }
}
function changer_trame(t){
  trame = t;
}



function handleFile(file){
  imgLoaded = false;
  if (file.type === 'image') {
    // Create the image as an img element. 
    // The 'imgCreated' function will be called when it
    // is done, so we can convert it into a p5.Image object
    img = createImg(
      file.data, 'Alt text', 'anonymous', imgCreated);
    img.hide();
  } else {
    img = null;
  }


}


function imgCreated(){
  img.hide();
  // Create a temporary p5.Graphics object to draw the image.
  let g = createGraphics(img.elt.width, img.elt.height);
  g.image(img, 0, 0);
  // Remove the original element from the DOM.
  img.remove();
  // g.get will return image data as a p5.Image object
  img = g.get(0, 0, g.width, g.height)
  
  // Because we've converted it into a p5.Image object, we can
  // use functions such as 'resize', and 'filter',
  // which aren't available on the HTML img element.
  // Uncomment the following lines for an example...
  
  /*
  // Resize it to fill the canvas
  if (img.width < img.height){
    img.resize(width, 0);
  } else {
    img.resize(0, height);
  }
  
  // Posterize and invert the colours
  img.filter(POSTERIZE, 2);
  img.filter(INVERT);
  */

  // Record that we have finished creating the image object.
  imgLoaded = true;
    resizeCanvas(g.width, g.height);
}

