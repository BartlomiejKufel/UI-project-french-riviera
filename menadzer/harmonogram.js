let shifts = [
    { id: "1", worker: "Karolina Sowa", dept: "Housekeeping", date: "2026-05-14", start: "07:00", end: "15:00", status: "Na zmianie", note: "Zmiana poranna" },
    { id: "2", worker: "Zofia Wróbel", dept: "Housekeeping", date: "2026-05-14", start: "11:00", end: "19:00", status: "Na zmianie", note: "Obsługa pokoi Premium" },
    { id: "3", worker: "Ewa Dąbrowska", dept: "Housekeeping", date: "2026-05-14", start: "15:00", end: "23:00", status: "Planowana", note: "Zmiana wieczorna" },
    { id: "4", worker: "Rafał Krawczyk", dept: "Maintenance", date: "2026-05-14", start: "09:00", end: "17:00", status: "Na zmianie", note: "Przegląd instalacji klimatyzacji" },
    { id: "5", worker: "Piotr Zieliński", dept: "Maintenance", date: "2026-05-14", start: "15:00", end: "23:00", status: "Planowana", note: "Dyżur techniczny" },
    { id: "6", worker: "Michał Nowak", dept: "Kuchnia", date: "2026-05-14", start: "07:00", end: "11:00", status: "Zakończona", note: "Przygotowanie śniadań" },
    { id: "7", worker: "Marek Jabłoński", dept: "Kuchnia", date: "2026-05-14", start: "11:00", end: "19:00", status: "Na zmianie", note: "Serwis lunchowy i obiadowy" },
    { id: "8", worker: "Michał Nowak", dept: "Kuchnia", date: "2026-05-14", start: "19:00", end: "23:00", status: "Planowana", note: "Serwis kolacyjny i zamknięcie kuchni" },
    { id: "9", worker: "Katarzyna Wiśniewska", dept: "Recepcja", date: "2026-05-14", start: "07:00", end: "15:00", status: "Na zmianie", note: "Check-in gości VIP" },
    { id: "10", worker: "Marta Wiśniewska", dept: "Recepcja", date: "2026-05-14", start: "15:00", end: "23:00", status: "Planowana", note: "Check-out i obsługa nocna" }
];

// Mapowanie nazw działów na klasy CSS
const deptClasses = {
    "Housekeeping": "housekeeping",
    "Kuchnia": "kitchen",
    "Recepcja": "reception",
    "Maintenance": "maintenance",
    "Administracja": "administration"
};

// Pomocnicza funkcja konwersji czasu "HH:MM" na minuty
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Pomocnicza funkcja wyliczania czasu trwania w godzinach
function calculateDurationText(start, end) {
    const diffMin = timeToMinutes(end) - timeToMinutes(start);
    const hours = diffMin / 60;
    if (hours === 1) return "1 godzina";
    if (hours >= 2 && hours <= 4) return `${hours} godziny`;
    return `${hours} godzin`;
}

// Algorytm wyznaczania torów (lanes) dla zmian w celu uniknięcia nakładania się na siebie
function allocateLanes(shiftsList) {
    // Każda zmiana ma swój unikalny tor (kolumnę) w kolejności w jakiej występują w oryginalnej tablicy (grupowane działami)
    shiftsList.forEach((shift, index) => {
        shift.lane = index + 1;
    });

    return shiftsList.length;
}

const gridContainer = document.getElementById('timeline-grid');
const form = document.getElementById('shift-form');
const hiddenIdInput = document.getElementById('shift-id');
const workerSelect = document.getElementById('shift-worker');
const deptSelect = document.getElementById('shift-dept');
const dateSelect = document.getElementById('shift-date');
const startSelect = document.getElementById('shift-start');
const endSelect = document.getElementById('shift-end');
const durationInput = document.getElementById('shift-duration');
const statusSelect = document.getElementById('shift-status');
const noteTextarea = document.getElementById('shift-note');
const btnDelete = document.getElementById('btn-delete-shift');

function renderSchedule() {
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';

    const hourBg = document.createElement('div');
    hourBg.className = 'timeline-sticky-hour-bg';
    gridContainer.appendChild(hourBg);

    // Renderowanie linii godzinowych i znaczników czasu (oś Y)
    const startHour = 7;
    const endHour = 23;
    
    const totalLanes = Math.max(6, allocateLanes(shifts));
    
    // Dynamiczne dopasowanie liczby kolumn w siatce
    const gridColumns = `52px repeat(${totalLanes}, 100px) 1fr`;
    gridContainer.style.gridTemplateColumns = gridColumns;

    for (let hour = startHour; hour <= endHour; hour++) {
        // Renderujemy linię i znacznik tylko co 2 godziny oraz na samym końcu (23:00)
        if ((hour - startHour) % 2 === 0 || hour === endHour) {
            const line = document.createElement('div');
            line.className = 'grid-line';
            if (hour === endHour) {
                line.style.gridRow = `${endHour - startHour}`;
                line.style.alignSelf = 'end';
            } else {
                line.style.gridRow = `${hour - startHour + 1}`;
            }
            gridContainer.appendChild(line);

            const marker = document.createElement('div');
            marker.className = 'hour-marker';
            if (hour === endHour) {
                marker.style.gridRow = `${endHour - startHour}`;
                marker.style.alignSelf = 'end';
                marker.style.transform = 'translateY(50%) translateY(10px)';
            } else {
                marker.style.gridRow = `${hour - startHour + 1}`;
            }
            
            const displayHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
            marker.textContent = displayHour;
            gridContainer.appendChild(marker);
        }
    }

    for (let lane = 1; lane <= totalLanes; lane++) {
        const vLine = document.createElement('div');
        vLine.className = 'grid-v-line';
        vLine.style.gridColumn = `${lane + 1}`;
        vLine.style.gridRow = '1 / -1';
        gridContainer.appendChild(vLine);
    }

    // Renderowanie Shift Cards
    shifts.forEach(shift => {
        const startMin = timeToMinutes(shift.start);
        const endMin = timeToMinutes(shift.end);
        const baseMin = timeToMinutes("07:00");
        
        const startRow = Math.max(1, ((startMin - baseMin) / 60) + 1);
        const endRow = Math.min(17, ((endMin - baseMin) / 60) + 1);
        const colPosition = shift.lane + 1;

        const card = document.createElement('div');
        const deptClass = deptClasses[shift.dept] || 'other';
        card.className = `shift-card ${deptClass}`;
        if (hiddenIdInput.value === shift.id) {
            card.classList.add('selected');
        }
        
        card.style.gridRow = `${startRow} / ${endRow}`;
        card.style.gridColumn = `${colPosition}`;

        const firstName = shift.worker.split(' ')[0];

        card.innerHTML = `
            <span class="shift-worker-name">${firstName}</span>
            <span class="shift-role-label">${shift.dept}</span>
            <span class="shift-hours-label">${shift.start}–${shift.end}</span>
        `;

        card.addEventListener('click', () => selectShift(shift));
        gridContainer.appendChild(card);
    });
}

function selectShift(shift) {
    document.querySelectorAll('.shift-card').forEach(c => c.classList.remove('selected'));
    
    renderSchedule(); // Ponowne renderowanie zaktualizuje klasy selected

    hiddenIdInput.value = shift.id;
    workerSelect.value = shift.worker;
    deptSelect.value = shift.dept;
    dateSelect.value = shift.date;
    startSelect.value = shift.start;
    endSelect.value = shift.end;
    statusSelect.value = shift.status;
    noteTextarea.value = shift.note || '';
    
    durationInput.value = calculateDurationText(shift.start, shift.end);
}

// Automatyczne przeliczanie czasu trwania po zmianie godzin
function updateDuration() {
    const startVal = startSelect.value;
    const endVal = endSelect.value;
    
    if (timeToMinutes(startVal) >= timeToMinutes(endVal)) {
        // Jeśli godzina rozpoczęcia jest późniejsza niż zakończenia, automatycznie ustaw koniec na start + 1h
        const [h, m] = startVal.split(':').map(Number);
        const nextHour = h + 1;
        const newEnd = nextHour < 10 ? `0${nextHour}:00` : `${nextHour}:00`;
        endSelect.value = newEnd;
    }
    
    durationInput.value = calculateDurationText(startSelect.value, endSelect.value);
}

startSelect.addEventListener('change', updateDuration);
endSelect.addEventListener('change', updateDuration);

// Zapisywanie formularza
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = hiddenIdInput.value;
    const worker = workerSelect.value;
    const dept = deptSelect.value;
    const date = dateSelect.value;
    const start = startSelect.value;
    const end = endSelect.value;
    const status = statusSelect.value;
    const note = noteTextarea.value;
    
    if (id) {
        const index = shifts.findIndex(s => s.id === id);
        if (index !== -1) {
            shifts[index] = { ...shifts[index], worker, dept, date, start, end, status, note };
        }
    } else {
        // Dodawanie nowej zmiany
        const newId = String(Date.now());
        shifts.push({ id: newId, worker, dept, date, start, end, status, note });
        hiddenIdInput.value = newId;
    }
    
    renderSchedule();
});

// Usuwanie zmiany
btnDelete.addEventListener('click', () => {
    const id = hiddenIdInput.value;
    if (!id) return;
    
    shifts = shifts.filter(s => s.id !== id);
    
    form.reset();
    hiddenIdInput.value = '';
    durationInput.value = '8 godzin';
    
    renderSchedule();
});

// Synchronizacja wyboru pracownika z działem
const workerDepts = {
    "Karolina Sowa": "Housekeeping",
    "Zofia Wróbel": "Housekeeping",
    "Ewa Dąbrowska": "Housekeeping",
    "Michał Nowak": "Kuchnia",
    "Marek Jabłoński": "Kuchnia",
    "Katarzyna Wiśniewska": "Recepcja",
    "Marta Wiśniewska": "Recepcja",
    "Rafał Krawczyk": "Maintenance",
    "Piotr Zieliński": "Maintenance",
    "Tomasz Lis": "Administracja",
    "Anna Kowalczyk": "Administracja"
};

workerSelect.addEventListener('change', (e) => {
    const selectedWorker = e.target.value;
    const matchingDept = workerDepts[selectedWorker];
    if (matchingDept) {
        deptSelect.value = matchingDept;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderSchedule();
    
    // Domyślne zaznaczenie pierwszej zmiany z listy
    if (shifts.length > 0) {
        selectShift(shifts[0]);
    }
});
