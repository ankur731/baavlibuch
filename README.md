# baavlibuch
#Ankur Tiwari
#ankur73tiwari@gmail.com

# Baavlibuch assignment

This projects let's user to add their ID, images, password, friendId and a text.


# Installation

## Frontend
1. Change to frontend folder using "cd frontend"
2. Type "npm init" to intilize npm
3. Type "npm install " to install dependendies
4. Type "npm run dev" to run development server

## Express backend
1. Change to express-backend folder using "cd express-backend"
2. Type "npm init" to intilize npm
3. Type "npm install " to install dependendies
4. Type "nodemon app.js" or "node app.js" to start express server

## Python backend
1. Change to python-backend folder using "cd python-backend"
2. Type "uvicorn main:app --reload" to start python server

#### During starting these server please ensure no other server is running on port 3000, 5174, 8000

#task checklist
1.Create a backend tier using ExpressJS.
2. Created a PWA using React that that accepts text input (ID), a photo, text input (friendID) and password, and sends it to the backend.
3. The backend server should have the following 3 functionalities -
3.1 log the number of times a connection is made by the frontend and insert it into a Mongoose Model
3.2 receive the text that was inserted from the frontend and insert it in another Model and Table
3.3 calls the Django api using the most recent 2 strings and returns the ngrams to the frontend
4. Added the persons ID (A) to mongodb
5. stored the file in a directory on the disc using multer (A)
6. updated friend's (B) friendList to include person (A)
7. Created a Django server that has an API that returns the ngrams comparison using NLTK.

# Usage
1. In the form type any person ID say "01" and in image please uplaod any image in password enter any password e.g., "001" in firned ID enter any id e.g., 02
 in text enter any text let's say "Hello world"

 after filling all the fields enter Submit the form relaod and a meassage will be shown saying user added successfully
 2. Repeat these steps to add more users

 3. use get data button to see the data you enter it will show all the data in tabuler form
 4. Use get Ngrams button to see the Ngrams of last two string entered by the user  in a pop-up
 5. Also the popup will contain the number of request made so far ny the server.
