COVID-19 Tracker for Students

SSO  

The first step was creating a login page. This is the first page a user will see upon entering the app. As this app was intented for BU students, a Google SSO seemed most appropriate as all users would be able to sign in with this option. New users are automatically detected and stored.

A non-signed in user will not be able to access the rest of the app to ensure that user data is recorded appropriately.

User authentication is done through Firebase authentication in conjuction with Google APIs. When clicking the "Sign in With Google Button" users are redirected within the app to an online sign in where they are able to sign in with their BU account without leaving the app. After sign in the user is directed to the home page.

Home Page  

The home page is where the user will be able to navigate to all the different parts of the app. There is a button to go to admin view where users with admin provelages will be able to see an overview of user data. The Complete Survey button allows a user to complete a daily questionnaire for monitoring any symptoms they may have that could indicate infection with COVID-19. "See COVID Data" will navigate the user to real-time COVID data as well as useful links. And lastly the Sign Out button will sign the user out of their google account and un-athenticate them within Firebase, as well as redirect them back to the login page.

COVID Data  
At the top of the page are statistics updated daily through the use of fetchinghttps://covid19api.com/ API. This shows stastics within the US. There are also hyperlinked text options for relevant, trustworthy sources for COVID data that redirect the user outside the app and into their browser where they can find more information for their safety.

Survey  
The survey is comprised of 8 questions that come from BUs daily questionnaire. Each question presents the user with two options, yes or no whether they are experiences these symptoms. Upon clicking one of the two options for a question, their response is recorded to a data structrure and the button color changes to indicate their response has been selected. Should a user change their mind, both the recorded response and colors change appropraitely for each question. Upon completion of the survey, the user will click the submit button. Should the user fail to answer all the questions, an alert box appears reminding the user to please answer all the questions before submitting. Once the user has selected a response for each of the questions and clicks submit, their responses are sent to a Firebase Firestore collection, described below, and redirected back to the homepage. Should the user decide they want to change an answer after submitting, they are able to complete the survey again within the same day, and their previous responses will be overwritten. Based on their responses, another variable indicating symptomatic responses is also recorded for ease of use with admin functionality later.

Database for survey responses  
Survey responses are saved through the use of Firebase Firestore. They are saved in a single collection with documents named by a date (for example survey respones for September 15th, 2020 are stored in a document called "9-15-2020"). Within each document are subcollections named by the user display names. These subcollections contain the user response documents that contain the user responses detailed above. This setup allows for a single collection containin documents for each date. Each date subsequently allows us to go through specific users and see their responses, as well as recording their responses in the database indefinitely, as once the day has passed, their response for that day remains in the database. 


Admin  
The admin page is theoretically only acceessbile to users with special privelages. These users will be able to navigate to this new page and see the following information: Users that are symptomatic, users that a asymptomatic, who filled out the forms, and who did not. Users that have responded can be viewed, and those that are symptomatic will be highlighted on that page. While on another page users that have not responded will be listed.

Testing 

Test Cases:
"User can sign in using gmail by clicking on 'Sign in with Google' button." 
"Admin can navigate to admin dashboard by clicking on 'Go to Admin View' button." 
"User can navigate to page containing information about COVID-19 by clicking on 'SEE COVID DATA' button" 
"User can navigate to survey by clicking on 'COMPLETE SURVEY' button." 
"User can submit survey by answering all questions and clicking on 'SUBMIT' button"
"User who does not answer all questions and clicks on 'SUBMIT' button, will not be able to submit survey answers."
"When the same user submits multiple survey responses during the same day, only the first response will be registered."
"User can navigate to home page by clicking on 'Home Page Button'."
"User can sign out by clicking on 'SIGN OUT' button." 

All tests passed.

App Demo:
https://www.youtube.com/watch?v=rFEmO-mKQrU




Relevant Sources:

https://reactnative.dev/docs/alert

https://www.freecodecamp.org/news/react-native-firebase-tutorial/


https://www.youtube.com/watch?v=n5kr99DAjDk
https://www.digitalocean.com/community/tutorials/react-react-native-navigation


https://www.youtube.com/watch?v=ZcaQJoXY-3Q

https://firebase.google.com/docs/auth/web/google-signin


https://blog.expo.io/expo-react-native-nasa-apis-9b37ad03626e


https://rnfirebase.io
https://expo.io


https://stackoverflow.com/questions/59207062/change-color-of-touchableopacity-in-react-native


https://aboutreact.com/image-icon-inside-the-react-native-button/#Output-Screenshots


https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native


https://reactnative.dev/docs/testing-overview
https://callstack.github.io/react-native-testing-library/docs/getting-started/
