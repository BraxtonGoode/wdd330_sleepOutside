function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
  
  export default class Alert {
    constructor(alert) {
      this.alert = alert;
    }
    init() {
      fetchAlertData();
    }
  }
//  The function fetches the alert data and then calls the produceAlerts function to create the alert section.  
  async function fetchAlertData() {
    try {
      const response = await fetch('/json/alert.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const alertData = await convertToJson(response);
      produceAlerts(alertData);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
// the produceAlerts function creates an alert section and appends it to the main element.
  function produceAlerts(alertData) {
    const mainElement = document.querySelector('main');
    if (!mainElement) {
      console.error('Main element not found');
      return;
    }
  
    // Create a single alert section
    const alert = document.createElement('section');
    alert.classList.add('alert');
    alert.innerHTML = `<h2>Alert</h2>`;
  
    // Append multiple messages to the alert section
    alertData.forEach(item => {
      const message = document.createElement('p');
      message.textContent = item.message;
      alert.appendChild(message);
    });
  
    // Append the alert section to the main element
    mainElement.insertAdjacentElement('afterbegin', alert);
  }
  