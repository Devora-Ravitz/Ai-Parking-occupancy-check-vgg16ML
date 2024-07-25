
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from matplotlib.image import imread as mpimg_read
from PIL import Image
import os
from pathlib import Path


# Keras function to augment the image
image_gen = ImageDataGenerator(rotation_range=30,
                               width_shift_range=0.1,
                               height_shift_range=0.1,
                               shear_range=0.15,
                               zoom_range=[0.9, 1.1],
                               horizontal_flip=True,
                               vertical_flip=False,
                               fill_mode='reflect',
                               data_format='channels_last',
                               brightness_range=[0.5, 1.5])

img_path = r"F:\ללי שנה ב\פרויקטים ללי\Project-Bina\python\data\train\Empty parking lots\‏‏‏‏resized_cropped_image_1712075347 - עותק - עותק.jpg"

my_file = Path(img_path)
if my_file.is_file():
    print('OK')
else:
    print('No image')

# Obtain image from disk : mpimg_read()
# Make the image dimensions for use with our code : np.expand_dims()
img = np.expand_dims(mpimg_read(img_path), 0)

# Resize the image to 224x224
img = Image.fromarray(img[0])
img = img.resize((224, 224))

# Plot the resized image
plt.imshow(img)
plt.axis('off')
plt.show()

# Create a directory to save augmented images
save_dir = "augmented_images_resized"
os.makedirs(save_dir, exist_ok=True)

# Get 9 samples of augmented images, resize them to 224x224, and save them
for i in range(9):
    # Generate a batch of augmented images from the original image
    aug_iter = image_gen.flow(np.expand_dims(np.array(img), 0), batch_size=1)
    aug_image = next(aug_iter)[0].astype(np.uint8)

    # Resize the augmented image to 224x224
    aug_image = Image.fromarray(aug_image).resize((224, 224))

    # Save the augmented image to disk
    aug_image.save(os.path.join(save_dir, f"augmented_image_{i + 1}.jpg"))

    # Plot and display the augmented image
    plt.imshow(aug_image)
    plt.axis('off')
    plt.show()
