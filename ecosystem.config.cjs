module.exports = {
    apps: [
      {
        name: 'biblioteca_observatorio',
        script: 'npm',
        args: 'run dev', // Ajusta según tu script de desarrollo en package.json
        instances: 'max', // Ejecutar el máximo número de instancias posible
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'development',
          PORT: 5173, // Puerto de desarrollo
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 5173, // Puerto de producción
        }
      }
    ]
  };