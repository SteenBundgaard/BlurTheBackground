import os
import tensorflow as tf
import argparse
import cv2
import numpy as np
import logging;
from PIL import Image
import get_dataset_colormap
from skimage import data, color, io, img_as_ubyte
import numpy as np
from scipy import fftpack
from scipy import signal
from scipy.ndimage.filters import gaussian_filter

INPUT_SIZE = 513
INPUT_TENSOR = 'ImageTensor:0'
OUTPUT_TENSOR = 'SemanticPredictions:0'

logging.basicConfig(format='%(asctime)s %(message)s', level=logging.INFO)
  
def load_pb(path_to_pb):
    with tf.gfile.GFile(path_to_pb, "rb") as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
    with tf.Graph().as_default() as graph:
        tf.import_graph_def(graph_def, name='')
        return graph
        
def fit(path_to_pb, path_to_image, downscale):
    if os.path.exists('final.jpg'):
        os.remove('final.jpg')
    graph = load_pb(path_to_pb)
    logging.info('step 1')
    seg_map, image = fit_to_model(graph, path_to_image)
    seg_map = cv2.resize(seg_map, image.shape[:2][::-1], interpolation =cv2.INTER_NEAREST)
    logging.info('step 2')
   
    # Only keep the person class
    seg_map = np.where(seg_map == 15, seg_map, 0)  
    # Output: RGB image resized from original input image, segmentation map of resized image 
    # color of mask
    seg_image = get_dataset_colormap.label_to_color_image(
        seg_map, get_dataset_colormap.get_pascal_name()).astype(np.uint8)
 
    seg_image_mono = (seg_image[:,:,0]+seg_image[:,:,1]+seg_image[:,:,2]).astype(np.uint8)   
    background = greyscales_2_color((np.where(seg_image_mono == 0, image[:,:,0], 0), np.where(seg_image_mono == 0, image[:,:,1], 0), np.where(seg_image_mono == 0, image[:,:,2], 0)))
    # io.imsave('background.jpg', img_as_ubyte(background))
    foreground = greyscales_2_color((np.where(seg_image_mono > 0, image[:,:,0], 0), np.where(seg_image_mono > 0, image[:,:,1], 0), np.where(seg_image_mono > 0, image[:,:,2], 0)))
    # io.imsave('foreground.jpg', img_as_ubyte(foreground))
    logging.info('step 3')
   
    background, mask = inpaint_foreground(seg_image_mono, background)
    # io.imsave('replaced.jpg', img_as_ubyte(background))   
    background = [blur_background2(background[:,:,0]),blur_background2(background[:,:,1]),blur_background2(background[:,:,2])]      
    background = np.round(greyscales_2_color(background)).astype(int)
    logging.info('step 4')
   
    # bounding_boxes = find_bounding_boxes(seg_image)
    # for box in bounding_boxes:
    #     crop = background[box[0]:box[2]][box[1]:box[3]][:]

    # io.imsave('blurred.jpg', img_as_ubyte(background))
    mask = gaussian_filter(mask, sigma=3)
    mask = mask.astype(np.float32)/255
    mask = mask[:,:,np.newaxis]
    mask = cv2.cvtColor(mask,cv2.COLOR_GRAY2RGB)
    # io.imsave('mask.jpg', img_as_ubyte(mask))
    logging.info('step 5')
   
    # Multiply the foreground with the alpha matte
    foreground = cv2.multiply(mask, image.astype(np.float32)/255.0)
 
    # Multiply the background with ( 1 - alpha )
    background = cv2.multiply(1.0 - mask, background.astype(np.float32)/255.0)
    logging.info('step 6')
   
    # Add the masked foreground and background
    final = cv2.add(foreground, background)
    final = final / np.max(final)
    if (downscale):
        final = resize_image(img_as_ubyte(final), INPUT_SIZE)
    #final = np.where(seg_image > 0, cv2_image, background)
    io.imsave('final.jpg', img_as_ubyte(final), quality=95)
    logging.info('step 7')   

def greyscales_2_color(greyscales):
    return np.concatenate([a[:,:,np.newaxis] for a in greyscales], axis=2)

def inpaint_foreground(mask, background):
    (t, binary_mask) = cv2.threshold(mask, 0, 255, cv2.THRESH_BINARY)  
    # kernel = np.ones((15, 15), dtype=np.int32)
    # modified_mask = np.copy(binary_mask)
    # modified_mask[np.where(cv2.filter2D(modified_mask / 255, -1, kernel) == 15 * 15)] = 0
    resized_background = resize_image_cv2(background, 1500)
    resized_mask = resize_image_cv2(binary_mask, 1500)
    inpainted = cv2.inpaint(resized_background,resized_mask, 10, cv2.INPAINT_NS)
    inpainted = cv2.resize(inpainted, background.shape[:2][::-1], interpolation =cv2.INTER_NEAREST)
    return inpainted, binary_mask
  

def replace_foreground(background, foreground_indicies, background_indicies):
    for index in foreground_indicies:
         distances = ([i[0] for i in background_indicies] - index[0]) ** 2 + ([i[1] for i in background_indicies] - index[1]) ** 2
         nearest_index = np.argmin(distances)
         background[index] = background[background_indicies[nearest_index]]
   

def blur_background(image):
    # First a 1-D  Gaussian
    t = np.linspace(-10, 10, 30)
    bump = np.exp(-0.1*t**2)
    bump /= np.trapz(bump) # normalize the integral to 1
    # make a 2-D kernel out of it
    conv_kernel = bump[:, np.newaxis] * bump[np.newaxis, :]
    return signal.convolve2d(image, conv_kernel,boundary='symm', mode='same')

def blur_background2(image):
    return gaussian_filter(image, sigma=14) # to be configurable
    #return cv2.blur(image,(25,25))

def fit_to_model(graph, path_to_image):
    sess = tf.Session(graph=graph)
    io_image = io.imread(path_to_image) # /255.0 # cv2.imread(path_to_image)
    resized_im = resize_image(io_image, INPUT_SIZE)
    # model
    batch_seg_map = sess.run(
        OUTPUT_TENSOR,
        feed_dict={INPUT_TENSOR: [np.asarray(resized_im)]})
    seg_map = batch_seg_map[0]
    return seg_map, io_image

def resize_image_cv2(cv2_image, size):
    width, height = cv2_image.shape[:2]
    resize_ratio = 1.0 * size / max(width, height)
    target_size = (int(resize_ratio * width), int(resize_ratio * height))
    resized = cv2.resize(cv2_image, target_size, interpolation =cv2.INTER_NEAREST)
    return resized

def resize_image(io_image, size):
    image = Image.fromarray(io_image)        
    width, height = image.size
    resize_ratio = 1.0 * size / max(width, height)
    target_size = (int(resize_ratio * width), int(resize_ratio * height))
    resized_im = image.convert('RGB').resize(target_size, Image.ANTIALIAS)
    return resized_im

def find_bounding_boxes(image):
    gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    contours, hierarchy = cv2.findContours(gray,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    bounding_boxes = []
    for i in range(0, len(contours) - 1):
        if hierarchy[0][i][3] == -1:
            cnt = contours[i]
            x,y,w,h = cv2.boundingRect(cnt)
            bounding_boxes.append((x,y,w,h))
           # roi=image[y:y+h,x:x+w]
           # cv2.imwrite(str(i) + '.jpg', roi)
    return bounding_boxes

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', type=str, nargs=1)
    parser.add_argument('--image', type=str, nargs=1)
    args = parser.parse_args()
    fit(args.model[0], args.image[0], False)
