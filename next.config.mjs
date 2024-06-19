/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET:'yuH03ZyQ3oktpWFVYEzPX7oEPkSYxb5p0sVkQ3BP+FU',
    GPT4_API_KEY:'sk-proj-3wH94mVlogvzbsT7xjwLT3BlbkFJLTODiVLrtW8n0iaVZSSj',
    MONGO_URL: 'mongodb+srv://admin:Cny6ZkfEPOXLZm37@mutercim.s7mccpu.mongodb.net/',
    // SENDGRID_API_KEY: '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',
    SENDGRID_API_KEY: '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'
  }
};

export default nextConfig;
