/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.34cf1bb0-865f-4dff-baa7-11a48891e621"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var AlexaSkill = require('./AlexaSkill');
var HelloWorld = function() {
    AlexaSkill.call(this, APP_ID);
};

var ingredients = {
 "soda":"A snow golem can be created by placing a pumpkin on top of  two snow blocks on the ground.",
 "kanda poha":"Kanda Poha requires 2 cups poha/flattened rice/beaten rice, 2 tbsp oil, 1 tsp mustard seeds, 1 tbsp peanuts/groundnuts, 1 tbsp very finely chopped green chillies, 8-10 fresh curry leaves, 3 medium size finely chopped onions/kanda, salt - to taste."
}

var recipeteps = {
   "kanda poha":[
                "Take a pan/wok, into it, add oil and heat it.",
                "Add mustard seeds and let them crackle.",
                "Add peanuts and roast for few seconds.",
                "Add finely chopped green chillies and saute.",
                "Add curry leaves into it.",
                "Add chopped onions and saute for few seconds.",
                "Into it, add salt as per taste.",
                "Add few sugar crystals and stir well(optional).",
                "Add turmeric powder and mix well.",
                "Add the washed poha into it.",
                "Mix the poha well with the cooked onion mixture.",
                "Add some freshly chopped coriander leaves into it.",
                "Finally add in some lemon extracted juice all over, mix and cook for few seconds.",
                "Switch off the flame.",
                "Serve as a tea time snack."
                ]
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
    // register custom intent handlers
    "HelloWorldIntent": function(intent, session, response) {
      response.ask("Hello World", "Hello World");
    },
    "GetStepsOfRecipesIntent": function(intent, session, response) {
      response.ask("Chup Be?", "Chup Be?");
    },
    "GetListOfIngredientsIntent": function(intent, session, response) {
        var itemSlot = intent.slots.Item,
            itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = "Ingredients for " + itemName,
            ingredient = ingredients[""+ itemName +""],
            speechOutput,
            repromptOutput;
        if (ingredient) {
            speechOutput = {
                speech: ingredient,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, ingredient);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the ingredients for " + ingredients[""+ itemName +""] + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that ingredient. What else can I help with?";
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

};

// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
    // Create an instance of the HelloWorld skill.
    var helloWorld = new HelloWorld();
    helloWorld.execute(event, context);
};
