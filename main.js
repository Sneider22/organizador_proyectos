// Clase para gestionar las tareas del proyecto arquitectónico
class ProjectManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.charts = {};
        this.currentEditingTask = null;
        this.initializeDefaultTasks();
        this.initializeEventListeners();
        this.renderTasks();
        this.updateStats();
        this.initializeCharts();
    }

    // Inicializar tareas por defecto del proyecto arquitectónico
    initializeDefaultTasks() {
        if (this.tasks.length === 0) {
            const defaultTasks = [
                { id: 1, name: "Planta Baja", priority: "high", hours: 3, status: "not-started" },
                { id: 2, name: "Primer Piso", priority: "high", hours: 3, status: "not-started" },
                { id: 3, name: "Segundo Piso", priority: "high", hours: 3, status: "not-started" },
                { id: 4, name: "Estacionamiento", priority: "medium", hours: 2, status: "not-started" },
                { id: 5, name: "Dos Cortes Longitudinales", priority: "medium", hours: 2, status: "not-started" },
                { id: 6, name: "Un Corte Transversal", priority: "medium", hours: 2, status: "not-started" },
                { id: 7, name: "Dos Fachadas", priority: "medium", hours: 2, status: "not-started" },
                { id: 8, name: "Síntesis (Documentación)", priority: "medium", hours: 4, status: "not-started" },
                { id: 9, name: "Volumetría en 3D", priority: "medium", hours: 3, status: "not-started" },
                { id: 10, name: "Maqueta Escala 1:1000", priority: "high", hours: 5, status: "not-started" },
                { id: 11, name: "Distribución de Área", priority: "low", hours: 1, status: "not-started" },
                { id: 12, name: "Planta de Conjunto con Sombra", priority: "low", hours: 3, status: "not-started" }
            ];
            this.tasks = defaultTasks;
            this.saveTasks();
        }
    }

    // Reiniciar a actividades predeterminadas
    resetToDefaultTasks() {
        if (confirm('¿Estás seguro de que quieres reiniciar a las actividades predeterminadas? Se perderán todas las actividades actuales.')) {
            localStorage.removeItem('architecturalProjectTasks');
            this.tasks = [];
            this.initializeDefaultTasks();
            this.renderTasks();
            this.updateStats();
            this.updateCharts();
            alert('Actividades reiniciadas a las predeterminadas');
        }
    }

    // Inicializar event listeners
    initializeEventListeners() {
        // Botón agregar tarea
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            this.addNewTask();
        });

        // Filtros
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filterTasks('status', e.target.value);
        });

        document.getElementById('priorityFilter').addEventListener('change', (e) => {
            this.filterTasks('priority', e.target.value);
        });

        // Enter en el input de nueva tarea
        document.getElementById('newTaskName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewTask();
            }
        });

        // Botón guardar en modal de edición
        document.getElementById('saveEditBtn').addEventListener('click', () => {
            this.saveTaskEdit();
        });

        // Enter en inputs del modal
        document.getElementById('editTaskName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveTaskEdit();
            }
        });

        // Redimensionar gráficos cuando cambie el tamaño de la ventana
        window.addEventListener('resize', () => {
            setTimeout(() => {
                if (this.charts.progress) {
                    this.charts.progress.options.aspectRatio = window.innerWidth <= 480 ? 1.5 : 2;
                    this.charts.progress.options.plugins.title.font.size = window.innerWidth <= 480 ? 12 : window.innerWidth <= 768 ? 14 : 16;
                    this.charts.progress.options.plugins.legend.labels.font.size = window.innerWidth <= 480 ? 8 : window.innerWidth <= 768 ? 10 : 12;
                    this.charts.progress.options.plugins.legend.labels.padding = window.innerWidth <= 480 ? 5 : window.innerWidth <= 768 ? 10 : 20;
                    this.charts.progress.options.plugins.legend.labels.boxWidth = window.innerWidth <= 480 ? 8 : 12;
                    this.charts.progress.options.layout.padding = window.innerWidth <= 480 ? 5 : 10;
                    this.charts.progress.resize();
                    this.charts.progress.update();
                }
                if (this.charts.priority) {
                    this.charts.priority.options.aspectRatio = window.innerWidth <= 480 ? 1.8 : 2.2;
                    this.charts.priority.options.plugins.title.font.size = window.innerWidth <= 480 ? 12 : window.innerWidth <= 768 ? 14 : 16;
                    this.charts.priority.options.scales.x.ticks.font.size = window.innerWidth <= 480 ? 8 : window.innerWidth <= 768 ? 9 : 12;
                    this.charts.priority.options.scales.y.ticks.font.size = window.innerWidth <= 480 ? 8 : window.innerWidth <= 768 ? 9 : 12;
                    this.charts.priority.options.scales.x.ticks.maxRotation = window.innerWidth <= 480 ? 45 : 0;
                    this.charts.priority.options.layout.padding = window.innerWidth <= 480 ? 5 : 10;
                    this.charts.priority.resize();
                    this.charts.priority.update();
                }
            }, 150);
        });
    }

    // Agregar nueva tarea
    addNewTask() {
        const name = document.getElementById('newTaskName').value.trim();
        const priority = document.getElementById('newTaskPriority').value;
        const hours = parseInt(document.getElementById('newTaskHours').value) || 1;

        if (name) {
            const newTask = {
                id: Date.now(),
                name: name,
                priority: priority,
                hours: hours,
                status: 'not-started'
            };

            this.tasks.push(newTask);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.updateCharts();

            // Limpiar formulario
            document.getElementById('newTaskName').value = '';
            document.getElementById('newTaskHours').value = '';
        }
    }

    // Cambiar estado de una tarea
    changeTaskStatus(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.updateCharts();
        }
    }

    // Editar tarea
    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            this.currentEditingTask = taskId;
            document.getElementById('editTaskName').value = task.name;
            document.getElementById('editTaskPriority').value = task.priority;
            document.getElementById('editTaskHours').value = task.hours;
            document.getElementById('editModal').style.display = 'block';
        }
    }

    // Guardar cambios de edición
    saveTaskEdit() {
        if (this.currentEditingTask) {
            const task = this.tasks.find(t => t.id === this.currentEditingTask);
            if (task) {
                const name = document.getElementById('editTaskName').value.trim();
                const priority = document.getElementById('editTaskPriority').value;
                const hours = parseInt(document.getElementById('editTaskHours').value) || 1;

                if (name) {
                    task.name = name;
                    task.priority = priority;
                    task.hours = hours;
                    
                    this.saveTasks();
                    this.renderTasks();
                    this.updateStats();
                    this.updateCharts();
                    this.closeEditModal();
                } else {
                    alert('El nombre de la actividad no puede estar vacío');
                }
            }
        }
    }

    // Eliminar tarea
    deleteTask(taskId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.updateCharts();
        }
    }

    // Cerrar modal de edición
    closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
        this.currentEditingTask = null;
    }

    // Renderizar tareas
    renderTasks() {
        const tasksGrid = document.getElementById('tasksGrid');
        tasksGrid.innerHTML = '';

        this.tasks.forEach(task => {
            const taskCard = this.createTaskCard(task);
            tasksGrid.appendChild(taskCard);
        });
    }

    // Crear tarjeta de tarea
    createTaskCard(task) {
        const card = document.createElement('div');
        card.className = `task-card ${task.priority}-priority ${task.status}`;
        card.innerHTML = `
            <div class="task-header">
                <div>
                    <div class="task-title">${task.name}</div>
                    <div class="task-priority priority-${task.priority}">${this.getPriorityText(task.priority)}</div>
                </div>
            </div>
            <div class="task-status">
                <div class="status-buttons">
                    <button class="status-btn not-started ${task.status === 'not-started' ? 'active' : ''}" 
                            onclick="projectManager.changeTaskStatus(${task.id}, 'not-started')">
                        No Iniciado
                    </button>
                    <button class="status-btn in-progress ${task.status === 'in-progress' ? 'active' : ''}" 
                            onclick="projectManager.changeTaskStatus(${task.id}, 'in-progress')">
                        En Proceso
                    </button>
                    <button class="status-btn completed ${task.status === 'completed' ? 'active' : ''}" 
                            onclick="projectManager.changeTaskStatus(${task.id}, 'completed')">
                        Finalizado
                    </button>
                </div>
            </div>
            <div class="task-hours">
                <i class="fas fa-clock"></i>
                ${task.hours} horas estimadas
            </div>
            <div class="task-actions">
                <button class="action-btn edit-btn" onclick="projectManager.editTask(${task.id})">
                    <i class="fas fa-edit"></i>
                    Editar
                </button>
                <button class="action-btn delete-btn" onclick="projectManager.deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                    Eliminar
                </button>
            </div>
        `;
        return card;
    }

    // Obtener texto de prioridad
    getPriorityText(priority) {
        const priorities = {
            'high': 'Alta',
            'medium': 'Media',
            'low': 'Baja'
        };
        return priorities[priority] || priority;
    }

    // Filtrar tareas
    filterTasks(type, value) {
        const cards = document.querySelectorAll('.task-card');
        cards.forEach(card => {
            let show = true;
            
            if (type === 'status') {
                const statusFilter = document.getElementById('statusFilter').value;
                if (statusFilter !== 'all') {
                    show = card.classList.contains(statusFilter);
                }
            }
            
            if (type === 'priority') {
                const priorityFilter = document.getElementById('priorityFilter').value;
                if (priorityFilter !== 'all') {
                    show = card.classList.contains(`${priorityFilter}-priority`);
                }
            }

            // Aplicar ambos filtros
            const statusFilter = document.getElementById('statusFilter').value;
            const priorityFilter = document.getElementById('priorityFilter').value;
            
            if (statusFilter !== 'all' && !card.classList.contains(statusFilter)) {
                show = false;
            }
            if (priorityFilter !== 'all' && !card.classList.contains(`${priorityFilter}-priority`)) {
                show = false;
            }

            card.style.display = show ? 'block' : 'none';
        });
    }

    // Actualizar estadísticas
    updateStats() {
        const total = this.tasks.length;
        const notStarted = this.tasks.filter(t => t.status === 'not-started').length;
        const inProgress = this.tasks.filter(t => t.status === 'in-progress').length;
        const completed = this.tasks.filter(t => t.status === 'completed').length;

        document.getElementById('total-tasks').textContent = total;
        document.getElementById('not-started').textContent = notStarted;
        document.getElementById('in-progress').textContent = inProgress;
        document.getElementById('completed').textContent = completed;
    }

    // Inicializar gráficos
    initializeCharts() {
        this.createProgressChart();
        this.createPriorityChart();
    }

    // Crear gráfico de progreso
    createProgressChart() {
        const ctx = document.getElementById('progressChart').getContext('2d');
        this.charts.progress = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['No Iniciadas', 'En Proceso', 'Finalizadas'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: [
                        '#9e9e9e',
                        '#ff9800',
                        '#4caf50'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: window.innerWidth <= 480 ? 1.5 : 2,
                plugins: {
                    title: {
                        display: true,
                        text: 'Progreso del Proyecto',
                        font: {
                            size: window.innerWidth <= 480 ? 12 : window.innerWidth <= 768 ? 14 : 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: window.innerWidth <= 480 ? 8 : window.innerWidth <= 768 ? 10 : 12
                            },
                            padding: window.innerWidth <= 480 ? 5 : window.innerWidth <= 768 ? 10 : 20,
                            boxWidth: window.innerWidth <= 480 ? 8 : 12
                        }
                    }
                },
                layout: {
                    padding: window.innerWidth <= 480 ? 5 : 10
                }
            }
        });
    }

    // Crear gráfico de prioridades
    createPriorityChart() {
        const ctx = document.getElementById('priorityChart').getContext('2d');
        this.charts.priority = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Alta Prioridad', 'Media Prioridad', 'Baja Prioridad'],
                datasets: [{
                    label: 'Tareas por Prioridad',
                    data: [0, 0, 0],
                    backgroundColor: [
                        '#ff6b6b',
                        '#ffa726',
                        '#66bb6a'
                    ],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: window.innerWidth <= 480 ? 1.8 : 2.2,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribución por Prioridad',
                        font: {
                            size: window.innerWidth <= 480 ? 12 : window.innerWidth <= 768 ? 14 : 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: window.innerWidth <= 480 ? 8 : window.innerWidth <= 768 ? 9 : 12
                            },
                            maxRotation: window.innerWidth <= 480 ? 45 : 0
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            font: {
                                size: window.innerWidth <= 480 ? 8 : window.innerWidth <= 768 ? 9 : 12
                            }
                        },
                        grid: {
                            color: window.innerWidth <= 480 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)'
                        }
                    }
                },
                layout: {
                    padding: window.innerWidth <= 480 ? 5 : 10
                }
            }
        });
    }

    // Actualizar gráficos
    updateCharts() {
        // Actualizar gráfico de progreso
        const notStarted = this.tasks.filter(t => t.status === 'not-started').length;
        const inProgress = this.tasks.filter(t => t.status === 'in-progress').length;
        const completed = this.tasks.filter(t => t.status === 'completed').length;

        this.charts.progress.data.datasets[0].data = [notStarted, inProgress, completed];
        this.charts.progress.update();

        // Actualizar gráfico de prioridades
        const highPriority = this.tasks.filter(t => t.priority === 'high').length;
        const mediumPriority = this.tasks.filter(t => t.priority === 'medium').length;
        const lowPriority = this.tasks.filter(t => t.priority === 'low').length;

        this.charts.priority.data.datasets[0].data = [highPriority, mediumPriority, lowPriority];
        this.charts.priority.update();
    }

    // Guardar tareas en localStorage
    saveTasks() {
        localStorage.setItem('architecturalProjectTasks', JSON.stringify(this.tasks));
    }

    // Cargar tareas desde localStorage
    loadTasks() {
        const saved = localStorage.getItem('architecturalProjectTasks');
        return saved ? JSON.parse(saved) : [];
    }

    // Calcular tiempo total estimado
    getTotalEstimatedHours() {
        return this.tasks.reduce((total, task) => total + task.hours, 0);
    }

    // Calcular tiempo completado
    getCompletedHours() {
        return this.tasks
            .filter(task => task.status === 'completed')
            .reduce((total, task) => total + task.hours, 0);
    }

    // Calcular tiempo en proceso
    getInProgressHours() {
        return this.tasks
            .filter(task => task.status === 'in-progress')
            .reduce((total, task) => total + task.hours, 0);
    }

    // Obtener porcentaje de progreso
    getProgressPercentage() {
        const completed = this.getCompletedHours();
        const total = this.getTotalEstimatedHours();
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    }
}

// Inicializar la aplicación cuando se carga la página
let projectManager;

document.addEventListener('DOMContentLoaded', () => {
    projectManager = new ProjectManager();
    
    // Mostrar información adicional en la consola
    console.log('🏗️ Organizador de Proyecto Arquitectónico iniciado');
    console.log(`📊 Total de horas estimadas: ${projectManager.getTotalEstimatedHours()}`);
    console.log(`✅ Progreso: ${projectManager.getProgressPercentage()}%`);
});

// Funciones globales para el modal
function closeEditModal() {
    if (projectManager) {
        projectManager.closeEditModal();
    }
}

// Función global para reiniciar actividades predeterminadas
function resetToDefault() {
    if (projectManager) {
        projectManager.resetToDefaultTasks();
    }
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}

// Funciones adicionales para mejor experiencia de usuario
function exportData() {
    generatePDF();
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configuración del documento
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    let yPosition = margin;
    
    // Título principal
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Reporte de Proyecto Arquitectónico', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    doc.text(`Generado el: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Estadísticas generales
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Estadísticas Generales', margin, yPosition);
    yPosition += 10;
    
    // Crear tabla de estadísticas
    const stats = [
        ['Total de Actividades', projectManager.tasks.length],
        ['Horas Totales Estimadas', `${projectManager.getTotalEstimatedHours()} horas`],
        ['Horas Completadas', `${projectManager.getCompletedHours()} horas`],
        ['Horas en Proceso', `${projectManager.getInProgressHours()} horas`],
        ['Progreso del Proyecto', `${projectManager.getProgressPercentage()}%`]
    ];
    
    // Dibujar tabla de estadísticas
    const tableStartY = yPosition;
    const rowHeight = 8;
    const colWidths = [contentWidth * 0.6, contentWidth * 0.4];
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    
    // Encabezados de tabla
    doc.rect(margin, tableStartY, colWidths[0], rowHeight);
    doc.text('Concepto', margin + 2, tableStartY + 5);
    doc.rect(margin + colWidths[0], tableStartY, colWidths[1], rowHeight);
    doc.text('Valor', margin + colWidths[0] + 2, tableStartY + 5);
    
    yPosition = tableStartY + rowHeight;
    
    // Filas de datos
    doc.setFont(undefined, 'normal');
    stats.forEach(([concept, value]) => {
        doc.rect(margin, yPosition, colWidths[0], rowHeight);
        doc.text(concept, margin + 2, yPosition + 5);
        doc.rect(margin + colWidths[0], yPosition, colWidths[1], rowHeight);
        doc.text(value.toString(), margin + colWidths[0] + 2, yPosition + 5);
        yPosition += rowHeight;
    });
    
    yPosition += 15;
    
    // Distribución por estado
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Distribución por Estado', margin, yPosition);
    yPosition += 10;
    
    const statusStats = [
        ['No Iniciadas', projectManager.tasks.filter(t => t.status === 'not-started').length],
        ['En Proceso', projectManager.tasks.filter(t => t.status === 'in-progress').length],
        ['Finalizadas', projectManager.tasks.filter(t => t.status === 'completed').length]
    ];
    
    statusStats.forEach(([status, count]) => {
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`• ${status}: ${count} actividades`, margin + 10, yPosition);
        yPosition += 6;
    });
    
    yPosition += 10;
    
    // Distribución por prioridad
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Distribución por Prioridad', margin, yPosition);
    yPosition += 10;
    
    const priorityStats = [
        ['Alta Prioridad', projectManager.tasks.filter(t => t.priority === 'high').length],
        ['Media Prioridad', projectManager.tasks.filter(t => t.priority === 'medium').length],
        ['Baja Prioridad', projectManager.tasks.filter(t => t.priority === 'low').length]
    ];
    
    priorityStats.forEach(([priority, count]) => {
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`• ${priority}: ${count} actividades`, margin + 10, yPosition);
        yPosition += 6;
    });
    
    yPosition += 15;
    
    // Lista detallada de actividades
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Lista Detallada de Actividades', margin, yPosition);
    yPosition += 10;
    
    // Encabezados de tabla de actividades
    const activityColWidths = [contentWidth * 0.4, contentWidth * 0.2, contentWidth * 0.2, contentWidth * 0.2];
    const activityHeaders = ['Actividad', 'Prioridad', 'Estado', 'Horas'];
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    
    let tableY = yPosition;
    activityHeaders.forEach((header, index) => {
        doc.rect(margin + activityColWidths.slice(0, index).reduce((a, b) => a + b, 0), tableY, activityColWidths[index], rowHeight);
        doc.text(header, margin + activityColWidths.slice(0, index).reduce((a, b) => a + b, 0) + 2, tableY + 5);
    });
    
    yPosition = tableY + rowHeight;
    
    // Filas de actividades
    doc.setFont(undefined, 'normal');
    projectManager.tasks.forEach(task => {
        // Verificar si necesitamos una nueva página
        if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = margin;
        }
        
        const rowData = [
            task.name.length > 30 ? task.name.substring(0, 27) + '...' : task.name,
            projectManager.getPriorityText(task.priority),
            task.status === 'not-started' ? 'No Iniciado' : 
            task.status === 'in-progress' ? 'En Proceso' : 'Finalizado',
            task.hours.toString()
        ];
        
        rowData.forEach((data, index) => {
            doc.rect(margin + activityColWidths.slice(0, index).reduce((a, b) => a + b, 0), yPosition, activityColWidths[index], rowHeight);
            doc.text(data, margin + activityColWidths.slice(0, index).reduce((a, b) => a + b, 0) + 2, yPosition + 5);
        });
        
        yPosition += rowHeight;
    });
    
    // Agregar gráficos si hay espacio
    try {
        yPosition += 10;
        if (yPosition < pageHeight - 100) {
            // Capturar gráfico de progreso
            const progressCanvas = document.getElementById('progressChart');
            if (progressCanvas) {
                const canvas = await html2canvas(progressCanvas, {
                    backgroundColor: '#ffffff',
                    scale: 2
                });
                
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = contentWidth * 0.45;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Gráfico de Progreso', margin, yPosition);
                yPosition += 10;
                
                doc.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
                
                // Capturar gráfico de prioridades
                const priorityCanvas = document.getElementById('priorityChart');
                if (priorityCanvas) {
                    const canvas2 = await html2canvas(priorityCanvas, {
                        backgroundColor: '#ffffff',
                        scale: 2
                    });
                    
                    const imgData2 = canvas2.toDataURL('image/png');
                    const imgWidth2 = contentWidth * 0.45;
                    const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width;
                    
                    doc.setFontSize(12);
                    doc.setFont(undefined, 'bold');
                    doc.text('Gráfico de Prioridades', margin + imgWidth + 10, yPosition - 10);
                    
                    doc.addImage(imgData2, 'PNG', margin + imgWidth + 10, yPosition, imgWidth2, imgHeight2);
                }
            }
        }
    } catch (error) {
        console.log('No se pudieron agregar los gráficos al PDF:', error);
    }
    
    // Pie de página
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 30, pageHeight - 10);
        doc.text('Generado por Organizador de Proyecto Arquitectónico', margin, pageHeight - 10);
    }
    
    // Guardar el PDF
    const fileName = `proyecto-arquitectonico-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.tasks && Array.isArray(data.tasks)) {
                        projectManager.tasks = data.tasks;
                        projectManager.saveTasks();
                        projectManager.renderTasks();
                        projectManager.updateStats();
                        projectManager.updateCharts();
                        alert('Datos importados correctamente');
                    } else {
                        alert('Formato de archivo inválido');
                    }
                } catch (error) {
                    alert('Error al importar el archivo');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Agregar botones de exportar/importar al header
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'margin-top: 20px; display: flex; gap: 15px; justify-content: center;';
    buttonContainer.innerHTML = `
        <button onclick="exportData()" style="background: #4caf50; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
            <i class="fas fa-file-pdf"></i> Exportar PDF
        </button>
        <button onclick="importData()" style="background: #2196f3; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
            <i class="fas fa-upload"></i> Importar
        </button>
        <button onclick="resetToDefault()" style="background: #ff9800; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
            <i class="fas fa-refresh"></i> Reiniciar
        </button>
    `;
    header.appendChild(buttonContainer);
});
