# WhatsApp Selfbot
### A way to set up reminders, automate texts, and organise all the links and texts you send to yourself on WhatsApp.
> [!NOTE]  
> This project is still a huge work in progress

## Setting up
1. Clone this repo
    - `git clone https://github.com/funinkina/whatsapp-notebot.git`
2. `cd whatsapp-notebot`
3. Install npm packages `npm install `
4. Run using `npm start`

## Getting Started
1. Run the node client using `npm start`
2. You will see a QR-CODE in your terminal
3. Open whatsapp, go to linked devices and scan the QR
4. And you are all set.
5. Send message to yourself on whatsapp using the format specified below

## Usage
### Automate Texts:
You can automate any text you want to send someone after any amount of duration (in minutes).
```format
/sendtext
<contact name>
<message>
<duration> minutes
```
For example, if you want to send a message to 'John Doe' for a meeting in 2 hours:
```
/sendtext
John doe
Join the meeting
120 minutes
```

## Worried about privacy?
As long as you are running everything local, everything is on your device only.

## Work in progess
### Features Currently avalaible
- schedule a message to send to someone after a specific interval.
-

### TODO
- Make it a fully dockerised app
- Integrate google calendar to set up reminders
- Sort all the miscellaneous stuff you send yo yourself using LLM