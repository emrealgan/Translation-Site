/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET:'yuH03ZyQ3oktpWFVYEzPX7oEPkSYxb5p0sVkQ3BP+FU',
    GPT4_API_KEY:'sk-proj-3wH94mVlogvzbsT7xjwLT3BlbkFJLTODiVLrtW8n0iaVZSSj',
    MONGO_URL: 'mongodb+srv://admin:Cny6ZkfEPOXLZm37@mutercim.s7mccpu.mongodb.net/',
    SENDGRID_API_KEY: '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',
    ELASTIC_EMAIL_API_KEY: 'D65DC697DBEDAA1CA4B8660F667BE2DEC31AA1AA9464CDE64307473F46A7CE78F75741A58BB84B4F506D54382006EA7D',
    POSTMARK_API_KEY: 'ca930388-edec-458a-95a5-5c1f3cf7760a',
    GOOGLE_CLIENT_ID: '1030311588922-209kdgqr0t0qbglc6kram9r8o3i51fp1.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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'
  }
};

export default nextConfig;
