# Zoom Slack AWS Sync

Zoom Slack AWS Sync is a serverless application built upon the [serverless framework](https://www.serverless.com/framework/docs/).

## Installation

1. Install [serverless](https://www.serverless.com/framework/docs/providers/aws/guide/installation/)

```bash
npm install -g serverless
```

2. [Set up AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)

3. Clone this repository

```bash
git clone https://github.com/garethlowrie/zoom-slack-aws-sync.git
```

### 1. Create a Slack App

Create a Slack App and add it to your Slack Workspace.

#### OAuth & Permissions

First add your Bot/User Token Scopes.

-   Bot Token Scopes: `commands`
-   User Token Scopes: `users.profile:write`.

Then go ahead and hit the **Install App to Workspace** button to add your App to Slack.  
**Redirect URL:** After running `yarn deploy` in `Step 3. Deploy` you will see an endpoint output in the terminal that ends with `/zoom-status-change-authorize-redirect` (Paste this in here).

#### Slash Commands

Go ahead and **Create a New Command** like `/statusupdater`. (Again, we will need to add the Request URL in Step 4 after deployment so just set it to be https://google.com for now.)

### 2. Create a Zoom App

You will need to [create a Webhook Only Zoom app](https://marketplace.zoom.us/develop/create).

-   Tab: **Information** - Fill this tab out with your details
-   Tab: **Feature**
    -   Generate a Verification Token (keep this to one side to put in your `.env` file later.
    -   Add an **Event Subscription**
        -   **Name:** This can be anything
        -   **Event type**: `User Activity - User's presence status has been updated`.
        -   **Event notification endpoint URL**: You will have to set this at the very end after you have ran `yarn deploy` in **Step 3. Deploy** you will see an endpoint output in the terminal that ends with `/zoom-status-change` (Paste this in here)
-   Tab: **Activate** - Come back to this at the end

### 3. Deploy

Create a `.env` file in the root directory and add the following. Environment variables prefixed with `CUSTOM_` are optional.

```javascript
AWS_REGION_DEFAULT=eu-west-1
SLACK_APP_ID=<SLACK_APP_ID>
SLACK_REDIRECT_URI=<SLACK_APP_REDIRECT_URI>
SLACK_VERIFICATION_TOKEN=<SLACK_APP_VERIFICATION_TOKEN>
SLACK_CLIENT_ID=<SLACK_APP_CLIENT_ID>
SLACK_CLIENT_SECRET=<SLACK_APP_CLIENT_SECRET>
SLACK_OAUTH_TOKEN=<SLACK_APP_OAUTH_TOKEN>
ZOOM_VERIFICATION_TOKEN=<ZOOM_APP_VERIFICATION_CODE>
CUSTOM_EMOJI=:calling:
CUSTOM_STATUS="On a call"
```

Deploy your serverless application

```javascript
yarn deploy
```

### 4. Go back and add the final bits

When you ran `yarn deploy` in `Step 3. Deploy` a number of endpoints would have been output in the terminal - we will need to add them to your Slack and Zoom apps.

#### Add your Slack App Redirect URL

Go to the **OAuth & Permissions** tab and add the endpoint that ends with `/zoom-status-change-authorize-redirect` as a Redirect URL.

#### Update your Slack App Slash Command Request URL

Go to the **Slash Commands** tab and add the endpoint that ends with `/slack` as a Request URL.

#### Add your Zoom App Notification Endpoint URL

Go to the **Feature** tab and add the endpoint that ends with `/zoom-status-change` as the notification endpoint URL

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

Slack App Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](www.flaticon.com)
