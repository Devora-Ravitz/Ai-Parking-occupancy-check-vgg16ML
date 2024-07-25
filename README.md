A web application for locating parking slots using the VGG16 ML model, which processes real-time photos from
parking lot cameras to identify empty spots. The model was trained to recognize empty parking spaces
through image processing in Python. Technologies used include React, CSS, HTML, Python, MySQL Server, and
Flask.


![Alternative text](https://drive.google.com/uc?export=view&id=1Nng-o-UHm2vPenmralCB9YydjtStA8SW)

**Steps in running the project:**

**1**. git clone:
https://github.com/LALIBEKE/AI--for-Parking-Occupancy-Detection.git

**2**. Configure the database Make sure you have MySQL installed on your computer. Create a new database and import the provided SQL schema ,the name of the sql schema: Creating_Queries_With_Coordinates.sql.txt .
(If you want to create a rake database without coordinates then build the file Creating_Queries.sql.txt)

**Pay attention** to replace the MySql login details in a Python file:
Mysql_Location_Extraction.py
And in the file: Parking_Server_Image.py
which are in the code folder.

**3**. Configure the Backend Create a virtual environment: Create and run a virtual Python environment
python -m venv venv source venv/bin/activate # on Windows use 'venv\Scripts\activate' Install Dependencies .

Run the 'Parking_Server_Image.py' file
which is responsible for running the backend server .

**4** Configure the frontend Navigate to the Frontend directory: Change to the directory where the React front-end code is located
front of CDs Install Dependencies: Install the required npm packages:

npm install Start the front-end development server: Start the React development server:

Getting started with npm 5. Access the app Once both the back-end and front-end servers are running, you can access the application in your web browser at http://localhost:3000.

To start the process you must register, choose a parking lot name 
and display the status of parking occupancy from the model by clicking on the car icon (only after the server file is activated)


![Alternative text](https://drive.google.com/uc?export=view&id=14m3VvdgVXc7VJaAl1_4FzySAMC7sgB-A)


