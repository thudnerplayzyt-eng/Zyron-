
import {
  Client,
  GatewayIntentBits,
  Collection,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ActivityType,
} from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import dotenv from "dotenv";

dotenv.config();

// ==========================================
// ZYRON BOT CONFIGURATION
// ==========================================

const PREFIX = process.env.PREFIX || "!";
const BOT_NAME = "Zyron";
const DEVELOPER = "Zyron Development";
const COLOR = 0x8B5CF6;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const categories = [
  { name: "Security", emoji: "🛡️", description: "Shows the security commands" },
  { name: "Permit Commands", emoji: "👑", description: "Shows the permit commands" },
  { name: "Automod", emoji: "🤖", description: "Shows the automod commands" },
  { name: "Moderation", emoji: "🛠️", description: "Shows the moderation commands" },
  { name: "General", emoji: "👻", description: "Shows the general commands" },
  { name: "Verification", emoji: "🔺", description: "Shows the verification commands" },
  { name: "Utility", emoji: "⚙️", description: "Shows the utility commands" },
  { name: "Automations", emoji: "🔗", description: "Shows the automation commands" },
  { name: "Autoresponders", emoji: "♡", description: "Shows the autoresponder commands" },
  { name: "Vanity & Tags", emoji: "🌱", description: "Shows the vanity and tag commands" },
  { name: "Greetings", emoji: "🚪", description: "Shows the greeting commands" },
  { name: "Music", emoji: "🎵", description: "Shows the music commands" },
  { name: "Fun Commands", emoji: "⚛️", description: "Shows the fun commands" },
  { name: "CustomRole", emoji: "✋", description: "Shows the custom role commands" },
  { name: "Voice Commands", emoji: "🔊", description: "Shows the voice commands" },
  { name: "Tickets", emoji: "🎟️", description: "Shows the ticket commands" },
  { name: "Logging", emoji: "🦇", description: "Shows the logging commands" },
  { name: "Voice Master", emoji: "🔈", description: "Shows the voice master commands" },
  { name: "Bot Settings", emoji: "📶", description: "Shows the bot setting commands" },
];

// ==========================================
// LOAD PREFIX COMMANDS
// Expected structure:
// commands/general/ping.js
// commands/moderation/ban.js
// ==========================================

async function loadCommands(directory) {
  if (!fs.existsSync(directory)) {
    console.warn("Commands folder not found:", directory);
    return;
  }

  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      await loadCommands(fullPath);
      continue;
    }

    if (!file.name.endsWith(".js")) continue;

    try {
      const module = await import(pathToFileURL(fullPath).href);
      const command = module.default ?? module;

      if (!command.name || typeof command.execute !== "function") {
        console.warn(`Skipped invalid command: ${file.name}`);
        continue;
      }

      command.category ??=
        path.basename(path.dirname(fullPath));

      client.commands.set(command.name.toLowerCase(), command);

      for (const alias of command.aliases ?? []) {
        client.commands.set(alias.toLowerCase(), command);
      }
    } catch (error) {
      console.error(`Failed loading ${file.name}:`, error);
    }
  }

  console.log(`Loaded ${client.commands.size} command names/aliases.`);
}

// ==========================================
// HELP EMBED
// ==========================================

function createHelpEmbed(clientUser) {
  const embed = new EmbedBuilder()
    .setColor(COLOR)
    .setAuthor({
      name: `Hey, I'm ${BOT_NAME}`,
      iconURL: clientUser.displayAvatarURL(),
    })
    .setDescription(
      [
        `• My prefix for this server is \`${PREFIX}\``,
        `• Type \`${PREFIX}help [category]\` for more`,
        `• Total commands: **${new Set(client.commands.values()).size}**`,
        "",
        ...categories.map(
          (category) =>
            `${category.emoji} » **${category.name}**`
        ),
        "",
        "**Pro Tip**",
        `Use \`${PREFIX}help moderation\` to explore a category!`,
        "",
        "↗ **Links**",
        "[Invite me](https://discord.com/developers/applications) • [Support](https://discord.com) • [Website](https://discord.com)",
      ].join("\n")
    )
    .setThumbnail(clientUser.displayAvatarURL())
    .setFooter({ text: `Powered By ${DEVELOPER}` });

  return embed;
}

function createCategoryMenu() {
  const menu = new StringSelectMenuBuilder()
    .setCustomId("zyron_help_category")
    .setPlaceholder("Select a module to see")
    .addOptions(
      categories.map((category) => ({
        label: category.name,
        description: category.description,
        value: category.name,
        emoji: category.emoji,
      }))
    );

  return new ActionRowBuilder().addComponents(menu);
}

function createCategoryEmbed(categoryName) {
  const category = categories.find(
    (item) => item.name.toLowerCase() === categoryName.toLowerCase()
  );

  const commands = [
    ...new Set(client.commands.values()),
  ].filter((command) => {
    const commandCategory = String(command.category ?? "")
      .replace(/[_-]/g, " ")
      .toLowerCase();

    return (
      commandCategory === categoryName.replace(/[_-]/g, " ").toLowerCase() ||
      commandCategory === categoryName.toLowerCase()
    );
  });

  const embed = new EmbedBuilder()
    .setColor(COLOR)
    .setTitle(`${category?.emoji ?? "📂"} ${categoryName}`)
    .setDescription(
      commands.length
        ? commands
            .map(
              (command) =>
                `\`${PREFIX}${command.name}\` — ${
                  command.description ?? "No description available"
                }`
            )
            .join("\n")
        : "No commands are registered in this category yet."
    )
    .setFooter({ text: `${BOT_NAME} • ${DEVELOPER}` });

  return embed;
}

// ==========================================
// BOT READY
// ==========================================

client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);

  client.user.setPresence({
    activities: [
      {
        name: `${BOT_NAME} | ${PREFIX}help`,
        type: ActivityType.Playing,
      },
    ],
    status: "online",
  });
});

// ==========================================
// PREFIX COMMAND HANDLER
// ==========================================

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  // !help
  if (commandName === "help") {
    const categoryName = args.join(" ").trim();

    if (categoryName) {
      const category = categories.find(
        (item) => item.name.toLowerCase() === categoryName.toLowerCase()
      );

      if (!category) {
        return message.reply(
          `Unknown category. Try \`${PREFIX}help\` to see all modules.`
        );
      }

      return message.reply({
        embeds: [createCategoryEmbed(category.name)],
      });
    }

    return message.reply({
      embeds: [createHelpEmbed(client.user)],
      components: [createCategoryMenu()],
    });
  }

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (error) {
    console.error(`Command ${commandName} failed:`, error);
    await message.reply("❌ An error occurred while running that command.");
  }
});

// ==========================================
// SELECT MENU HANDLER
// ==========================================

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== "zyron_help_category") return;

  const categoryName = interaction.values[0];

  await interaction.reply({
    embeds: [createCategoryEmbed(categoryName)],
    ephemeral: true,
  });
});

// ==========================================
// LOAD COMMANDS AND LOGIN
// ==========================================

const commandsDirectory = path.join(process.cwd(), "commands");

await loadCommands(commandsDirectory);

const token = process.env.DISCORD_TOKEN || process.env.TOKEN;

if (!token) {
  console.error("Missing DISCORD_TOKEN or TOKEN in your .env file.");
  process.exit(1);
}

await client.login(token);
