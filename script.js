
document.addEventListener('DOMContentLoaded', function() {
// Sample data structure for the schedule (can be replaced with actual JSON data)
const scheduleData = {
    "Monday": [
        { type: "class", name: "SPA 151", location: "Baldy 114", startTime: "11:00 AM", endTime: "11:50 AM", instructor: "", fullName: "Intermediate Spanish Lecture" },
        { type: "class", name: "EAS 207", location: "Clemens 120", startTime: "3:00 PM", endTime: "3:50 PM", instructor: "", fullName: "Statics Lecture" },
        { type: "work", name: "Work Shift", location: "SPA Office", startTime: "4:30 PM", endTime: "6:30 PM" }
    ],
    "Tuesday": [
        { type: "class", name: "MTH 142", location: "NSC 222", startTime: "11:00 AM", endTime: "12:20 PM", instructor: "", fullName: "Calculus 2 Lecture" },
        { type: "class", name: "MTH 142", location: "Capen 240", startTime: "12:30 PM", endTime: "1:20 PM", instructor: "", fullName: "Calculus 2 Recitation" },
    ],
    "Wednesday": [
        { type: "class", name: "SPA 151", location: "Baldy 114", startTime: "11:00 AM", endTime: "11:50 AM", instructor: "", fullName: "Intermediate Spanish Lecture" },
        { type: "class", name: "EAS 207", location: "Clemens 120", startTime: "3:00 PM", endTime: "3:50 PM", instructor: "", fullName: "Statics Lecture" },
        { type: "class", name: "EAS 207", location: "Clemens 103", startTime: "12:00 PM", endTime: "12:50 PM", instructor: "", fullName: "Statics Recitation" },
        { type: "work", name: "Work Shift", location: "SPA Office", startTime: "3:00 PM", endTime: "6:00 PM" }
    ],
    "Thursday": [
        { type: "class", name: "MTH 142", location: "NSC 222", startTime: "11:00 AM", endTime: "12:20 PM", instructor: "", fullName: "Calculus 2 Lecture" },
    ],
    "Friday": [
        { type: "class", name: "SPA 151", location: "Baldy 114", startTime: "11:00 AM", endTime: "11:50 AM", instructor: "", fullName: "Intermediate Spanish Lecture" },
        { type: "class", name: "SPA 151", location: "Bell 325", startTime: "1:00 PM", endTime: "1:50 PM", instructor: "", fullName: "Spanish Recitation" },
        { type: "class", name: "EAS 207", location: "Clemens 120", startTime: "3:00 PM", endTime: "3:50 PM", instructor: "", fullName: "Statics Lecture" },

    ]
};


// Populate schedule
Object.keys(scheduleData).forEach(day => {
    const dayDiv = document.getElementById(day);
    scheduleData[day].forEach(event => {
        const card = document.createElement('div');
        card.className = `card ${event.type === "class" ? 'expandable' : 'work'}`;
        card.innerHTML = `
            <div class="card-content">
                <div>
                    <div class="course-number">${event.name}</div>
                    <div class="location">${event.location}</div>
                </div>
                <div class="times">
                    <div>${event.startTime}</div>
                    <div>${event.endTime}</div>
                </div>
            </div>
            <div class="details">
                ${event.fullName ? event.fullName : ''}
                ${event.instructor ? 'Instructor: ' + event.instructor + '<br>' : ''}
            </div>
        `;
        if (event.type === "class") {
            card.addEventListener('click', () => {
        card.classList.toggle('expanded');
        const details = card.querySelector('.details');
       
    });
        }
        dayDiv.appendChild(card);
    });
});

// Current day highlighting
const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
if (document.getElementById(currentDay)) {
    document.getElementById(currentDay).classList.add('current-day');
}

// Display local time
function updateTime() {
    const localTime = new Date().toLocaleTimeString();
    document.getElementById('localTime').textContent = localTime;
}

setInterval(updateTime, 1000);

// Additional functionality like current class highlighting can be added
// Function to toggle the settings pane
function toggleSettingsPane() {
    const settingsPane = document.getElementById('settings-pane');
    settingsPane.style.display = settingsPane.style.display === 'none' || !settingsPane.style.display ? 'block' : 'none';
}

// Event listener for the settings icon in the dock
document.getElementById('settings-icon').addEventListener('click', toggleSettingsPane);

// Event listener for the close button in the settings pane
document.getElementById('close-settings').addEventListener('click', toggleSettingsPane);

});

// Function to download the current schedule as a JSON file
document.getElementById('download-schedule').addEventListener('click', function() {
    const scheduleData = JSON.stringify(schedule); // Assuming 'schedule' variable contains the schedule data
    const blob = new Blob([scheduleData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedule.json';
    a.click();
    URL.revokeObjectURL(url);
});

// Function to upload a JSON file to replace the existing schedule
document.getElementById('upload-schedule').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const newSchedule = JSON.parse(e.target.result);
        // Update the schedule with the new data
        // This will require additional logic to update the UI based on the new schedule data
    };
    reader.readAsText(file);
});

// Function to clear the current schedule from the page
function clearCurrentSchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    days.forEach(day => {
        const dayElement = document.getElementById(day);
        while (dayElement.firstChild) {
            dayElement.removeChild(dayElement.firstChild);
        }
    });
}

// Function to update the schedule on the page based on the provided data
function updateSchedule(newSchedule) {
    for (const day in newSchedule) {
        const dayElement = document.getElementById(day);
        newSchedule[day].forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('card');
            eventCard.classList.add(event.type === "class" ? 'expandable' : 'work');
            eventCard.innerHTML = `<div class="card-content">
                <div>
                    <div class="course-number">${event.name}</div>
                    <div class="location">${event.location}</div>
                </div>
                <div class="times">
                    <div>${event.startTime} - ${event.endTime}</div>
                </div>
            </div>
            <div class="details">${event.fullName || ""}</div>`;
            if (event.type === "class") {
                eventCard.addEventListener('click', () => {
                    eventCard.classList.toggle('expanded');
                    const details = eventCard.querySelector('.details');
                });
            }
            dayElement.appendChild(eventCard);
        });
    }
}
// Adjusting the previous upload functionality to also update the schedule on the page
document.getElementById('upload-schedule').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const newSchedule = JSON.parse(e.target.result);
        clearCurrentSchedule(); // Clear the current schedule
        updateSchedule(newSchedule); // Update the schedule with the new data
    };
    reader.readAsText(file);
});

function getCurrentSchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const currentSchedule = {};

    days.forEach(day => {
        const dayElement = document.getElementById(day);
        const events = Array.from(dayElement.getElementsByClassName('card')).map(card => {
            const courseNumber = card.querySelector('.course-number').textContent;
            const location = card.querySelector('.location').textContent;
            const times = card.querySelector('.times').querySelectorAll('div');
            const startTime = times[0].textContent.trim(); // First div within "times" for start time
            const endTime = times[1].textContent.trim(); // Second div within "times" for end time
            const details = card.querySelector('.details').textContent.trim();

            return {
                type: "class", // We'll use a default type for now, but this can be adjusted as needed
                name: courseNumber,
                location: location,
                startTime: startTime,
                endTime: endTime,
                instructor: "", // Placeholder for instructor; can be added later if required
                fullName: details
            };
        });

        currentSchedule[day] = events;
    });

    return currentSchedule;
}

// The rest of the code remains the same as before, using the corrected function

// Function to gather the current schedule from the page (corrected for start time and end time)
function getCurrentSchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const currentSchedule = {};

    days.forEach(day => {
        const dayElement = document.getElementById(day);
        const events = Array.from(dayElement.getElementsByClassName('card')).map(card => {
            const courseNumber = card.querySelector('.course-number').textContent;
            const location = card.querySelector('.location').textContent;
            const timeDetails = card.querySelector('.times div').textContent;
            const details = card.querySelector('.details').textContent;

            // Extract start and end times based on the existing format
            const timePattern = /(.+?)(?: - )(.+)/; // Pattern to match "start - end"
            const match = timePattern.exec(timeDetails);
            const startTime = match ? match[1] : "";
            const endTime = match ? match[2] : "";

            return {
                type: "class", // We'll use a default type for now, but this can be adjusted as needed
                name: courseNumber,
                location: location,
                startTime: startTime,
                endTime: endTime,
                instructor: "", // Placeholder for instructor; can be added later if required
                fullName: details
            };
        });

        currentSchedule[day] = events;
    });

    return currentSchedule;
}

// Rest of the code remains the same as before

// Event listener to handle downloading the current schedule as a JSON file (using the corrected function)
document.getElementById('download-schedule').addEventListener('click', function() {
    const currentSchedule = getCurrentSchedule(); // Using the corrected function
    const scheduleData = JSON.stringify(currentSchedule, null, 4);
    const blob = new Blob([scheduleData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedule.json';
    a.click();
    URL.revokeObjectURL(url);
});
