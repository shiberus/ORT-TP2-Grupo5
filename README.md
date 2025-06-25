# ORT-TP2-Grupo5

# 🛠️ API - Servicio Técnico de Computadoras

Esta es una API REST desarrollada con **Node.js + Express** que permite gestionar el flujo de trabajo de un servicio técnico. Incluye autenticación de empleados, gestión de clientes, equipos, componentes, trabajos y facturación, así como el seguimiento del estado de las reparaciones.

---

## 🚀 Funcionalidades principales

- Registro y login de empleados mediante JWT
- Alta y gestión de:
  - Clientes
  - Equipos (computadoras, consolas, etc.)
  - Componentes utilizados en reparaciones
  - Trabajos (diagnóstico, reparación, entrega)
  - Facturación por trabajo realizado
- Seguimiento de estados de trabajos (ej: pendiente, en proceso, listo, entregado)
- Integración con **Supabase** para almacenamiento de archivos (fotos, presupuestos, etc.)

---

## 📦 Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/shiberus/ORT-TP2-Grupo5.git
    cd ORT-TP2-Grupo5
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

    ```env
    MONGODB_URI=tu_cadena_de_conexion_mongodb
    JWT_SECRET=una_clave_secreta_segura
    JWT_REFRESH_SECRET= otra_clave_secreta_segura
    SUPABASE_URL=https://tuproyecto.supabase.co
    SUPABASE_SECRET=tu_clave_service_role
    SUPABASE_BUCKET=nombre_del_bucket
    PORT= (opcional) puerto en que corre el servidor

    ```

4. Inicia el servidor:

    ```bash
    npm run dev
    ```

    El servidor quedará corriendo en `http://localhost:3000` (o el puerto que definas).