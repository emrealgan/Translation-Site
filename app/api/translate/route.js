import OpenAI from "openai";
import { connectDB, disconnectDB } from "@/app/lib/db";
import User from "@/app/models/User";

export async function POST(req) {
  try {
    const { text, sourceLanguage, targetLanguage, mail } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.GPT4_API_KEY });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `Translate this text from ${sourceLanguage} to ${targetLanguage}: ${text}` }],
      model: "gpt-4o",
    });
    const resp = completion.choices[0];    

    if (!resp) {
      console.error('Error from OpenAI API: No response');
      return new Response('Error from OpenAI API', { status: 500 });
    }
    const translatedText = resp.message.content;
    
    await connectDB();
    const user = await User.findOne({ mail: mail });
    if (user) {
      user.translatedText.push({
      originalText: text,
      translatedText,
      sourceLanguage,
      targetLanguage
    });
    await user.save();
    await disconnectDB();
    }
    return new Response(JSON.stringify({ translatedText }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } 
  catch (error) {
    console.error('Error in POST handler:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
