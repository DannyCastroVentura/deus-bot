
let Config;

try{
    Config = require("./config.json");
}catch(err)
{
    Config = undefined;
}

const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "DEUS ";

client.on("message", (message) => {
    
    if(message.includes("caralho")){
        message.reply("filho, não digas asneiras.");
    }

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if(command === ""){
        message.reply("o que queres meu filho?");
    } else if(command === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply("meu filho, o teu ping tem latência de " + timeTaken + "ms!");
    } else if(command === "soma"){
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply("meu filho, a soma dessa merda é " + sum + "!");
    } else if(command === "obrigado" || command === "obrigado!"){
        message.reply("de nada, agora deixai o Pai descansar.")
    } else if(command === "quem"){
        if(args[1] !== null){
            const tudo = command + " " + args[0].toLowerCase() + " " + args[1].toLowerCase();

            if(tudo === "quem te criou?")
            {
                message.reply("nosso Senhor todo poderoso Daniel Ventura, é claro!");
            }else if(tudo === "quem te perguntou?")
            {
                message.reply("não te ponhas com brincadeiras que tas aqui tas a ter um irmãozinho.");
            }
        }else if(args[0] !== null){
            const tudo = command + " " + args[0].toLowerCase();

            if(tudo === "quem manda?"){
                message.reply("és tu filho de Deus.");
            }

        }
    } else if(command === "ajudai") {
        message.reply("meu filho, eu ajudar-te-ei nisto:\n \
        Posso te mostrar o teu ping: «ping»;\n \
        Posso fazer umas contas de somar: «soma Arg1 Arg2 ArgN»;\n \
        E por agora é só! \
        ");
    } else{
        message.reply("não entendi meu filho. Faz «ajudai» para mais informações.");
    }
});

if(Config)
{
    client.login(Config.BOT_TOKEN);
}else{
    client.login(process.env.discord_key);
}

//client.login(Config?Config.BOT_TOKEN:process.env.discord_key);
