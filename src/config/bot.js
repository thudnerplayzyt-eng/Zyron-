import { logger } from '../utils/logger.js';

// ==========================================
// ZYRON BOT — MAIN CONFIGURATION
// ==========================================

export const botConfig = {
  // BOT IDENTITY & PRESENCE
  branding: {
    name: "Zyron",
    developer: "Zyron Development",
    website: null,
    supportServer: null,
  },

  presence: {
    status: "dnd",
    activities: [
      {
        name: "Custom Status",
        state: "Zyron | .help",
        type: 4,
      },
    ],
  },

  // COMMAND SETTINGS
  commands: {
    owners: (process.env.OWNER_IDS || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),

    defaultCooldown: 3,
    deleteCommands: false,
    testGuildId: process.env.TEST_GUILD_ID,
    maintenanceMode:
      process.env.MAINTENANCE_MODE === "true",
    prefix: process.env.PREFIX || ".",
  },

  // APPLICATION SYSTEM
  applications: {
    defaultQuestions: [
      { question: "What is your name?", required: true },
      { question: "What is your Discord username?", required: true },
      { question: "Why do you want to join our team?", required: true },
      { question: "What experience do you have?", required: true },
    ],

    statusColors: {
      pending: "#F1C40F",
      approved: "#57F287",
      denied: "#ED4245",
    },

    applicationCooldown: 24,
    deleteDeniedAfter: 7,
    deleteApprovedAfter: 30,
    managerRoles: [],
  },

  // ZYRON BRAND COLORS
  embeds: {
    colors: {
      primary: "#8B5CF6",
      secondary: "#1E1B2E",

      success: "#57F287",
      error: "#ED4245",
      warning: "#FEE75C",
      info: "#38BDF8",

      light: "#FFFFFF",
      dark: "#111018",
      gray: "#A1A1AA",

      blurple: "#5865F2",
      green: "#57F287",
      yellow: "#FEE75C",
      fuchsia: "#EB459E",
      red: "#ED4245",
      black: "#000000",

      giveaway: {
        active: "#57F287",
        ended: "#ED4245",
      },

      ticket: {
        open: "#57F287",
        claimed: "#F59E0B",
        closed: "#ED4245",
        pending: "#A1A1AA",
      },

      economy: "#A78BFA",
      birthday: "#EC4899",
      moderation: "#8B5CF6",

      priority: {
        none: "#95A5A6",
        low: "#38BDF8",
        medium: "#2ECC71",
        high: "#F1C40F",
        urgent: "#ED4245",
      },
    },

    footer: {
      text: "Zyron Development",
      icon: null,
    },

    thumbnail: null,

    author: {
      name: "Zyron",
      icon: null,
      url: null,
    },
  },

  // ECONOMY
  economy: {
    currency: {
      name: "Zyron Coin",
      namePlural: "Zyron Coins",
      symbol: "ZC",
    },

    startingBalance: 0,
    baseBankCapacity: 100000,
    dailyAmount: 100,

    workMin: 10,
    workMax: 100,
    begMin: 5,
    begMax: 50,

    cooldowns: {
      daily: 24 * 60 * 60 * 1000,
      work: 60 * 60 * 1000,
      crime: 2 * 60 * 60 * 1000,
      rob: 4 * 60 * 60 * 1000,
    },

    robSuccessRate: 0.4,
    robFailJailTime: 60 * 60 * 1000,
  },

  shop: {},

  // TICKETS
  tickets: {
    defaultCategory: null,
    supportRoles: [],

    priorities: {
      none: {
        emoji: "⚪",
        color: "#95A5A6",
        label: "None",
      },
      low: {
        emoji: "🟢",
        color: "#2ECC71",
        label: "Low",
      },
      medium: {
        emoji: "🟡",
        color: "#F1C40F",
        label: "Medium",
      },
      high: {
        emoji: "🔴",
        color: "#E74C3C",
        label: "High",
      },
      urgent: {
        emoji: "🚨",
        color: "#E91E63",
        label: "Urgent",
      },
    },

    defaultPriority: "none",
    archiveCategory: null,
    logChannel: null,
  },

  // GIVEAWAYS
  giveaways: {
    defaultDuration: 24 * 60 * 60 * 1000,
    minimumWinners: 1,
    maximumWinners: 10,
    minimumDuration: 5 * 60 * 1000,
    maximumDuration: 30 * 24 * 60 * 60 * 1000,
    allowedRoles: [],
    bypassRoles: [],
  },

  // BIRTHDAYS
  birthday: {
    defaultRole: null,
    announcementChannel: null,
    timezone: "Asia/Kolkata",
  },

  // VERIFICATION
  verification: {
    defaultMessage:
      "Welcome to Zyron! Click below to verify your account.",
    defaultButtonText: "Verify",

    autoVerify: {
      defaultCriteria: "account_age",
      defaultAccountAgeDays: 7,
      serverSizeThreshold: 1000,
      minAccountAge: 1,
      maxAccountAge: 365,
      sendDMNotification: true,

      criteria: {
        account_age:
          "Account must be older than the specified number of days",
        server_size:
          "Automatic verification for smaller servers",
        none: "All users immediately",
      },
    },

    verificationCooldown: 5000,
    maxVerificationAttempts: 3,
    attemptWindow: 60000,
    maxCooldownEntries: 10000,
    maxAttemptEntries: 10000,
    cooldownCleanupInterval: 300000,
    maxAuditMetadataBytes: 4096,
    maxInMemoryAuditEntries: 1000,
    logAllVerifications: true,
    keepAuditTrail: true,
  },

  // WELCOME & GOODBYE
  welcome: {
    defaultWelcomeMessage:
      "Welcome {user} to **{server}**! You are member #{memberCount}. Enjoy your stay with Zyron!",

    defaultGoodbyeMessage:
      "{user} has left **{server}**. Current members: {memberCount}.",

    defaultWelcomeChannel: null,
    defaultGoodbyeChannel: null,
  },

  // SERVER COUNTERS
  counters: {
    defaults: {
      name: "{name} Counter",
      description: "Zyron server {name} counter",
      type: "voice",
      channelName: "{name}-{count}",
    },

    permissions: {
      deny: ["VIEW_CHANNEL"],
      allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    },

    messages: {
      created: "✅ Created counter **{name}**",
      deleted: "🗑️ Deleted counter **{name}**",
      updated: "🔄 Updated counter **{name}**",
    },

    types: {
      members: {
        name: "👥 Members",
        description: "Total server members",
        getCount: (guild) => guild.memberCount.toString(),
      },

      bots: {
        name: "🤖 Bots",
        description: "Total bot accounts",
        getCount: (guild) =>
          guild.members.cache.filter((m) => m.user.bot)
            .size.toString(),
      },

      members_only: {
        name: "👤 Humans",
        description: "Total human members",
        getCount: (guild) =>
          guild.members.cache.filter((m) => !m.user.bot)
            .size.toString(),
      },
    },
  },

  // DEFAULT MESSAGES
  messages: {
    noPermission:
      "You do not have permission to use this command.",
    cooldownActive:
      "Please wait {time} before using this command again.",
    errorOccurred:
      "An error occurred while executing this command.",
    missingPermissions:
      "Zyron is missing the required Discord permissions.",
    commandDisabled:
      "This command is currently disabled.",
    maintenanceMode:
      "Zyron is currently under maintenance. Please try again later.",
  },

  // FEATURE TOGGLES
  features: {
    economy: true,
    leveling: true,
    moderation: true,
    logging: true,
    welcome: true,

    tickets: true,
    giveaways: true,
    birthday: true,
    counter: true,

    verification: true,
    reactionRoles: true,
    joinToCreate: true,

    voice: true,
    search: true,
    tools: true,
    utility: true,
    community: true,
    fun: true,
    music: true,
  },
};

// ==========================================
// CONFIG VALIDATION
// ==========================================

export function validateConfig(config) {
  const errors = [];

  if (process.env.NODE_ENV !== "production") {
    logger.debug("Environment variables check:");
    logger.debug(
      "DISCORD_TOKEN exists:",
      !!(process.env.DISCORD_TOKEN || process.env.TOKEN),
    );
    logger.debug("CLIENT_ID exists:", !!process.env.CLIENT_ID);
    logger.debug("NODE_ENV:", process.env.NODE_ENV);
  }

  if (!process.env.DISCORD_TOKEN && !process.env.TOKEN) {
    errors.push(
      "Bot token is required (DISCORD_TOKEN or TOKEN)",
    );
  }

  if (!process.env.CLIENT_ID) {
    errors.push("CLIENT_ID environment variable is required");
  }

  if (process.env.NODE_ENV === "production") {
    const hasConnectionUrl = Boolean(
      process.env.POSTGRES_URL ||
      process.env.DATABASE_URL,
    );

    if (!hasConnectionUrl) {
      if (!process.env.POSTGRES_HOST) {
        errors.push("PostgreSQL host is required");
      }
      if (!process.env.POSTGRES_USER) {
        errors.push("PostgreSQL user is required");
      }
      if (!process.env.POSTGRES_PASSWORD) {
        errors.push("PostgreSQL password is required");
      }
    }
  }

  return errors;
}

const configErrors = validateConfig(botConfig);

if (configErrors.length > 0) {
  logger.error(
    "Zyron configuration errors:",
    configErrors.join("\n"),
  );

  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}

export const BotConfig = botConfig;

// ==========================================
// COMMAND CATEGORY MAPPING
// ==========================================

const COMMAND_CATEGORY_FEATURE_MAP = {
  birthday: "birthday",
  community: "community",
  economy: "economy",
  fun: "fun",
  giveaway: "giveaways",
  jointocreate: "joinToCreate",
  leveling: "leveling",
  logging: "logging",
  moderation: "moderation",
  music: "music",
  reaction_roles: "reactionRoles",
  search: "search",
  serverstats: "counter",
  ticket: "tickets",
  tools: "tools",
  utility: "utility",
  verification: "verification",
  welcome: "welcome",
};

function normalizeCategoryKey(category) {
  return String(category || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

export function getCommandPrefix() {
  return botConfig.commands?.prefix ?? ".";
}

export function getBotOwners() {
  return (botConfig.commands?.owners ?? [])
    .map((id) => String(id).trim())
    .filter(Boolean);
}

export function isBotOwner(userId) {
  if (!userId) return false;
  return getBotOwners().includes(String(userId));
}

export function isMaintenanceMode() {
  return botConfig.commands?.maintenanceMode === true;
}

export function getBotMessage(key, replacements = {}) {
  let message = botConfig.messages?.[key] || key;

  for (const [placeholder, value] of Object.entries(replacements)) {
    message = message.replace(
      new RegExp(`\\{${placeholder}\\}`, "g"),
      String(value),
    );
  }

  return message;
}

export function isFeatureEnabled(featureKey) {
  if (!featureKey) return true;
  return botConfig.features?.[featureKey] !== false;
}

export function isCommandCategoryEnabled(category) {
  const normalized = normalizeCategoryKey(category);

  if (!normalized || normalized === "core") return true;

  const featureKey = COMMAND_CATEGORY_FEATURE_MAP[normalized];

  if (!featureKey) return true;
  return isFeatureEnabled(featureKey);
}

export function getApplicationStatusColor(status) {
  const colors = botConfig.applications?.statusColors || {};
  const hex = colors[status];

  return hex
    ? getColor(hex)
    : getColor(
        status === "approved"
          ? "success"
          : status === "denied"
            ? "error"
            : "warning",
      );
}

export function getDefaultApplicationQuestions() {
  return (botConfig.applications?.defaultQuestions || [])
    .map((entry) =>
      typeof entry === "string" ? entry : entry.question,
    )
    .filter(Boolean);
}

export function getColor(path, fallback = "#99AAB5") {
  if (typeof path === "number") return path;

  if (typeof path === "string" && path.startsWith("#")) {
    return parseInt(path.slice(1), 16);
  }

  const result = String(path || "")
    .split(".")
    .reduce(
      (obj, key) =>
        obj && obj[key] !== undefined ? obj[key] : fallback,
      botConfig.embeds.colors,
    );

  if (typeof result === "string" && result.startsWith("#")) {
    return parseInt(result.slice(1), 16);
  }

  return result;
}

export function getRandomColor() {
  const colors = Object.values(botConfig.embeds.colors)
    .flatMap((color) =>
      typeof color === "string"
        ? [color]
        : Object.values(color).filter(
            (value) => typeof value === "string",
          ),
    )
    .filter(
      (color) =>
        typeof color === "string" &&
        /^#[0-9A-Fa-f]{6}$/.test(color),
    );

  return colors[
    Math.floor(Math.random() * colors.length)
  ] || botConfig.embeds.colors.primary;
}

export default botConfig;
