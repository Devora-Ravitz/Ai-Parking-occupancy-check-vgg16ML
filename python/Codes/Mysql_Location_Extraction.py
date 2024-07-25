import pymysql.cursors
import numpy as np
from PIL import Image, ImageDraw
import os


# Function to extract locations from the database
def extract_locations():
    try:
        connection = pymysql.connect(
            host="localhost",
            user="root",
            password="mysql24",
            database="parkinglot",
            cursorclass=pymysql.cursors.DictCursor

        )

        with connection.cursor() as cursor:
            cursor.execute("SELECT Location1, Location2, Location3, Location4, Location5, Location6, Location7, Location8 FROM PARKINGLOT3")
            rows = cursor.fetchall()

            locations = []
            for row in rows:
                points = [(row[f"Location{i}"], row[f"Location{i+1}"]) for i in range(1, 8, 2)]
                locations.append(points)

            return locations

    except pymysql.Error as error:
        print("Error while connecting to MySQL:", error)
        return []

    finally:
        if 'connection' in locals() and connection.open:
            connection.close()
            print("MySQL connection is closed")

