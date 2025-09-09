const Alexa = require('ask-sdk-core');
const { ExpressAdapter } = require('ask-sdk-express-adapter');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak('Hello world').getResponse();
  }
};

const skill = Alexa.SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler)
  .create();

console.log('appendAdditionalUserAgent:', skill.appendAdditionalUserAgent); // Should be a function

const adapter = new ExpressAdapter(skill, false, false);

console.log('ExpressAdapter created successfully');
