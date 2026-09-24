require("dotenv").config();

const { Client, Events, GatewayIntentBits, MessageFlags } = require("discord.js");
const say = require("./commands/say");

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  throw new Error("DISCORD_BOT_TOKEN is required.");
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log("Logged in as " + readyClient.user.tag);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== say.data.name) {
    return;
  }

  try {
    await say.execute(interaction);
  } catch (error) {
    console.error("Failed to handle /say:", error);
    const reply = {
      content: "I couldn't send that message. Try again.",
      flags: MessageFlags.Ephemeral
    };

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp(reply).catch(console.error);
    } else {
      await interaction.reply(reply).catch(console.error);
    }
  }
});

client.login(token).catch((error) => {
  console.error("Unable to log in:", error.message);
  process.exitCode = 1;
});
