let wattmeterValue = document.querySelector('.wattmeter-value');
let wattmeterFullScaleReading = 2000;
let wattmeterReading = voltageMeterReading*currentMeterReading;
let wattmeterRotationAngle = (270/wattmeterFullScaleReading)*wattmeterReading;
function wattmeterUpdateMeterReading(wattmeterValue, wattmeterReading){
    wattmeterValue.innerText = wattmeterReading + 'W';
}
wattmeterUpdateMeterReading(wattmeterValue, wattmeterReading);
wattmeterReading.addEventListener('change', wattmeterScaleReading(wattmeterRotationAngle, 22, '#0E1822'));
function wattmeterScaleReading(rotationAngle, borderWidth, borderColor) {
    // Create a style element
    var style = document.createElement('style');
    document.head.appendChild(style);

    // Get the CSS stylesheet
    var sheet = style.sheet;

    // Define the CSS rule for the pseudo-element
    if(rotationAngle<=90){
        var rule = `
        .wattmeter::before{
            transform: rotate(${rotationAngle}deg);
            border-bottom: ${borderWidth}px solid ${borderColor};
            transition: transform 500ms linear;
        }`;
    }
    else if(rotationAngle<=180){
        rotationAngle = rotationAngle-90;
        var rule = `
            .wattmeter::before {
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
            .wattmeter::before {
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