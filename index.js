
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

//let state = true;

console.log("Started");

const arrays = require("./lib/arrays");

client.on("message", (message) => {

    const mensagem = message.toString().toLowerCase();
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    /*
    if(!state && (mensagem !== "deus volta a terra"))
    {
        return;
    }
    */
    const numeroDaMensagem = Math.round( Math.random() * 2 );
    const comecaComPrefixo = message.content.startsWith(prefix);


    let tiposDeMensagens = [];

    if(arrays.asneiras.find(v => (mensagem.includes(v))) !== undefined){
        //asneiras
        tiposDeMensagens = ['não se diz asneiras...', 'tento nessa língua...', 'não foi assim que te eduquei'];        
    }else if(arrays.pilas.find(v => (mensagem.includes(v))) !== undefined){
        //pilas
        tiposDeMensagens = ['diz-se pénis.', 'pénis queres tu dizer.', 'tento nessa língua...'];
    }else if(arrays.conas.find(v => (mensagem.includes(v))) !== undefined){
        //conas
        tiposDeMensagens = ['diz-se vagina.', 'vagina queres tu dizer.', 'tento nessa língua...'];
    }else if(arrays.ofensa.find(v => (mensagem.includes(v))) !== undefined){
        // ofensa
        tiposDeMensagens = ['quem diz é quem é.', 'filho deixa disso.', ':neutral_face:'];
    }else if(arrays.perdao.find(v => (mensagem.includes(v))) !== undefined){
        //perdão
        tiposDeMensagens = ['estás perdoado.', 'vou pensar.', 'espero que gostes de calor, quando faleceres vais para um lugar bem quentinho...'];
    }else if(arrays.respostasAoDunkMemer.find(v => (mensagem.includes(v))) !== undefined){
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

    
    const commands = require("./lib/commands")(message, args, command/*, (newState) => {
        state = newState;
    }*/);

    if(Object.keys(commands).includes(command))
    {
        commands[command]();
    }else{
        message.reply("Não sei se entendi, mas como um sábio uma vez disse: ");
        commands["biblia"]();
    }
});

if(Config)
{
    client.login(Config.BOT_TOKEN);
}else{
    client.login(process.env.discord_key);
}

// faz o mesmo que em cima, basicamente é um if no Config, se for true faz o primeiro, se for false faz o que esta depois dos : 
//client.login(Config?Config.BOT_TOKEN:process.env.discord_key);
