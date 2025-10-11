# 🏗️ Organizador de Proyecto Arquitectónico

Una aplicación web moderna y responsive para gestionar actividades de proyectos arquitectónicos con visualización de progreso, estadísticas y exportación a PDF.

## ✨ Características

### 📋 Gestión de Actividades
- **12 actividades predeterminadas** específicas para proyectos arquitectónicos
- **Estados de progreso**: No Iniciado, En Proceso, Finalizado
- **Prioridades**: Alta, Media, Baja con colores diferenciados
- **Estimación de horas** por actividad
- **Edición completa**: Modificar nombre, prioridad y horas estimadas
- **Eliminación** con confirmación de seguridad

### 📊 Visualización y Estadísticas
- **Dashboard con métricas** en tiempo real
- **Gráficos interactivos** con Chart.js:
  - Gráfico circular de progreso del proyecto
  - Gráfico de barras por prioridad
- **Tarjetas de estadísticas** con iconos y colores distintivos
- **Filtros avanzados** por estado y prioridad

### 📱 Diseño Responsive
- **Optimizado para móviles** con diseño adaptativo
- **Gráficos ajustados** para pantallas pequeñas
- **Modales responsive** para edición y agregar actividades
- **Breakpoints**: Móvil (≤480px), Tablet (≤768px), Escritorio (>768px)

### 💾 Persistencia de Datos
- **Local Storage** para guardar cambios automáticamente
- **Exportación a PDF** con reportes completos
- **Importación de datos** desde archivos JSON
- **Función de reinicio** a actividades predeterminadas

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para librerías CDN)

### Instalación
1. Descarga todos los archivos del proyecto
2. Abre `index.html` en tu navegador
3. ¡Listo! La aplicación está lista para usar

### Estructura de Archivos
```
proyecto-arquitectonico/
├── index.html          # Estructura HTML principal
├── style.css           # Estilos CSS responsive
├── main.js            # Lógica JavaScript y funcionalidades
└── README.md          # Documentación del proyecto
```

## 📋 Actividades Predeterminadas

### Alta Prioridad (3-5 horas)
- **Planta Baja** (3 horas)
- **Primer Piso** (3 horas)
- **Segundo Piso** (3 horas)
- **Maqueta Escala 1:1000** (5 horas)

### Media Prioridad (2-4 horas)
- **Estacionamiento** (2 horas)
- **Dos Cortes Longitudinales** (2 horas)
- **Un Corte Transversal** (2 horas)
- **Dos Fachadas** (2 horas)
- **Síntesis (Documentación)** (4 horas)
- **Volumetría en 3D** (3 horas)

### Baja Prioridad (1-3 horas)
- **Distribución de Área** (1 hora)
- **Planta de Conjunto con Sombra** (3 horas)

## 🎯 Funcionalidades Principales

### Gestión de Actividades
- ✅ Cambiar estado de actividades
- ✏️ Editar nombre, prioridad y horas
- 🗑️ Eliminar actividades con confirmación
- ➕ Agregar nuevas actividades personalizadas

### Filtros y Búsqueda
- 🔍 Filtrar por estado (No Iniciado, En Proceso, Finalizado)
- 🎯 Filtrar por prioridad (Alta, Media, Baja)
- 📊 Combinación de filtros en tiempo real

### Exportación e Importación
- 📄 **Exportar PDF**: Reporte completo con estadísticas y gráficos
- 📁 **Importar datos**: Cargar proyectos desde archivos JSON
- 🔄 **Reiniciar**: Volver a actividades predeterminadas

## 📊 Estadísticas y Métricas

### Dashboard Principal
- **Total de actividades** del proyecto
- **Actividades en proceso** actualmente
- **Actividades finalizadas** completadas
- **Actividades no iniciadas** pendientes

### Cálculos Automáticos
- **Horas totales estimadas** del proyecto
- **Horas completadas** según actividades finalizadas
- **Horas en proceso** según actividades activas
- **Porcentaje de progreso** del proyecto

## 🎨 Diseño y UX

### Paleta de Colores
- **Gradientes modernos** para tarjetas de estadísticas
- **Colores por prioridad**: Rojo (Alta), Naranja (Media), Verde (Baja)
- **Estados visuales**: Gris (No iniciado), Naranja (En proceso), Verde (Finalizado)

### Animaciones y Efectos
- **Transiciones suaves** en hover y click
- **Animaciones de entrada** para tarjetas
- **Efectos de elevación** en elementos interactivos

### Responsive Design
- **Mobile First** approach
- **Grid layouts** adaptativos
- **Tipografía escalable** según dispositivo
- **Espaciado optimizado** para cada pantalla

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Grid y Flexbox
- **JavaScript ES6+** - Lógica de la aplicación

### Librerías Externas
- **Chart.js** - Gráficos interactivos
- **jsPDF** - Generación de PDFs
- **html2canvas** - Captura de gráficos para PDF
- **Font Awesome** - Iconografía

### APIs del Navegador
- **Local Storage** - Persistencia de datos
- **Canvas API** - Renderizado de gráficos
- **File API** - Importación de archivos

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Dispositivos
- 📱 **Móviles**: iPhone, Android (optimizado)
- 📱 **Tablets**: iPad, Android tablets
- 💻 **Escritorio**: Windows, macOS, Linux

## 🚀 Características Avanzadas

### Exportación PDF
- **Reporte completo** con todas las actividades
- **Gráficos incluidos** como imágenes de alta calidad
- **Estadísticas detalladas** y métricas del proyecto
- **Formato profesional** con numeración de páginas

### Gestión de Datos
- **Backup automático** en Local Storage
- **Recuperación de datos** en caso de cierre inesperado
- **Sincronización** entre pestañas del navegador

### Optimización de Rendimiento
- **Lazy loading** de gráficos
- **Debounce** en filtros
- **Caching** de configuraciones de gráficos

## 🐛 Solución de Problemas

### Problemas Comunes
1. **Gráficos no se muestran**: Verificar conexión a internet para Chart.js
2. **Datos no se guardan**: Verificar que Local Storage esté habilitado
3. **PDF no se genera**: Verificar que jsPDF se cargue correctamente

### Limpieza de Datos
- Usar el botón **"Reiniciar"** para volver a actividades predeterminadas
- Limpiar Local Storage manualmente si es necesario

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request



