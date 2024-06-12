/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET:'your-secret',
    // GPT4_API_KEY:'sk-proj-jSQqNjJte04BWhm5yKVJT3BlbkFJg97kw5xPKV65ZeZsuNNe'
    GPT4_API_KEY:'sk-proj-3wH94mVlogvzbsT7xjwLT3BlbkFJLTODiVLrtW8n0iaVZSSj'
  }
};

export default nextConfig;
