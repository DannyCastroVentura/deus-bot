
let Config;

try{
    Config = require("./config/config.json");
}catch(err)
{
    Config = undefined;
}

const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "DEUS ";

let state = true;

const asneiras = ['merda', 'chupaimos', 'puta', 'cabra', 'vaca', 'fodasse', 'foder', 'fuder', 'cabrão', 'crl', 'mrd', 'fodo'];
const pilas = ['pixa', 'pila', 'caralho', 'picha'];
const conas = ['cona', 'kona', 'pussy', 'paxaxa', 'paxaxinha', 'grelo'];
const ofensa = ['gay', 'homosexual', 'paneleiro', 'lesbica'];
const perdao = ['desculpa', 'perdão'];
const respostasAoDunkMemer = ['pls boobs', 'pls ass', 'pls porn', 'pls tits', 'pls booty'];

client.on("message", (message) => {

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if(!state && command !== "volta a terra")
    {
        return;
    }

    const numeroDaMensagem = Math.round( Math.random() * 2 );
    const comecaComPrefixo = message.content.startsWith(prefix);

    const mensagem = message.toString().toLowerCase();

    let tiposDeMensagens = [];

    if(asneiras.find(v => (mensagem.includes(v))) !== undefined){
        //asneiras
        tiposDeMensagens = ['não se diz asneiras...', 'tento nessa língua...', 'não foi assim que te eduquei'];        
    }else if(pilas.find(v => (mensagem.includes(v))) !== undefined){
        //pilas
        tiposDeMensagens = ['diz-se pénis.', 'pénis queres tu dizer.', 'tento nessa língua...'];
    }else if(conas.find(v => (mensagem.includes(v))) !== undefined){
        //conas
        tiposDeMensagens = ['diz-se vagina.', 'vagina queres tu dizer.', 'tento nessa língua...'];
    }else if(ofensa.find(v => (mensagem.includes(v))) !== undefined){
        // ofensa
        tiposDeMensagens = ['quem diz é quem é.', 'filho deixa disso.', ':neutral_face:'];
    }else if(perdao.find(v => (mensagem.includes(v))) !== undefined){
        //perdão
        tiposDeMensagens = ['estás perdoado.', 'vou pensar.', 'espero que gostes de calor, quando faleceres vais para um lugar bem quentinho...'];
    }else if(respostasAoDunkMemer.find(v => (mensagem.includes(v))) !== undefined){
        //respostas Ao Dunk Memer
        tiposDeMensagens = [':eyes:', 'filho deixa disso.', 'espero que gostes de calor, quando faleceres vais para um lugar bem quentinho...'];
    }else if(mensagem.includes("deus") && (!comecaComPrefixo)){
        //deus
        message.reply("chamaste?");
    }

    if(tiposDeMensagens.length !== 0){
        message.reply(tiposDeMensagens[numeroDaMensagem]);
    }

    if(message.author.bot) return;
    if(!comecaComPrefixo) return;
    



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
            const novaString = args.join(" ");
            message.reply(novaString);
        },
        "adeus": () => message.reply("vais embora tão cedo?"),
        "volta para o ceu": () => {
            state = false;
            message.reply("Quando me quiserem de volta digam: «volta a terra»");
        },
        "volta a terra": () => {
            state = true;
            message.reply("voltei, o que quereis?");
        },
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
