
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import os
from Cut_Images_To_Predictions import *

app = Flask(__name__)
CORS(app)

# A function that handles updating the parking status in the database.
def update_parking_status_in_db(location_id, status):
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='mysql24',
            database='parkinglot'
        )
        cursor = conn.cursor()

        if status == 1:  # Parking lot is now occupied
            full_row_id = 18
            query = "SELECT * FROM parkinglot3 WHERE lot_number = %s"
            cursor.execute(query, (full_row_id,))
            full_row = cursor.fetchone()
            new_locations = full_row[1:9]

        elif status == 0:  # Parking lot is now empty
            empty_row_id = 51
            query = "SELECT * FROM parkinglot3 WHERE lot_number = %s"
            cursor.execute(query, (empty_row_id,))
            empty_row = cursor.fetchone()
            new_locations = empty_row[1:9]

        update_query = """
        UPDATE parkinglot3
        SET location1 = %s, location2 = %s, location3 = %s, location4 = %s,
            location5 = %s, location6 = %s, location7 = %s, location8 = %s
        WHERE lot_number = %s
        """
        cursor.execute(update_query, (*new_locations, location_id))
        conn.commit()
        cursor.close()
        conn.close()

        print(f'Successfully updated parking status for parking lot {location_id}')

        return {'message': 'Parking status updated successfully in the database'}, 200

    except mysql.connector.Error as err:
        print(f'Error: {err}')
        return {'message': str(err)}, 500

# Set the relative path for the image
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
image_path1 = os.path.join(BASE_DIR, 'Parking_Lot_Image.jpg')


# Update the MYSQL on changing status
@app.route('/update', methods=['POST'])
def update():
    try:
        data = request.json
        location_id = data.get('location_id')
        print(location_id)
        status = data.get('status')
        print(f'Received request to update location {location_id} with status {status}')

        if location_id is None or status is None:
            print('Location ID and status are required')
            return jsonify({'message': 'Location ID and status are required'}), 400

        response = update_parking_status_in_db(location_id, status)
        points = extract_locations()
        predictions = cut_point(image_path1, points)

        return jsonify({'message': f'Parking status updated for location {location_id}', 'predictions': predictions}), 200

    except Exception as e:
        print(f'Unhandled exception: {e}')
        return jsonify({'message': str(e)}), 500

@app.route('/search', methods=['GET'])
def search():
    try:
        points = extract_locations()
        predictions = cut_point(image_path1, points)
        return jsonify({'message': 'Predictions retrieved successfully', 'predictions': predictions}), 200
    except Exception as e:
        print(f'Unhandled exception: {e}')
        return jsonify({'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


