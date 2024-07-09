/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET:'',
    GPT4_API_KEY:'',
    MONGO_URL: '',
    GOOGLE_CLIENT_ID: '',
    GOOGLE_CLIENT_SECRET: '',
    MAILJET_API_KEY: '',
    MAILJET_API_SECRET: ''
  }
};

export default nextConfig;
