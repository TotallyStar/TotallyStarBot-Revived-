# TotallyStar Discord Bot

A small Discord bot with a /say slash command.

## Requirements

- Node.js 20 or newer
- A Discord application with its bot added to the server and the applications.commands scope enabled

## Configure

Set DISCORD_BOT_TOKEN in your runtime's secret store. Never commit a real token. For local development, copy .env.example to .env and fill in the values; .env is ignored by Git.

DISCORD_GUILD_ID is optional. Set it to register /say to one server for immediate testing. If omitted, /say is registered globally, which can take up to an hour to appear.

## Install and run

1. Run npm install.
2. Set DISCORD_BOT_TOKEN and, optionally, DISCORD_GUILD_ID.
3. Run npm run register to register /say.
4. Run npm start to start the bot.

The command accepts a required message option up to 2,000 characters, replies in the channel, and does not trigger user or role mentions from the supplied text.
