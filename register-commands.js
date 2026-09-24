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
  const body = say.data.toJSON();
  const commands = await rest.get(route);
  const existing = commands.find((command) => command.name === body.name && command.type === body.type);

  if (existing) {
    await rest.patch(Routes.applicationCommand(clientId, existing.id), { body });
  } else {
    await rest.post(route, { body });
  }

  console.log((existing ? "Updated" : "Registered") + " /say; existing commands were preserved.");
}

main().catch((error) => {
  console.error("Unable to register /say:", error.message);
  process.exitCode = 1;
});
