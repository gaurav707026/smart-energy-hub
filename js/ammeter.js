let currentMeterValue = document.querySelector('.current-meter-value');
let currentFullScaleReading = 5;
let currentMeterReading = 0;
let currentRotationAngle = 0;
// function currentUpdateMeterReading(currentMeterValue, currentMeterReading){
//     currentMeterValue.innerText = currentMeterReading + 'A';
// }
// currentUpdateMeterReading(currentMeterValue, currentMeterReading);
// currentMeterValue.addEventListener('change', currentScaleReading(currentRotationAngle, 22, '#0E1822'));

async function fetchThingspeakData() {
    try {
      const response = await fetch('https://api.thingspeak.com/channels/2481015/feeds.json?results=2');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data.feeds.map(feed => ({ field1: feed.field1, field2: feed.field2 }));
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  function printField1AndField2(feeds) {
    if (feeds) {
        feeds.forEach(feed => {
        // console.log("Printing current: " + feed.field1 + 'A');
        currentMeterValue.innerText = feed.field1 + 'A';
        currentMeterReading = feed.field1;
        currentRotationAngle = (270/currentFullScaleReading)*currentMeterReading;
        currentScaleReading(currentRotationAngle, 22, '#0E1822');

      });
    } else {
      console.log("Failed to fetch API data.");
    }
  }
  
  // Define an async function to use await within setInterval
  async function fetchDataAndPrint() {
    const feeds = await fetchThingspeakData();
    printField1AndField2(feeds);
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


