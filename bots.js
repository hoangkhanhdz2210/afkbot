const mineflayer = require('mineflayer');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node bots.js <host> [port] [username]');
  process.exit(1);
}

const host = args[0];
const port = args[1] ? parseInt(args[1]) : 25565;
const username = args[2] || 'AFKBot_' + Math.floor(Math.random() * 1000);

const bot = mineflayer.createBot({
  host: host,
  port: port,
  username: username
});

bot.once('spawn', () => {
  console.log(`${username} joined the server!`);
  randomMovement();
  spamChat();
});

bot.on('error', err => console.log('Error: ', err));
bot.on('end', () => console.log('Bot disconnected'));

function randomMovement() {
  setInterval(() => {
    const controls = bot.entity?.movement;
    if (!controls) return;

    const actions = ['forward', 'back', 'left', 'right', 'jump', 'sprint'];
    const action = actions[Math.floor(Math.random() * actions.length)];

    bot.setControlState(action, Math.random() > 0.5);

    bot.look(Math.random() * 2 * Math.PI, Math.random() * Math.PI - Math.PI / 2, true);
  }, 3000);
}

function spamChat() {
  const messages = [
    "Bot AFK",

  ];
  setInterval(() => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    bot.chat(msg);
  }, 10000);
}
