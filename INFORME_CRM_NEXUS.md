# 📋 INFORME COMPLETO — CRM FENIX / NexusCRM
### Documento de Defensa Técnica y Funcional
**Elaborado por:** GitHub Copilot  
**Fecha:** 12 de marzo de 2026  
**Archivo Figma:** CRM FENIX Modales 2 — `MB3YfWoM1MuZcBExvavZxz`  
**Plataforma:** NexusCRM · Enterprise Suite  

---

## ÍNDICE

1. [Visión General del Sistema](#1-visión-general-del-sistema)
2. [Identidad Visual y Diseño](#2-identidad-visual-y-diseño)
3. [Estructura de Navegación (Sidebar)](#3-estructura-de-navegación-sidebar)
4. [Header Global](#4-header-global)
5. [Pantalla 1 — Dashboard (Panel de Control)](#5-pantalla-1--dashboard-panel-de-control)
6. [Pantalla 2 — Contactos](#6-pantalla-2--contactos)
7. [Pantalla 3 — Cuentas / Empresas](#7-pantalla-3--cuentas--empresas)
8. [Pantalla 4 — Leads](#8-pantalla-4--leads)
9. [Pantalla 5 — Oportunidades](#9-pantalla-5--oportunidades)
10. [Pantalla 6 — Actividades](#10-pantalla-6--actividades)
11. [Pantalla 7 — Calendario](#11-pantalla-7--calendario)
12. [Pantalla 8 — Productos (Catálogo)](#12-pantalla-8--productos-catálogo)
13. [Pantalla 9 — Cotizaciones](#13-pantalla-9--cotizaciones)
14. [Pantalla 10 — Facturas](#14-pantalla-10--facturas)
15. [Pantalla 11 — Campañas de Marketing](#15-pantalla-11--campañas-de-marketing)
16. [Pantalla 12 — Tickets de Soporte](#16-pantalla-12--tickets-de-soporte)
17. [Pantalla 13 — Documentos](#17-pantalla-13--documentos)
18. [Pantalla 14 — Equipo & Usuarios](#18-pantalla-14--equipo--usuarios)
19. [Pantalla 15 — Reportes y Analítica](#19-pantalla-15--reportes-y-analítica)
20. [Pantalla 16 — Configuración del Sistema](#20-pantalla-16--configuración-del-sistema)
21. [Pantalla 17 — Inbox (Mensajería Omnicanal)](#21-pantalla-17--inbox-mensajería-omnicanal)
22. [Catálogo Completo de Modales](#22-catálogo-completo-de-modales)
23. [Base de Datos — Esquema SQL](#23-base-de-datos--esquema-sql)
24. [Flujos de Trabajo Clave](#24-flujos-de-trabajo-clave)
25. [Resumen de KPIs del Sistema](#25-resumen-de-kpis-del-sistema)

---

## 1. Visión General del Sistema

**NexusCRM** es una plataforma CRM (Customer Relationship Management) empresarial de tipo "Enterprise Suite". Su objetivo es centralizar en una sola interfaz todas las operaciones de ventas, marketing, soporte y administración de una organización.

### Características principales
- **16 módulos funcionales** integrados en una sola aplicación web
- **Interfaz estilo SaaS** con sidebar lateral oscuro y área de contenido blanco
- **Diseño responsivo** a 1530 px de ancho para escritorio (resolución estándar Full HD)
- **Tecnología UI:** React + Tailwind CSS (implementación en Figma como referencia)
- **Base de datos:** SQLite (esquema documentado con ~15 tablas relacionales)
- **Sistema de roles:** Administrador, Gerencia, Jefe de Ventas, Ejecutivo de Ventas, Soporte, Marketing, Read-only
- **Idioma:** Español (latam)

### Módulos y sus rutas
| # | Módulo | Ruta |
|---|--------|------|
| 1 | Dashboard | `/` |
| 2 | Contactos | `/contactos` |
| 3 | Cuentas | `/cuentas` |
| 4 | Leads | `/leads` |
| 4.1 | Inbox | `/inbox` |
| 5 | Oportunidades | `/oportunidades` |
| 6 | Actividades | `/actividades` |
| 7 | Calendario | `/calendario` |
| 8 | Productos | `/productos` |
| 9 | Cotizaciones | `/cotizaciones` |
| 10 | Facturas | `/facturas` |
| 11 | Campañas | `/campanas` |
| 12 | Tickets | `/tickets` |
| 13 | Documentos | `/documentos` |
| 14 | Equipo | `/equipo` |
| 15 | Reportes | `/reportes` |
| 16 | Configuración | `/configuracion` |

---

## 2. Identidad Visual y Diseño

### Paleta de Colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Azul primario** | `#2563a8` | Botones primarios, acentos, links de navegación activos |
| **Azul oscuro** | `#0f2240` | Fondo del Sidebar completo |
| **Dorado accent** | `#c8a558` | Subtítulo "Enterprise Suite", degradados del logo |
| **Verde éxito** | `#16a34a` / `#22c55e` | Badges "Activo", tendencias positivas (↑) |
| **Rojo error/crítico** | `#dc2626` | Badges críticos, facturas vencidas |
| **Amarillo/naranja** | `#f59e0b` | Badges "Medio", "Ausente", prioridad media |
| **Gris texto** | `#64748b` (slate-500) | Texto secundario, fechas, labels |
| **Gris borde** | `#e2e8f0` (slate-200) | Divisores de tabla, inputs |
| **Blanco fondo** | `#ffffff` | Área principal de contenido |
| **Azul cian teal** | `#0d9488` | Color activo del sidebar en pantallas como Contactos, Leads |

### Logo / Marca
- **Ícono:** Cuadrado redondeado 34×34 px con degradado `linear-gradient(135deg, #2563a8, #c8a558)` que contiene la letra **"N"** en blanco
- **Nombre:** "NexusCRM" — tipografía 17px, negrita, color blanco, tracking -0.4px
- **Subtítulo:** "Enterprise Suite" — fuente 10px, color dorado `#c8a558`, letras en MAYÚSCULAS con espaciado amplio (`tracking-widest`)

### Tipografía
- **Fuente principal:** Inter / sistema sans-serif
- **Tamaños usados:**
  - H1 (título de pantalla): ~24px, bold
  - H2 (subtítulos de sección): ~17px, semibold
  - H3 (cabeceras de tarjeta): ~14-15px, semibold
  - Cuerpo: 13px, regular
  - Labels pequeños: 10-11px, semibold
  - Valores KPI grandes: ~28px, bold

### Iconografía
Los iconos se representan principalmente con emojis Unicode en la versión del Figma:
- 📊 Dashboard / Reportes
- 👤 Contactos
- 🏢 Cuentas
- 🎯 Leads / Oportunidades
- ✅ Actividades / Tareas
- 📅 Calendario
- 📦 Productos
- 📄 Cotizaciones
- 🧾 Facturas
- 📣 Campañas
- 🎫 Tickets
- 📁 Documentos
- 👥 Equipo
- ⚙️ Configuración
- 🔔 Notificaciones
- 🔍 Búsqueda

### Componentes reutilizables

#### Badges / Etiquetas de Estado
| Tipo | Color fondo | Color texto | Uso |
|------|-------------|-------------|-----|
| Activo / active | Verde claro | Verde oscuro | Clientes activos, usuarios activos |
| Inactivo / inactive | Gris | Gris oscuro | Usuarios inactivos, ex-clientes |
| Prospecto | Azul claro | Azul oscuro | Leads calificados |
| Lead | Amarillo claro | Amarillo oscuro | Prospectos sin calificar |
| Cliente | Verde marino | Blanco | Clientes confirmados |
| Crítico | Rojo | Blanco | Tickets / Prioridades críticas |
| Alto | Naranja | Blanco | Prioridad alta |
| Medio | Amarillo | Blanco | Prioridad media |
| Bajo | Gris | Gris oscuro | Prioridad baja |
| Pendiente | Azul claro | Azul oscuro | Estado de actividades |
| Ganado | Verde | Blanco | Oportunidad ganada |
| Perdido | Rojo | Blanco | Oportunidad perdida |

#### Botones
| Variante | Estilo | Ejemplo |
|----------|--------|---------|
| **Primary** | Fondo `#2563a8` o teal (`#0d9488`), texto blanco, border-radius 6px | "Guardar", "Nuevo Contacto" |
| **Secondary** | Fondo blanco, borde gris, texto oscuro | "Cancelar", "Importar" |
| **Ghost** | Transparente, sin borde | Íconos de acción en tablas (✏️, 🔑, ⋯) |
| **Link** | Solo texto, color primario, sin fondo | "Ver todo →", "Ver más →" |
| **Danger** | Fondo rojo | Eliminar, Desactivar |

---

## 3. Estructura de Navegación (Sidebar)

El sidebar es el elemento de navegación global del sistema. Tiene **260px de ancho**, fondo oscuro `#0f2240`, y permanece visible en todas las pantallas.

### Secciones del Sidebar

#### HEADER del Sidebar
- Logo NexusCRM (cuadrado degradado + texto)
- Nombre de la empresa: "NexusCRM"
- Etiqueta: "Enterprise Suite" en dorado

#### PRINCIPAL
| Ícono | Ítem | Badge |
|-------|------|-------|
| 📊 | **Dashboard** | — |

#### VENTAS & CRM
| Ícono | Ítem | Badge |
|-------|------|-------|
| 👤 | **Contactos** | — |
| 🏢 | **Cuentas** | — |
| 🎯 | **Leads** | `12` (contador en azul oscuro) |
| � | **Inbox** | `15` (mensajes sin atender — naranja) |
| �💼 | **Oportunidades** | — |
| ✅ | **Actividades** | `5` (contador) |
| 📅 | **Calendario** | — |

#### COMERCIAL
| Ícono | Ítem | Badge |
|-------|------|-------|
| 📦 | **Productos** | — |
| 📄 | **Cotizaciones** | `3` (contador) |
| 🧾 | **Facturas** | — |

#### MARKETING
| Ícono | Ítem | Badge |
|-------|------|-------|
| 📣 | **Campañas** | — |

#### SOPORTE
| Ícono | Ítem | Badge |
|-------|------|-------|
| 🎫 | **Tickets** | `8` (contador en naranja/rojo — indica urgencia) |
| 📁 | **Documentos** | — |

#### ANÁLISIS
| Ícono | Ítem | Badge |
|-------|------|-------|
| 📊 | **Reportes** | — |

#### ADMINISTRACIÓN
| Ícono | Ítem | Badge |
|-------|------|-------|
| 👥 | **Equipo** | — |
| ⚙️ | **Configuración** | — |

#### FOOTER del Sidebar (perfil de usuario)
En la parte inferior, siempre visible:
- Avatar circular con iniciales "JM" + degradado azul marino
- Nombre: **Juan Martínez**
- Rol: **Administrador**
- Indicador de alerta naranja (notificaciones pendientes) — pequeño punto/círculo naranja a la derecha

### Comportamiento de ítem activo
El ítem activo en el sidebar tiene:
- Fondo: `rgba(37, 99, 168, 0.35)` — azul semi-transparente
- Texto en blanco
- Los demás ítems tienen texto en `slate-400` (gris medio)

---

## 4. Header Global

El header se repite en todas las pantallas. Es una barra horizontal de **64px de alto**, fondo blanco, con borde inferior `border-slate-200`.

### Elementos del Header (de izquierda a derecha)

1. **Breadcrumb:**
   - Texto en azul: "NexusCRM" (nombre del sistema)
   - Flecha separadora › en gris claro
   - Texto en gris oscuro/negro: nombre de la pantalla actual (ej. "Dashboard", "Contactos")

2. **Campo de búsqueda global:**
   - Placeholder: "Buscar en CRM…"
   - Ancho máximo: 280px
   - Borde: `border-slate-200`, fondo `bg-slate-50`
   - Icono de lupa a la izquierda dentro del campo
   - Font-size: 13px

3. **Botones de acción rápida (zona derecha):**
   - Botón de notificaciones 🔔 — cuadrado 36×36px, borde gris, con potencial badge
   - Botón de ajustes ⚙️ — cuadrado 36×36px, borde gris
   - Avatar del usuario activo — círculo con iniciales "JM", degradado azul

---

## 5. Pantalla 1 — Dashboard (Panel de Control)

**Dimensiones del frame:** 1530 × 1475 px  
**Nodo Figma:** `119:2`

El Dashboard es la pantalla de inicio y el resumen ejecutivo de todo el CRM. Se divide en varias secciones claramente definidas.

### 5.1 Encabezado de Pantalla

- **Título H1:** "Panel de Control"
- **Subtítulo:** "Resumen general del CRM — Marzo 2026"
- **Botones esquina superior derecha:**
  - `📅 Este mes` — botón secundario (selector de período)
  - `+ Nueva Actividad` — botón primario azul (acceso directo a modal)

### 5.2 Fila de KPIs (Métricas Clave — Fila 1)

5 tarjetas horizontales, cada una con:
- Valor numérico grande
- Etiqueta descriptiva
- Tendencia (↑ o ↓) vs mes anterior
- Ícono emoji en esquina superior derecha

| # | Ícono | Valor | Etiqueta | Tendencia |
|---|-------|-------|----------|-----------|
| 1 | 👤 | **1,248** | Contactos activos | ↑ 8.2% vs mes anterior |
| 2 | 🎯 | **84** | Leads este mes | ↑ 13.5% vs mes anterior |
| 3 | 💼 | **$248,500** | Pipeline activo | ↑ 4.7% vs mes anterior |
| 4 | 🏆 | **$82,300** | Ventas cerradas | ↑ 21.4% vs mes anterior |
| 5 | 🎫 | **23** | Tickets abiertos | ↑ 3 sin respuesta |

**Fila 2 de KPIs:**

| # | Ícono | Valor | Etiqueta | Tendencia |
|---|-------|-------|----------|-----------|
| 6 | 📣 | **5** | Campañas activas | → Igual que mes anterior |

### 5.3 Sección "Pipeline de Ventas por Etapa"

**Componente:** Gráfico de barras horizontales con etapas del pipeline de ventas.  
**Encabezado:** "Pipeline de Ventas por Etapa" + botón link "Ver todo →"  
**Datos mostrados:**

| Etapa | % de Barra (relativo) | Oportunidades | Valor |
|-------|----------------------|---------------|-------|
| **Prospección** | ~30% de ancho | 32 opor. | $28,400 |
| **Calificación** | ~45% de ancho | 24 opor. | $45,200 |
| **Propuesta** | ~60% de ancho | 18 opor. | $63,100 |
| **Negociación** | ~75% de ancho | 11 opor. | $72,800 |
| **Cierre** | ~90% de ancho | 6 opor. | $39,000 |

Cada etapa muestra:
- Nombre de la etapa (texto izquierda)
- Barra de progreso horizontal coloreada (va de azul en Prospección a amarillo dorado en Cierre)
- A la derecha: número de oportunidades y valor en dólares en dos columnas separadas

### 5.4 Sección "Actividades Recientes"

**Componente:** Lista feed de actividades recientes del equipo  
**Encabezado:** "Actividades Recientes" + botón "Ver todas →"  
**Cada ítem contiene:**
- Ícono del tipo (📞 📧 📅 ✅ 📝)
- Nombre y descripción de la actividad
- Tiempo relativo (hace X min, hace Xh, Ayer HH:MM)
- Badge de tipo de actividad (a la derecha)

| Ícono | Actividad | Tiempo | Badge |
|-------|-----------|--------|-------|
| 📞 | Llamada con Carlos Ruiz | Hace 15 min | **Llamada** |
| 📧 | Email enviado a Tecno S.A. | Hace 1h | **Email** |
| 📅 | Reunión: Demo producto | Hace 3h | **Reunión** |
| ✅ | Tarea completada: Follow-up | Hace 5h | **Tarea** |
| 📝 | Nota: Interés en plan Pro | Ayer 18:30 | **Nota** |
| 📞 | Llamada perdida — Ana López | Ayer 14:00 | **Llamada** |

### 5.5 Sección "Leads por Fuente"

**Componente:** Barras horizontales con porcentajes de fuente de leads  
**Encabezado:** "Leads por Fuente"

| Fuente | Barra | Porcentaje |
|--------|-------|-----------|
| Sitio Web | ████████████░ | **38%** |
| Referidos | █████████░░░░ | **27%** |
| LinkedIn | ██████░░░░░░░ | **18%** |
| Llamada fría | ██░░░░░░░░░░░ | **10%** |
| Email | █░░░░░░░░░░░░ | **7%** |

### 5.6 Sección "Top Clientes"

**Componente:** Tabla de 3 columnas  
**Encabezado:** "Top Clientes" + botón "Ver más →"

| Empresa | Valor | Estado |
|---------|-------|--------|
| Tecno S.A. | $34,200 | 🟢 active |
| Global Corp | $28,100 | 🟢 active |
| NetSol Ltda. | $19,800 | 🟡 prospect |
| MegaTrade | $17,500 | 🟢 active |
| DataPoint S.A. | $12,400 | 🔴 inactive |

### 5.7 Sección "Tickets Urgentes"

**Encabezado:** "Tickets Urgentes" + botón "Ver todos →"  
**Cada ítem:**
- ID del ticket (#XXXX) — texto de color
- Descripción del problema
- Badge de prioridad (Crítico / Alto / Medio / Bajo)
- Tiempo desde creación

| ID | Asunto | Prioridad | Tiempo |
|----|--------|-----------|--------|
| #1042 | Error en módulo de facturación | 🔴 Crítico | 2h |
| #1039 | No puede acceder al portal cliente | 🟠 Alto | 5h |
| #1037 | Solicitud de Integración API | 🟡 Medio | 1d |
| #1035 | Consulta sobre precios enterprise | 🟢 Bajo | 1d |
| #1033 | Actualización de datos de cuenta | 🟢 Bajo | 3d |

### 5.8 Sección "Métricas de Conversión"

**Componente:** 6 tarjetas pequeñas con indicadores de conversión

| Métrica | Valor | Tendencia |
|---------|-------|-----------|
| Tasa Lead → Oport. | **34%** | +2.1% |
| Tasa Cierre | **22%** | +0.8% |
| Ciclo de Venta | **18d** | +3d |
| Ticket Promedio | **$4,850** | +$320 |
| Customer LTV | **$14,200** | +$900 |
| Churn Rate | **2.3%** | +0.6% |

### 5.9 Sección "Próximas Actividades"

**Encabezado:** "Próximas Actividades" + botón "Calendario →"

| Hora | Actividad | Badge |
|------|-----------|-------|
| 09:00 Hoy | Demo con MegaCorp | 🟢 Reunión |
| 11:30 Hoy | Llamada seguimiento Ana | 🔵 Llamada |
| 15:00 Hoy | Enviar propuesta Tecno | 🟡 Tarea |
| 09:00 Mañana | Reunión kick-off Global | 🟢 Reunión |
| 14:00 Miércoles | Revisión contrato NetSol | 🟡 Tarea |

---

## 6. Pantalla 2 — Contactos

**Dimensiones:** 1530 × 985 px  
**Nodo Figma:** `120:2`

Módulo de gestión de personas individuales: empleados de cuentas clientes, prospectos, leads.

### 6.1 Encabezado de Pantalla

- **Título H1:** "Contactos"
- **Subtítulo:** "Gestión de personas y relaciones individuales"
- **Botones de acción:**
  - `⬇ Importar` — botón secundario (importar desde CSV/Excel)
  - `⬆ Exportar` — botón secundario (exportar lista)
  - `+ Nuevo Contacto` — botón primario verde-azul (abre Modal Nuevo Contacto)

### 6.2 Tarjetas de Resumen (KPIs)

4 tarjetas KPI en una fila:

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **1,248** | Total Contactos | ↑ 24 este mes |
| **523** | Clientes | ↑ 8 nuevos |
| **384** | Prospectos | → Sin cambio |
| **341** | Leads | ↑ 16 nuevos |

### 6.3 Barra de Filtros y Búsqueda

- **Campo de búsqueda:** "Buscar contacto…" (borde redondeado, icono lupa)
- **Filtros desplegables:** (3 selectores inline sin label visible — implican Estado, Fuente, Responsable)
- **Toggle de vista:**
  - `⊞ Tarjetas` — vista de tarjetas (grid cards)
  - `☰` — vista de lista/tabla (activa por defecto)

### 6.4 Tabla de Contactos

Encabezados de columnas:
`NOMBRE | EMPRESA | CARGO | EMAIL | TELÉFONO | ESTADO | SCORE | ÚLTIMA ACT. | ACCIONES`

**Datos de ejemplo (10 filas mostradas de 1,248):**

| Avatar | Nombre | Empresa | Cargo | Email | Teléfono | Estado | Score | Última act. |
|--------|--------|---------|-------|-------|----------|--------|-------|-------------|
| 🔵 CR | **Carlos Ruiz** | Tecno S.A. | Director Comercial | c.ruiz@tecno.com | +57 300 111 2222 | 🟢 Cliente | ████ 92 | Hace 1h |
| 🟣 AL | **Ana López** | Global Corp | Gerente de Compras | alopez@globalcorp.com | +57 310 222 3333 | 🟢 Cliente | ████ 88 | Ayer |
| 🟤 MT | **Mario Torres** | NetSol Ltda. | CEO | m.torres@netsol.co | +57 320 333 4444 | 🟡 Prospecto | ███░ 74 | 3 días |
| 🟢 LH | **Lucía Herrera** | DataPoint S.A. | CTO | lherrera@datapoint.com | +57 315 444 5555 | 🟡 Lead | ██░░ 61 | 1 semana |
| 🔴 PM | **Pedro Mendoza** | MegaTrade | Director TI | pmendoza@megatrade.co | +57 305 555 6666 | 🟢 Cliente | ████ 95 | 2h |
| 🔵 SG | **Sandra Gómez** | SoftCo | VP Ventas | sgomez@softco.com | +57 321 666 7777 | ⬛ Inactivo | █░░░ 40 | 1 mes |
| 🟠 FC | **Felipe Castro** | InnoTech | Gerente Financiero | fcastro@innotech.io | +57 317 777 8888 | 🟡 Prospecto | ██░░ 70 | 4 días |
| 🟣 VR | **Valentina Ramos** | Logística Plus | Directora General | vramos@logplus.com | +57 312 888 9999 | 🟡 Lead | ██░░ 55 | 2 semanas |
| 🟢 AS | **Andrés Silva** | FinGroup | CFO | asilva@fingroup.co | +57 318 999 0000 | 🟢 Cliente | ████ 87 | 1 día |
| 🔵 CM | **Carolina Morales** | Retail Max | Directora Marketing | cmorales@retailmax.com | +57 305 000 1111 | 🟡 Prospecto | ██░░ 68 | 5 días |

**Columna SCORE:** Barra de progreso visual (de 0 a 100) en verde para scores altos, naranja para medios, rojo para bajos

**Columna ACCIONES:** 3 botones ghost icon:
- 📞 Llamar
- 👁 Ver detalle
- ⋯ Más opciones (menú desplegable)

### 6.5 Paginación

`← Anterior | 1 | 2 | 3 | ... | 125 | Siguiente →`  
"Mostrando 1-10 de 1,248 contactos"

---

## 7. Pantalla 3 — Cuentas / Empresas

**Dimensiones:** 1530 × 985 px  
**Nodo Figma:** `121:2`

Gestión de empresas, organizaciones y clientes corporativos.

### 7.1 Encabezado

- **Título H1:** "Cuentas / Empresas"
- **Subtítulo:** "Gestión de empresas, organizaciones y clientes corporativos"
- **Botones:**
  - `⬇ Importar` — secundario
  - `⬆ Exportar` — secundario
  - `+ Nueva Cuenta` — primario

### 7.2 KPIs

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **342** | Total Cuentas | ↑ 12 este mes |
| **198** | Clientes Activos | ↑ 6 nuevos |
| **$120,000** | Ingresos (MTD) | ↑ 18% |
| **$450,000** | Pipeline Total | ↑ 5.4% |

### 7.3 Tabla de Cuentas

Columnas: `EMPRESA | INDUSTRIA | TIPO | CONTACTOS | INGRESOS | POTENCIAL | ESTADO | RESPONSABLE | ACTUALIZADO | ACCIONES`

| Letra | Empresa | Industria | Tipo | Contactos | Ingresos | Potencial | Estado | Responsable | Actualizado |
|-------|---------|-----------|------|-----------|----------|-----------|--------|-------------|-------------|
| T | **Tecno S.A.** | Tecnología | 🟢 Cliente | 8 | $34,200 | $80k | Activo | Carlos V. | 1h |
| G | **Global Corp** | Manufactura | 🟢 Cliente | 12 | $28,100 | $60k | Activo | María P. | 3h |
| N | **NetSol Ltda.** | Software | 🟡 Prospect | 3 | $0 | $40k | Activo | Luis A. | 1d |
| D | **DataPoint S.A.** | Datos/BI | ⬛ Inactivo | 5 | $12,400 | $25k | Inactivo | Ana R. | 1 sem. |
| M | **MegaTrade** | Comercio | 🟢 Cliente | 6 | $17,500 | $45k | Activo | Pedro S. | 2h |
| S | **SoftCo** | Software | 🔴 Ex-cliente | 2 | $5,000 | $15k | Inactivo | María P. | 2 sem. |
| I | **InnoTech** | Tecnología | 🟡 Prospect | 4 | $0 | $30k | Activo | Carlos V. | 4d |
| L | **Logística Plus** | Logística | 🟠 Lead | 1 | $0 | $20k | Nuevo | Luis A. | 2 sem. |
| F | **FinGroup** | Finanzas | 🟢 Cliente | 9 | $22,800 | $55k | Activo | Ana R. | 1d |
| R | **Retail Max** | Retail | 🟡 Prospect | 3 | $0 | $35k | Activo | Pedro S. | 5d |

**Columna POTENCIAL:** Valor en color verde para alto potencial ($50k+), naranja para medio, rojo/gris para bajo

**Columna ACCIONES:** Iconos 👁 (ver) + ✏️ (editar, abre Modal Editar Cuenta) + ⋯ (más)

### 7.4 Paginación

`← Anterior | 1 | 2 | 3 | Siguiente →`  
"Mostrando 1-10 de 342 cuentas"

---

## 8. Pantalla 4 — Leads

**Dimensiones:** 1530 × 1165 px  
**Nodo Figma:** `122:2`

Captura, calificación y seguimiento de prospectos potenciales antes de convertirlos en oportunidades.

### 8.1 Encabezado

- **Título H1:** "Leads"
- **Subtítulo:** "Captura, calificación y seguimiento de prospectos potenciales"
- **Botones:**
  - `⬇ Importar` — secundario
  - `+ Nuevo Lead` — primario

### 8.2 KPIs (5 tarjetas)

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **84** | Nuevos este mes | ↑ 13.5% |
| **38** | Calificados | ↑ 8 nuevos |
| **21** | Convertidos | 38.3% conv. |
| **12** | Descartados | 14.3% |
| **4.2d** | Tiempo resp. prom. | ↑ 1.2d |

### 8.3 Embudo de Leads (Funnel Visual)

Visualización tipo embudo con 5 etapas en tarjetas rectangulares con flechas:

```
[84 Capturados 100%] → [62 Contactados 74%] → [38 Calificados 45%] → [24 Propuesta 29%] → [21 Convertidos 25%]
```

Colores de las etapas (de izquierda a derecha):
- Capturados: azul oscuro `#1a3d6b`
- Contactados: azul medio `#2563a8`
- Calificados: ocre dorado
- Propuesta: naranja
- Convertidos: verde

### 8.4 Tabla de Leads

Columnas: `NOMBRE | EMPRESA | FUENTE | ESTADO | SCORE | RESPONSABLE | CREADO | CAMPAÑA | ACCIONES`

| Avatar | Nombre | Empresa | Fuente | Estado | Score | Responsable | Creado | Campaña |
|--------|--------|---------|--------|--------|-------|-------------|--------|---------|
| 🔵 RJ | Roberto Jiménez | Alpha IT | 🔵 Sitio Web | 🟢 Nuevo | ████ 82 | Carlos V. | Hoy | Q1 Email |
| 🔵 DP | Diana Parra | BetaTech | 🟦 LinkedIn | 🟡 Contactado | ███░ 75 | María P. | 1d | LinkedIn Ads |
| 🟢 RV | Raúl Vargas | Gamma Corp | 🟠 Referido | 🟤 Calificado | ████ 90 | Luis A. | 2d | — |
| 🟠 PR | Paola Rios | Delta Solutions | 🟣 Evento | 🟢 Nuevo | ██░░ 65 | Ana R. | 3d | Expo Tech 2026 |
| ⬛ SM | Sergio Medina | Epsilon S.A. | 🔴 Llamada fría | 🔴 Descartado | █░░░ 30 | Pedro S. | 4d | — |
| 🔵 PL | Patricia Luna | Zeta Cloud | 🔵 Sitio Web | 🟡 Contactado | ███░ 78 | Carlos V. | 5d | Google Ads |
| 🟢 AC | Alberto Cruz | Eta Software | 🟠 Referido | 🟤 Calificado | ████ 88 | María P. | 6d | — |
| 🟡 CM | Claudia Mora | Theta Retail | 📧 Email | 🟢 Convertido | ████ 95 | Luis A. | 1 sem. | Newsletter Mar |
| 🟠 GO | Gustavo Ortiz | Iota Finance | 🟦 LinkedIn | 🟡 Contactado | ███░ 72 | Ana R. | 1 sem. | LinkedIn Ads |
| 🔵 NC | Natalia Castillo | Kappa Media | 🔵 Sitio Web | 🟢 Nuevo | ██░░ 60 | Pedro S. | 2 sem. | SEO Landing |

**Badges de FUENTE:**
- Sitio Web — azul
- LinkedIn — azul oscuro
- Referido — naranja
- Evento — morado
- Llamada fría — rojo
- Email — gris

### 8.5 Paginación

`← Anterior | 1 | 2 | Siguiente →`  
"Mostrando 1-10 de 84 leads"

---

## 9. Pantalla 5 — Oportunidades

**Dimensiones:** 1572 × 845 px  
**Nodo Figma:** `123:2`

Pipeline de ventas y gestión de oportunidades activas. Presenta **vista Kanban** (tablero) y soporte para **vista Lista**.

### 9.1 Encabezado

- **Título H1:** "Oportunidades"
- **Subtítulo:** "Pipeline de ventas y gestión de oportunidades activas"
- **Botones esquina derecha:**
  - `⊞ Tablero` — toggle vista Kanban (activa)
  - `☰ Lista` — toggle vista lista
  - `+ Nueva Oportunidad` — primario

### 9.2 KPIs (5 tarjetas)

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **26** | Oportunidades activas | ↑ 4 nuevas |
| **$248,500** | Valor del pipeline | ↑ 4.7% |
| **$82,300** | Cerrado este mes | ↑ 21.4% |
| **22%** | Tasa de cierre | ↑ 2.1% |
| **18d** | Ciclo prom. de venta | ↓ 3d más rápido |

### 9.3 Tablero Kanban

Total de pipeline visible bajo la barra de búsqueda: **Pipeline: $248,500** (en verde)

El tablero tiene **5 columnas** (etapas), cada columna muestra:
- Nombre de etapa + conteo de tarjetas (ej. "Prospección 8")
- Valor total de la etapa
- Tarjetas de oportunidad individuales
- Botón `+ Agregar oportunidad` al fondo de cada columna

#### Columna 1: **Prospección** — 8 tarjetas — $26,400
| Oportunidad | Empresa | Valor | Asignado | Días |
|-------------|---------|-------|----------|------|
| Sistema ERP - Alpha IT | Alpha IT | $8,200 | CV | 5d |
| CRM License - BetaTech | BetaTech | $6,500 | MP | 3d |
| Consultoría - Gamma Corp | Gamma Corp | $4,800 | LA | 8d |

#### Columna 2: **Calificación** — 6 tarjetas — $45,200
| Oportunidad | Empresa | Valor | Asignado | Días |
|-------------|---------|-------|----------|------|
| Cloud Migration - NetSol | NetSol Ltda. | $18,000 | AR | 12d |
| BI Dashboard - DataPoint | DataPoint S.A. | $14,000 | PS | 7d |
| Integración API - Epsilon | Epsilon S.A. | $13,200 | CV | 11d |

#### Columna 3: **Propuesta** — 5 tarjetas — $63,100
| Oportunidad | Empresa | Valor | Asignado | Días |
|-------------|---------|-------|----------|------|
| Software Suite - Tecno S.A. | Tecno S.A. | $28,500 | MP | 18d |
| Soporte Anual - Global Corp | Global Corp | $22,000 | LA | 22d |
| Módulo HR - InnoTech | InnoTech | $12,600 | AR | 8d |

#### Columna 4: **Negociación** — 4 tarjetas — $72,800
| Oportunidad | Empresa | Valor | Asignado | Días |
|-------------|---------|-------|----------|------|
| Enterprise Plan - MegaTrade | MegaTrade | $42,000 | CV | 25d |
| Licencias - FinGroup | FinGroup | $30,800 | MP | 30d |

#### Columna 5: **Ganado ✓** — 3 tarjetas — $35,000
| Oportunidad | Empresa | Valor | Asignado | Días |
|-------------|---------|-------|----------|------|
| CRM Impl. - Retail Max | Retail Max | $22,000 | LA | 45d |
| Mantenimiento - SoftCo | SoftCo | $17,000 | AR | 40d |

**Tarjeta de Oportunidad — Elementos:**
- Nombre de la oportunidad (título)
- Nombre de la empresa (con icono de empresa pequeño)
- Valor estimado en verde
- Barra de probabilidad de cierre (% visual)
- Avatar del responsable (iniciales) + días en la etapa

---

## 10. Pantalla 6 — Actividades

**Dimensiones:** 1530 × 1002 px  
**Nodo Figma:** `124:2`

Gestión centralizada de tareas, llamadas, reuniones y emails del equipo.

### 10.1 Encabezado

- **Título H1:** "Actividades"
- **Subtítulo:** "Tareas, llamadas, reuniones y emails pendientes del equipo"
- **Botón:** `+ Nueva Actividad` — primario

### 10.2 KPIs (5 tarjetas)

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **47** | Total pendientes | ↑ 5 vencidas (en rojo) |
| **5** | Urgentes hoy | Requieren acción (en rojo) |
| **128** | Completadas (mes) | ↑ 18% |
| **92%** | Tasa completado | ↑ 3% |
| **2.4h** | Tiempo resp. promedio | ↓ 0.5h |

### 10.3 Pestañas de Filtro

```
Todas (47) | Hoy (8) | Llamadas (15) | Reuniones (12) | Emails (11) | Tareas (9) | Completadas
```
La pestaña activa "Todas (47)" tiene subrayado azul.

### 10.4 Barra de Búsqueda y Filtros

- Campo: "Buscar actividad…"
- 3 filtros desplegables adicionales (Estado, Tipo, Responsable — interpretados de la interfaz)

### 10.5 Tabla de Actividades

Columnas: `TIPO | ACTIVIDAD | CONTACTO | EMPRESA | VENCIMIENTO | ESTADO | PRIORIDAD | RESPONSABLE | ACCIONES`

| Tipo | Actividad | Contacto | Empresa | Vencimiento | Estado | Prioridad | Responsable |
|------|-----------|----------|---------|-------------|--------|-----------|-------------|
| 📞 | Seguimiento propuesta | Carlos Ruiz | Tecno S.A. | Hoy 10:00 | 🔵 Pendiente | 🟠 Alta | Carlos V. |
| 📅 | Demo plataforma CRM | Ana López | Global Corp | Hoy 14:00 | 🔵 Pendiente | 🟠 Alta | María P. |
| 📄 | Enviar cotización revisada | Mario Torres | NetSol Ltda. | Hoy 16:00 | 🔵 Pendiente | 🟡 Media | Luis A. |
| ✅ | Actualizar CRM con notas | Lucía Herrera | DataPoint | Mañana | 🔵 Pendiente | 🟢 Baja | Ana R. |
| 📞 | Llamada de cierre contrato | Pedro Mendoza | MegaTrade | Mañana 09:00 | 🔴 Urgente | 🔴 Urgente | Pedro S. |
| 🚀 | Kick-off implementación | Felipe Castro | InnoTech | Jue 10:00 | 🟣 Programada | 🟠 Alta | Carlos V. |
| 📧 | Newsletter clientes Q1 | (Múltiples) | — | Vie 08:00 | ⬛ Borrador | 🟡 Media | María P. |
| 📋 | Revisar contrato anual | Sandra Gómez | SoftCo | Vie 17:00 | 🟡 En revisión | 🟡 Media | Luis A. |
| 📞 | Encuesta satisfacción | Andrés Silva | FinGroup | Lun 11:00 | 🔵 Pendiente | 🟢 Baja | Ana R. |
| 📅 | QBR con cliente enterprise | Carolina Morales | Retail Max | Mar 14:00 | 🟢 Confirmada | 🔴 Urgente | Pedro S. |

**Columna ACCIONES:**
- `✓ Completar` — botón primario pequeño (verde)
- ✏️ — editar
- ⋯ — más opciones

### 10.6 Paginación

`← Anterior | 1 | 2 | Siguiente →`  
"Mostrando 1-10 de 47 actividades"

---

## 11. Pantalla 7 — Calendario

**Dimensiones:** 1530 × 768 px  
**Nodo Figma:** `125:2`

Vista mensual de actividades, reuniones y compromisos del equipo.

### 11.1 Encabezado

- **Título H1:** "Calendario"
- **Subtítulo:** "Vista mensual de actividades, reuniones y compromisos del equipo"
- **Navegación del calendario:**
  - `← Feb` — mes anterior
  - **Marzo 2026** — mes actual (texto grande)
  - `Abr →` — mes siguiente
  - `Hoy` — botón de regreso al día actual
  - `Mes | Semana | Día` — selector de vista
  - `+ Nuevo Evento` — botón primario

### 11.2 Área del Calendario (Cuadrícula)

- Vista mensual con 6 semanas (Dom-Sáb)
- La cuadrícula muestra cada día con su número
- Los días con eventos muestran bloques de color:

| Día | Eventos |
|-----|---------|
| Mar 4 (Miércoles) | 🟢 Demo - MegaCorp |
| Jue 5 | 🔵 Llamada - Ana López; 🟡 Propuesta Tecno |
| Lun 9 | 🟠 Kick-off InnoTech |
| Mar 11 | 🟠 QBR - Retail Max |
| Mié 12 | 🟢 Demo B2B; 🟢 Webinar CRM |
| Lun 16 | 🔵 Llamada NetSol |
| Mar 17 | 🟡 Propuesta FinGroup |
| Mié 18 | 🟡 Revisión contratos |
| Jue 19 | 🟢 Reunión equipo ventas |
| Lun 23 | 🟡 Follow-up DataPoint |
| Mar 24 | 🟢 Demo - Alpha IT; 🔴 Cierre MegaTrade |
| Vie 26 | 🟠 Newsletter clientes |
| Lun 30 | 🟡 Review mensual |
| Mar 31 | 🔴 Cierre trimestral |

**Código de colores de eventos:**
- 🟢 Verde oscuro: Reuniones / Demos
- 🟢 Verde claro: Eventos confirmados
- 🟡 Amarillo/naranja: Tareas / Entregas
- 🔴 Rojo: Urgentes / Cierres

### 11.3 Panel Lateral Derecho

**"Hoy — 4 Mar"** — agenda del día seleccionado:
| Hora | Evento | Tipo |
|------|--------|------|
| 08:00-10:00 | Demo - MegaCorp | 🟢 Reunión |
| 11:30-12:00 | Llamada seguimiento Ana | 🔵 Llamada |
| 14:00-15:30 | Revisión propuesta interna | 🟢 Reunión |
| 16:00 | Enviar propuesta Tecno | 🟡 Tarea |

**"Esta Semana":**
| Día | Evento | Tipo |
|-----|--------|------|
| Mié 5 | Llamada - Ana López | 🔵 Llamada |
| Mié 5 | Propuesta Tecno | 🟡 Tarea |
| Lun 9 | Kick-off InnoTech | 🟢 Reunión |

**"Leyenda":**
- 🟢 Verde oscuro: Reuniones / Demos
- 🟢 Verde claro: Eventos confirmados
- 🟡 Tareas / Entregas
- 🔴 Urgentes / Cierres

---

## 12. Pantalla 8 — Productos (Catálogo)

**Dimensiones:** 1530 × 958 px  
**Nodo Figma:** `126:2`

Catálogo de productos, servicios y precios del CRM.

### 12.1 Encabezado

- **Título H1:** "Catálogo de Productos"
- **Subtítulo:** "Gestión de productos, servicios y precios"
- **Botón:** `+ Nuevo Producto` — primario

### 12.2 KPIs (4 tarjetas)

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **32** | Productos activos | — |
| **$1,240,800** | Ingresos totales (año) | ↑ 22% |
| **762** | Ventas este año | — |
| **68%** | Margen promedio | ↑ 2% |

### 12.3 Tabla de Productos

Columnas: `CÓDIGO | PRODUCTO/SERVICIO | CATEGORÍA | PRECIO | COSTO | MARGEN | DISPONIBILIDAD | ESTADO | VENTAS | ACCIONES`

| Código | Producto / Servicio | Categoría | Precio | Costo | Margen | Disponibilidad | Estado | Ventas |
|--------|--------------------|-----------|----|------|--------|----------------|--------|--------|
| PRO-001 | CRM Enterprise Suite | 🔵 Software | $2,400 | $480 | 🟢 80% | Ilimitado | Activo | 48 |
| PRO-002 | CRM Professional | 🔵 Software | $1,200 | $240 | 🟢 80% | Ilimitado | Activo | 124 |
| PRO-003 | CRM Starter | 🔵 Software | $480 | $96 | 🟢 80% | Ilimitado | Activo | 312 |
| PRO-004 | Módulo Marketing Avanzado | 🟡 Add-on | $600 | $120 | 🟢 80% | Ilimitado | Activo | 67 |
| PRO-005 | Módulo Soporte Premium | 🟡 Add-on | $480 | $96 | 🟢 80% | Ilimitado | Activo | 43 |
| PRO-006 | Implementación Básica | 🟠 Servicio | $1,800 | $900 | 🟡 50% | — | Activo | 28 |
| PRO-007 | Implementación Enterprise | 🟠 Servicio | $8,500 | $3,400 | 🟡 60% | — | Activo | 12 |
| PRO-008 | Soporte Anual Básico | 🟠 Servicio | $960 | $300 | 🟢 69% | — | Activo | 86 |
| PRO-009 | Capacitación (10h) | 🟠 Capacitación | $1,200 | $400 | 🟡 67% | — | Activo | 34 |
| PRO-010 | API Premium (12 meses) | 🟡 Add-on | $2,400 | $480 | 🟢 80% | Ilimitado | 🟣 Beta | 8 |

**Margen en colores:**
- ≥ 70%: Verde (bueno)
- 50-69%: Amarillo (aceptable)
- < 50%: Rojo (mejorar)

---

## 13. Pantalla 9 — Cotizaciones

**Dimensiones:** 1530 × 841 px  
**Nodo Figma:** `127:2`

Gestión de propuestas comerciales y presupuestos enviados a clientes.

### 13.1 Encabezado

- **Título H1:** "Cotizaciones"
- **Subtítulo:** "Propuestas comerciales y presupuestos enviados a clientes"
- **Botón:** `+ Nueva Cotización` — primario

### 13.2 KPIs (4 tarjetas)

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **28** | Cotizaciones activas | — |
| **$248,500** | Valor total pipeline | ↑ 8.3% |
| **68%** | Tasa de aceptación | ↑ 4% |
| **6.2d** | Tiempo de respuesta | ↓ 1.1d (mejoró) |

### 13.3 Tabla de Cotizaciones

Columnas: `NÚMERO | CLIENTE | CONTACTO | FECHA | VENCE | MONTO | ESTADO | PROBABILIDAD | ACCIONES`

| Número | Cliente | Contacto | Fecha | Vence | Monto | Estado | Prob. |
|--------|---------|----------|-------|-------|-------|--------|-------|
| **COT-2026-042** | Tecno S.A. | Carlos Ruiz | 01 Mar 2026 | 31 Mar 2026 | $26,500 | 🟢 Enviada | ████ 75% |
| **COT-2026-041** | Global Corp | Ana López | 28 Feb 2026 | 30 Mar 2026 | $22,000 | 🟡 En revisión | ███░ 60% |
| **COT-2026-040** | NetSol Ltda. | Mario Torres | 25 Feb 2026 | 27 Mar 2026 | $18,000 | ⬛ Borrador | ██░░ 35% |
| **COT-2026-039** | InnoTech | Felipe Castro | 22 Feb 2026 | 24 Mar 2026 | $12,600 | 🟢 Aceptada | ████ 100% |
| **COT-2026-038** | MegaTrade | Pedro Mendoza | 18 Feb 2026 | 20 Mar 2026 | $42,000 | 🟡 Negociación | ████ 80% |
| **COT-2026-037** | FinGroup | Andrés Silva | 15 Feb 2026 | 17 Mar 2026 | $30,800 | 🟢 Enviada | ███░ 65% |
| **COT-2026-036** | Retail Max | Carolina Morales | 10 Feb 2026 | 12 Mar 2026 | $22,000 | 🟢 Aceptada | ████ 100% |
| **COT-2026-035** | DataPoint S.A. | Lucía Herrera | 05 Feb 2026 | 07 Mar 2026 | $14,000 | 🔴 Rechazada | ░░░░ 0% |

**Número de cotización:** Texto azul clickeable (hipervínculo a detalle)  
**MONTO:** Verde para aceptadas, rojo para rechazadas, gris para borradores  
**ESTADO badges:** Colores semánticos  
**PROBABILIDAD:** Barra visual de 0-100%

---

## 14. Pantalla 10 — Facturas

**Dimensiones:** 1530 × 841 px  
**Nodo Figma:** `128:2`

Facturación, cobranza y control de pagos.

### 14.1 Encabezado

- **Título H1:** "Facturas"
- **Subtítulo:** "Facturación, cobranza y control de pagos"
- **Botones:**
  - `📊 Reporte cobros` — secundario
  - `+ Nueva Factura` — primario

### 14.2 KPIs (4 tarjetas)

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **$82,300** | Facturado (mes) | ↑ 21.4% |
| **$56,900** | Cobrado (mes) | ↑ 15.2% |
| **$25,400** | Por cobrar | ↑ $5,200 vencido (en rojo) |
| **18.3d** | DSO promedio (Days Sales Outstanding) | ↓ 2.4d (mejoró) |

### 14.3 Tabla de Facturas

Columnas: `NÚMERO | CLIENTE | FECHA EMISIÓN | VENCIMIENTO | MONTO | PAGADO | PENDIENTE | ESTADO | MÉTODO DE PAGO | ACCIONES`

| Número | Cliente | Fecha Emisión | Vencimiento | Monto | Pagado | Pendiente | Estado | Método |
|--------|---------|---------------|-------------|-------|--------|-----------|--------|--------|
| **FAC-2026-088** | InnoTech | 01 Mar 2026 | 31 Mar 2026 | $12,600 | $12,600 | — | 🟢 Pagada | Transferencia |
| **FAC-2026-087** | Retail Max | 28 Feb 2026 | 30 Mar 2026 | $22,000 | $0 | $22,000 | 🔵 Pendiente | — |
| **FAC-2026-086** | Tecno S.A. | 25 Feb 2026 | 27 Mar 2026 | $4,800 | $4,800 | — | 🟢 Pagada | Tarjeta |
| **FAC-2026-085** | Global Corp | 22 Feb 2026 | 24 Mar 2026 | $8,400 | $4,200 | $4,200 | 🟡 Parcial | Transferencia |
| **FAC-2026-084** | FinGroup | 18 Feb 2026 | 20 Mar 2026 | $15,200 | $0 | $15,200 | 🔴 Vencida | — |
| **FAC-2026-083** | MegaTrade | 14 Feb 2026 | 18 Mar 2026 | $9,800 | $9,800 | — | 🟢 Pagada | Cheque |
| **FAC-2026-082** | NetSol Ltda. | 10 Feb 2026 | 12 Mar 2026 | $6,400 | $0 | $6,400 | 🔴 Vencida | — |
| **FAC-2026-081** | DataPoint S.A. | 05 Feb 2026 | 07 Mar 2026 | $3,200 | $3,200 | — | 🟢 Pagada | Transferencia |

**ESTADO:**
- 🟢 Pagada: Verde
- 🔵 Pendiente: Azul
- 🟡 Parcial: Amarillo (pago incompleto)
- 🔴 Vencida: Rojo (urgente cobrar)

**ACCIONES en tabla:**
- 📄 Ver PDF / Vista previa
- 📤 Enviar por email
- ⋯ Más (registrar pago, duplicar, etc.)

"Mostrando 1-8 de 88 facturas"

---

## 15. Pantalla 11 — Campañas de Marketing

**Dimensiones:** 1530 × 1005 px  
**Nodo Figma:** `129:2`

Planificación, ejecución y medición de campañas de marketing multicanal.

### 15.1 Encabezado

- **Título H1:** "Campañas de Marketing"
- **Subtítulo:** "Planificación, ejecución y medición de campañas"
- **Botones:**
  - `📊 Analytics` — secundario
  - `+ Nueva Campaña` — primario

### 15.2 KPIs (5 tarjetas)

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **5** | Campañas activas | — |
| **46,920** | Alcance total | ↑ 12% |
| **120** | Conversiones | ↑ 18% |
| **$8,300** | Gasto total | — |
| **324%** | ROI promedio | ↑ 40% |

### 15.3 Pestañas de Tipo de Campaña

```
Todas | Email | Social | PPC / Ads | Eventos | Webinars
```

### 15.4 Lista de Campañas

Cada campaña muestra una fila completa con:
- Ícono de tipo + nombre + badges (estado, tipo)
- Fechas (desde → hasta) + presupuesto + ROI
- Métricas: Alcance / Aperturas / Clics / Conversiones
- Barras de progreso: Tasa apertura (%) + CTR (%) + Conversión (%)
- Botón `Ver resultados`
- Botón de edición ✏️

| Campaña | Estado | Tipo | Fechas | Presupuesto | ROI | Alcance | Aperturas | Clics | Conv. |
|---------|--------|------|--------|-------------|-----|---------|-----------|-------|-------|
| **Newsletter Q1 2026** | 🟢 Activa | Email | 01 Feb→30 Mar | $800 | **620%** | 4,820 | 1,640 | 312 | 48 |
| | Tasa apertura: **34%** | CTR: **19%** | | | | Conversión: **15%** |
| **LinkedIn Lead Gen Mar** | 🟢 Activa | Social | 01 Mar→31 Mar | $1,200 | **280%** | 12,400 | 3,200 | 680 | 22 |
| | Tasa apertura: **26%** | CTR: **21%** | | | | Conversión: **3%** |
| **Google Ads - Enterprise** | 🟢 Activa | PPC | 15 Feb→15 Abr | $2,500 | **210%** | 28,000 | 4,200 | 920 | 18 |
| | Tasa apertura: **15%** | CTR: **22%** | | | | Conversión: **2%** |
| **Expo Tech 2026** | ✅ Completada | Evento | 20 Feb→22 Feb | $3,200 | **185%** | 500 | 350 | 180 | 32 |
| | Tasa apertura: **70%** | CTR: **51%** | | | | Conversión: **18%** |
| **Webinar CRM Best Practices** | 🟣 Programada | Webinar | 15 Mar→15 Mar | $600 | ROI: — | 1,200 | 0 | 0 | 0 |

---

## 16. Pantalla 12 — Tickets de Soporte

**Dimensiones:** 1530 × 1196 px  
**Nodo Figma:** `130:2`

Gestión de casos, incidencias y solicitudes de clientes.

### 16.1 Encabezado

- **Título H1:** "Tickets de Soporte"
- **Subtítulo:** "Gestión de casos, incidencias y solicitudes de clientes"
- **Botón:** `+ Nuevo Ticket` — primario

### 16.2 KPIs (5 tarjetas)

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **23** | Tickets abiertos | ↑ 3 sin respuesta (en rojo) |
| **2** | Críticos | Requieren atención (en rojo) |
| **94%** | Satisfacción cliente | ↑ 2% |
| **4.2h** | Tiempo primera respuesta | ↓ 0.8h (mejoró) |
| **14h** | Tiempo resol. promedio | ↑ 2h (empeoró) |

### 16.3 Sección "SLA Conformidad"

**Tres indicadores de SLA** con barras de progreso y metas:

| Métrica | Valor actual | Meta |
|---------|-------------|------|
| Tiempo primera respuesta | 🟢 **91%** | ≤ 4h |
| Tiempo resolución | 🟢 **87%** | ≤ 24h |
| Disponibilidad sistema | 🟢 **99.8%** | ≥ 99.5% |

### 16.4 Sección "Tickets por Tipo"

**Gráfico de barras horizontales:**

| Tipo | Porcentaje |
|------|-----------|
| Bug | 🔴 **32%** |
| Solicitud | 🔵 **28%** |
| Consulta | 🟦 **22%** |
| Incidente | 🟠 **12%** |
| Mejora | 🟣 **6%** |

### 16.5 Sección "Agentes — Carga de trabajo"

**Por agente — barras de carga:**

| Agente | Abiertos | Cerrados | Barra |
|--------|----------|----------|-------|
| Carlos V. | 6 | 24 | ████████░░ |
| María P. | 5 | 31 | ██████░░░░ |
| Luis A. | 4 | 19 | █████░░░░░ |
| Ana R. | 4 | 22 | █████░░░░░ |
| Pedro S. | 3 | 15 | ████░░░░░░ |

### 16.6 Tabla de Tickets

Columnas: `ID | ASUNTO | CLIENTE | TIPO | PRIORIDAD | ESTADO | AGENTE | CREADO | ACCIONES`

| ID | Asunto | Cliente | Tipo | Prioridad | Estado | Agente | Creado |
|----|--------|---------|------|-----------|--------|--------|--------|
| **#1842** | Error en módulo de facturación | Tecno S.A. | Bug | 🔴 Crítico | 🟢 Abierto | CV | Hace 3h |
| **#1841** | No puede iniciar sesión en el portal | Global Corp | Incidente | 🟠 Alto | 🟡 En proceso | MP | Hace 3h |
| **#1840** | Solicitud exportar datos en Excel | NetSol Ltda. | Solicitud | 🟡 Medio | 🟢 Abierto | LA | Hace 5h |
| **#1839** | Error de carga de contactos masivos | MegaTrade | Bug | 🟠 Alto | 🟡 En proceso | AR | Hace 6h |
| **#1838** | Consulta sobre integración con SAP | InnoTech | Consulta | 🟡 Medio | 🟠 En espera | PS | Ayer |
| **#1837** | Panel de reportes no carga gráficas | FinGroup | Bug | 🟡 Medio | 🟡 En proceso | CV | Ayer |
| **#1836** | Agregar campo personalizado a lead | Retail Max | Mejora | 🟢 Bajo | 🟢 Abierto | MP | 2 días |
| **#1835** | Precios actualizados en catálogo | DataPoint S.A. | Solicitud | 🟢 Bajo | ✅ Cerrado | LA | 2 días |
| **#1834** | Problema con email de bienvenida | Alpha IT | Incidente | 🟡 Medio | ✅ Cerrado | AR | 3 días |

"Mostrando 1-9 de 156 tickets"

---

## 17. Pantalla 13 — Documentos

**Dimensiones:** 1530 × 904 px  
**Nodo Figma:** `132:2`

Repositorio centralizado de contratos, propuestas y archivos del CRM.

### 17.1 Encabezado

- **Título H1:** "Documentos"
- **Subtítulo:** "Repositorio centralizado de contratos, propuestas y archivos del CRM"
- **Botones:**
  - `📁 Nueva carpeta` — secundario
  - `⬆ Subir documento` — primario verde

### 17.2 KPIs (4 tarjetas)

| Valor | Etiqueta | Nota |
|-------|----------|------|
| **248** | Total documentos | — |
| **1.2 GB** | Almacenamiento usado | — |
| **48** | Contratos activos | — |
| **12** | Documentos por vencer | Requieren revisión (rojo) |

### 17.3 Categorías de Carpetas (pestañas)

```
📄 Contratos (48) | 📋 Propuestas (36) | 📊 Reportes (28) | 📣 Marketing (24) | 📘 Manuales (19) | 📐 Plantillas (22) | 📁 Contratos CRM (18)
```

### 17.4 Tabla de Documentos

Columnas: `NOMBRE DEL ARCHIVO | TIPO | TAMAÑO | FECHA | PROPIETARIO | VINCULADO A | ACCESO | ACCIONES`

| Archivo | Tipo | Tamaño | Fecha | Propietario | Vinculado a | Acceso |
|---------|------|--------|-------|-------------|-------------|--------|
| Contrato Marco - Tecno S.A.pdf | 🟦 Contrato | 2.4 MB | 01 Mar 2026 | Carlos V. | Tecno S.A. | 🔒 Privado |
| Propuesta Comercial - Global Corp.docx | 🟢 Propuesta | 1.8 MB | 28 Feb 2026 | María P. | Global Corp | 👥 Equipo |
| NDA - NetSol Ltda.pdf | 🟦 Contrato | 0.5 MB | 25 Feb 2026 | Luis A. | NetSol Ltda. | 🔒 Privado |
| Presentación Ejecutiva Q1 2026.pptx | 🟣 Presentación | 8.2 MB | 22 Feb 2026 | María P. | (General) | 🌐 Público |
| SLA MegaTrade 2026.pdf | 🟦 Contrato | 1.2 MB | 18 Feb 2026 | Pedro S. | MegaTrade | 👥 Equipo |
| Invoice Template 2026.xlsx | 🟡 Plantilla | 0.3 MB | 15 Feb 2026 | Carlos V. | (General) | 👥 Equipo |
| Guía de onboarding clientes.pdf | 📘 Manual | 3.6 MB | 10 Feb 2026 | Ana R. | (General) | 🌐 Público |
| Estudio de mercado Q4 2025.pdf | 📊 Reporte | 5.1 MB | 05 Feb 2026 | Luis A. | (Interno) | 👥 Equipo |

**ACCIONES por documento:**
- 👁 Ver/Descargar
- 🔗 Copiar enlace
- ⋯ Más (compartir, mover, eliminar)

---

## 18. Pantalla 14 — Equipo & Usuarios

**Dimensiones:** 1530 × 1241 px  
**Nodo Figma:** `133:2`

Gestión de usuarios, roles y permisos del CRM.

### 18.1 Encabezado

- **Título H1:** "Equipo & Usuarios"
- **Subtítulo:** "Gestión de usuarios, roles y permisos del CRM"
- **Botones:**
  - `🔑 Roles y permisos` — secundario
  - `+ Invitar usuario` — primario

### 18.2 KPIs (4 tarjetas)

| Valor | Etiqueta |
|-------|----------|
| **10** | Usuarios totales |
| **9** | Activos |
| **5** | Vendedores |
| **4** | Licencias disponibles |

### 18.3 Sección "Usuarios por Departamento"

**Gráfico de barras horizontales:**

| Departamento | Usuarios | Barra |
|-------------|----------|-------|
| Ventas | 5 | █████████░ |
| Soporte | 2 | ████░░░░░░ |
| Marketing | 1 | ██░░░░░░░░ |
| Dirección | 1 | ██░░░░░░░░ |
| Gerencia | 1 | ██░░░░░░░░ |

### 18.4 Sección "Performance Equipo Ventas"

**Barras de desempeño (cierres logrados / meta):**

| Vendedor | Cierres | Meta | Barra |
|----------|---------|------|-------|
| Carlos V. | 8/10 | 80% | ████████░░ (verde) |
| María P. | 9/10 | 90% | █████████░ (verde) |
| Luis A. | 6/10 | 60% | ██████░░░░ (amarillo) |
| Ana R. | 5/10 | 50% | █████░░░░░ (naranja) |
| Pedro S. | 4/10 | 40% | ████░░░░░░ (rojo) |

### 18.5 Sección "Roles del Sistema"

| Rol | Color | Descripción | Usuarios |
|-----|-------|-------------|----------|
| Administrador | 🔴 Rojo | Acceso total al sistema | 1 |
| Gerencia | 🟠 Naranja | Vista completa, sin edición datos | 1 |
| Jefe de Ventas | 🟡 Amarillo | CRM completo, reportes de equipo | 1 |
| Ej. de Ventas | 🟢 Verde | Propios contactos y oportunidades | 4 |
| Soporte | 🔵 Azul | Tickets y clientes asignados | 2 |
| Marketing | 🟣 Morado | Campañas, leads y contactos | 1 |
| Read-only | ⬛ Gris | Solo lectura de reportes | 1 |

### 18.6 Tabla de Usuarios

Columnas: `USUARIO | ROL | DPTO. | EMAIL | TELÉFONO | LEADS | OPORTUNIDADES | CIERRES | ESTADO | ÚLT. ACTIVIDAD | ACCIONES`

| Avatar | Nombre | Rol | Dpto. | Email | Teléfono | Leads | Oport. | Cierres | Estado | Últ. act. |
|--------|--------|-----|-------|-------|----------|-------|--------|---------|--------|-----------|
| JM | **Juan Martínez** | 🔴 Administrador | Dirección | jmartinez@nexuscrm.com | +57 300 111 0001 | — | — | — | 🟢 Activo | Ahora |
| CV | **Carlos Vargas** | 🟢 Ej. de Ventas | Ventas | cvargas@nexuscrm.com | +57 300 111 0002 | 28 | 12 | **8** | 🟢 Activo | 2h |
| MP | **María Pérez** | 🟢 Ej. de Ventas | Ventas | mperez@nexuscrm.com | +57 300 111 0003 | 24 | 10 | **9** | 🟢 Activo | 1h |
| LA | **Luis Arango** | 🟢 Ej. de Ventas | Ventas | larango@nexuscrm.com | +57 300 111 0004 | 18 | 8 | **6** | 🟢 Activo | 3h |
| AR | **Ana Rodríguez** | 🟢 Ej. de Ventas | Ventas | arodriguez@nexuscrm.com | +57 300 111 0005 | 16 | 7 | **5** | 🟢 Activo | 4h |
| PS | **Pedro Salcedo** | 🟢 Ej. de Ventas | Ventas | psalcedo@nexuscrm.com | +57 300 111 0006 | 14 | 6 | **4** | 🟢 Activo | 5h |
| SG | **Sofía Gómez** | 🔵 Agente Soporte | Soporte | sgomez@nexuscrm.com | +57 300 111 0007 | — | — | — | 🟢 Activo | 1h |
| RT | **Ricardo Torres** | 🔵 Agente Soporte | Soporte | rtorres@nexuscrm.com | +57 300 111 0008 | — | — | — | 🟢 Activo | 2h |
| LM | **Laura Mendoza** | 🟣 Marketing | Marketing | lmendoza@nexuscrm.com | +57 300 111 0009 | — | — | — | 🟢 Activo | 3h |
| FR | **Felipe Ríos** | ⬛ Read-only | Gerencia | frios@nexuscrm.com | +57 300 111 0010 | — | — | — | ⬛ Inactivo | 1 sem. |

**ACCIONES por usuario:**
- ✏️ Editar usuario
- 🔑 Gestionar permisos
- ⋯ Más opciones (activar/desactivar, resetear contraseña)

---

## 19. Pantalla 15 — Reportes y Analítica

**Dimensiones:** 1530 × 1263 px  
**Nodo Figma:** `131:2`

Métricas de negocio, tendencias y KPIs del CRM.

### 19.1 Encabezado

- **Título H1:** "Reportes y Analítica"
- **Subtítulo:** "Métricas de negocio, tendencias y KPIs del CRM"
- **Botones:**
  - `📅 Este trimestre` — selector de período
  - `⬇ Exportar PDF` — secundario
  - `+ Crear reporte` — primario

### 19.2 KPIs (6 tarjetas en una fila)

| Valor | Etiqueta | Tendencia |
|-------|----------|-----------|
| **$248k** | Pipeline Q1 | ↑ 18% |
| **$82k** | Cerrado Q1 | ↑ 21% |
| **22%** | Tasa cierre | ↑ 2.1% |
| **84** | Leads captados | ↑ 13.5% |
| **$14.2k** | LTV prom. | ↑ 5.6% |
| **94%** | CSAT (satisfacción) | ↑ 2% |

### 19.3 Pestañas de Reportes

```
Resumen | Ventas | Marketing | Soporte | Equipo | Personalizados
```

### 19.4 Gráfico "Ingresos Mensuales 2026"

**Tipo:** Barras verticales  
**Datos visibles (Ene-Mar proyectado hasta Dic):**

| Mes | Valor |
|-----|-------|
| Ene | $55k |
| Feb | $72k |
| Mar | $82k |
| Abr–Dic | (barras vacías/proyectadas) |

Indicador: **↑ 21% vs 2025** (verde)

### 19.5 Gráfico "Pipeline por Ejecutivo de Ventas"

**Tipo:** Barras horizontales con valor

| Ejecutivo | Pipeline |
|-----------|---------|
| Carlos V. | ████████ $72,400 |
| María P. | ███████ $65,200 |
| Luis A. | █████ $48,100 |
| Ana R. | ████ $38,300 |
| Pedro S. | ███ $24,500 |

### 19.6 Gráfico "Leads por Fuente"

**Tipo:** Barras horizontales (mismo que Dashboard pero en pantalla completa)

| Fuente | % |
|--------|---|
| Sitio Web | 38% |
| Referidos | 27% |
| LinkedIn | 18% |
| Llamada fría | 10% |
| Email | 7% |

### 19.7 Gráfico "Ganado / Perdido por Industria"

**Tipo:** Barras dobles (verde = ganado, rojo = perdido) por industria

| Industria | Ganado | Perdido |
|-----------|--------|---------|
| Tecnología | 8W | 3L |
| Manufactura | 5W | 4L |
| Software | 6W | 2L |
| Finanzas | 4W | 3L |
| Retail | 3W | 2L |

### 19.8 Estadísticas "Actividades del Equipo (mes)"

4 métricas en tarjetas con íconos:

| Ícono | Valor | Etiqueta | Tendencia |
|-------|-------|----------|-----------|
| 📞 | **428** | Llamadas | +12% |
| 📧 | **816** | Emails | +8% |
| 📅 | **124** | Reuniones | +15% |
| ✅ | **312** | Tareas | +5% |

### 19.9 Sección "Reportes Guardados"

**Cabecera:** "Reportes Guardados" + botón `+ Crear reporte`

**Columnas:** `NOMBRE DEL REPORTE | CATEGORÍA | ÚLTIMA EJECUCIÓN | PROGRAMADO | CREADO POR | ACCIONES`

| Reporte | Categoría | Última ejecución | Programado |
|---------|-----------|-----------------|------------|
| Resumen ejecutivo mensual | 🟢 Ventas | Hace 2h | Manual |
| Performance de campañas Q1 | 🔵 Marketing | Ayer | Semanal |
| Análisis de cartera de clientes | 🟠 CRM | Hace 3h | Manual |
| Tablero de soporte y SLA | 🟣 Soporte | Hace 1h | Diario |
| Forecast trimestral | 🟢 Ventas | Hace 4h | Semanal |

**ACCIONES:** ▶ Ejecutar + ✏️ Editar + 🗑 Eliminar

---

## 20. Pantalla 16 — Configuración del Sistema

**Dimensiones:** 1530 × 1731 px  
**Nodo Figma:** `134:2`

Ajustes generales, integraciones y personalización del CRM.

### 20.1 Encabezado

- **Título H1:** "Configuración del Sistema"
- **Subtítulo:** "Ajustes generales, integraciones y personalización de Maki"
- **Botón:** `💾 Guardar cambios` — primario

### 20.2 Menú Lateral de Configuración

El lado izquierdo tiene un submenú de secciones:

| # | Sección |
|---|---------|
| 1 | General |
| 2 | Mi perfil |
| 3 | Seguridad |
| 4 | Usuarios y roles |
| 5 | Notificaciones |
| 6 | Personalización |
| 7 | Datos y campos |
| 8 | Integraciones |
| 9 | Email y plantillas |
| 10 | Reportes |
| 11 | Facturación y plan |
| 12 | Privacidad y SGPR |
| 13 | Auditoría y logs |
| 14 | API y webhooks |

### 20.3 Sección "Configuración General"

**Formulario con los siguientes campos:**

| Campo | Valor de ejemplo |
|-------|-----------------|
| Nombre de la empresa | Mi Empresa S.A. |
| NIT / RUT | 900.123.456-7 |
| Email principal | info@miempresa.com |
| Teléfono | +57 1 234 5678 |
| Sitio web | https://miempresa.com |
| País | (selector) |
| Zona horaria | (selector) |
| Moneda Predeterminada | (selector) |
| Dirección | Calle 72 No. 12-45, Bogotá, Colombia |

### 20.4 Sección "Etapas del Pipeline de Ventas"

**Encabezado:** "Etapas del Pipeline de Ventas" + botón `+ Agregar etapa`

Listado editable de etapas con porcentaje de probabilidad y acciones de reordenamiento:

| Color | Etapa | Probabilidad | Acciones |
|-------|-------|-------------|---------|
| 🔵 Azul | Prospección | 10% | ↑ ↓ ✏️ 🗑 |
| 🟡 Amarillo | Calificación | 25% | ↑ ↓ ✏️ 🗑 |
| 🟠 Naranja | Propuesta | 50% | ↑ ↓ ✏️ 🗑 |
| 🔴 Rojo-naranja | Negociación | 75% | ↑ ↓ ✏️ 🗑 |
| 🟢 Verde | Ganado | 100% | ↑ ↓ ✏️ 🗑 |

### 20.5 Sección "Notificaciones"

Lista de eventos disparadores con toggle Email / App:

| Evento | Email | App |
|--------|-------|-----|
| Nuevo lead asignado | ✓ | ✓ |
| Recordatorio de actividad | ✓ | ✓ |
| Oportunidad sin actividad (7d) | ✓ | ✓ |
| Ticket crítico creado | ✓ | ✓ |
| Cotización aceptada | ✓ | ✓ |
| Factura vencida | ✓ | ✓ |
| Reporte semanal de ventas | ✓ | ✓ |
| Meta de ventas alcanzada | ✓ | ✓ |

### 20.6 Sección "Integraciones"

8 integraciones disponibles en cuadrícula 2×4:

| Integración | Estado | Descripción |
|-------------|--------|-------------|
| **Google Workspace** | ✅ Configurado | Email, Calendar, Drive |
| **Slack** | Configurar | Notificaciones de equipo |
| **WhatsApp Business** | Conectar | Mensajes a clientes |
| **Zapier** | Conectar | Automatizaciones sin código |
| **Stripe** | Conectar | Pagos y facturación |
| **HubSpot** | Conectar | Migración de datos |
| **Mailchimp** | Configurar | Email marketing |
| **LinkedIn** | Configurar | Lead generation |

---

## 21. Pantalla 17 — Inbox (Mensajería Omnicanal)

**Dimensiones del frame:** 1469 × 843 px  
**Nodo Figma:** `2200:19907`  
**Archivo Figma:** CRM FENIX Modales (`isIEI6L3uRtP7rgKvL5Ggb`)

El Inbox es la **central de comunicaciones** del CRM. Permite a los agentes recibir y responder mensajes de clientes desde múltiples canales (WhatsApp, email, chat, etc.) **sin salir del sistema**, con acceso inmediato al contexto CRM de cada contacto.

### 21.1 Posición en el Sidebar

Aparece en la sección **VENTAS & CRM** del sidebar, entre **Leads** y **Oportunidades**, con un badge naranja que muestra el número de conversaciones pendientes (ej. `15`).

### 21.2 Encabezado de Pantalla

> No tiene header propio expandido — la pantalla ocupa el área de contenido completo con layout de 3 columnas.

- **Breadcrumb:** Maki › Inbox
- **Búsqueda global** y avatar de usuario (header estándar compartido)

### 21.3 Layout — 3 Columnas

```
┌──────────────────┬─────────────────────────────────┬────────────────────┐
│  Lista de        │   Conversación activa (chat)     │  Detalle de        │
│  conversaciones  │                                  │  contacto          │
│  (~260px)        │   (~500px centro)                │  (~220px)          │
└──────────────────┴─────────────────────────────────┴────────────────────┘
```

---

### 21.4 Panel Izquierdo — Lista de Conversaciones

**Título:** `Inbox 🟡` (con badge naranja indicando conversaciones pendientes)  
**Subtítulo:** "Asignadas a mi"

#### Pestañas de filtro
```
Contactos | Todos (activo) | No leídos | Prioridad | >
```
- **Todos** — muestra todas las conversaciones
- **No leídos** — filtra solo mensajes no leídos
- **Prioridad** — filtra conversaciones marcadas como prioritarias
- `>` — más filtros disponibles (desplegable)

#### Campo de búsqueda
- Placeholder: "Buscar conversacion..."
- Icono de lupa izquierdo
- Filtra la lista en tiempo real por nombre o contenido

#### Lista de conversaciones activas (3 mostradas)

Cada ítem muestra:
- Avatar circular con iniciales del contacto
- Nombre del contacto (en negrita)
- Hora del último mensaje (derecha)
- Último fragmento del mensaje (truncado)
- Badge del canal (WhatsApp, Email, etc.) — etiqueta coloreada
- Badge numérico de mensajes no leídos (en verde o rojo, derecha)

| Avatar | Contacto | Hora | Vista previa | Canal | No leídos |
|--------|----------|------|--------------|-------|-----------|
| 🟢 MJ | **Mg. Javier Rodríguez** | 11:02 a.m. | "Hola, como esta?" | WhatsApp | `3` |
| 🔵 AL | **Ana Lopez** | 10:30 a.m. | "Gracias por el seguimiento" | WhatsApp | — |
| 🔵 CR | **Carlos Ruiz** | 09:15 a.m. | "Cuando es la reunion demo?" | WhatsApp | — |

- La conversación activa (Javier Rodríguez) aparece **resaltada** con fondo azul claro
- Los mensajes no leídos tienen el nombre del contacto en **negrita**

---

### 21.5 Panel Central — Conversación Activa (Ventana de Chat)

#### Header de la conversación
- **Título:** "Conversacion" — texto grande
- **Subtítulo:** "Bandeja operativa"
- **Botón ⋯** (esquina derecha) — opciones: cerrar conversación, transferir agente, marcar como resuelto, etc.

#### Identidad del contacto (bajo el header)
- Avatar circular "MJ" (teal verde)
- Nombre: **Mg. Javier Rodríguez**
- Indicador de presencia: 🟢 **En línea**
- Canal activo: **Whatsapp**
- Badge **Nuevo** (azul) — nuevo contacto en el CRM
- Badge **VIP** (dorado) — cliente de alto valor

#### Área de mensajes (burbuja de chat)

Separador de fecha: `--- Hoy ---`

| Tipo | Mensaje | Hora |
|------|---------|------|
| 📥 Recibido (izquierda, gris) | "Hola, como esta? Tengo una consulta del plan Pro." | 03:15 p.m. |
| 📤 Enviado (derecha, teal) | "Hola Javier! Con gusto le ayudo. Soy Geraldine." | 03:20 p.m. |
| 📥 Recibido (izquierda, gris) | "Quiero saber el precio del plan Enterprise." | 11:00 a.m. |
| 📤 Enviado (derecha, teal) | "Le paso los detalles ahora mismo." | 11:02 a.m. |

**Estilo de burbujas:**
- Mensajes recibidos: fondo blanco/gris claro, alineados a la **izquierda**
- Mensajes enviados: fondo **teal** (`#0d9488`), texto blanco, alineados a la **derecha**

#### Barra de estado del chat
- 🟢 "Último mensaje recibido hoy a las 11:02 a.m." — barra verde en la parte baja del área de mensajes

#### Barra de escritura
| Elemento | Descripción |
|----------|-------------|
| Campo de texto | Placeholder "Escribe un mensaje..." — área de texto expandible |
| Barra de formato | `/` (comandos) `@` (menciones) `#` (etiquetas) `*` (negrita) `-` (lista) `=` (separador) |
| Botón `Enviar` | Primario teal, esquina inferior derecha — envía el mensaje al canal activo |

---

### 21.6 Panel Derecho — Detalle de Contacto (Ficha Rápida)

Este panel muestra en tiempo real toda la información CRM del contacto con quien se está chateando, sin necesidad de ir a otra pantalla.

#### Encabezado
- **Título:** "Detalle de contacto"
- **Subtítulo:** "Ficha rápida"

#### Información del contacto
| Campo | Valor |
|-------|-------|
| Avatar | Círculo "MJ" verde teal |
| Nombre | **Mg. Javier Rodríguez** |
| Canales | Badge **Whatsapp** + Badge **Cliente VIP** |
| Tel | +593 98 389 3009 |
| Email | javier@empresa.com |
| Etapa | Negociación |
| Asig. | Geraldine A. |

#### Secciones de contexto CRM

| Sección | Contenido |
|---------|-----------|
| **Último mensaje** | "Quiero el plan Enterprise..." |
| **Contexto CRM** | "Pipeline activo: Plan Pro" |
| **Actividad** | "Reunion demo - hoy 15:00" |

> Estas secciones permiten al agente saber de un vistazo: qué pidió antes el cliente, en qué etapa de ventas está, y qué actividad tiene pendiente con él — todo sin abrir otra pestaña.

#### Botones de Acción Rápida (Footer del panel)

| Botón | Función |
|-------|---------|
| `+ Contacto` | Agregar o editar datos del contacto directamente |
| `Tarea` | Crear una tarea de seguimiento vinculada a esta conversación |
| `Ver CRM` | Abrir el perfil completo del contacto en el módulo Contactos |

---

### 21.7 Canales Soportados por el Inbox

El Inbox es **omnicanal** — centraliza mensajes de múltiples plataformas:

| Canal | Badge | Descripción |
|-------|-------|-------------|
| **WhatsApp** | Verde | Mensajes de WhatsApp Business |
| **Email** | Azul | Correos recibidos al email corporativo |
| **Chat web** | Teal | Chat en vivo del sitio web |
| **Instagram DM** | Rosa | Mensajes directos de Instagram |
| **Facebook** | Azul | Mensajes de Facebook Messenger |

### 21.8 Lógica de funcionamiento

```
Cliente escribe por WhatsApp / Email / Chat
        ↓
[Inbox recibe el mensaje] → asigna a agente disponible
        ↓
Agente ve el historial + contexto CRM del contacto (panel derecho)
        ↓
Agente responde desde el mismo Inbox (burbuja teal)
        ↓
Si necesita acción: crea Tarea, actualiza Etapa CRM o genera Ticket
        ↓
[Conversación se marca como resuelta]
```

### 21.9 Diferencia entre Inbox y Tickets

| Aspecto | Inbox | Tickets |
|---------|----|-----|
| Tipo de interacción | Conversación en tiempo real (chat) | Caso formal registrado |
| Canal | WhatsApp, Email, Chat web | Cualquier canal |
| Seguimiento | Inmediato, conversacional | Formal, con SLA y prioridad |
| Quién lo usa | Agente de ventas o soporte | Equipo de soporte técnico |
| Resultado típico | Respuesta rápida o conversión | Resolución de problema |

---

## 22. Catálogo Completo de Modales

Los modales son ventanas emergentes (dialogs) que se abren sobre la pantalla actual para crear registros o editar sin salir del contexto. Se configuran sobre un **overlay oscuro** (fondo negro semi-transparente).

### Diseño estándar de Modal

Todos los modales comparten:
- **Fondo blanco**, bordes redondeados (~8px border-radius)
- **Título en H3** (izquierda) + botón **✕ cerrar** (derecha)
- **Cuerpo con formulario** en grid de 2 columnas (algunas con 1 columna para campos anchos)
- **Footer** con: botón **"Cancelar"** (secundario) + botón **"Guardar" / "Invitar"** (primario teal)
- Inputs con placeholder dimmed y focus ring azul

---

### Modal 1 — Nueva Actividad (`2002:2`)

**Botón de apertura:** "+ Nueva Actividad" (Dashboard / Actividades)

**Campos del formulario:**
| Campo | Tipo | Placeholder | Columna |
|-------|------|-------------|---------|
| Tipo de actividad | Selector | Seleccionar... | Izquierda |
| Prioridad | Selector | Seleccionar... | Derecha |
| Título | Texto | Ingresar título... | Izquierda |
| Contacto | Búsqueda | Buscar contacto... | Derecha |
| Empresa | Búsqueda | Buscar empresa... | Izquierda |
| Fecha y hora | Fecha+hora | dd/mm/aaaa hh:mm | Derecha |
| Responsable | Selector | Seleccionar... | Izquierda (full width) |
| Notas | Textarea | Escribir notas... | Full width |

**Botones footer:** `Cancelar` + `Guardar`

---

### Modal 2 — Nuevo Contacto (`2002:48`)

**Botón de apertura:** "+ Nuevo Contacto" (Contactos)

**Campos:**
| Campo | Tipo | Placeholder | Columna |
|-------|------|-------------|---------|
| Nombre | Texto | Ej. Juan | Izquierda |
| Apellido | Texto | Ej. Pérez | Derecha |
| Empresa | Búsqueda | Buscar empresa... | Izquierda |
| Cargo | Texto | Ej. Gerente | Derecha |
| Email | Email | correo@ejemplo.com | Izquierda |
| Teléfono | Teléfono | +57 300 000 0000 | Derecha |
| Estado | Selector | Seleccionar... | Izquierda |
| Origen | Selector | Seleccionar... | Derecha |
| Responsable | Selector | Seleccionar... | Full width |

**Botones footer:** `Cancelar` + `Guardar`

---

### Modal 3 — Nueva Cuenta (`2002:148`)

Para crear empresas nuevas en el CRM.

**Campos:** Nombre empresa, Sitio Web, Teléfono, Industria (selector), País, Estado (Activo/Inactivo/Prospec.), Notas (textarea)

---

### Modal 4 — Nuevo Lead (`2002:199`)

**Botón de apertura:** "+ Nuevo Lead" (Leads)

**Campos:**
| Campo | Tipo | Placeholder | Columna |
|-------|------|-------------|---------|
| Nombre | Texto | Ej. Ana | Izquierda |
| Empresa | Búsqueda | Buscar empresa... | Derecha |
| Email | Email | correo@ejemplo.com | Izquierda |
| Teléfono | Teléfono | +57 300 000 0000 | Derecha |
| Fuente | Selector | Seleccionar... | Izquierda |
| Campaña | Selector | Seleccionar... | Derecha |
| Score (0-100) | Número | 0 | Izquierda |
| Responsable | Selector | Seleccionar... | Derecha |
| Notas | Textarea | Escribir notas... | Full width |

**Botones footer:** `Cancelar` + `Guardar`

---

### Modal 5 — Nueva Oportunidad (`2002:249`)

**Botón de apertura:** "+ Nueva Oportunidad" (Oportunidades)

**Campos:**
| Campo | Tipo | Placeholder | Columna |
|-------|------|-------------|---------|
| Nombre de oportunidad | Texto | Ej. Renovación contrato | Izquierda |
| Cuenta | Búsqueda | Buscar cuenta... | Derecha |
| Contacto | Búsqueda | Buscar contacto... | Izquierda |
| Valor estimado ($) | Número | 0.00 | Derecha |
| Probabilidad (%) | Número | 0 | Izquierda |
| Etapa | Selector | Seleccionar... | Derecha |
| Fecha de cierre | Fecha | dd/mm/aaaa | Izquierda |
| Responsable | Selector | Seleccionar... | Derecha |
| Origen | Selector | Seleccionar... | Full width |
| Notas | Textarea | Escribir notas... | Full width |

**Botones footer:** `Cancelar` + `Guardar`

---

### Modal 6 — Nuevo Producto (`2002:303`)

Para agregar productos al catálogo.

**Campos:** Nombre del producto, Código, Categoría, Precio, Costo, Disponibilidad, Estado, Descripción (textarea)

---

### Modal 7 — Nueva Cotización (`2002:348`)

**Botón de apertura:** "+ Nueva Cotización" (Cotizaciones)

**Campos:**
| Campo | Tipo | Placeholder | Columna |
|-------|------|-------------|---------|
| Cliente | Búsqueda | Buscar cliente... | Izquierda |
| Cuenta | Búsqueda | Buscar cuenta... | Derecha |
| Oportunidad | Selector | Seleccionar... | Izquierda |
| Validez (días) | Número | 30 | Derecha |
| Moneda | Selector | Seleccionar... | Izquierda |
| Descuento (%) | Número | 0 | Derecha |
| Notas | Textarea | Escribir notas... | Full width |

**Botones footer:** `Cancelar` + `Guardar`  
_(Tras guardar se puede agregar líneas de productos)_

---

### Modal 8 — Nueva Factura (`2002:389`)

**Botón de apertura:** "+ Nueva Factura" (Facturas)

**Campos:**
| Campo | Tipo | Placeholder | Columna |
|-------|------|-------------|---------|
| Cliente | Búsqueda | Buscar cliente... | Izquierda |
| Número de factura | Texto | Ej. FAC-0001 | Derecha |
| Fecha de emisión | Fecha | dd/mm/aaaa | Izquierda |
| Fecha de vencimiento | Fecha | dd/mm/aaaa | Derecha |
| Moneda | Selector | Seleccionar... | Izquierda |
| Cotización origen | Selector | Seleccionar... | Derecha |
| Notas | Textarea | Escribir notas... | Full width |

**Botones footer:** `Cancelar` + `Guardar`

---

### Modal 9 — Nueva Campaña (`2002:430`)

**Botón de apertura:** "+ Nueva Campaña" (Campañas)

**Campos:**
| Campo | Tipo | Placeholder | Columna |
|-------|------|-------------|---------|
| Nombre | Texto | Ej. Black Friday 2026 | Izquierda |
| Tipo | Selector | Seleccionar... | Derecha |
| Estado | Selector | Seleccionar... | Izquierda |
| Fecha de inicio | Fecha | dd/mm/aaaa | Derecha |
| Fecha de fin | Fecha | dd/mm/aaaa | Izquierda |
| Presupuesto ($) | Número | 0.00 | Derecha |
| Objetivo | Texto | Ej. 500 leads | Izquierda |
| Responsable | Selector | Seleccionar... | Derecha |
| Descripción | Textarea | Escribir descripción... | Full width |

**Botones footer:** `Cancelar` + `Guardar`

---

### Modal 10 — Subir Documento (`2002:480`)

Para subir archivos al módulo de Documentos.

**Campos:** Área drag & drop de archivo, Nombre del archivo, Tipo (selector), Vinculado a (búsqueda cuenta/contacto), Nivel de acceso (Público/Equipo/Privado), Descripción

---

### Modal 11 — Invitar Usuario (`2002:567`)

**Botón de apertura:** "+ Invitar usuario" (Equipo)

**Campos:**
| Campo | Tipo | Placeholder | Columna |
|-------|------|-------------|---------|
| Nombre | Texto | Ej. Carlos | Izquierda |
| Apellido | Texto | Ej. Gómez | Derecha |
| Email | Email | correo@empresa.com | Izquierda |
| Cargo | Texto | Ej. Vendedor | Derecha |
| Departamento | Selector | Seleccionar... | Izquierda |
| Rol | Selector | Seleccionar... | Derecha |
| Mensaje de bienvenida | Textarea | Escribir mensaje... | Full width |

**Botones footer:** `Cancelar` + `Invitar`  
_(El sistema enviará email de invitación automáticamente)_

---

### Modal 12 — Editar Cuenta (`2023:2654`)

**Campos:**
| Campo | Tipo | Placeholder |
|-------|------|-------------|
| Nombre de Empresa | Texto | Ej. Tecno S.A. |
| Sitio Web | URL | https://... |
| Teléfono | Teléfono | +52 ... |
| Industria | Select desplegable | Tecnología / Retail... |
| País | Texto | México |
| Estado | Select desplegable | Activo / Inactivo / Prospecto |
| Notas | Textarea | Notas sobre la cuenta... |

**Botones footer:** `Cancelar` + `Guardar Cambios`

---

### Modal 13 — Mi Perfil (`2012:1135`)

Accesible desde el avatar del usuario en el sidebar o el header.

**Campos:**
| Campo | Tipo | Placeholder | Columna |
|-------|------|-------------|---------|
| Nombre | Texto | Ej. Juan | Izquierda |
| Apellido | Texto | Ej. Martínez | Derecha |
| Email | Email | correo@empresa.com | Izquierda |
| Teléfono | Teléfono | +57 300 000 0000 | Derecha |
| Cargo | Texto | Ej. Gerente de Ventas | Izquierda |
| Zona horaria | Selector | Seleccionar... | Derecha |
| Biografía | Textarea | Escribe una breve descripción... | Full width |

**Botones footer:** `Cancelar` + `Guardar`

---

### Modal 14 — Nuevo Evento (`2012:1089`)

**Botón de apertura:** "+ Nuevo Evento" (Calendario)

**Campos:** Título del evento, Tipo (Reunión/Llamada/Tarea/Urgente), Fecha inicio, Hora inicio, Fecha fin, Hora fin, Contacto asociado, Empresa, Responsable, Descripción

---

### Modales adicionales de Configuración

| Modal | ID | Descripción |
|-------|----|-------------|
| Seguridad | `2012:1177` | Cambio de contraseña, 2FA, sesiones activas |
| Usuarios y Roles | `2012:1211` | Gestión avanzada de permisos por módulo |
| Notificaciones | `2012:1253` | Preferencias de notificación por tipo y canal |
| Personalización | `2012:1297` | Logo, colores, idioma, formato de fecha |
| Datos y Campos | `2012:1339` | Campos personalizados por módulo |
| Integraciones | `2012:1377` | Configuración de cada integración external |
| Crear Reporte | `2002:528` | Constructor de reportes personalizados |

---

## 22. Base de Datos — Esquema SQL

El CRM cuenta con una base de datos SQLite documentada en `database/schema.sql`. Las principales tablas son:

### Tablas principales

| Tabla | Descripción |
|-------|-------------|
| `contacts` | Personas individuales (nombre, empresa, email, teléfono, estado, score, fuente) |
| `accounts` | Empresas/organizaciones (nombre, industria, tipo, ingresos, estado, responsable) |
| `leads` | Prospectos (nombre, empresa, fuente, estado, score, campaña, responsable) |
| `opportunities` | Oportunidades de venta (nombre, cuenta, valor, etapa, probabilidad, fecha cierre) |
| `activities` | Actividades (tipo, título, contacto, empresa, vencimiento, estado, prioridad) |
| `products` | Catálogo (código, nombre, categoría, precio, costo, disponibilidad, estado) |
| `quotes` | Cotizaciones (número, cliente, contacto, fecha, vencimiento, monto, estado) |
| `invoices` | Facturas (número, cliente, fecha emisión, vencimiento, monto, pagado, estado) |
| `campaigns` | Campañas de marketing (nombre, tipo, fechas, presupuesto, métricas) |
| `tickets` | Tickets de soporte (asunto, cliente, tipo, prioridad, estado, agente) |
| `documents` | Documentos (nombre, tipo, tamaño, propietario, acceso, vinculado_a) |
| `users` | Usuarios del sistema (nombre, email, rol, departamento, estado) |
| `roles` | Roles y permisos (nombre, permisos por módulo) |
| `events` | Eventos de calendario (título, tipo, fechas, participantes) |
| `notes` | Notas vinculadas a cualquier entidad |

### Relaciones clave

```
contacts N←→1 accounts (un contacto pertenece a una empresa)
leads 1→N activities (un lead puede tener múltiples actividades)
leads 1→1 contacts (un lead se convierte en contacto al calificar)
opportunities N←→1 accounts (una oportunidad pertenece a una empresa)
opportunities 1→N activities (seguimiento de oportunidades)
quotes N←→1 opportunities (una cotización puede surgir de una oportunidad)
invoices 1←→N quotes (una factura puede generar de una cotización)
tickets N←→1 contacts (un ticket viene de un cliente)
documents N→1 accounts/contacts/tickets (documentos vinculados)
users N←→1 roles (cada usuario tiene un rol)
campaigns 1→N leads (una campaña puede generar múltiples leads)
```

---

## 23. Flujos de Trabajo Clave

### Flow 1: Ciclo de Venta Completo

```
LEAD CAPTURADO
    ↓
[Módulo Leads] → Calificar (score ≥ 70)
    ↓
[Módulo Oportunidades] → Crear oportunidad vinculada
    └── Etapas: Prospección → Calificación → Propuesta → Negociación → Ganado
    ↓
[Módulo Cotizaciones] → Crear cotización con productos del catálogo
    └── Estados: Borrador → Enviada → En revisión → Aceptada / Rechazada
    ↓
[Módulo Facturas] → Generar factura desde cotización aceptada
    └── Estados: Pendiente → Parcial → Pagada / Vencida
```

### Flow 2: Gestión de Soporte

```
[Ticket recibido] → Asignar agente → Set prioridad
    ↓
Actualizar estado: Abierto → En proceso → En espera → Resuelto → Cerrado
    ↓
[SLA Monitor] → Alertas si supera tiempo máximo
    ↓
[Encuesta CSAT] → Medir satisfacción del cliente
```

### Flow 3: Campaña de Marketing a Venta

```
[Campaña creada] con objetivo y presupuesto
    ↓
Leads generados → Se capturan en módulo Leads
    ↓
ROI calculado = (Ingresos generados - Gasto) / Gasto × 100
    ↓
Reporte automático semanal → Equipo ventas
```

### Flow 4: Incorporación de Usuario

```
[Admin] → "+ Invitar usuario"
    ↓
Modal con campos + selección de rol
    ↓
Email automático de invitación → Usuario crea contraseña
    ↓
Acceso según permisos de su rol
```

---

## 24. Resumen de KPIs del Sistema

### Métricas visibles al 12 de Marzo 2026 (datos de muestra)

| Categoría | KPI | Valor Actual | Tendencia |
|-----------|-----|-------------|-----------|
| **Contactos** | Total activos | 1,248 | ↑ +8.2% |
| **Leads** | Nuevos (mes) | 84 | ↑ +13.5% |
| **Leads** | Tasa conversión | 25% | ↑ |
| **Pipeline** | Valor activo | $248,500 | ↑ +4.7% |
| **Ventas** | Cerradas (mes) | $82,300 | ↑ +21.4% |
| **Ventas** | Tasa de cierre | 22% | ↑ +2.1% |
| **Ventas** | Ciclo promedio | 18 días | ↓ (mejoró) |
| **Tickets** | Abiertos | 23 | — |
| **Tickets** | CSAT | 94% | ↑ +2% |
| **Tickets** | Tiempo 1ra resp. | 4.2h | ↓ (mejoró) |
| **Campañas** | Activas | 5 | — |
| **Campañas** | ROI promedio | 324% | ↑ +40% |
| **Equipo** | Usuarios activos | 9/10 | — |
| **Equipo** | Top vendedor (cierres) | María P. (9) | — |
| **Facturas** | Por cobrar | $25,400 | ↑ (negativo) |
| **Facturas** | DSO | 18.3d | ↓ (mejoró) |
| **Documentos** | Total | 248 | — |
| **Documentos** | Almacenamiento | 1.2 GB | — |
| **Productos** | En catálogo | 32 | — |
| **Cotizaciones** | Activas | 28 | — |
| **Cotizaciones** | Tasa aceptación | 68% | ↑ +4% |
| **LTV** | Customer LTV prom. | $14,200 | ↑ +5.6% |
| **Churn** | Churn Rate | 2.3% | ↑ (negativo) |

---

## Anexo: Glosario de Términos

| Término | Definición |
|---------|-----------|
| **Lead** | Prospecto inicial, persona que ha mostrado interés pero no ha sido calificado |
| **Contacto** | Persona individual registrada en el CRM, puede ser cliente, prospecto o lead |
| **Cuenta** | Empresa u organización a la que pertenecen los contactos |
| **Oportunidad** | Posibilidad de venta activa asociada a una cuenta, con valor y etapa definidos |
| **Pipeline** | Conjunto de todas las oportunidades activas y su valor total estimado |
| **Cotización** | Propuesta comercial formal con precio y productos ofrecidos al cliente |
| **Factura** | Documento de cobro generado tras una venta aceptada |
| **Ticket** | Solicitud de soporte o incidencia reportada por un cliente |
| **Campaña** | Acción de marketing con objetivo medible, fechas y presupuesto definidos |
| **Score** | Puntuación 0-100 que indica el potencial de conversión de un lead/contacto |
| **Tasa de cierre** | % de oportunidades que se convierten en ventas ganadas |
| **DSO** | Days Sales Outstanding: promedio de días para cobrar una factura |
| **CSAT** | Customer Satisfaction Score: índice de satisfacción del cliente |
| **LTV** | Lifetime Value: valor total que un cliente genera durante su relación |
| **Churn Rate** | % de clientes que cancelan o no renuevan en un período |
| **SLA** | Service Level Agreement: acuerdo de nivel de servicio con tiempos máximos |
| **ROI** | Return on Investment: retorno sobre la inversión de una campaña |
| **CTR** | Click-Through Rate: tasa de clics en campañas digitales |
| **KPI** | Key Performance Indicator: indicador clave de desempeño |

---

*Fin del informe. Documento generado el 12 de marzo de 2026.*  
*Basado en el diseño Figma: CRM FENIX Modales 2 (MB3YfWoM1MuZcBExvavZxz)*
