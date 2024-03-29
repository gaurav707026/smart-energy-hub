let currentMeterValue = document.querySelector('.current-meter-value');
let currentFullScaleReading = 10;
let currentMeterReading = 5;
let currentRotationAngle = (270/currentFullScaleReading)*currentMeterReading;
function currentUpdateMeterReading(currentMeterValue, currentMeterReading){
    currentMeterValue.innerText = currentMeterReading + 'A';
}
currentUpdateMeterReading(currentMeterValue, currentMeterReading);
currentMeterReading.addEventListener('change', currentScaleReading(currentRotationAngle, 22, '#0E1822'));


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


