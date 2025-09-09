//Make sure to run the following commands in the amazon console where this file is located
//npm install mysql2

//Database Connection
const noun = require("./Model/noun.js");

//Alexa Headers
const Alexa = require('ask-sdk-core');

//Express
const express = require('express')
const app = express()

const { ExpressAdapter } = require('ask-sdk-express-adapter');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to the Arduino Demo. What would you like to do today?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//////////////////////////////////
/////////CUSTOM FUNCTIONS/////////
//////////////////////////////////

//A very simple call-and-response intent handler. Responds "Pong!" when the user enters "Ping"
const PingIntentHandler = {
    canHandle(handlerInput) {
        //If Alexa gets a request...
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            ///And the prompt matches an utterance for the "PingIntent" intent...
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PingIntent';
    },
    //Do stuff
    handle(handlerInput) {
        //Declare a variable called "speakOutput" to hold what we want to say
        const speakOutput = 'Pong!';
        
        //Alexa starts building a response...
        return handlerInput.responseBuilder
            //And speaks the speakOutput variable
            .speak(speakOutput)
            .getResponse();
    }
};

const InsertIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InsertIntent';
    },
    handle(handlerInput) {
        const item = Alexa.getSlotValue(handlerInput.requestEnvelope, 'item');

        insertToDatabase(item);

        const speakOutput = "Added " + item + " to the database.";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const GetAllFromDatabaseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetAllFromDatabaseIntent';
    },
    handle(handlerInput) {        
        const speakOutput = getFromDatabase();

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const GetItemFromDatabaseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetItemFromDatabaseIntent';
    },
    handle(handlerInput) {
        const id = Alexa.getSlotValue(handlerInput.requestEnvelope, 'id');
        
        const speakOutput = getFromDatabase(id);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
//////////////////////////////////
///////END CUSTOM FUNCTIONS///////
//////////////////////////////////

//////////////////////////////////
////////BUILT IN FUNCTIONS////////
//////////////////////////////////
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//////////////////////////////////
//////END BUILT IN FUNCTIONS//////
//////////////////////////////////

//////////////////////////////////
////////DATABASE FUNCTIONS////////
//////////////////////////////////
async function insertToDatabase(info = null){
  const addResult = await noun.addRow({ info: info });
  console.log('Add Result:', addResult);
}

async function getFromDatabase(id = null){
  let result = null;
  if (id == null) result = await noun.selectAllRows();
  else result = await noun.selectById({id: id});

  console.log('Get Result:', result);
  return result;
}

//////////////////////////////////
////////ARDUINO RECEIVERS/////////
//////////////////////////////////
app.post('/addtodatabase/',
    (req, res) => {
        insertToDatabase("New test item!!");
        res.send("POST Request Called")
    });

//Alexa Handler
const skill = exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        //NEW
        PingIntentHandler,
        InsertIntentHandler,
        GetAllFromDatabaseIntentHandler,
        GetItemFromDatabaseIntentHandler,
        
        //BUILT IN
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
const adapter = new ExpressAdapter(skill, false, false);

app.post('/', adapter.getRequestHandler());

//Run Server
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!')
})