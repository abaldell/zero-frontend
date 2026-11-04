# React + TypeScript + Vite

export default defineConfig([

# ZeroApp Frontend

Aplicacion web de ZeroApp para consultar el dashboard, seleccionar y ejecutar pruebas Playwright, seguir su progreso en tiempo real y revisar resultados. Incluye una vista de integracion con SpiraTest.

## Requisitos

- Node.js y npm.
- El backend en ejecucion para usar las funciones de API, ejecuciones y eventos.

## Desarrollo

Desde este directorio (`zero-frontend`):

```bash
npm install
npm run dev
```

Vite muestra en la terminal la URL local, normalmente `http://localhost:5173`.

## Configuracion

Crea un archivo `.env.local` en este directorio. Vite expone al cliente las variables con prefijo `VITE_`; configura las rutas para que coincidan con los prefijos registrados por el backend.

```dotenv
VITE_API_BASE=http://localhost:3001
VITE_API_EVENTS=/api/events
VITE_API_EXECUTIONS=/api/executions
VITE_API_TESTSUITE=/api/test-suite
VITE_API_RESULTS=/api/results
VITE_API_FILES=/api/files
VITE_API_SPIRATEST=/api/spiratest
VITE_API_PW=/api/playwright
VITE_API_PROYECT=1
```

`VITE_API_PROYECT` (con esa ortografia) identifica el proyecto usado por la vista SpiraTest. Sustituye `1` por el ID real; si no se usa esa integracion, se puede dejar sin configurar.

## Scripts

| Comando           | Uso                                                              |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | Inicia Vite en modo desarrollo.                                  |
| `npm run build`   | Ejecuta el chequeo TypeScript y genera la aplicacion en `dist/`. |
| `npm run preview` | Sirve localmente el ultimo build.                                |
| `npm run lint`    | Ejecuta ESLint.                                                  |

## Funcionalidades

- Dashboard y navegacion entre ejecuciones y SpiraTest.
- Seleccion de suites y lanzamiento de ejecuciones en el backend.
- Actualizacion de estado y progreso mediante Server-Sent Events (SSE).
- Consulta de resultados, reportes y archivos de ejecucion.
- Consulta de test sets y casos, con envio de resultados a SpiraTest.

## Estructura

- `src/app/`: router, layout y estado compartido de la aplicacion.
- `src/features/dashboard/`: dashboard.
- `src/features/executions/`: seleccion, seguimiento y resultados de pruebas.
- `src/features/spiratest/`: consulta de test sets y casos de SpiraTest.
- `src/shared/`: componentes, servicios HTTP y utilidades compartidas.

Para el flujo entre frontend, backend y runner, consulta el [documento de arquitectura](../ARCHITECTURE.md). La guia del servicio API esta en [zero-backend/README.md](../zero-backend/README.md).
