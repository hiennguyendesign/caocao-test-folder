var font;
var viewOutline=false;
var viewAlphabet=false;
var points1=[];
var glyphSet = 'full';
var fullGlyphSet=[48,49,50,51,52,53,54,55,56,57,46,803,44,33,63,36,8363,180,96,777,732,710,774,65,258,194,66,67,68,272,69,202,70,71,72,73,74,75,76,77,78,79,212,416,80,81,82,83,84,85,431,86,87,88,89,90,97,259,226,98,99,100,273,101,234,102,103,104,105,106,107,108,109,110,111,244,417,112,113,114,115,116,117,432,118,119,120,121,122,193,192,7842,195,7840,7854,7856,7858,7860,7862,7844,7846,7848,7850,7852,225,224,7843,227,7841,7855,7857,7859,7861,7863,7845,7847,7849,7851,7853,201,200,7866,7868,7864,7870,7872,7874,7876,7878,233,232,7867,7869,7865,7871,7873,7875,7877,7879,205,204,7880,296,7882,237,236,7881,297,7883,211,210,7886,213,7884,7888,7890,7892,7894,7896,7898,7900,7902,7904,7906,243,242,7887,245,7885,7889,7891,7893,7895,7897,7899,7901,7903,7905,7907,218,217,7910,360,7908,7912,7914,7916,7918,7920,250,249,7911,361,7909,7913,7915,7917,7919,7921,221,7922,7926,7928,7924,253,7923,7927,7929,7925];
var engGlyphSet=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122];
var vietGlyphSet=[65,258,194,66,67,68,272,69,202,71,72,73,75,76,77,78,79,212,416,80,81,82,83,84,85,431,86,88,89,97,259,226,98,99,100,273,101,234,103,104,105,107,108,109,110,111,244,417,112,113,114,115,116,117,432,118,120,121,193,192,7842,195,7840,7854,7856,7858,7860,7862,7844,7846,7848,7850,7852,225,224,7843,227,7841,7855,7857,7859,7861,7863,7845,7847,7849,7851,7853,201,200,7866,7868,7864,7870,7872,7874,7876,7878,233,232,7867,7869,7865,7871,7873,7875,7877,7879,205,204,7880,296,7882,237,236,7881,297,7883,211,210,7886,213,7884,7888,7890,7892,7894,7896,7898,7900,7902,7904,7906,243,242,7887,245,7885,7889,7891,7893,7895,7897,7899,7901,7903,7905,7907,218,217,7910,360,7908,7912,7914,7916,7918,7920,250,249,7911,361,7909,7913,7915,7917,7919,7921,221,7922,7926,7928,7924,253,7923,7927,7929,7925];
var margin, topmargin;
var pangrams=['The quick brown fox jumps over the lazy dog.','Do bạch kim rất quý, sẽ để lắp vô xương.','Oh my God!','Trời đất ơi!','This little piggy went to the market, this little piggy stayed home.','Con sâu lúc lắc anh không dám bắt, con sâu lúc lắc anh bắt cho em coi.','This bowl of phở is only $5.','Tô phở này chỉ có 5₫ thôi.','Hello! How was your day?','Chào! Bạn có khỏe không?'];
var para = 'CaoCao is a bilingual English and Vietnamese display font.'; //possibility to randomise pangram?
var words = para.split(' ');
var wx, wy;
var typesize;
var spacesize; //width of space between letters
var linesize; //height between lines
function preload() {
  font = loadFont('data/CaoCaoV2.otf');   // this file must exist
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textFont(font);
  typesize=height/7;
  linesize=typesize;
  spacesize=typesize/4;
  textSize(typesize);
  margin=width/8;
  topmargin = height/8;
  colorPicker = createColorPicker('#000000');
  colorPicker.position(20,15);
}
function draw(){
  background(255);
  push();
  textFont('Helvetica');
  textSize(12);
  fill(0);
  noStroke();
  text('Right Arrow: Toggle Sentence/Full Glyph Set         Left Arrow: Toggle Stroke         Down Arrow: Toggle Full/English/Vietnamese Glyph Sets',100,30);
  pop();
  if (viewOutline==true){
    fill(255);
  } else {
    fill(colorPicker.color()); 
  }
  wx = margin;
  wy = topmargin;
  //Writing the Sentences
  if (viewAlphabet==false){
    typesize=height/4;
    textSize(typesize);
    linesize=typesize*0.8;
    spacesize=typesize/4;
    for (let w=0; w<words.length;w++){
      if (wx+textWidth(words[w])<=width-(margin)){ //if the word fits, set the word
       // points1 = font.textToPoints(words[w], wx, wy+50, typesize, 0.9);
        //insert timing delay here if you like…
        if (frameCount>10*w){ //timing delay using frameCount
          if (viewOutline!==true){
            noStroke();}
          else {
            stroke(colorPicker.color());} //takes off outline of letters
          text(words[w], wx, wy+150); //toggle off after debug...
        }
          wx+=textWidth(words[w])+spacesize;
        }
        else { //if it doesn't fit, return to the next line
          wx=margin;
          wy+=linesize;
          w--;
        }
    }
  }
  //Writing the Glyphs / Alphabet
  else {
    if (glyphSet=='full') {
      selectedGlyphSet=fullGlyphSet;
      typesize=height/10;
    } else if (glyphSet=='eng') {
      selectedGlyphSet=engGlyphSet;
      typesize=height*0.115;
    } else {
      selectedGlyphSet=vietGlyphSet;
      typesize=height/10;
    }
    textSize(typesize);
    linesize=typesize;
    spacesize=typesize/4;
    for (let l=0; l <selectedGlyphSet.length; l++){  
      if (wx+textWidth(char(selectedGlyphSet[l]))<=width-margin){
        points1 = font.textToPoints(char(selectedGlyphSet[l]), wx, wy+50, typesize, 0.9);
        if (frameCount>1*(l)){ //timing delay using frameCount
          if (viewOutline!==true){
            noStroke();}
          else {stroke(colorPicker.color());} //takes off outline of letters
          text(char(selectedGlyphSet[l]), wx, wy+50); //toggle off after debug...
          }
          wx+=textWidth(char(selectedGlyphSet[l]))+spacesize;
        }
        else { //if it doesn't fit, return to the next line
          wx=margin;
          wy+=linesize;
          l--;
        }
    } 
  }
}
function keyPressed(){
  if (keyCode === DOWN_ARROW){
   if (glyphSet=='full') {
      glyphSet='eng';
    } else if (glyphSet=='eng') {
      glyphSet='viet';
    } else {
      glyphSet='full';
    }
    frameCount=0;
  }
  else if (keyCode === LEFT_ARROW){
   //toggles stroke
   viewOutline=!viewOutline;
  }
  else if (keyCode === RIGHT_ARROW){
    //toggles Pangram <-> Alphabet
    frameCount=0;
    viewAlphabet=!viewAlphabet;
    para=random(pangrams);
    words = para.split(' ');
  }
  else if (key == ' '){
    //Saves a JPG of the screen
    saveCanvas('CaoCao_screenshot', 'jpg');
  }
}
