export GOOGLE_APPLICATION_CREDENTIALS="/Users/Mac/Projects/wajid/mdm/server/env/auth.json"  

# Start the project

node app/app/app.js


//client
ssh -R 80:localhost:9012 localhost.run

//server 
ngrok http 9012 
