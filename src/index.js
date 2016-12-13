/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.34cf1bb0-865f-4dff-baa7-11a48891e621"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var AlexaSkill = require('./AlexaSkill');
var HelloWorld = function() {
    AlexaSkill.call(this, APP_ID);
};

var recipes = {
 "soda":"A snow golem can be created by placing a pumpkin on top of  two snow blocks on the ground.",
 "kanda poha":"Kanda Poha requires 2 cups poha/flattened rice/beaten rice, 2 tbsp oil, 1 tsp mustard seeds, 1 tbsp peanuts/groundnuts, 1 tbsp very finely chopped green chillies, 8-10 fresh curry leaves, 3 medium size finely chopped onions/kanda, salt - to taste."
}

// Extend AlexaSkill
HelloWorld.prototype = Object.create(AlexaSkill.prototype);
HelloWorld.prototype.constructor = HelloWorld;

HelloWorld.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId +
        ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

HelloWorld.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
    console.log("HelloWorld onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

HelloWorld.prototype.eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId +
        ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

HelloWorld.prototype.intentHandlers = {
    "HelloWorldIntent": function(intent, session, response) {
      response.tellWithCard("Hello World!", "Hello World", "Hello World!");
    },
    // register custom intent handlers
    "GetListOfIngredientsIntent": function(intent, session, response) {
        var itemSlot = intent.slots.Item,
            itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = "Recipe for " + itemName,
            recipe = recipes[""+ itemName +""],
            speechOutput,
            repromptOutput;
        if (recipe) {
            speechOutput = {
                speech: recipe,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, recipe);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the recipe for " + recipes["Kanda Poha"] + itemName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that recipe. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },
    "AMAZON.HelpIntent": function(intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
    // Create an instance of the HelloWorld skill.
    var helloWorld = new HelloWorld();
    helloWorld.execute(event, context);
};
