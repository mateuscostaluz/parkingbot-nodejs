'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const chatbot = new Telegram.Telegram('716039964:AAFsLCI23Ieb3anwXEMhCmoAwgqge95MvlI');
const request = require('request');

class EventsController extends TelegramBaseController {
  vagasAction(scope) {
    let body = this.vagas();
    let msg = "No momento existem " + body + " vagas disponíveis.";
    scope.sendMessage(msg);
  }

  get routes() {
    return {
      vagas: 'vagasAction'
    };
  }

  get vagas() {
    request('http://localhost:8081', { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      return body;
    });
  }
}

chatbot.router.when(new TextCommand('/vagas', 'vagas'), new EventsController());
