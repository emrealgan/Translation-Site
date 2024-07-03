/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET:'yuH03ZyQ3oktpWFVYEzPX7oEPkSYxb5p0sVkQ3BP+FU',
    GPT4_API_KEY:'sk-proj-3wH94mVlogvzbsT7xjwLT3BlbkFJLTODiVLrtW8n0iaVZSSj',
    MONGO_URL: 'mongodb+srv://admin:Cny6ZkfEPOXLZm37@mutercim.s7mccpu.mongodb.net/',
    GOOGLE_CLIENT_ID: '1030311588922-209kdgqr0t0qbglc6kram9r8o3i51fp1.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    EMAIL_USER: 'alganemre8@gmail.com',
    EMAIL_PASS: 'zolpvumltqhqtfpz'   
  }
};

export default nextConfig;
