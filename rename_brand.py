import os
import re

def replace_in_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Define replacements for different casings
        replacements = [
            (re.compile(re.escape('AutoStack'), re.IGNORECASE), 'Aethera'),
            (re.compile(re.escape('autostack'), re.IGNORECASE), 'aethera'),
            (re.compile(re.escape('AUTOSTACK')), 'AETHERA')
        ]
        
        # Simplest is just case-insensitive replace to 'Aethera' if it's the brand name
        # But let's try to be a bit more nuanced.
        # Actually, 'Aethera' is the preferred casing from the user.
        
        new_content = content
        new_content = re.sub('AutoStack', 'Aethera', new_content)
        new_content = re.sub('autostack', 'aethera', new_content)
        new_content = re.sub('AUTOSTACK', 'AETHERA', new_content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    root_dir = r"C:\Users\DELL\Documents\N.Startup"
    extensions = {'.html', '.js', '.css', '.sql', '.md'}
    
    for root, dirs, files in os.walk(root_dir):
        # Skip .git directory
        if '.git' in dirs:
            dirs.remove('.git')
        
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                replace_in_file(file_path)

if __name__ == "__main__":
    main()
