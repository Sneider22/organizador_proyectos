# Organizador de Proyectos

Una aplicación web de arquitectura limpia y diseño responsivo diseñada para la gestión ágil de actividades, seguimiento estadístico en tiempo real y exportación de reportes detallados en formato PDF.

---

## Características Principales

*   **Tema Dual Persistente**: Soporte completo para temas Claro y Oscuro mediante variables CSS dinámicas, con detección automática del esquema de color del sistema y persistencia del estado en `localStorage`.
*   **Análisis Visual en Tiempo Real**: Panel de control con gráficos interactivos integrados mediante **Chart.js** (gráfico de dona para el progreso general del proyecto y gráfico de barras para la distribución de prioridades).
*   **Control de Actividades Orientado a Objetos**: Gestión de tareas (creación, edición, filtrado y eliminación) coordinada mediante la clase controladora `ProjectManager`.
*   **Reportes PDF de Alta Fidelidad**: Exportación de informes estructurados a través de **jsPDF** y **html2canvas**, incluyendo un desglose detallado de actividades y la inserción de gráficos con escalado optimizado.
*   **Portabilidad de Datos**: Capacidad para respaldar y restaurar la base de datos de actividades mediante archivos de exportación e importación en formato JSON.
*   **Diseño Adaptativo Profesional**: Layout fluido estructurado con CSS Grid y Flexbox, asegurando una experiencia óptima en dispositivos móviles, tablets y de escritorio.

---

## Tecnologías Utilizadas

*   **Estructuración y Semántica**: HTML5.
*   **Presentación y Estilos**: CSS3 Vanilla (Arquitectura de variables customizadas, transiciones y animaciones fluidas).
*   **Lógica de Negocio**: JavaScript (ES6+ estándar orientado a objetos).
*   **Visualización de Datos**: Chart.js (v4+).
*   **Generación de Documentos**: jsPDF (v2.5.1) y html2canvas (v1.4.1).

---

## Estructura del Proyecto

*   `index.html`: Define la estructura semántica de la interfaz, el dashboard de estadísticas, los controles de filtrado y las ventanas modales de interacción.
*   `style.css`: Centraliza la identidad visual del sistema, los tokens de diseño (variables HSL) y las definiciones específicas para el tema oscuro.
*   `main.js`: Contiene la lógica del controlador `ProjectManager`, el ciclo de vida de los datos, la reactividad de los gráficos y el motor de renderizado del reporte PDF.

---

## Instalación y Ejecución

La aplicación se ejecuta del lado del cliente y no requiere de un servidor web dedicado ni de base de datos externa.

1. Descargue o clone el repositorio en su máquina local.
2. Abra el archivo `index.html` en cualquier navegador web moderno compatible con estándares ES6.

---

## Licencia

Este proyecto es de código abierto y está disponible para uso personal y modificaciones libres.
