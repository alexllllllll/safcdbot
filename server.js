const { Client, Events, GatewayIntentBits } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const fs = require('fs');
const configuration = new Configuration({
    apiKey: process.env.SAF_OPENAI_API_KEY,
  });
const token = process.env.SAF_DISCORD_TOKEN;
async function openaiResponse(message) {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion(  {
    model: process.env.SAF_DB_MODEL,
    messages: [
               {role: "system", content: process.env.SAF_DB_INITIAL_PROMPT},
               {role: "user", content: message}
              ],
    max_tokens: 2000
  });
  return response.data.choices[0].message.content;
}
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (msg) => {
   if(msg.author.bot!=true && msg.content.includes(process.env.SAF_PREFIX)){
      msg.reply(await openaiResponse(msg.content));
   }
});

client.login(token);