import OpenAI from "openai";
import { connectDB, disconnectDB } from "@/app/lib/db";
import { User, userOAuth } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text, sourceLanguage, targetLanguage, mail, provider } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.GPT4_API_KEY });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `Translate this text from ${sourceLanguage} to ${targetLanguage}: ${text}` }],
      model: "gpt-4o",
    });
    const resp = completion.choices[0];    

    if (!resp) {
      console.error('Error from OpenAI API: No response');
      return new NextResponse('Error from OpenAI API', { status: 500 });
    }
    const translatedText = resp.message.content;
    await connectDB();
    let user;
    if(provider === "google")
      user = await userOAuth.findOne({ mail: mail });
    else
      user = await User.findOne({ mail: mail });
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
    
    return new NextResponse(JSON.stringify({ translatedText }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } 
  catch (error) {
    console.error('Error in POST handler:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
