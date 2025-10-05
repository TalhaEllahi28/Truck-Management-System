

// Data Storage
let routes = [];
let trucks = [];
let assignments = [];

// Navigation
function showPage(pageName) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(pageName).classList.add('active');
    event.target.closest('.nav-item').classList.add('active');

    if (pageName === 'reports') {
        generateReport();
    }
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    if (modalId === 'assignTruckModal') {
        loadDropdownData()
    //    loadRoutesCheckboxes();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}




//// Load Trucks Dropdown
//function loadTrucksDropdown() {
//    const select = document.getElementById('assignTruck');
//    select.innerHTML = '<option value="">Choose a truck</option>';
//    trucks.forEach(truck => {
//        select.innerHTML += `<option value="${truck.id}">${truck.number} - ${truck.color} (${truck.size} tyres)</option>`;
//    });
//}

//// Load Routes Checkboxes
//function loadRoutesCheckboxes() {
//    const container = document.getElementById('routesList');
//    if (routes.length === 0) {
//        container.innerHTML = '<p style="color: #95a5a6; padding: 10px;">No routes available. Please add routes first.</p>';
//        return;
//    }
//    container.innerHTML = '';
//    routes.forEach(route => {
//        container.innerHTML += `
//                    <div class="route-checkbox">
//                        <input type="checkbox" value="${route.id}" onchange="updateRouteDetails()">
//                        <label>${route.from} - ${route.to} (${route.distance} KM)</label>
//                    </div>
//                `;
//    });
//}

//// Update Route Details
//function updateRouteDetails() {
//    const selectedCheckboxes = document.querySelectorAll('.route-checkbox input:checked');
//    const container = document.getElementById('selectedRoutesDetails');
//    const detailsContainer = document.getElementById('routeDetailsContainer');

//    if (selectedCheckboxes.length === 0) {
//        detailsContainer.style.display = 'none';
//        return;
//    }

//    detailsContainer.style.display = 'block';
//    container.innerHTML = '';

//    selectedCheckboxes.forEach(checkbox => {
//        const route = routes.find(r => r.id == checkbox.value);
//        container.innerHTML += `
//    <div class="route-detail-item">
//        <div>
//            <strong>${route.from} - ${route.to}</strong><br>
//                <small>${route.distance} KM</small>
//        </div>
//        <div>
//            <label style="font-size: 12px;">Price (PKR)</label>
//            <input type="number" id="price_${route.id}" placeholder="0" required style="padding: 8px;">
//        </div>
//        <div>
//            <label style="font-size: 12px;">Petrol (L/KM)</label>
//            <input type="number" step="0.1" id="petrol_${route.id}" placeholder="0.0" required style="padding: 8px;">
//        </div>
//    </div>
//    `;
//    });
//}

//// Update Tables
//function updateRoutesTable() {
//    const tbody = document.getElementById('routesTable');
//    if (routes.length === 0) {
//        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #95a5a6;">No routes added yet</td></tr>';
//        return;
//    }
//    tbody.innerHTML = '';
//    routes.forEach(route => {
//        tbody.innerHTML += `
//                    <tr>
//                        <td>#${route.id}</td>
//                        <td>${route.from} - ${route.to}</td>
//                        <td>${route.distance} KM</td>
//                        <td>
//                            <div class="action-buttons">
//                                <button class="btn btn-danger btn-sm" onclick="deleteRoute(${route.id})">Delete</button>
//                            </div>
//                        </td>
//                    </tr>
//                `;
//    });
//}

//function updateTrucksTable() {
//    const tbody = document.getElementById('trucksTable');
//    if (trucks.length === 0) {
//        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #95a5a6;">No trucks added yet</td></tr>';
//        return;
//    }
//    tbody.innerHTML = '';
//    trucks.forEach(truck => {
//        tbody.innerHTML += `
//                    <tr>
//                        <td>${truck.number}</td>
//                        <td>${truck.color}</td>
//                        <td>${truck.size} Tyres</td>
//                        <td><span class="badge badge-success">${truck.status}</span></td>
//                        <td>
//                            <div class="action-buttons">
//                                <button class="btn btn-danger btn-sm" onclick="deleteTruck(${truck.id})">Delete</button>
//                            </div>
//                        </td>
//                    </tr>
//                `;
//    });
//}

//function updateAssignmentsTable() {
//    const tbody = document.getElementById('assignmentsTable');
//    if (assignments.length === 0) {
//        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #95a5a6;">No assignments yet</td></tr>';
//        return;
//    }
//    tbody.innerHTML = '';
//    assignments.forEach(assignment => {
//        const truck = trucks.find(t => t.id == assignment.truckId);
//        const totalDistance = assignment.routes.reduce((sum, r) => sum + parseInt(r.distance), 0);
//        const routeNames = assignment.routes.map(r => r.routeName).join(', ');

//        tbody.innerHTML += `
//    <tr>
//        <td>#${assignment.id}</td>
//        <td>${truck ? truck.number : 'N/A'}</td>
//        <td>${routeNames}</td>
//        <td>${totalDistance} KM</td>
//        <td>
//            <div class="action-buttons">
//                <button class="btn btn-primary btn-sm" onclick="viewAssignment(${assignment.id})">View</button>
//                <button class="btn btn-danger btn-sm" onclick="deleteAssignment(${assignment.id})">Delete</button>
//            </div>
//        </td>
//    </tr>
//    `;
//    });

//    updateDashboardAssignments();
//}

//function updateDashboardAssignments() {
//    const tbody = document.getElementById('dashboardAssignments');
//    if (assignments.length === 0) {
//        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #95a5a6;">No assignments yet</td></tr>';
//        return;
//    }
//    tbody.innerHTML = '';
//    assignments.slice(-5).reverse().forEach(assignment => {
//        const truck = trucks.find(t => t.id == assignment.truckId);
//        assignment.routes.forEach(route => {
//            tbody.innerHTML += `
//                        <tr>
//                            <td>${truck ? truck.number : 'N/A'}</td>
//                            <td>${route.routeName}</td>
//                            <td>${route.distance} KM</td>
//                            <td>PKR ${route.price}</td>
//                            <td>${route.petrol} L/KM</td>
//                            <td><span class="badge badge-success">Active</span></td>
//                        </tr>
//                    `;
//        });
//    });
//}

//// Update Dashboard
////function updateDashboard() {
////    document.getElementById('totalRoutes').textContent = routes.length;
////    document.getElementById('totalTrucks').textContent = trucks.length;
////    document.getElementById('totalAssignments').textContent = assignments.length;

////    const totalDistance = routes.reduce((sum, route) => sum + parseInt(route.distance), 0);
////    document.getElementById('totalDistance').textContent = totalDistance.toLocaleString();
////}

//// Delete Functions
//function deleteRoute(id) {
//    if (confirm('Are you sure you want to delete this route?')) {
//        routes = routes.filter(r => r.id !== id);
//        updateRoutesTable();
//        updateDashboard();
//    }
//}

//function deleteTruck(id) {
//    if (confirm('Are you sure you want to delete this truck?')) {
//        trucks = trucks.filter(t => t.id !== id);
//        updateTrucksTable();
//        updateDashboard();
//    }
//}

//function deleteAssignment(id) {
//    if (confirm('Are you sure you want to delete this assignment?')) {
//        assignments = assignments.filter(a => a.id !== id);
//        updateAssignmentsTable();
//        updateDashboard();
//    }
//}

//// View Assignment
//function viewAssignment(id) {
//    const assignment = assignments.find(a => a.id === id);
//    const truck = trucks.find(t => t.id == assignment.truckId);

//    let details = `Assignment #${assignment.id}\n\n`;
//    details += `Truck: ${truck.number} (${truck.color}, ${truck.size} tyres)\n\n`;
//    details += `Routes:\n`;
//    assignment.routes.forEach(route => {
//        details += `\n- ${route.routeName}`;
//        details += `\n  Distance: ${route.distance} KM`;
//        details += `\n  Price: PKR ${route.price}`;
//        details += `\n  Petrol Consumption: ${route.petrol} L/KM`;
//    });

//    alert(details);
//}

//// Generate Report
//function generateReport() {
//    const reportContent = document.getElementById('reportContent');

//    if (assignments.length === 0) {
//        reportContent.innerHTML = '<p style="color: #95a5a6;">No data available for reports</p>';
//        return;
//    }

//    let html = '<div class="table-container"><table><thead><tr><th>Truck Number</th><th>Truck Details</th><th>Routes</th><th>Route Details</th></tr></thead><tbody>';

//    assignments.forEach(assignment => {
//        const truck = trucks.find(t => t.id == assignment.truckId);

//        assignment.routes.forEach((route, index) => {
//            if (index === 0) {
//                html += `
//                            <tr>
//                                <td rowspan="${assignment.routes.length}"><strong>${truck.number}</strong></td>
//                                <td rowspan="${assignment.routes.length}">
//                                    Color: ${truck.color}<br>
//                                    Size: ${truck.size} Tyres
//                                </td>
//                                <td>${route.routeName}</td>
//                                <td>
//                                    Distance: ${route.distance} KM<br>
//                                    Price: PKR ${route.price}<br>
//                                    Petrol: ${route.petrol} L/KM
//                                </td>
//                            </tr>
//                        `;
//            } else {
//                html += `
//                            <tr>
//                                <td>${route.routeName}</td>
//                                <td>
//                                    Distance: ${route.distance} KM<br>
//                                    Price: PKR ${route.price}<br>
//                                    Petrol: ${route.petrol} L/KM
//                                </td>
//                            </tr>
//                        `;
//            }
//        });
//    });

//    html += '</tbody></table></div>';
//    reportContent.innerHTML = html;
//}

//// Close modal on outside click
//window.onclick = function (event) {
//    if (event.target.classList.contains('modal')) {
//        event.target.classList.remove('active');
//    }
//}

//// Initialize dashboard
//updateDashboard();
