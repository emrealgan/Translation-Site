/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_KEY:'',
    USER_KEY:'',
    NEXTAUTH_URL:'',
    NEXTAUTH_SECRET:'',
    GPT4o_API_KEY:'',
    MONGO_URL: '',
    GOOGLE_CLIENT_ID: '',
    GOOGLE_CLIENT_SECRET: '',
    MAILJET_API_KEY: '',
    MAILJET_API_SECRET: ''
  }
};

export default nextConfig;
