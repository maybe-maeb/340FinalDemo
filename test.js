const Alexa = require('ask-sdk-core');
const { ExpressAdapter } = require('ask-sdk-express-adapter');
const express = require('express');

const app = express();

const skillBuilder = Alexa.SkillBuilders.custom()
  .addRequestHandlers({
    canHandle: () => true,
    handle: (handlerInput) => handlerInput.responseBuilder.speak('hi').getResponse(),
  });

const skill = skillBuilder.create();
console.log('appendAdditionalUserAgent:', typeof skill.appendAdditionalUserAgent);

const adapter = new ExpressAdapter(skill, true, true); // <--- should NOT throw here

app.post('/', adapter.getRequestHandlers());
app.listen(3000, () => console.log('running on 3000'));
