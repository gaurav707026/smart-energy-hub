
let ctx = document.getElementById('energyChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Energy Consumption',
                    data: [],
                    borderColor: 'red', // Change the color of the line
                    borderWidth: 2, // Change the width of the line
                    pointBackgroundColor: 'blue', // Change the color of the data points
                    pointRadius: 5, // Change the size of the data points
                    pointHoverRadius: 7, // Change the size of the data points on hover
                    fill: true
                }]
            },
            options: {
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Energy (Watt-seconds)',
                            color: 'blue', // Change the color of the Y-axis title
                            font: {
                                weight: 'bold' // Make the Y-axis title bold
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.5)' // Change the color of the Y-axis grid lines
                        },
                        ticks: {
                            color: 'green', // Change the color of the Y-axis tick labels
                            font: {
                                weight: 'bold' // Make the Y-axis tick labels bold
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time',
                            color: 'red', // Change the color of the X-axis title
                            font: {
                                weight: 'bold' // Make the X-axis title bold
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.5)' // Change the color of the X-axis grid lines
                        },
                        ticks: {
                            color: 'orange', // Change the color of the X-axis tick labels
                            font: {
                                weight: 'bold' // Make the X-axis tick labels bold
                            }
                        }
                    }
                }
            }
        });
let energyLimit = document.querySelector(".energy-limit-input");
let energyLimitButton = document.querySelector(".energy-limit-submit-btn");
let energyLimitingValue = 0;
let meterSwitch = document.querySelector('.meter-switch');
let energyMeterSwitch = false;
let energyScale = document.querySelector('.energyScale');
let energyValue = 0;
let totalEnergy = 0;
// Function to update chart data
function updateChart() {
    // Example data generation
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();
    let currentSecond = currentTime.getSeconds();
    let currentTimeLabel = currentHour + ':' + currentMinute + ':' + currentSecond;
    let priorEnergy = energyValue;
    energyValue = Math.floor(Math.random() * 1000); // Random energy value (replace with actual data)
    totalEnergy += 0.5*(priorEnergy+energyValue);
    if(totalEnergy<3600){
        energyScale.innerText = totalEnergy+'Ws';
    }
    else if(totalEnergy>3600){
        energyScale.innerText = (totalEnergy/3600).toFixed(2)+'Wh';
    }
    if(energyLimitingValue!=0 && totalEnergy>energyLimitingValue){
        insertNotification('Energy Limit Reached', energyLimitingValue/3600);
        energyLimitingValue = 0;
    }
    // Add new data to chart
    if(myChart.data.labels.length <= 10){
        myChart.data.labels.push(currentTimeLabel);
        myChart.data.datasets[0].data.push(energyValue);
    }

    // Remove oldest data if more than 10 points
    else if (myChart.data.labels.length > 10) {
        myChart.data.labels.shift();
        myChart.data.datasets[0].data.shift();
        myChart.data.labels.push(currentTimeLabel);
        myChart.data.datasets[0].data.push(energyValue);
    }

    // Update chart
    myChart.update();

    // Call the function recursively every second
    if(energyMeterSwitch)
    setTimeout(updateChart, 1000);
}
meterSwitch.addEventListener('click', function startPlottingGraph(){
    energyMeterSwitch = !energyMeterSwitch;
    if(energyMeterSwitch){
        meterSwitch.setAttribute("style", "background:#4CAF50;");
        insertNotification("EnergyMeter Started!!", (totalEnergy/3600).toFixed(2));
        updateChart();
    }
    else{
        meterSwitch.setAttribute("style", "background:#ca2626;");
        insertNotification("EnergyMeter Stopped!!", (totalEnergy/3600).toFixed(2));
        return;
    }
});


energyLimitButton.addEventListener('click', function checkEnergyLimit(){
    if(energyLimit.value!=0){
        energyLimitingValue = parseInt(energyLimit.value)*3600;
        insertNotification('Energy Limit Set', energyLimit.value);
        energyLimit.value = '';
    }
    else{
        alert("Enter Any finite value!!!");
    }
});

function insertNotification(paragraphValue, dataValue) {
    // Create a new notification element
    var newNotification = document.createElement('div');
    newNotification.className = 'notification';

    // Create a paragraph element with the provided value
    var paragraph = document.createElement('p');
    paragraph.textContent = paragraphValue;

    // Create a div element for the data with the provided value
    var dataDiv = document.createElement('div');
    dataDiv.className = 'data';
    dataDiv.textContent = dataValue + 'Wh';

    // Append the paragraph and data elements to the notification element
    newNotification.appendChild(paragraph);
    newNotification.appendChild(dataDiv);

    // Select the notification-box element
    var notificationBox = document.querySelector('.notification-box');

    // Insert the new notification element at the beginning of the notification-box
    if (notificationBox) {
        notificationBox.insertBefore(newNotification, notificationBox.firstChild);
    }
}