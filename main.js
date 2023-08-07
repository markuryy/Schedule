// Example data structure for college classes and work schedules
const schedule = {
    monday: [
        { type: 'college', classNumber: 'SPA 151LEC', location: 'Baldy Hall 114', startTime: '11:00', endTime: '11:50', courseName: 'Intermed Spa Lecture', instructor: '', notes: '' },
        { type: 'college', classNumber: 'EAS 207LR', location: 'Clemens Hall 120', startTime: '15:00', endTime: '15:50', courseName: 'Statics Lecture', instructor: '', notes: '' },
        { type: 'work', name: 'Work', location: 'SPA Office', startTime: '15:00', endTime: '18:00' }
    ],
    tuesday: [
        { type: 'college', classNumber: 'MTH 142LR', location: 'NSC 222', startTime: '11:00', endTime: '12:20', courseName: 'Calculus 2 Lecture', instructor: '', notes: '' },
        { type: 'college', classNumber: 'MTH 142LR', location: 'Capen 240', startTime: '12:30', endTime: '13:20', courseName: 'Calculus 2 Recitation', instructor: '', notes: '' }
    ],
    wednesday: [
        { type: 'college', classNumber: 'SPA 151LEC', location: 'Baldy Hall 114', startTime: '11:00', endTime: '11:50', courseName: 'Intermed Spa Lecture', instructor: '', notes: '' },
        { type: 'college', classNumber: 'EAS 207LR', location: 'Clemens Hall 120', startTime: '15:00', endTime: '15:50', courseName: 'Statics Lecture', instructor: '', notes: '' },
        { type: 'college', classNumber: 'EAS 207LR', location: 'Clemens 103', startTime: '12:00', endTime: '12:50', courseName: 'Statics Recitation', instructor: '', notes: '' },
        { type: 'work', name: 'Work', location: 'SPA Office', startTime: '15:00', endTime: '18:00' }
    ],
    thursday: [
        { type: 'college', classNumber: 'MTH 142LR', location: 'NSC 222', startTime: '11:00', endTime: '12:20', courseName: 'Calculus 2 Lecture', instructor: '', notes: '' }
    ],
    friday: [
        { type: 'college', classNumber: 'SPA 151LEC', location: 'Baldy Hall 114', startTime: '11:00', endTime: '11:50', courseName: 'Intermed Spa Lecture', instructor: '', notes: '' },
        { type: 'college', classNumber: 'SPA 151REC', location: 'Bell 325', startTime: '13:00', endTime: '13:50', courseName: 'Spanish Recitation', instructor: '', notes: '' },
        { type: 'college', classNumber: 'EAS 207LR', location: 'Clemens Hall 120', startTime: '15:00', endTime: '15:50', courseName: 'Statics Lecture', instructor: '', notes: '' },
    ],
};

// Function to convert 24-hour time to 12-hour time with AM/PM
function convertTo12Hour(time) {
    const [hour, minute] = time.split(':');
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${suffix}`;
}

// Function to create a card for college class
function createClassCard(classData) {

    const card = document.createElement('div');
    card.className = 'card';

    const content = document.createElement('div');
    content.className = 'card-content';

    content.innerHTML = `
    <div class="card-title">${classData.classNumber}</div>
    ${classData.location}
    <div class="card-time">
      <span>${convertTo12Hour(classData.startTime)}</span>  
      <span>${convertTo12Hour(classData.endTime)}</span>
    </div>
  `;

    card.appendChild(content);

    return card;

}

// Function to create a card for work schedule
function createWorkCard(workData) {
    const card = document.createElement('div');
    card.className = 'card work-card';

    const content = document.createElement('div');
    content.className = 'card-content';
    content.innerHTML = `<div class="card-title">${workData.name}</div><div class="card-location">${workData.location}</div><div class="card-time">${convertTo12Hour(workData.startTime)} - ${convertTo12Hour(workData.endTime)}</div>`;

    card.appendChild(content);
    return card;
}

// Function to render the schedule
function renderSchedule() {
    const now = new Date();
    const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];

    for (const day in schedule) {
        const dayContainer = document.getElementById(day);

        if (day === currentDay) {
            dayContainer.classList.add('current-day');
        }

        schedule[day].forEach(event => {
            const card = event.type === 'college' ? createClassCard(event) : createWorkCard(event);

            const startTime = new Date(`1970-01-01T${event.startTime}:00`);
            const endTime = new Date(`1970-01-01T${event.endTime}:00`);
            if (now >= startTime && now <= endTime && day === currentDay) {
                card.classList.add('current-class');
            }

            dayContainer.appendChild(card);
        });
    }

}

// Function to update the local time
function updateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();
    timeElement.innerHTML = `Current Time: ${now.toLocaleTimeString()}`;
}

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', function() {
        // Toggle expanded class
        card.classList.toggle('expanded');

        // Update max-height
        if(card.classList.contains('expanded')) {
            card.style.maxHeight = '200px';
        } else {
            card.style.maxHeight = '100px';
        }
    });
});


cards.forEach(card => {

    card.addEventListener('click', function() {

        // Toggle expanded class
        card.classList.toggle('expanded');

        // Update max-height
        if(card.classList.contains('expanded')) {
            card.style.maxHeight = '200px';
        } else {
            card.style.maxHeight = '100px';
        }

    });

});

// Call functions to render the schedule and update time
renderSchedule();
setInterval(updateTime, 1000);
