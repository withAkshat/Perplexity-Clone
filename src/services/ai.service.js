import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
});

export async function testAi(){
    model.invoke("Enter your query..!!")
    .then((response)=>{
        console.log(response.text);
        
    })
}