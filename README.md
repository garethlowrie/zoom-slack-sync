# 📱🔄 Zoom Slack Sync

Zoom Slack Sync is a serverless application built upon the [serverless framework](https://www.serverless.com/framework/docs/).

Get set up in a matter of no time! ⏰

All you need to do is:

1. Create a Slack app
2. Create a Zoom app
3. Clone this repo
4. Copy and fill out the .env file
5. Sign in to AWS on the CLI
6. Deploy with a single 👀 `yarn deploy` command 
7. Users can (en/dis)able this integration by typing `/statusupdater` in your Slack workspace.

## ⚙️ Prerequisites

-   An AWS account (We will be creating three Lambdas and a DynamoDB table)
-   Zoom user account with Developer permissions
-   Slack user account with the ability to create apps and add them to a workspace.


---

## How it works
### See it in action
The gif below outlines what this repo will allow you to achieve.    

<img src="https://github.com/garethlowrie/zoom-slack-sync/raw/main/images/demo.gif" width="500">



### OAuth Flow
Once set up, a user in your Slack workspace can start syncing their Zoom and Slack status' by typing `/statusupdater`.    
The user will then be asked to authorise the Slack app.     

<img src="https://github.com/garethlowrie/zoom-slack-sync/raw/main/images/oauth-start.png" width="500">

After authorisation the user will be informed the sync is now live.     

<img src="https://github.com/garethlowrie/zoom-slack-sync/raw/main/images/oauth-redirect.png" width="500">


The user can stop syncing their status' at any time by retyping the slash command `/statusupdater`.     

<img src="https://github.com/garethlowrie/zoom-slack-sync/raw/main/images/stop-sync.png" width="500">

---

## 👷 Installation

First of all you will need to

1. Install [serverless](https://www.serverless.com/framework/docs/providers/aws/guide/installation/)

```bash
npm install -g serverless
- OR -
yarn global add serverless
```

2. [Give serverless access to AWS](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#setup-with-serverless-config-credentials-command)

3. Clone this repository

```bash
git clone https://github.com/garethlowrie/zoom-slack-aws-sync.git
```

4. Install the dependencies

```bash
npm install
- OR -
yarn
```

---

### 🤖 1. Create a Slack App

[Create a Slack App](https://api.slack.com/apps) and add it to your Slack Workspace.

#### Basic Information

-   Give you app a name like "Zoom Slack Sync" (this is how your App will appear in Slack).
-   Set an app icon, I've included a free one in this repo under `images` for you to use.

#### OAuth & Permissions

First add your Bot/User Token Scopes.

-   Bot Token Scopes: `commands` `chat:write` `im:write`  
-   User Token Scopes: `users.profile:write`.

Then go ahead and hit the **Install App to Workspace** button to add your App to Slack.  
**Redirect URL:** After running `yarn deploy` in `Step 3. Deploy` you will see an endpoint output in the terminal that ends with `/zoom-status-change-authorize-redirect` (Paste this in here).

#### Slash Commands

Go ahead and **Create a New Command** like `/statusupdater`. (Again, we will need to add the Request URL in Step 4 after deployment so just set it to be https://google.com for now.)

---

### 🤖 2. Create a Zoom App

You will need to [create a JWT Zoom app](https://marketplace.zoom.us/develop/create).

-   Tab: **Information** - Fill this tab out with your details
-   Tab: **App Credentials** - Generate a JWT
    -   _(Note: When your JWT expires you will need to redeploy in Step 3 with the new JWT)_
    -   Keep this to one side to put in your `.env` file later.
-   Tab: **Feature**
    -   Generate a Verification Token
        -   Keep this to one side to put in your `.env` file later.
    -   Add an **Event Subscription**
        -   **Name:** This can be anything
        -   **Event type 1**: `Meeting - Participant/Host joined meeting`
        -   **Event type 2**: `Meeting - Participant/Host left meeting`.
        -   **Event type 3**: `Meeting - End meeting`.
    -   **Event notification endpoint URL**: Come back to this in Step 4 (put a dummy url for now)
-   Tab: **Activate** - Don't activate yet. Come back to this in Step 4.

---

### 🚀 3. Deploy

Create a `.env` file in the root directory and add the following.  
Environment variables prefixed with `CUSTOM_` are optional and have defaults assigned.  
I've outlined where you can find the values below.

```javascript
CUSTOM_EMOJI=:zoom:                   <Default: :calling: - This can be any emoji code in your Slack Workspace (custom too)>
CUSTOM_STATUS="On a call"             <Default: On a Zoom>
CUSTOM_SLACK_SLASH_COMMAND=syncstatus <Default: statusupdater>

AWS_REGION_DEFAULT=                   <AWS - e.g. eu-west-1>

SLACK_APP_ID=                         <Slack App - Basic Information Tab>
SLACK_VERIFICATION_TOKEN=             <Slack App - Basic Information Tab>
SLACK_CLIENT_ID=                      <Slack App - Basic Information Tab>
SLACK_CLIENT_SECRET=                  <Slack App - Basic Information Tab>
SLACK_OAUTH_TOKEN=                    <Slack App - OAuth and Permissions - Bot User OAuth Access Token>

ZOOM_VERIFICATION_TOKEN=              <Zoom App - Feature Tab>

SLACK_REDIRECT_URI=                   <This will be output after running yarn deploy, see below..>
```

Deploy your serverless application

```javascript
yarn deploy
```

Check your terminal output for an endpoint ending with `/zoom-status-change-authorize-redirect`.  
Add this to your `.env` file as the following

```bash
SLACK_REDIRECT_URI=https://abcdef.execute-api.eu-west-1.amazonaws.com/dev/zoom-status-change-authorize-redirect
```

Deploy your serverless application for a final time.

```javascript
yarn deploy
```

---

### 👷‍♀️ 4. Go back and add the final bits

When you ran `yarn deploy` in Step 3 a number of endpoints would have been output in the terminal - we will need to add them to your Slack and Zoom apps.

1.  **Slack App: Update your Redirect URL**

    Go to the **OAuth & Permissions** tab and add the endpoint that ends with `/zoom-status-change-authorize-redirect` as a Redirect URL.

2.  **Slack App: Update your Slash Command Request URL**

    Go to the **Slash Commands** tab and add the endpoint that ends with `/slack` as a Request URL.

3.  **Slack App: Turn on Interactivity**

    Go to the **Interactivity & Shortcuts** tab and add the endpoint that ends with `/slack` as a Request URL.

4.  **Zoom App: Add your Notification Endpoint URL**

    Go to the **Feature** tab and add the endpoint that ends with `/zoom-status-change` as the Notification Endpoint URL in your Event Subscriptions.

5.  **Zoom App: Activate**

    Go to the **Activation** tab and hit the activate button.

---

## Using the integration

Once you have followed steps 1-4 above you should be ready to go! Head over to the Slack workspace where you installed your Slack App.

-   Type your slash command _e.g. /statusupdater_ and this should initiate the OAuth workflow by setting a button to the user that will take them to your Slack App's authorisation page. Once they click the button they will be redirected back to your Slack App and a message will inform the user that their status' are now in sync.
-   To stop syncing type your slash command again _e.g. /statusupdater_.

---

## 🚧 Debugging

Have you followed steps 1-4 and tried testing your integration and is something not working?

-   **Double check your Slack app and Zoom app are both configured correctly.**
-   **Check out the Lambda Logs**
    -   Log in to the _AWS Console_ and go to _Lambda_, you should see three lambdas called:
        -   **status-sync-dev-zoom-status-change-authorize-redirect**
        -   **status-sync-dev-zoom-status-change**
        -   **status-sync-dev-slack**
-   **Check our your DynamoDB table**
    -   Log in to the _AWS Console_ and go to _DynamoDb_, you should see a table called:
        -   **status-sync-data-table**
    -   When a user completes the OAuth flow they should appear in your DynamoDb table.
    -   When a user turns off the integration they should be removed from your DynamoDb table.

---

## ⭐ Like this?

If you found this project useful please ⭐ this repo in the top right of this page :D

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](https://choosealicense.com/licenses/mit/)

Slack App Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](www.flaticon.com)
