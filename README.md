# 340 Final Demo
This is a demo for the GIMM 340 final for the Fall 2025 semester.

## What's included
The "Arduino" folder includes a demo script that can connect to the internet (if using an Arduino Uno WiFi board) and send POST requests to the server when a button is pressed. The folder also includes a simple circuit for testing.

When pushed to the EC2 instance, running 'pm2 index.js' will run the server. Make sure to follow the instructions in index.js to configure your ec2 servver properly

Running 'pm2 test.js' on the EC2 instance will test the connection (useful when setting up cloudflare).

## How to Use
Once your domain is set up on Cloudflare...
1. Change your Alexa endpoint to the HTTPS address setup through Cloudflare with "My development endpoint is sub-domain..."
2. Change connection.js and noun.js in Model to your database settings.
3. Change the arduino code to use your endpoint and WiFi settings
4. Review index.js to make sure everything is connected properly
5. Upload the contents to your own GitHub repo and configure your EC2 instance to be connected to it. Run 'git pull' on the EC2 instance, then

If you need any help, ask me (Mae) for help or DM me on discord @maybe_maeb
