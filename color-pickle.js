(function(){
  
  /** LET'S MAKE THINGS **/
  
  // picker object
  var picker = {
    hex: document.getElementById('hex'),
    r: document.getElementById('r'),
    g: document.getElementById('g'),
    b: document.getElementById('b'),
    names: document.getElementById('names'),
    viewer: document.getElementById('viewer')
  };
  
  
  /** HELPER FUNCTIONS **/
  
  // set current color for comparisons
  var setViewerRGB = function() {
      picker.viewer.style.backgroundColor = 'rgb(' + picker.r.value + ',' + picker.g.value + ',' + picker.b.value + ')';
  };
  
  // update other fields from RGB input
  var updateFromRGB = function() {
    // convert r, g, b to hex and concat
    var hexR = parseInt(picker.r.value).toString(16);
    var hexG = parseInt(picker.g.value).toString(16);
    var hexB = parseInt(picker.b.value).toString(16);
    
    picker.hex.value = hexR + hexG + hexB;
    
    // reset colorname select
    picker.names.selectedIndex = 0;
  };
  
  // returns padded 2-digit hex value
  var getHex = function(dec) {
    var hexVal = parseInt(dec,10).toString(16);
    if ( hexVal.length < 2 ) {
      return "0" + hexVal;
    }
    return hexVal;
  };

  var rgbToHex = function(rgbArray) {
    var hexValue = '';
    for ( var i = 0; i <= 2; i++ ) {
      var hexUnit = parseInt(rgbArray[i],10).toString(16);
      if ( hexUnit.length === 1 ) {
        hexUnit = '0' + hexUnit;
      }
      hexValue += hexUnit;
    }
    return hexValue;
  };
  
  
  
  /** HEX TEXT PICKER **/
  
  // when hex value changes
  picker.hex.onkeyup = function(e) {
    picker.viewer.style.backgroundColor = '#'+this.value;
    var currentColor = this.value;

    // generate rgb
    if ( this.value.length === 3 ) {
      picker.r.value = parseInt(currentColor.substr(0,1) + currentColor.substr(0,1), 16);
      picker.g.value = parseInt(currentColor.substr(1,1) + currentColor.substr(1,1), 16);
      picker.b.value = parseInt(currentColor.substr(2,1) + currentColor.substr(2,1), 16);
    }
    else if ( this.value.length === 6 ) {
      picker.r.value = parseInt(currentColor.substr(0,2), 16);
      picker.g.value = parseInt(currentColor.substr(2,2), 16);
      picker.b.value = parseInt(currentColor.substr(4,2), 16);
    }
    setViewerRGB();
    picker.names.selectedIndex = 0;
  }
  
  
  /** RGB TEXT PICKER **/
  
  // when r value changes
  picker.r.onkeyup = function(e) {
    if ( this.value.length > 0 ) {
      picker.hex.value = getHex(this.value) + picker.hex.value.substr(2,4);
      setViewerRGB();
      updateFromRGB();
    }
  }
  
  // when g value changes
  picker.g.onkeyup = function(e) {
    if ( this.value.length > 0 ) {
      picker.hex.value = picker.hex.value.substr(0,2) + getHex(this.value) + picker.hex.value.substr(4,2);
      setViewerRGB();
      updateFromRGB();
    }
  }
  
  // when b value changes
  picker.b.onkeyup = function(e) {
    if ( this.value.length > 0 ) {
      picker.hex.value = picker.hex.value.substr(0,4) + getHex(this.value);
      setViewerRGB();
      updateFromRGB();
    }
  }
  
  
  /** COLOR NAME PICKER **/
  
  // a list of colornames
  var colorNames = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
    
  // append colornames options to the dropdown
  colorNames.forEach( function(element, index, array ){
    var option = document.createElement("option");
    option.text = element;
    option.value = element;
    picker.names.appendChild(option);
  });
  
  // when colorname changes, update hex and rgb
  picker.names.onchange = function(){
    picker.viewer.style.backgroundColor = this.value;
    var computedRGB = window.getComputedStyle(picker.viewer, null).backgroundColor;
    
    // get rgb values from rgb(x,y,z)
    var rgbArray = computedRGB.substr(4, computedRGB.length - 5).split(',');
    picker.r.value = rgbArray[0].replace(/\s+/g, '');
    picker.g.value = rgbArray[1].replace(/\s+/g, '');
    picker.b.value = rgbArray[2].replace(/\s+/g, '');
        
    // get hex value from rgb array [r,g,b]
    picker.hex.value = rgbToHex(rgbArray);
  };
  
 
  /** PICKLE CANVAS PICKER **/
  
  // turn the pickle into a canvas
  var pickleCanvas = document.getElementById('pickle-picker');
  var pickleCtx = pickleCanvas.getContext('2d');
  
  var img = new Image();
  img.src = 'cool-pics/pickle.png';
  
  img.onload = function(){
    pickleCtx.drawImage(img,0,0);
  };
  
  // when pickle clicked, update hex and rgb
  pickleCanvas.onclick = function(e) {
    
    // get pixel color data
    var boundingRect = this.getBoundingClientRect();
    var clickDataArray = pickleCtx.getImageData( e.pageX - boundingRect.left, e.pageY - boundingRect.top, 1, 1).data;

    // if transparent, make white the default
    if ( clickDataArray[3] === 0 ) {
      clickDataArray = [255,255,255,255];
    }
    
    // update rgb fields
    picker.r.value = clickDataArray[0];
    picker.g.value = clickDataArray[1];
    picker.b.value = clickDataArray[2];

    // update hex field
    picker.hex.value = rgbToHex(clickDataArray);

    // update colorname 
    picker.names.selectedIndex = 0;

    // update viewer color
    setViewerRGB();
  }
  
}());