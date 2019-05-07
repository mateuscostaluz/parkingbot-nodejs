'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const chatbot = new Telegram.Telegram('871315491:AAHOCA7jq6xhnx_Qdn9zQH4ileil_RiTNxI');
const request = require('request');

class EventsController extends TelegramBaseController {

  get routes() {
    return {
      'vagas': 'listarVagas'
    };
  }

  listarVagas(scope) {
    request('http://localhost:8081', {
      json: true
    }, (err, res, body) => {
      let msg = "No momento existem " + body.vagas + " vagas disponíveis.";
      scope.sendMessage(msg);
    });
  }
}

chatbot.router.when(new TextCommand('/vagas', 'vagas'), new EventsController());