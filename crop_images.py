from PIL import Image
import os

base_path = r'C:/Users/asus/.gemini/antigravity/brain/9da20168-9e38-44ee-bb7c-4f0b3dbb5968'
dest_path = r'src/assets'

def crop_save(img_name, coords, save_name):
    try:
        img_path = os.path.join(base_path, img_name)
        if not os.path.exists(img_path):
             print(f"File not found: {img_path}")
             return
        img = Image.open(img_path)
        # Verify mode
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
            
        img.crop(coords).save(os.path.join(dest_path, save_name))
        print(f"Saved {save_name}")
    except Exception as e:
        print(f"Error saving {save_name}: {e}")

# Founder from uploaded_image_4 
# Adjusting coords based on typical layout. The previous guess might be ok but let's be generous.
# Image 4 is likely the team one.
crop_save('uploaded_image_4_1765221159781.png', (100, 80, 500, 615), 'founder_ayyapan.png')

# CEO from uploaded_image_4
crop_save('uploaded_image_4_1765221159781.png', (530, 80, 930, 615), 'ceo_mariyappan.png')

# Testing & Commissioning Service image
crop_save('uploaded_image_0_1765221159781.png', (485, 190, 860, 890), 'testing_service.png')

# Permits & Approvals Service image
crop_save('uploaded_image_1_1765221159781.png', (90, 265, 490, 815), 'permits_approval.png')

# O&M Service image
crop_save('uploaded_image_2_1765221159781.png', (550, 160, 930, 930), 'om_service.png')
