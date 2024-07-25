
import matplotlib.pyplot as plt
import numpy as np
import os
import time
import cv2
from PIL import Image as im
import Mysql_Location_Extraction
import Cut_Images_To_Predictions
# from mysqlconactor import inserttosql

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
print(f"BASE_DIR: {BASE_DIR}")
print("Current working directory:", os.getcwd())

# Define the path to the image relative to the location of this script
image_path = os.path.join(BASE_DIR, 'Parking_Lot_Image.jpg')
print("Image path:", os.path.abspath(image_path))


# A function that resizes images to equal dimensions
def resize_image(image, width=224, height=224):
    if width is None and height is None:
        return image
    elif width is None:
        ratio = height / float(image.shape[0])
        dimensions = (int(image.shape[1] * ratio), height)
    elif height is None:
        ratio = width / float(image.shape[1])
        dimensions = (width, int(image.shape[0] * ratio))
    else:
        dimensions = (width, height)

    resized_image = cv2.resize(image, dimensions, interpolation=cv2.INTER_AREA)
    return resized_image

# This function takes an image array (image_array) and performs image processing on it.
def send_result(image_array):
    processed_image = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)
    _, processed_image = cv2.threshold(processed_image, 127, 255, cv2.THRESH_BINARY)
    return processed_image

# This function receives an input folder (input_folder) in which there are images and an output folder (output_folder) to save the processed images.
def prepare_images(input_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for root, _, files in os.walk(input_folder):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                input_path = os.path.join(root, file)
                output_path = os.path.join(output_folder, os.path.relpath(root, input_folder), file)

                # Create output directory if it doesn't exist
                os.makedirs(os.path.dirname(output_path), exist_ok=True)

                # Open the image
                with im.open(input_path) as img:
                    if img.mode == 'P' or img.mode == 'RGBA':
                        img = img.convert('RGB')

                    img_array = np.array(img)

                    # Resize the image
                    img_array_resized = resize_image(img_array)

                    # Apply custom processing to the image
                    result = im.fromarray(img_array_resized.astype('uint8'))

                    # Save the processed image
                    result.save(output_path)

def sketch_axes(image):
    fig, ax = plt.subplots()
    ax.imshow(image)
    ax.set_title("Sketch axes on the image (press 'q' to finish)")

    # Initialize list to store drawn lines
    drawn_lines = []

    # Function to handle mouse click events
    def on_click(event):
        if event.button == 1:
            x, y = event.xdata, event.ydata
            if x is not None and y is not None:
                # Append the clicked point to the drawn lines list
                drawn_lines.append((x, y))

                # Draw the lines on the plot
                ax.plot(*zip(*drawn_lines), color='red', marker='o')
                plt.draw()

    # Connect the event handler function
    fig.canvas.mpl_connect('button_press_event', on_click)

    # Wait for the user to sketch the axes
    plt.show()

    # Close the figure to prevent it from being displayed again
    plt.close()
    occupancy_status = 1
    lot_number = 0

    # Crop the image using the drawn lines
    if len(drawn_lines) >= 4:  # Ensure at least 4 points are drawn for a rectangle
        # Convert drawn lines to a numpy array
        drawn_lines = np.array(drawn_lines)
        print(drawn_lines)
        # image_path = os.path.join(BASE_DIR, 'Codes', 'Parking_Lot_Image.jpg')
        image_path = os.path.join(BASE_DIR, 'Parking_Lot_Image.jpg')
        # cropbypoint.crop_and_display(image_path,drawn_lines)

        # Find minimum and maximum x and y coordinates
        min_x, min_y = np.min(drawn_lines, axis=0)
        max_x, max_y = np.max(drawn_lines, axis=0)
        # inserttosql(lot_number, drawn_lines, occupancy_status, image_path)
        # Crop the image using the bounding box of the drawn lines
        cropped_image = image[int(min_y):int(max_y), int(min_x):int(max_x)]

        # Show the cropped image
        plt.imshow(cropped_image)
        plt.title("Cropped Image")
        # plt.show()

        resized_cropped_image = resize_image(cropped_image)

        # Show the resized image
        plt.imshow(resized_cropped_image)
        plt.title("Resized Cropped Image")
        # plt.show()

        # Generate a unique filename based on current timestamp for the resized image
        timestamp = int(time.time())
        resized_save_path = os.path.join(BASE_DIR, 'Resize_Images_Cars_From_DataPraparationCode', f'resized_cropped_image_{timestamp}.jpg')

        # Save the resized image
        os.makedirs(os.path.dirname(resized_save_path), exist_ok=True)  # Create directory if it doesn't exist
        plt.imsave(resized_save_path, resized_cropped_image)
        print(f"Resized cropped image saved at {resized_save_path}")

    else:
        print("Insufficient points to crop the image.")
        cropped_image = None

    return drawn_lines, cropped_image

def load_image(image_path):
    try:
        return plt.imread(image_path)
    except FileNotFoundError as e:
        print(f"Error loading image: {e}")
        return None

def main():
    input_folder = os.path.join(BASE_DIR, 'input_folder')
    output_folder = os.path.join(BASE_DIR, 'output')

    prepare_images(input_folder, output_folder)

    image_path = os.path.join(BASE_DIR, 'Parking_Lot_Image.jpg')

    if not os.path.exists(image_path):
        print(f"Image file not found at {image_path}")
        return

    image = load_image(image_path)

    if image is not None:
        sketched_lines, cropped_image = sketch_axes(image)
        csv_filename = "sketched_lines.csv"
        print(f"Sketched lines appended to {csv_filename}")
    else:
        print("Skipping image due to loading error.")

def crop_image(image_path, drawn_lines):
    """
    Crop the image using the four points specified by the drawn lines.

    Args:
        image (numpy.ndarray): The input image.
        drawn_lines (list): List of four points represented as tuples (x, y).

    Returns:
        numpy.ndarray: The cropped image.
    """
    if len(drawn_lines) != 4:
        print("Error: drawn lines should contain four points.")
        return None

    # Convert drawn lines to a numpy array
    drawn_lines = np.array(drawn_lines)

    # Find minimum and maximum x and y coordinates
    min_x, min_y = np.min(drawn_lines, axis=0)
    max_x, max_y = np.max(drawn_lines, axis=0)

    # Crop the image using the bounding box of the drawn lines
    cropped_image = image[int(min_y):int(max_y), int(min_x):int(max_x)]

    return cropped_image

if __name__ == "__main__":
    main()
