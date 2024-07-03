/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET:'yuH03ZyQ3oktpWFVYEzPX7oEPkSYxb5p0sVkQ3BP+FU',
    GPT4_API_KEY:'sk-proj-3wH94mVlogvzbsT7xjwLT3BlbkFJLTODiVLrtW8n0iaVZSSj',
    MONGO_URL: 'mongodb+srv://admin:Cny6ZkfEPOXLZm37@mutercim.s7mccpu.mongodb.net/',
    GOOGLE_CLIENT_ID: '1030311588922-209kdgqr0t0qbglc6kram9r8o3i51fp1.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    MAILJET_API_KEY: '2f9d5a9559a5952254dbcd3fecab2870',
    MAILJET_API_SECRET: '8e145f20cf34e746f5e75a355544ecf4'
  }
};

export default nextConfig;
