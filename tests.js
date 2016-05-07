var context = require.context('./tests', true, /Spec\.js$/);
context.keys().forEach(context);