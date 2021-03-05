
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

console.log("Started");

const asneiras = ['merda', 'chupaimos', 'puta', 'cabra', 'vaca', 'fodasse', 'foder', 'fuder', 'cabrão', 'crl', 'mrd', 'fodo'];
const pilas = ['pixa', 'pila', 'caralho', 'picha'];
const conas = ['cona', 'kona', 'pussy', 'paxaxa', 'paxaxinha', 'grelo'];
const ofensa = ['gay', 'homosexual', 'paneleiro', 'lesbica'];
const perdao = ['desculpa', 'perdão'];
const respostasAoDunkMemer = ['pls boobs', 'pls ass', 'pls porn', 'pls tits', 'pls booty'];

client.on("message", (message) => {

    const mensagem = message.toString().toLowerCase();
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if(!state && (mensagem !== "deus volta a terra"))
    {
        return;
    }

    const numeroDaMensagem = Math.round( Math.random() * 2 );
    const comecaComPrefixo = message.content.startsWith(prefix);


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

    
    const commands = require("./lib/commands.js")(message, args, command);

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
