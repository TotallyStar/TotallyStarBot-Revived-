require("dotenv").config();

const { REST, Routes } = require("discord.js");
const say = require("./src/commands/say");

async function main() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!token) {
    throw new Error("DISCORD_BOT_TOKEN is required.");
  }

  const rest = new REST({ version: "10" }).setToken(token);
  const botUser = await rest.get(Routes.user());
  const clientId = process.env.DISCORD_CLIENT_ID || botUser.id;
  const route = guildId
    ? Routes.applicationGuildCommands(clientId, guildId)
    : Routes.applicationCommands(clientId);

  await rest.put(route, { body: [say.data.toJSON()] });
  console.log(guildId ? "Registered /say in server " + guildId : "Registered /say globally");
}

main().catch((error) => {
  console.error("Unable to register /say:", error.message);
  process.exitCode = 1;
});
