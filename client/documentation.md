Project "Buy and Sell Bikes Second-hand" 

The Application allows visitors to browse through the catalog with second-hand bikes.
After registration they can create their own Ad.

Navigation 
Guests can see the links to Home, List, Login and Register.
Logged-in can see Home, List, Welcome "user", Logout.

Home
Information about the site. Visible without authentication.

List All Bikes
List of all bikes for sale. Visible without authentication.
Clicking on [read more] button should redirect to details.

Register User
By clicking the "Register" button the registration form is loaded. When the "Register" button of the form is clicked a post request is sent.
A validation is made with notification.
The returned token will be kept in AuthState, and send with request if it is needed.
After successful registration the user should be redirected to List page.

Login User
If the user has already registration, the user can login by using the login form. 
A validation is made with notification.
The returned token will be kept in AuthState, and send with request if it is needed.
After successful login the user should be redirected to List page.

Logout User
The logged in user can be logged out by clicking the logout button. 
The AuthState will be updated.

Create new Ad
Validate fields:
Title is required
Condition is required
Price is required and should be a positive number
Image should be a valid URL
A validation is made with notification.
After successful creation the user should be redirected to Details page.

Bike Details
Visible without authentication.
If the user is guest the button [ Register to send message ] is visible (can be used).
If the logged user is the owner of the bike the buttons "Edit" and "Delete" are visible (can be used), otherwise [ Send message ] button is visible (can be used).

Edit Ad
If the logged in user is the owner of the bike he can edit the bike details. When the form is loaded all the fields are filled up with the information from the server. Validation is the same as the validation by creating new ad. PUT request will be send.

Delete Ad
By clicking on "Delete" button in Details Page DELETE request will be sent to the back-end and deletes the ad. Then the app redirects to the List.

Send Message
If the logged user is not the owner of the bike, [ Send message ] button is visible (can be used) in Details Page. By clicking on it a Send Message Page will be loaded.
By clicking on Send button, POST request will be made and the message will be saved.
A notification informs the message is sent.

Inbox
By clicking on Inbox button in the menu, all conversations of the registered user will be loaded with information about the other username, the subject of the conversation and if there are new messages.
By clicking on [All messages] button on specific conversation, a page with all messages from that conversation will be loaded. When the user come back to Inbox, the new messages for that conversation will be zero.

Conversation "subject" with "username" Page
All messages from that conversation will be loaded. 
By clicking on Send button, POST request will be made and the message will be saved.
The new message will be seen.
A notification informs the message is sent.
By clicking on [Delete Conversation] button, POST request will be made.
The user won't see the conversation any more, but the other user can still see it.
If the other user delete the conversation also, then the conversation will be deleted permanently.

Error Page


