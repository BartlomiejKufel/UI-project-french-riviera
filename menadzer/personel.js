// Dane pracowników w tablicy JS
const employees = [
    { name: "Anna Kowalczyk", department: "Menadżer", status: "Urlop", statusClass: "yellow", shift: "Urlop", phone: "+48 111 222 333", salary: "8500 zł" },
    { name: "Michał Nowak", department: "Kuchnia", status: "Na zmianie", statusClass: "green", shift: "7:00 - 15:00", phone: "+48 222 333 444", salary: "5300 zł" },
    { name: "Katarzyna Wiśniewska", department: "Recepcja", status: "Na zmianie", statusClass: "green", shift: "15:00 - 23:00", phone: "+48 333 444 555", salary: "5700 zł" },
    { name: "Piotr Zieliński", department: "Maintenance", status: "Wolne", statusClass: "blue", shift: "Wolne", phone: "+48 444 555 666", salary: "4250 zł" },
    { name: "Tomasz Lis", department: "Administracja", status: "Na zmianie", statusClass: "green", shift: "7:00 - 15:00", phone: "+48 555 666 777", salary: "6300 zł" },
    { name: "Karolina Sowa", department: "Housekeeping", status: "Na zmianie", statusClass: "green", shift: "7:00 - 15:00", phone: "+48 666 777 888", salary: "4400 zł" },
    { name: "Marek Jabłoński", department: "Kuchnia", status: "Na zmianie", statusClass: "green", shift: "17:00 - 23:00", phone: "+48 777 888 999", salary: "5300 zł" },
    { name: "Ewa Dąbrowska", department: "Housekeeping", status: "Wolne", statusClass: "blue", shift: "Wolne", phone: "+48 888 999 000", salary: "4400 zł" },
    { name: "Rafał Krawczyk", department: "Maintenance", status: "Na zmianie", statusClass: "green", shift: "9:00 - 17:00", phone: "+48 999 000 111", salary: "4250 zł" },
    { name: "Zofia Wróbel", department: "Housekeeping", status: "Na zmianie", statusClass: "green", shift: "15:00 - 23:00", phone: "+48 000 111 222", salary: "4400 zł" },
    { name: "Marta Wiśniewska", department: "Recepcja", status: "Wolne", statusClass: "blue", shift: "Wolne", phone: "+48 333 222 444", salary: "5700 zł" },
    { name: "Marcin Kowalczyk", department: "Menadżer", status: "Urlop", statusClass: "yellow", shift: "Urlop", phone: "+48 444 333 444", salary: "9800 zł" }
];

// Elementy DOM
const tableBody = document.getElementById('personel-table-body');
const searchInput = document.querySelector('.search-input');
const valAll = document.getElementById('val-all');
const valShift = document.getElementById('val-shift');
const valFree = document.getElementById('val-free');
const valVacation = document.getElementById('val-vacation');

// Aktualizacja liczników w kartach na podstawie danych
function updateMetrics() {
    if (valAll) valAll.textContent = employees.length;
    if (valShift) valShift.textContent = employees.filter(e => e.statusClass === 'green').length;
    if (valFree) valFree.textContent = employees.filter(e => e.statusClass === 'blue').length;
    if (valVacation) valVacation.textContent = employees.filter(e => e.statusClass === 'yellow').length;
}

// Renderowanie wierszy tabeli
function renderTable(data) {
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #7e8a9a; padding: 40px 0; font-style: italic;">
                    Brak pracowników spełniających kryteria wyszukiwania.
                </td>
            </tr>
        `;
        return;
    }

    data.forEach(emp => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="dept-name">${emp.name}</td>
            <td>${emp.department}</td>
            <td>
                <span class="status-pill ${emp.statusClass}">${emp.status}</span>
            </td>
            <td>${emp.shift}</td>
            <td>${emp.phone}</td>
            <td>${emp.salary}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Filtrowanie listy na podstawie wpisanej frazy
function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    
    const filtered = employees.filter(emp => {
        return (
            emp.name.toLowerCase().includes(query) ||
            emp.department.toLowerCase().includes(query) ||
            emp.shift.toLowerCase().includes(query) ||
            emp.phone.toLowerCase().includes(query)
        );
    });
    
    renderTable(filtered);
}

// Podpięcie nasłuchiwania na wpisywanie w wyszukiwarkę
if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
}

// Inicjalizacja przy załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    updateMetrics();
    renderTable(employees);
});
