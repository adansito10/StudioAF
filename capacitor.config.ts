import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'StudioAf',
  webDir: 'www',
  server: {
    androidScheme: 'http', // Permite solicitudes HTTP en Android
    allowNavigation: ['http://192.168.1.70:3000'], // Permite navegación a tu IP local
    cleartext: true // Habilita conexiones HTTP inseguras (solo para desarrollo)
  }
};

export default config;