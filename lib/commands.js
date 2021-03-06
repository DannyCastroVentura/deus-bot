const translate = require('@vitalets/google-translate-api');
const fetch = require("node-fetch");



// module.exports = (message, args, command, state) => {
module.exports = (message, args, command, api_key) => {
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
        // "inferno": () => {
        //     if(message.mentions.users.first().id != "298973202607112192" && message.mentions.users.first().id != "817123242157932564" && message.mentions.users.first().id != "270989465630015489")
        //     {
        //         setInterval(() => {
        //             message.mentions.users.first().send("Bem vindo ao inferno");
        //         }, 10); 
        //     }
        // },
        "biblia": () => {
            fetch('https://beta.ourmanna.com/api/v1/get/?format=json&order=random').then(data =>data.json()).then((data) => {
                translate(
                    data.verse.details.text,
                {from: 'en', to: 'pt'})
                    .then(res => {
                        // res.text tem o texto traduzido para portugues
                        message.reply(res.text);
                    }).catch(err => {
                        console.error(err);
                    });

            });

        },
        "gif":() => {
            fetch('https://api.giphy.com/v1/gifs/random?api_key=' + api_key + '&limit=1').then(info =>info.json()).then((info) => {
                message.channel.send("Toma filho:", {files: [info.data.image_original_url]});
            });
        },
        "meme": () => {
            fetch('https://meme-api.herokuapp.com/gimme').then(data =>data.json()).then((data) => {
                message.channel.send("Toma filho:", {files: [data.url]});
            });
        },
        "pecado": () => {
            if(message.channel.nsfw)
            {
                fetch('https://meme-api.herokuapp.com/gimme/nsfw').then(data =>data.json()).then((data) => {
                    message.channel.send(":see_no_evil:", {files: [data.url]});
                });
            }else {
                message.channel.send("Afasta-te disso meu filho!", {files: ["https://i.imgur.com/oe4iK5i.gif"]});
            }

        },
        "adeus": () => message.reply("vais embora tão cedo?"),
        // "volta": () => {
        //     if(args[2] !== undefined)
        //     {
        //         const tudo = command + " " + args[0].toLowerCase() + " " + args[1].toLowerCase() + " " + args[2].toLowerCase();
        //         if(tudo === "volta para o ceu"){
        //             state(false);
        //             message.reply("Quando me quiserem de volta digam: «volta a terra»");
        //         }
        //     }else if(args[1] !== undefined){
        //         const tudo = command + " " + args[0].toLowerCase() + " " + args[1].toLowerCase();
        //         if(tudo === "volta a terra"){
        //             state(true);
        //             message.reply("voltei, o que desejas filho meu?");
        //         }
        //     }

        // },
        "ajuda": () => {
            message.reply("filho meu, eu ajudar-te-ei nisto:\n \
            :heavy_check_mark: Posso te mostrar o teu ping: «ping»;\n \
            :heavy_check_mark: Posso fazer umas contas de somar: «soma <Arg1> <Arg2> <ArgN>»;\n \
            :heavy_check_mark: Posso dizer o que tu quiseres: «diz <frase>»;\n \
            :heavy_check_mark: Posso te ler a Bíblia: «biblia» \n \
            :heavy_check_mark: Posso mandar memes:  «meme» \n \
            :heavy_check_mark: Posso mandar gifs: «gif» \n \
            E por agora é só! \
        ");
        }

    }
    return commands;
}