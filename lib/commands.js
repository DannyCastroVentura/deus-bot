const translate = require('@vitalets/google-translate-api');
const fetch = require("node-fetch");

module.exports = (message, args, command, /*state*/) => {
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
            if(args[1] !== undefined){
                const tudo = command + " " + args[0].toLowerCase() + " " + args[1].toLowerCase();
    
                if(tudo === "quem te criou?")
                {
                    message.reply("nosso Senhor todo poderoso Daniel Ventura, é claro! :crown:");
                }else if(tudo === "quem te perguntou?")
                {
                    message.reply("não te ponhas com brincadeiras que tas aqui tas a ter um irmãozinho. :face_with_symbols_over_mouth:");
                }
            }else if(args[0] !== undefined){
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
        "biblia": () => {
            translate(
            fetch('https://beta.ourmanna.com/api/v1/get/?format=json&order=random')
            .then(data =>data.json())
            .then(data =>message.reply(data.verse.details.text)),
            {to: 'pt'})
                .then(res => {
                    console.log(res.text);
                    //=> traduzido para portugues
                    console.log(res.from.language.iso);
                    //=> nl
                }).catch(err => {
                    console.error(err);
                });
            
        },
        "adeus": () => message.reply("vais embora tão cedo?"),/*
        "volta": () => {
            if(args[2] !== undefined)
            {
                const tudo = command + " " + args[0].toLowerCase() + " " + args[1].toLowerCase() + " " + args[2].toLowerCase();
                if(tudo === "volta para o ceu"){
                    state(false);
                    message.reply("Quando me quiserem de volta digam: «volta a terra»");
                }
            }else if(args[1] !== undefined){
                const tudo = command + " " + args[0].toLowerCase() + " " + args[1].toLowerCase();
                if(tudo === "volta a terra"){
                    state(true);
                    message.reply("voltei, o que desejas filho meu?");
                }
            }
            
        },*/
        "ajudai": () => {
            message.reply("meu filho, eu ajudar-te-ei nisto:\n \
            Posso te mostrar o teu ping: «ping»;\n \
            Posso fazer umas contas de somar: «soma Arg1 Arg2 ArgN»;\n \
            Posso dizer o que tu quiseres: «diz Arg1 Arg2 ArgN»;\n \
            E por agora é só! \
        ");
        }

    }
    return commands;
}