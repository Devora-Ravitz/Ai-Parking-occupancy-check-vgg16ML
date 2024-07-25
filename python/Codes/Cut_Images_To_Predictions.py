
import os
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
from keras.models import load_model
from Mysql_Location_Extraction import *

# Set the base directory to the location of the current script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load your pre-trained model
model_path = os.path.join(BASE_DIR, 'saved_models', 'vgg16-middlePart.h5')
model = load_model(model_path)

# Function for cutting the images and sending them to the model
def cut_point(image_path, points, save_folder='MySQL-Cut Parking Images'):
    pil_image = Image.open(image_path)
    srgb_image = pil_image.convert("RGB")
    srgb_image = np.array(srgb_image)
    predictions = []

    for i, p in enumerate(points, start=1):
        try:
            a, b, c, d = [p[j][0] for j in range(4)]
            a1, b1, c1, d1 = [p[j][1] for j in range(4)]

            print(f"Point {i}: a={a}, b={b}, c={c}, d={d}, a1={a1}, b1={b1}, c1={c1}, d1={d1}")

            if None in [a, b, c, d, a1, b1, c1, d1]:
                raise ValueError("One of the coordinates is None")

            cropped_image = srgb_image[min(a1, b1, c1, d1):max(a1, b1, c1, d1), min(a, b, c, d):max(a, b, c, d)]

            cropped_image_resized = np.expand_dims(np.array(Image.fromarray(cropped_image).resize((224, 224))), axis=0)

            prediction = model.predict(cropped_image_resized)
            predicted_class_index = np.argmax(prediction)
            predictions.append(int(predicted_class_index))

            unique_filename = f'{i}.png'
            full_save_path = os.path.join(BASE_DIR, save_folder, unique_filename)

            plt.imsave(full_save_path, cropped_image)
        except Exception as e:
            print(f"Error processing point {i}: {e}")
            predictions.append(None)

    return predictions

if __name__ == "__main__":
    locations = extract_locations()

    if locations:
        locations = np.array(locations)
        image_path1 = os.path.join(BASE_DIR, 'Parking_Lot_Image.jpg')
        save_folder = os.path.join(BASE_DIR, 'MySQL-Cut Parking Images')
        os.makedirs(save_folder, exist_ok=True)

        cut_point(image_path1, locations, save_folder=save_folder)
