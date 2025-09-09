const Alexa = require('ask-sdk-core');
const { ExpressAdapter } = require('ask-sdk-express-adapter');

const skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers()
    .lambda();

console.log('skill:', skill);
console.log('typeof skill.appendAdditionalUserAgent:', typeof skill.appendAdditionalUserAgent);

const adapter = new ExpressAdapter(skill, false, false);
console.log('adapter created successfully');