
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

const asneiras = ['merda', 'chupaimos', 'puta', 'cabra', 'vaca', 'fodasse', 'foder', 'fuder', 'cabrão', 'crl', 'mrd'];
const pilas = ['pixa', 'pila', 'caralho', 'picha'];
const conas = ['cona', 'kona', 'pussy', 'paxaxa', 'paxaxinha', 'grelo'];
const ofensa = ['gay', 'homosexual', 'paneleiro', 'lesbica'];
const perdao = ['desculpa', 'perdão'];
const badalhoquices = ['boobs', 'ass', 'porn', 'tits', 'booty'];

client.on("message", (message) => {

    const mensagem = message.toString().toLowerCase();
    if(asneiras.find(v => (mensagem.includes(v))) !== undefined){
        //asneiras
        message.reply("não se diz asneiras...");
    }else if(pilas.find(v => (mensagem.includes(v))) !== undefined){
        //pilas
        message.reply("diz-se pénis.");
    }else if(conas.find(v => (mensagem.includes(v))) !== undefined){
        //conas
        message.reply("diz-se vagina.");
    }else if(ofensa.find(v => (mensagem.includes(v))) !== undefined){
        // ofensa
        message.reply("quem diz é quem é.");
    }else if(perdao.find(v => (mensagem.includes(v))) !== undefined){
        //perdão
        message.reply("estás perdoado.");
    }else if(badalhoquices.find(v => (mensagem.includes(v))) !== undefined){
        //badalhoquices
        message.reply(":eyes:");
    }else if(mensagem.includes("deus")){
        //deus
        message.reply("chamaste?");
    }

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    const commands = {
        "": () => message.reply("o que queres meu filho?") ,
        "ping": () => {
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply("meu filho, o teu ping tem latência de " + timeTaken + "ms!");
        },
        "soma": () => {
            const numArgs = args.map(x => parseFloat(x));
            const sum = numArgs.reduce((counter, x) => counter += x);
            message.reply("meu filho, a soma dessa merda é " + sum + "!");
        },
        "obrigado": () => message.reply("de nada, agora deixai o Pai descansar."),
        "obrigado!": () => message.reply("de nada, agora deixai o Pai descansar."),
        "quem": () => {
            if(args[1] !== null){
                const tudo = command + " " + args[0].toLowerCase() + " " + args[1].toLowerCase();
    
                if(tudo === "quem te criou?")
                {
                    message.reply("nosso Senhor todo poderoso Daniel Ventura, é claro! :crown:");
                }else if(tudo === "quem te perguntou?")
                {
                    message.reply("não te ponhas com brincadeiras que tas aqui tas a ter um irmãozinho. :face_with_symbols_over_mouth:");
                }
            }else if(args[0] !== null){
                const tudo = command + " " + args[0].toLowerCase();
    
                if(tudo === "quem manda?"){
                    message.reply("és tu filho de Deus.");
                }
    
            }
        },
        "diz": () => {
            let mensagemAlterada = args.join(" ");
            message.reply(mensagemAlterada);
        },
        "adeus": () => message.reply("vais embora tão cedo?"),
        "ajudai": () => {
            message.reply("meu filho, eu ajudar-te-ei nisto:\n \
            Posso te mostrar o teu ping: «ping»;\n \
            Posso fazer umas contas de somar: «soma Arg1 Arg2 ArgN»;\n \
            Posso dizer o que tu quiseres: «diz Arg1 Arg2 ArgN»;\n \
            E por agora é só! \
        ");
        }

    }

    Object.keys(commands).includes(command)?commands[command]():message.reply("não entendi meu filho. Faz «ajudai» para mais informações.");
});

if(Config)
{
    client.login(Config.BOT_TOKEN);
}else{
    client.login(process.env.discord_key);
}

// faz o mesmo que em cima, basicamente é um if no Config, se for true faz o primeiro, se for false faz o que esta depois dos : 
//client.login(Config?Config.BOT_TOKEN:process.env.discord_key);
