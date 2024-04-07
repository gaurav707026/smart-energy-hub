let voltageMeterValue = document.querySelector('.voltage-meter-value');
let voltageFullScaleReading = 15;
let voltageMeterReading = 0;
let voltageRotationAngle = (270/voltageFullScaleReading)*voltageMeterReading;

  // Define an async function to use await within setInterval
  async function fetchDataAndPrint() {
    const feeds = await fetchThingspeakData();
    if(feeds){
      voltageMeterValue.innerText = feeds.field2 + 'V';
        voltageMeterReading = feeds.field2;
        voltageRotationAngle = (270/voltageFullScaleReading)*voltageMeterReading;
        voltageScaleReading(voltageRotationAngle, 22, '#0E1822');
    }
    else{
      console.log("Failed to fetch API data.");
    }
  }
  
  // Calling the function to fetch and print field1 and field2 every 1 second
  setInterval(fetchDataAndPrint, 1000);
  
  // Set a timeout to get an error after 10 seconds
  setTimeout(() => {
    console.error('Timeout: Failed to fetch data');
  }, 10000);

function voltageScaleReading(rotationAngle, borderWidth, borderColor) {
    // Create a style element
    var style = document.createElement('style');
    document.head.appendChild(style);
    // Get the CSS stylesheet
    var sheet = style.sheet;

    // Define the CSS rule for the pseudo-element
    if(rotationAngle<=90){
        var rule = `
        .voltage-meter::before{
            transform: rotate(${rotationAngle}deg);
            border-bottom: ${borderWidth}px solid ${borderColor};
            transition: transform 500ms linear;
        }`
    }
    else if(rotationAngle<=180){
        rotationAngle = rotationAngle-90;
        var rule = `
            .voltage-meter::before {
                transform: rotate(${rotationAngle}deg);
                border-bottom: ${borderWidth}px solid ${borderColor};
                border-left: ${borderWidth}px solid ${borderColor};
                transition: transform 500ms linear;
            }
        `; 
    }
    else if(rotationAngle<=270){
        rotationAngle = rotationAngle-180;
        var rule = `
            .voltage-meter::before {
                transform: rotate(${rotationAngle}deg);
                border-bottom: ${borderWidth}px solid ${borderColor};
                border-left: ${borderWidth}px solid ${borderColor};
                border-top: ${borderWidth}px solid ${borderColor};
                transition: transform 500ms linear;
            }
        `; 
    }

    // Add the rule to the stylesheet
    sheet.insertRule(rule, sheet.cssRules.length);
}

