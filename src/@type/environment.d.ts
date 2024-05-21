export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      BASE_API_URL: 'http://localhost/api/';
    }
  }
}
