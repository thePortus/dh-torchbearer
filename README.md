# dh-torchbearer

Writting in AngularJS, using AngularMaterial and AngularFire

A project start-up kit for Digital Humanities

(still in very early alpha, but sharing for interested parties)

Designed to work in tandem with Firebase (www.firebase.com). This is a single-page application, designed to help DH scholars quickly design projects relational-database projects and immediately begin the process of data entry. DH Torchbearer supports multiple user-roles, encrypted data entry, and three way data-binding automatically and instantly updates your display without reloading the page whenever any user, anywhere, adds or changes an entry.

Full ReadMe to come later.

INSTALLATION

1. To install, head to Firebase and sign up for an account.
2. Then download the application code here
3. If you do not have your own server space, look on Firebase on your main account page, and note the URL for the app (not the database)
4. If you do have your own server space, note the URL directory where you want to install the app
5. Then, open the editme.js file located in the root directory of this app with a plain text editor
6. Replace https://PUT_THE_ADDRESS_OF_YOUR_FIREBASE_SERVER_HERE with either the Firebase URL, or your own, and save
7. Now, if you do not have your own server space, follow the directions at https://www.firebase.com/docs/hosting/quickstart.html to get their tool and upload your files to their remote server
8. If you have your own server space, use an FTP client to upload to your desired location
9. The first time you head to the URL after you install, it will prompt you to create the Master account
10. Your project is now ready to start

You will install this application on a remote website, either your own site (if you have one), or on the free space that Firebase provides. The first time you head to the site, it will ask you to set up the 'Master' account. Enter in your desired username and password, and ever after, that account will have full rights to make all changes. At that point, other users can visit the site and sign up for guest accounts. Once they have signed up, you can change their user rights to 'Editor', and they will be able to enter data. You can also make other users admins.

Once you have created the 'Master' account, you can design the project by heading to the 'schema' page and creating tables and fields. You can set what kind data entry you want (free text input, true/false, dropdown menu, etc). You can create different 'Option Groups' which can populate dropdown and checkbox data types. If you want a field to be a part of the primary key, make sure to set that flag. A record's primary key will constitue the concatenation of the values in all columns flagged primary keys.

After you have at least one table set the way you want, make sure to activate it, and THEN save it!!! This is easy to forget, but unless a table is activated, it will be invisible on the data entry screen. If you want to temporarily hide a table from users, simply deactivate it, this will not harm the data.

At this point, you and approved users can begin entering data. Users choose to add a new entry, which will have fields based on your choices made in the schema phase. There are options to change the number of entries displayed on the table, and there are full pagination controls. Items can be sorted (although only within the page, this will be fixed). Entries already saved can be edited or deleted.

Above the data table, there is an option to import data via a CSV, allowing you to select a file on your local drive. Make sure that the column headers match your field ID's exactly and are in the same order. Below the table is an option to export the data to a CSV.

Again, this project is in very early alpha. At this point, I would NOT recommend using it for a DH project unless you back up your data regularly. Deleting and renaming fields can sometimes cause issues, and there are a number of ways to break the app.

NOTE: If you want to start over, head to your Firebase page, and manually delete the root data node in your GUI. NOW (and this is important), head to the authentication tab and look down to the list of registered users. Make sure to delete them all! If you start over without having deleted these, it will confuse the application.

UPDATED NOTE: Firebase has changed their authentication procedures, requiring a login through a Google account. This version was built on an internal Firebase authentication system that is now defunct. This will be one of the first changes in the next version.

Full ReadMe to come later.
