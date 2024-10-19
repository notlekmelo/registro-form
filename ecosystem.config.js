module.exports = {
    apps : [{
      name: 'registro_form',
      script: 'src/app.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    }]
  };
  