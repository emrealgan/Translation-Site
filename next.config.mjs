/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET:'yuH03ZyQ3oktpWFVYEzPX7oEPkSYxb5p0sVkQ3BP+FU',
    // JWT_SECRET:'cs88CIwA/Rv8FB6tJcko14Wk25dOptMPjldIIe4udvQ',
    // GPT4_API_KEY:'sk-proj-jSQqNjJte04BWhm5yKVJT3BlbkFJg97kw5xPKV65ZeZsuNNe'
    GPT4_API_KEY:'sk-proj-3wH94mVlogvzbsT7xjwLT3BlbkFJLTODiVLrtW8n0iaVZSSj',
    MONGO_URL: 'mongodb+srv://admin:Cny6ZkfEPOXLZm37@mutercim.s7mccpu.mongodb.net/',
    MONGO_USER: 'admin',
    MONGO_PASSWD: 'Cny6ZkfEPOXLZm37'
  }
};

export default nextConfig;
