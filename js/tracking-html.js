var tracker;
window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  tracking.ColorTracker.registerColor('orange', function(r,g,b) {
    if (r > 190 && 
        g > 60 && g < 130 && 
        b > 40 && b < 100) {
      return true;
    }
    return false;
  })
  
  tracker = new tracking.ColorTracker(['orange']);
  tracker['minDimension'] = 5;
  tracker['minGroupSize'] = 100;
  // tracker['maxDimension'] = 25;
  // tracker['customColor'] = "#000000";



  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      if (rect.color === 'custom') {
        rect.color = tracker.customColor;
      }

      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });
  });

  // Color slider
  initGUIControllers(tracker);
  tracker.colors = ["orange"] // DEBUG - initGUIControllers add 3 more colors. So we remove them
  // console.log(tracking.ColorTracker.getColor("green"));
  

};

// function rgbToHsl(r, g, b){
//     r /= 255, g /= 255, b /= 255;
//     var max = Math.max(r, g, b), min = Math.min(r, g, b);
//     var h, s, l = (max + min) / 2;

//     if(max == min){
//         h = s = 0; // achromatic
//     }else{
//         var d = max - min;
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//         switch(max){
//             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//             case g: h = (b - r) / d + 2; break;
//             case b: h = (r - g) / d + 4; break;
//         }
//         h /= 6;
//     }

//     return [h, s, l];
// }