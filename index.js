const app = require('./app');
const PORT= process.env.APP_PORT || 4000;

app.listen(PORT, function(){
 console.log("Express server is listening on the port %d in %s mode.",this.address().port, app.settings.env);
});
