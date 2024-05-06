function getRandomColor(minColor, maxColor) {
    // Remove the leading '#'
    minColor = minColor.substring(1);
    maxColor = maxColor.substring(1);
  
    // Convert the colors to integers
    var minColorInt = parseInt(minColor, 16);
    var maxColorInt = parseInt(maxColor, 16);
  
    // Generate a random integer between minColorInt and maxColorInt
    var colorInt = Math.floor(Math.random() * (maxColorInt - minColorInt + 1)) + minColorInt;
  
    // Convert the integer back to a hexadecimal string
    var color = colorInt.toString(16);
  
    // Pad with leading zeros, if necessary
    while (color.length < 6) {
      color = '0' + color;
    }
  
    // Add the leading '#'
    color = '#' + color;
  
    return color;
  }

  export default  getRandomColor