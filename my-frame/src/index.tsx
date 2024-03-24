import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/*', serveStatic({ root: './public' }))
let urll: any = "";

app.frame('/', (c) => {
  const { inputText, status } = c
  const messageText = inputText;

  return c.res({
    action: '/send',
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {`Welcome!\n Drop your message bellow)`}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter message here..." />,
      <Button value="send-message">Send message to OP</Button>,
    ],
  })

})

app.frame('/send', (c) => {
  const { inputText, status, buttonValue } = c
  const messageText = inputText;

  async function executeCommand() {
    const command = `node scripts/private/_send-packet-config.js ${messageText}`;
    await fetch('https://sweeping-forcibly-gannet.ngrok-free.app/execute-command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ command })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => {
        console.log(text);
        urll = text
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }
  if (messageText) {
    executeCommand()
    console.log(`message: ${messageText} has been sent`)
  }

  if (buttonValue === 'check-status') {
    if (urll) {
      return c.res({
        //action: '/check',
        image: (
          <div
            style={{
              alignItems: 'center',
              background:
                status === 'response'
                  ? 'linear-gradient(to right, #432889, #17101F)'
                  : 'black',
              backgroundSize: '100% 100%',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              height: '100%',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: 60,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                lineHeight: 1.4,
                marginTop: 30,
                padding: '0 120px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {`Done`}
            </div>
          </div>
        ),
        intents: [
          <Button.Link href={urll}> Explorer</ Button.Link >,
          <Button value='again'>New message</Button>,
        ],
      })
    }
  }

  if (buttonValue === 'again') {
    urll = "";
    return c.res({
      action: '/',
      image: (
        <div
          style={{
            alignItems: 'center',
            background:
              status === 'response'
                ? 'linear-gradient(to right, #432889, #17101F)'
                : 'black',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              marginTop: 30,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {`Let's send new one`}
          </div>
        </div>
      ),
      intents: [
        <Button>Start</Button>,
      ],
    })
  }

  return c.res({
    //action: '/',
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {messageText ? `Your message: ${messageText ? ` "${messageText}" has been sent!` : ''}` : `Waiting for tx accomplishment...`}
        </div>
      </div>
    ),
    intents: [
      <Button value='check-status'>Check status</Button>,
      <Button value='again'>New message</Button>,
    ],
  })
})

devtools(app, { serveStatic })
