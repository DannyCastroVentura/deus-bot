
let BOT_TOKEN, api_key;

try{
    let configs = require("./config/config.json");
    BOT_TOKEN = configs.BOT_TOKEN;
    api_key = configs.api_key;
}catch(err)
{
    BOT_TOKEN = process.env.discord_key;
    api_key = process.env.api_key;
}


const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "DEUS ";

//let state = true;

console.log("Started");

const arrays = require("./lib/arrays");

function delay (message, mensagem){
    setTimeout(() => {
        message.reply(mensagem);
    },1000);
}

client.on("message", (message) => {

    // console.log(message.channel.nsfw);
    const mensagem = message.toString().toLowerCase();
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const comecaComPrefixo = message.content.startsWith(prefix);
    
    let esperar = false;
    
    // if(!state && (mensagem !== "deus volta a terra"))
    // {
    //     return;
    // }
    

    // gif de abilitar primeiro no canal
    // https://i.imgur.com/oe4iK5i.gif

    let tiposDeMensagens = [];

    if(arrays.asneiras.find(v => (mensagem.includes(v))) !== undefined){
        //asneiras
        tiposDeMensagens = arrays.respostasAsneiras;
    }else if(arrays.pilas.find(v => (mensagem.includes(v))) !== undefined){
        //pilas
        tiposDeMensagens = arrays.respostasPilas;
    }else if(arrays.conas.find(v => (mensagem.includes(v))) !== undefined){
        //conas
        tiposDeMensagens = arrays.respostasConas;
    }else if(arrays.ofensa.find(v => (mensagem.includes(v))) !== undefined){
        // ofensa
        tiposDeMensagens = arrays.respostasOfensa;
    }else if(arrays.perdao.find(v => (mensagem.includes(v))) !== undefined){
        //perdão        
        tiposDeMensagens = arrays.respostasPerdao;
    }else if(arrays.interacaoAoDunkMemer.find(v => (mensagem.includes(v))) !== undefined){
        //respostas Ao Dunk Memer
        esperar = true;
        tiposDeMensagens = arrays.respostasInteracaoAoDunkMemer;        

    }else if(mensagem.includes("deus") && (!comecaComPrefixo)){
        //deus
        message.reply("chamaste?");
    }

    if(tiposDeMensagens.length !== 0){
        const numeroDaMensagem = Math.round( Math.random() * (tiposDeMensagens.length - 1) );
        if(esperar)
        {
            delay(message, tiposDeMensagens[numeroDaMensagem]);
        }else{
            message.reply(tiposDeMensagens[numeroDaMensagem]);
        }
    }

    if(message.author.bot) return;
    if(!comecaComPrefixo) return;

    
    const commands = require("./lib/commands")(message, args, command, api_key);

    
    // const commands = require("./lib/commands")(message, args, command, (newState) => {
    //     state = newState;
    // });

    if(Object.keys(commands).includes(command))
    {
        commands[command]();
    }else{
        message.reply("Não sei se entendi, mas como um sábio uma vez disse: ");
        commands["biblia"]();
    }
});

client.login(BOT_TOKEN);

// faz o mesmo que em cima, basicamente é um if no Config, se for true faz o primeiro, se for false faz o que esta depois dos : 
//client.login(Config?Config.BOT_TOKEN:process.env.discord_key);
