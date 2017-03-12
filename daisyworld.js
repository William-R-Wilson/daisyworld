$(document).ready(function() {
  var temp = 50;
  var elapsed = 0;
  var daisyTypes = ["yellow", "black"];

  function addDaisy(color){
    var newDaisy = $("<div class='daisy " + color + "'></div>");
    // make position sensitive to size and document's width
    var posx = (Math.random() * ($('#container').width() - 15)).toFixed();
    var posy = (Math.random() * ($('#container').height() - 15)).toFixed();
    console.log(posx);
    console.log(posy);

    newDaisy.css({
      'background-color':color,
      'position':'absolute',
      'left':posx+'px',
      'top':posy+'px'
    });
    $("#container").append(newDaisy);
  }

  function addPoint(time, temp){
    var newPoint = $("<div class='point'></div>");
    var height = $('#chart').height();
    var width = $('#chart').width();
    var posx = (width - (width - time)).toFixed();
    var posy = ((temp-height) + 25).toFixed();
    newPoint.css({
      'position':'absolute',
      'left':posx+'px',
      'bottom':posy+'px'
    });
    $('#chart').append(newPoint);
  }

  function pickType() {
    x = daisyTypes[ (Math.round(Math.random())) ];
    console.log(x);
    return x;
  }

    setInterval(function(){
      //daisies only reproduce between certain temperatures
      console.log(temp);
        if ( temp > 45 && temp <= 55 ) {
          addDaisy(pickType());
            //addDaisy();
          }
          //reproduce faster at prime temperature
          if ( temp > 55 && temp < 65 ) {
            addDaisy(pickType());
            addDaisy(pickType());
          }
          //more die if temp too high
          if ( temp > 64 && temp < 75 ) {
            $('.daisy').first().remove();
            addDaisy(pickType());
          }


          //daisies have a cooling effect on temperature
          temp -= ($(".yellow").length * 0.1);
          temp += ($(".black").length * 0.1);

          temp += .01; //temp naturally increases over time
          elapsed += 1;
          //daisies have a lifespan
          if (elapsed >= 10) {
            $('.daisy').first().remove();
          }

          if (elapsed >= 300) {
            clearInterval();
            return;
          }

          console.log("elapsed time: " + elapsed);
          addPoint(elapsed, temp);

          $("#temperature").text(String(temp));
        }, 500);
  })
