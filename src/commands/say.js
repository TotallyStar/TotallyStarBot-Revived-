const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Send a message as the bot")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Text for the bot to send")
        .setRequired(true)
        .setMaxLength(2000)
    ),

  async execute(interaction) {
    const message = interaction.options.getString("message", true);
    await interaction.reply({
      content: message,
      allowedMentions: { parse: [] }
    });
  }
};
