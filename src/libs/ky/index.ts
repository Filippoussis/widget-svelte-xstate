import ky from 'ky';

export const kyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 60000,
});
