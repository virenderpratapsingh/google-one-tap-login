# Google One Tap Login React Component

This is a simple integration component for the Google One Tap Login functionality on your website.

Just provide the Google client ID and a callback function to handle the user details after the successful login.

# Installation

`npm i google-one-tap-login --save`

# Integration

...
import GoogleOneTap from 'google-one-tap-login';
<GoogleOneTap
  clientId={'google-client-id'} /* Google Id from your registered Google account */
  onSuccess={googleUserDetailsHandler} /* User details provided by Google are handled by this function */
/>
...

## Props

* *clientId* - 'google-client-id-for-your-website' - *Mandatory*
* *onSuccess* - callback function which handles the user details provided by Google - *Mandatory*
* *overlay* - Overlay to show behind the Google's widget - *Optional*
* *onError* - Error handler - *Optional*
* *onPrompt* - Notification's prompt handler for the widget - *Optional*
* *doNotDisplay* - Override the widget's visibility on your specific conditions - *Optional*
