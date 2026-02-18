import streamlit
import tensorflow
import PIL
import numpy
import huggingface_hub
import cv2
import matplotlib
import docx
import fastapi
import uvicorn
import multipart
import jinja2
import sys

def print_versions():
    packages = {
        "Streamlit": streamlit,
        "TensorFlow": tensorflow,
        "Pillow (PIL)": PIL,
        "NumPy": numpy,
        "Hugging Face Hub": huggingface_hub,
        "OpenCV (cv2)": cv2,
        "Matplotlib": matplotlib,
        "python-docx": docx,
        "FastAPI": fastapi,
        "Uvicorn": uvicorn,
        "python-multipart": multipart,
        "Jinja2": jinja2
    }
    
    print(f"Python version: {sys.version}")
    print("-" * 30)
    for name, pkg in packages.items():
        try:
            version = getattr(pkg, "__version__", "Version not found")
            print(f"{name:20}: {version}")
        except Exception as e:
            print(f"{name:20}: Error getting version - {e}")

if __name__ == "__main__":
    print_versions()
