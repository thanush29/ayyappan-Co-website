import shutil
import os

source = r'C:\Users\asus\.gemini\antigravity\brain\9da20168-9e38-44ee-bb7c-4f0b3dbb5968\founder_bright_nobg_1765235489655.png'
dest = r'c:\Users\asus\Documents\GitHub\Electric-site\src\assets\founder_bright.png'

print(f"Source exists: {os.path.exists(source)}")
print(f"Source size: {os.path.getsize(source) if os.path.exists(source) else 'N/A'}")

try:
    shutil.copy2(source, dest)
    print(f"Copied successfully!")
    print(f"Dest exists: {os.path.exists(dest)}")
    print(f"Dest size: {os.path.getsize(dest) if os.path.exists(dest) else 'N/A'}")
except Exception as e:
    print(f"Error: {e}")
