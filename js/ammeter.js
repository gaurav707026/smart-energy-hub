let currentMeterValue = document.querySelector('.current-meter-value');
let currentFullScaleReading = 10;
let currentMeterReading = 0;
let currentRotationAngle = 0;

async function fetchThingspeakData() {
    try {
      const response = await fetch('https://api.thingspeak.com/channels/2481015/feeds.json?results=2');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data.feeds[0];
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  
  // Define an async function to use await within setInterval
  async function fetchDataAndPrint() {
    const feeds = await fetchThingspeakData();
    if(feeds){
      if(feeds.field2>7){
        currentMeterReading = feeds.field2/1.23;
      }
      else if(feeds.field2>4){
        currentMeterReading = feeds.field2/0.82;
      }
      else if(feeds.field2<4){
        currentMeterReading = feeds.field2/0.41;
      }
        currentMeterValue.innerText = currentMeterReading.toFixed(2) + 'mA';
        currentMeterReading = currentMeterReading.toFixed(2);
        currentRotationAngle = (270/currentFullScaleReading)*currentMeterReading;
        currentScaleReading(currentRotationAngle, 22, '#0E1822');
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
  

function currentScaleReading(rotationAngle, borderWidth, borderColor) {
    // Create a style element
    var style = document.createElement('style');
    document.head.appendChild(style);

    // Get the CSS stylesheet
    var sheet = style.sheet;

    // Define the CSS rule for the pseudo-element
    if(rotationAngle<=90){
        var rule = `
        .current-meter::before{
            transform: rotate(${rotationAngle}deg);
            border-bottom: ${borderWidth}px solid ${borderColor};
            transition: transform 500ms linear;
        }`;
    }
    else if(rotationAngle<=180){
        rotationAngle = rotationAngle-90;
        var rule = `
            .current-meter::before {
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
            .current-meter::before {
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


