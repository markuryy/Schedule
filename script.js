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
       if (card.classList.contains('expanded')) {
           details.style.display = 'block';
           setTimeout(() => details.classList.add('show'), 0);
       } else {
           details.classList.remove('show');
           setTimeout(() => details.style.display = 'none', 300);
       }
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