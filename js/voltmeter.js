let voltageMeterValue = document.querySelector('.voltage-meter-value');
let voltageFullScaleReading = 200;
let voltageMeterReading = 120;
let voltageRotationAngle = (270/voltageFullScaleReading)*voltageMeterReading;
function voltageUpdateMeterReading(voltageMeterValue, voltageMeterReading){
    voltageMeterValue.innerText = voltageMeterReading + 'V';
}
voltageUpdateMeterReading(voltageMeterValue, voltageMeterReading);
voltageMeterReading.addEventListener('change', voltageScaleReading(voltageRotationAngle, 22, '#0E1822'));

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

