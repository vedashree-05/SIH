// =============================================
// TEMPLE DATA CONFIGURATION
// =============================================

const templeData = {
    somnath: {
        name: "Somnath Temple",
        info: "Veraval, Gujarat - Open 6 AM to 9 PM",
        queueTime: "45 minutes",
        special: "🌅 Sea-side darshan available",
        openingTime: "6:00 AM",
        closingTime: "9:00 PM",
        specialDarshan: "Available",
        nextAarti: "7:00 PM",
        crowdForecast: "8,500 pilgrims",
        currentCount: "3,200 pilgrims",
        peakHour: "11:00 AM - 2:00 PM",
        gateDensity: "Medium",
        parkingStatus: "60%",
        medicalStatus: "Normal",
        emergencyContacts: ["Security: +91-2876-233473", "Medical: +91-2876-233474"],
        facilities: ["Beach access", "Light show", "Museum"]
    },
    dwarka: {
        name: "Dwarka Temple",
        info: "Dwarka, Gujarat - Open 7 AM to 8:30 PM", 
        queueTime: "60 minutes",
        special: "🚗 Special parking for buses",
        openingTime: "7:00 AM",
        closingTime: "8:30 PM",
        specialDarshan: "Available",
        nextAarti: "6:30 PM",
        crowdForecast: "7,200 pilgrims",
        currentCount: "2,800 pilgrims",
        peakHour: "10:00 AM - 1:00 PM",
        gateDensity: "High",
        parkingStatus: "75%",
        medicalStatus: "Normal",
        emergencyContacts: ["Security: +91-2892-234118", "Coastal police: +91-2892-234119"],
        facilities: ["Bet Dwarka ferry info", "Museum", "Guest houses"]
    },
    ambaji: {
        name: "Ambaji Temple", 
        info: "Ambaji, Gujarat - Open 6:30 AM to 9:30 PM",
        queueTime: "30 minutes",
        special: "🚡 Ropeway available to Gabbar Hill",
        openingTime: "6:30 AM",
        closingTime: "9:30 PM",
        specialDarshan: "Available",
        nextAarti: "8:00 PM",
        crowdForecast: "5,800 pilgrims",
        currentCount: "1,900 pilgrims",
        peakHour: "12:00 PM - 3:00 PM",
        gateDensity: "Low",
        parkingStatus: "45%",
        medicalStatus: "Normal",
        emergencyContacts: ["Security: +91-2749-240101", "Medical: +91-2749-240102"],
        facilities: ["Ropeway booking", "Hill viewpoint", "Market area"]
    },
    pavagadh: {
        name: "Pavagadh Temple",
        info: "Pavagadh, Gujarat - Open 5 AM to 10 PM",
        queueTime: "75 minutes", 
        special: "🚠 Ropeway queue: 20 minutes",
        openingTime: "5:00 AM",
        closingTime: "10:00 PM",
        specialDarshan: "Available",
        nextAarti: "7:30 PM",
        crowdForecast: "6,500 pilgrims",
        currentCount: "3,500 pilgrims",
        peakHour: "9:00 AM - 12:00 PM",
        gateDensity: "Medium",
        parkingStatus: "80%",
        medicalStatus: "Busy",
        emergencyContacts: ["Ropeway safety: +91-2676-245678", "Medical: +91-2676-245679"],
        facilities: ["Ropeway service", "Fort ruins", "Waterfalls"]
    }
};

let currentTemple = 'somnath';
let currentManagedTemple = 'somnath';

// =============================================
// DASHBOARD FUNCTIONS
// =============================================

function changeManagedTemple() {
    currentManagedTemple = document.getElementById('manage-temple-select').value;
    const temple = templeData[currentManagedTemple];
    
    // Update managed temple info
    document.getElementById('managed-temple-info').innerHTML = `
        <strong>Managing: ${temple.name}</strong>
    `;
    
    // Update all dashboard data
    updateDashboardData(temple);
    
    showNotification(`Now managing ${temple.name}`);
}

function updateDashboardData(temple) {
    document.getElementById('crowd-forecast').textContent = temple.crowdForecast;
    document.getElementById('current-count').textContent = temple.currentCount;
    document.getElementById('peak-hour').textContent = temple.peakHour;
    document.getElementById('gate-density').textContent = temple.gateDensity;
    document.getElementById('queue-time').textContent = temple.queueTime;
    document.getElementById('parking-status').textContent = temple.parkingStatus;
    document.getElementById('medical-status').textContent = temple.medicalStatus;
    
    // Update status colors based on values
    updateStatusColors();
}

function updateStatusColors() {
    // This function would update status colors based on actual values
    // For now, we'll keep the predefined colors
}

function updateQueueTime() {
    const newTime = prompt("Enter new queue time (in minutes):");
    if (newTime && !isNaN(newTime)) {
        // Update dashboard
        document.getElementById('queue-time').textContent = `${newTime} mins`;
        
        // Update temple data
        templeData[currentManagedTemple].queueTime = `${newTime} minutes`;
        
        // Update pilgrim app if open
        const waitTime = document.getElementById('wait-time');
        if (waitTime) {
            waitTime.textContent = `${newTime} minutes`;
        }
        
        showNotification(`Queue time updated to ${newTime} minutes`);
    }
}

function addMedicalStaff() {
    showNotification('Medical staff deployment request sent!');
    document.getElementById('medical-status').textContent = 'Help Arriving';
    document.getElementById('medical-status').className = 'status medium';
}

function manageTraffic() {
    showNotification('Traffic management team alerted!');
    document.getElementById('parking-status').textContent = 'Managing...';
    document.getElementById('parking-status').className = 'status medium';
    
    // Simulate traffic improvement after 5 seconds
    setTimeout(() => {
        document.getElementById('parking-status').textContent = '50%';
        document.getElementById('parking-status').className = 'status low';
        showNotification('Traffic flow improved');
    }, 5000);
}

function openPilgrimView() {
    window.open('piligrim-app.html', '_blank');
}

// =============================================
// ENHANCED ALERT SYSTEM
// =============================================

function sendAlert() {
    const alertTemplates = {
        crowd: "🚶‍♂️ High crowd expected in the next hour. Please plan your visit accordingly.",
        weather: "🌧️ Weather alert: Rain expected. Umbrellas available at entrance.",
        queue: "⏱️ Queue time has reduced. Good time for darshan!",
        emergency: "🚨 Emergency: Temporary closure at main gate. Use alternative entrance.",
        medical: "🏥 Medical camp available near sanctum for immediate assistance.",
        special: "🕉️ Special aarti scheduled in 30 minutes. Limited seats available."
    };

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3 style="margin-bottom: 20px; color: #333;">📢 Send Alert to Pilgrims</h3>
            <p style="margin-bottom: 15px; color: #666;">Temple: ${templeData[currentManagedTemple].name}</p>
            
            <div style="margin-bottom: 20px;">
                <h4>Quick Templates:</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                    ${Object.entries(alertTemplates).map(([key, value]) => `
                        <button onclick="selectTemplate('${key}')" class="template-btn">${key.charAt(0).toUpperCase() + key.slice(1)}</button>
                    `).join('')}
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold;">Custom Message:</label>
                <textarea id="custom-alert" placeholder="Type your custom alert message here..." 
                         style="width: 100%; height: 100px; padding: 12px; border: 2px solid #ddd; border-radius: 8px; resize: vertical; font-family: inherit;"></textarea>
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="closeModal()" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                <button onclick="sendCustomAlert()" style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">Send Alert to All Pilgrims</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function selectTemplate(templateType) {
    const templates = {
        crowd: "🚶‍♂️ High crowd expected in the next hour. Please plan your visit accordingly.",
        weather: "🌧️ Weather alert: Rain expected. Umbrellas available at entrance.",
        queue: "⏱️ Queue time has reduced. Good time for darshan!",
        emergency: "🚨 Emergency: Temporary closure at main gate. Use alternative entrance.",
        medical: "🏥 Medical camp available near sanctum for immediate assistance.",
        special: "🕉️ Special aarti scheduled in 30 minutes. Limited seats available."
    };

    // Remove previous selections
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Mark current selection
    event.target.classList.add('selected');
    
    // Set the textarea value
    document.getElementById('custom-alert').value = templates[templateType];
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function sendCustomAlert() {
    const message = document.getElementById('custom-alert').value.trim();
    
    if (!message) {
        alert('Please enter an alert message or select a template.');
        return;
    }

    // Add to dashboard alerts
    const alertsContainer = document.getElementById('dashboard-alerts');
    if (alertsContainer) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert warning';
        alertDiv.innerHTML = `
            <strong>📢 Sent to Pilgrims:</strong><br>
            ${message}
            <div class="alert-time">${new Date().toLocaleTimeString()}</div>
        `;
        alertsContainer.appendChild(alertDiv);
    }

    // Add to alert history
    const alertHistory = document.getElementById('alert-history-list');
    if (alertHistory) {
        const historyItem = document.createElement('div');
        historyItem.className = 'alert-history-item';
        historyItem.innerHTML = `
            <strong>Alert:</strong> ${message}
            <div class="alert-time">${new Date().toLocaleTimeString()} - ${templeData[currentManagedTemple].name}</div>
        `;
        alertHistory.appendChild(historyItem);
    }

    // Add to pilgrim app if open
    const pilgrimAlerts = document.getElementById('pilgrim-alerts');
    if (pilgrimAlerts) {
        const alertItem = document.createElement('div');
        alertItem.className = 'alert-item';
        alertItem.innerHTML = `
            ${message}
            <div class="alert-time">${new Date().toLocaleTimeString()}</div>
        `;
        pilgrimAlerts.prepend(alertItem);
    }

    showNotification(`✅ Alert sent successfully to all pilgrims!`);
    closeModal();
}

// =============================================
// PILGRIM APP FUNCTIONS
// =============================================

function changeTemple() {
    currentTemple = document.getElementById('temple-select').value;
    const temple = templeData[currentTemple];
    
    // Update temple info
    document.getElementById('temple-info').innerHTML = `
        <strong>${temple.name}</strong><br>
        <small>${temple.info}</small>
    `;
    
    // Update all temple-specific data
    document.getElementById('wait-time').textContent = temple.queueTime;
    document.getElementById('temple-special').textContent = temple.special;
    document.getElementById('opening-time').textContent = temple.openingTime;
    document.getElementById('closing-time').textContent = temple.closingTime;
    document.getElementById('special-darshan').textContent = temple.specialDarshan;
    document.getElementById('next-aarti').textContent = temple.nextAarti;
    document.getElementById('emergency-contacts').innerHTML = `
        <small>📞 ${temple.emergencyContacts.join(' | ')}</small>
    `;
    
    showNotification(`Switched to ${temple.name}`);
}

function bookSlot() {
    const availableSlots = ['10:00 AM', '11:30 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
    const slotList = availableSlots.map(slot => `• ${slot}`).join('\n');
    const slot = prompt(`Available slots for ${templeData[currentTemple].name}:\n${slotList}\n\nEnter preferred slot:`);
    
    if (slot && availableSlots.includes(slot)) {
        showNotification(`✅ Slot booked successfully for ${slot}!\nYour token will be sent via SMS.`);
        
        // Add to bookings
        const pilgrimAlerts = document.getElementById('pilgrim-alerts');
        if (pilgrimAlerts) {
            const bookingAlert = document.createElement('div');
            bookingAlert.className = 'alert-item';
            bookingAlert.style.background = '#d4edda';
            bookingAlert.style.borderLeftColor = '#28a745';
            bookingAlert.innerHTML = `
                ✅ <strong>Booking Confirmed:</strong> ${slot} at ${templeData[currentTemple].name}
                <div class="alert-time">Token: #${Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
            `;
            pilgrimAlerts.prepend(bookingAlert);
        }
    } else if (slot) {
        alert('❌ Slot not available. Please choose from available slots.');
    }
}

function sendEmergency() {
    if (confirm('🚨 Send emergency alert to security team?\nYour location will be shared.')) {
        const temple = templeData[currentTemple];
        const locations = ['Main Gate', 'Sanctum Area', 'Parking Lot', 'Queue Area', 'Ropeway Station'];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        
        showNotification('Help is on the way! Security team notified.');
        
        // Add to pilgrim app alerts
        const pilgrimAlerts = document.getElementById('pilgrim-alerts');
        if (pilgrimAlerts) {
            const emergencyAlert = document.createElement('div');
            emergencyAlert.className = 'alert-item';
            emergencyAlert.style.background = '#f8d7da';
            emergencyAlert.style.borderLeftColor = '#dc3545';
            emergencyAlert.innerHTML = `
                🚨 <strong>Emergency Assistance Requested</strong><br>
                Location: ${randomLocation}<br>
                <div class="alert-time">Help is arriving...</div>
            `;
            pilgrimAlerts.prepend(emergencyAlert);
        }

        // Simulate adding emergency to dashboard (in real app, this would be via backend)
        const emergencyList = document.getElementById('emergency-list');
        if (emergencyList) {
            const emergencyItem = document.createElement('div');
            emergencyItem.className = 'emergency-item';
            emergencyItem.innerHTML = `
                🚨 <strong>PILGRIM EMERGENCY</strong><br>
                Temple: ${temple.name}<br>
                Location: ${randomLocation}<br>
                Time: ${new Date().toLocaleTimeString()}
                <button onclick="resolveEmergency(this)" style="margin-left: 10px; padding: 5px 10px; background: #27ae60; color: white; border: none; border-radius: 3px; cursor: pointer; margin-top: 5px;">
                    Mark Resolved
                </button>
            `;
            emergencyList.appendChild(emergencyItem);
        }
    }
}

function resolveEmergency(button) {
    const alertDiv = button.parentElement;
    alertDiv.style.background = '#d4edda';
    alertDiv.style.border = '1px solid #c3e6cb';
    alertDiv.style.color = '#155724';
    alertDiv.innerHTML = '✅ Emergency resolved - ' + new Date().toLocaleTimeString();
    showNotification('Emergency marked as resolved');
}

// =============================================
// PILGRIM APP NAVIGATION
// =============================================

function showHome() {
    showNotification('Showing Home Screen');
    // Scroll to top
    window.scrollTo(0, 0);
}

function showMap() {
    showNotification('Opening Temple Map');
    alert(`🗺️ Map feature for ${templeData[currentTemple].name}\n\nThis would show:\n• Temple layout\n• Your location\n• Facilities\n• Emergency exits`);
}

function showBookings() {
    showNotification('Showing Your Bookings');
    alert('🎫 My Bookings\n\nThis would show your:\n• Darshan slots\n• Hotel bookings\n• Transportation\n• Previous visits');
}

function showHelp() {
    showNotification('Help & Support Section');
    alert('❓ Help & Support\n\n• FAQ\n• Contact temple office\n• Feedback\n• Report issues\n• Emergency guidelines');
}

// =============================================
// NOTIFICATION SYSTEM
// =============================================

function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// =============================================
// REAL-TIME UPDATES SIMULATION
// =============================================

function simulateRealTimeUpdates() {
    // Randomly update queue times slightly
    const waitTime = document.getElementById('wait-time');
    if (waitTime) {
        const currentTime = parseInt(waitTime.textContent);
        if (!isNaN(currentTime)) {
            const variation = Math.floor(Math.random() * 10) - 3; // -3 to +6
            const newTime = Math.max(5, currentTime + variation);
            waitTime.textContent = `${newTime} minutes`;
            
            // Update temple data
            templeData[currentTemple].queueTime = `${newTime} minutes`;
        }
    }

    // Update dashboard queue time if managing the same temple
    const queueTimeElement = document.getElementById('queue-time');
    if (queueTimeElement && currentManagedTemple === currentTemple) {
        const currentTime = parseInt(waitTime.textContent);
        if (!isNaN(currentTime)) {
            queueTimeElement.textContent = `${currentTime} mins`;
        }
    }

    // Occasionally add random alerts (10% chance)
    if (Math.random() < 0.1) {
        const randomAlerts = [
            "🕒 Queue moving faster than expected",
            "🌤️ Weather is pleasant for darshan",
            "💧 Water stations now available near queue area",
            "🪑 Seating arrangement improved in waiting area",
            "🎵 Bhajan program starting in main hall"
        ];
        const randomAlert = randomAlerts[Math.floor(Math.random() * randomAlerts.length)];
        
        const pilgrimAlerts = document.getElementById('pilgrim-alerts');
        if (pilgrimAlerts) {
            const alertItem = document.createElement('div');
            alertItem.className = 'alert-item';
            alertItem.innerHTML = `
                ${randomAlert}
                <div class="alert-time">${new Date().toLocaleTimeString()}</div>
            `;
            pilgrimAlerts.prepend(alertItem);
        }
    }

    // Simulate crowd count changes on dashboard
    const currentCountElement = document.getElementById('current-count');
    if (currentCountElement) {
        const currentCount = parseInt(currentCountElement.textContent.replace(/[^0-9]/g, ''));
        if (!isNaN(currentCount)) {
            const change = Math.floor(Math.random() * 100) - 30; // -30 to +70
            const newCount = Math.max(0, currentCount + change);
            currentCountElement.textContent = `${newCount.toLocaleString()} pilgrims`;
            templeData[currentManagedTemple].currentCount = `${newCount.toLocaleString()} pilgrims`;
        }
    }
}

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize temple selection
    if (document.getElementById('temple-select')) {
        changeTemple(); // Initialize pilgrim app
    }
    
    if (document.getElementById('manage-temple-select')) {
        changeManagedTemple(); // Initialize dashboard
    }
    
    // Start real-time updates every 30 seconds
    setInterval(simulateRealTimeUpdates, 30000);
    
    // Add template button styles
    const style = document.createElement('style');
    style.textContent = `
        .template-btn {
            padding: 10px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.3s ease;
        }
        .template-btn:hover {
            background: #2980b9;
            transform: scale(1.02);
        }
        .template-btn.selected {
            background: #e74c3c;
            border: 2px solid #c0392b;
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
});
