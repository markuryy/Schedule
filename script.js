let currentSchedule;

// Populate schedule
function populateSchedule(scheduleData) {
    currentSchedule = scheduleData;
    Object.keys(scheduleData).forEach((day) => {
        const dayDiv = document.getElementById(day);
        scheduleData[day].forEach((event) => {
            const card = document.createElement("div");
            card.className = `card ${event.type === "class" ? "expandable" : "work"}`;
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
                    ${event.fullName ? event.fullName : ""}
                    ${event.section ? "Section: " + event.section + "<br>" : ""}
                    ${event.instructor
                    ? "Instructor: " + event.instructor + "<br>"
                    : ""
                }
                </div>
            `;
            if (event.type === "class") {
                card.addEventListener("click", () => {
                    card.classList.toggle("expanded");
                    const details = card.querySelector(".details");
                });
            }
            dayDiv.appendChild(card);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Sample data structure for the schedule (can be replaced with actual JSON data)
    const sampleScheduleData = {
        Monday: [
            {
                type: "class",
                name: "IE 323LLB",
                location: "Frnczk 454",
                startTime: "10:00 AM",
                endTime: "10:50 AM",
                fullName: "Human Factors in System Design LEC",
                section: "LEC",
            },
            {
                type: "class",
                name: "IE 320LEC",
                location: "Alumni 97",
                startTime: "11:00 AM",
                endTime: "11:50 AM",
                fullName: "Engineering Economy",
                section: "B",
            },
            {
                type: "class",
                name: "EAS 305LR",
                location: "Knox 04",
                startTime: "2:00 PM",
                endTime: "2:50 PM",
                fullName: "Appl Prob & Stat",
                section: "A",
            },
            {
                type: "work",
                name: "Work Shift",
                location: "SPA Office",
                startTime: "4:00 PM",
                endTime: "6:00 PM",
            },
        ],
        Tuesday: [],
        Wednesday: [
            {
                type: "class",
                name: "IE 323LLB",
                location: "Frnczk 454",
                startTime: "10:00 AM",
                endTime: "10:50 AM",
                fullName: "Human Factors in System Design LEC",
                section: "LEC",
            },
            {
                type: "class",
                name: "IE 320LEC",
                location: "Alumni 97",
                startTime: "11:00 AM",
                endTime: "11:50 AM",
                fullName: "Engineering Economy",
                section: "B",
            },
            {
                type: "class",
                name: "EAS 305LR",
                location: "Knox 04",
                startTime: "2:00 PM",
                endTime: "2:50 PM",
                fullName: "Appl Prob & Stat",
                section: "A",
            },
            {
                type: "work",
                name: "Work Shift",
                location: "SPA Office",
                startTime: "4:00 PM",
                endTime: "6:00 PM",
            },
        ],
        Thursday: [
            {
                type: "class",
                name: "IE 323LLB",
                location: "Capen 201A",
                startTime: "10:30 AM",
                endTime: "12:20 PM",
                fullName: "Human Factors in System Design LAB",
                section: "LAB2",
            },
        ],
        Friday: [
            {
                type: "class",
                name: "IE 323LLB",
                location: "Frnczk 454",
                startTime: "10:00 AM",
                endTime: "10:50 AM",
                fullName: "Human Factors in System Design LEC",
                section: "LEC",
            },
            {
                type: "class",
                name: "IE 320LEC",
                location: "Alumni 97",
                startTime: "11:00 AM",
                endTime: "11:50 AM",
                fullName: "Engineering Economy",
                section: "B",
            },
            {
                type: "class",
                name: "EAS 305LR",
                location: "Knox 04",
                startTime: "2:00 PM",
                endTime: "2:50 PM",
                fullName: "Appl Prob & Stat",
                section: "A",
            },
            {
                type: "class",
                name: "EAS 305LR",
                location: "Davis 101",
                startTime: "5:00 PM",
                endTime: "5:50 PM",
                fullName: "Appl Prob & Stat Recitation",
                section: "A1",
            },
        ],
    };
    

    populateSchedule(sampleScheduleData);

    // Current day highlighting
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
    if (document.getElementById(currentDay)) {
        document.getElementById(currentDay).classList.add("current-day");
    }
});

/* ---------------------------------- Clock --------------------------------- */
// Display local time
function updateTime() {
    const localTime = new Date().toLocaleTimeString();
    document.getElementById("localTime").textContent = localTime;
}
setInterval(updateTime, 1000);
/* -------------------------------------------------------------------------- */

/* ----------------------------- Settings Modal ----------------------------- */
// Additional functionality like current class highlighting can be added
// Function to toggle the settings pane
function toggleSettingsPane() {
    const settingsPane = document.getElementById("settings-pane");
    settingsPane.style.display =
        settingsPane.style.display === "none" || !settingsPane.style.display
            ? "block"
            : "none";
}
// Event listener for the settings icon in the dock
document
    .getElementById("settings-icon")
    .addEventListener("click", toggleSettingsPane);
// Event listener for the close button in the settings pane
document
    .getElementById("close-settings")
    .addEventListener("click", toggleSettingsPane);
/* -------------------------------------------------------------------------- */

/* -------------------------------- Download -------------------------------- */
// Function to download the current schedule as a JSON file
document
    .getElementById("download-schedule")
    .addEventListener("click", function () {
        const scheduleData = JSON.stringify(currentSchedule); // Assuming 'schedule' variable contains the schedule data
        const blob = new Blob([scheduleData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "schedule.json";
        a.click();
        URL.revokeObjectURL(url);
    });
/* -------------------------------------------------------------------------- */

/* --------------------------------- Upload --------------------------------- */

// Function to clear the current schedule from the page
function clearCurrentSchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    days.forEach((day) => {
        const dayElement = document.getElementById(day);
        dayElement.innerHTML = `${day}`;
    });
}

// Function to upload a JSON file to replace the existing schedule
document
    .getElementById("upload-schedule")
    .addEventListener("change", function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const newSchedule = JSON.parse(e.target.result);
            // Update the schedule with the new data
            // This will require additional logic to update the UI based on the new schedule data
            clearCurrentSchedule();
            populateSchedule(newSchedule);
        };
        reader.readAsText(file);
    });
/* -------------------------------------------------------------------------- */
