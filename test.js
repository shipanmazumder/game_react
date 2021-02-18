const schedule = require('node-schedule');

const job = schedule.scheduleJob("test","* * * * * *", function(){
  console.log('The answer to life, the universe, and everything!');
});
setTimeout(()=>{
  var my_job = schedule.scheduledJobs["test"];
  my_job.cancel();
},3000 );
