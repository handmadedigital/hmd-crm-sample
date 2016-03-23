export default {

  googleAuth(){
    // Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com
    var CLIENT_ID = '818327217697-6jha5gc2gnqj368219q9r3it4hj2tfpd.apps.googleusercontent.com';

    var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

    var emails = [];

    console.log("whats up bitch");


    gapi.auth.authorize({

      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false

    }, function(authResult) {
      console.log(authResult);
      if (authResult && !authResult.error) {
        console.log(authResult);

        gapi.client.load('gmail', 'v1', function(){
          var request = gapi.client.gmail.users.messages.list({
            'userId': 'me',
            'format': 'full'
          });

          request.execute(function(resp) {
            var labels = resp.messages;

            if (labels && labels.length > 0) {
              for (var i = 0; i < 2; i++) {
                var label = labels[i];

                var email = gapi.client.gmail.users.messages.get({
                  'userId': 'me',
                  'id': label.threadId,
                  'format': 'raw'
                });
                
                email.execute(function(resp) {
                  emails.push(resp)
                });

              }
            } else {
              console.log('sorry bud');
            }
          });

        });

      } else {

        console.log('no');

      }

    });

    return {
      emails: emails
    }

  }

}


