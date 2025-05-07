# Model Maestro Craft 🎨🛠️

Model Maestro Craft is a full-stack web application that allows users to generate 3D models from images or text inputs using Python backend logic and a modern, responsive frontend built with React + Tailwind CSS.

## 🚀 Features

- 📷 Generate 3D models from image uploads or text prompts  
- 🧠 Uses AI/ML-based backend logic for model creation (`model_generation.py`)  
- 📦 Download models in `.obj` or `.stl` format  
- 🖥️ Clean UI with responsive design  
- ⚙️ Frontend built with React, Vite, TypeScript, and Tailwind CSS  
- 🔌 Backend powered by Python  

## 🏗️ Project Structure

```

model-maestro-craft/
├── public/
│   ├── python/
│   │   ├── model\_generation.py
│   │   └── requirements.txt
│   └── assets...
├── src/
│   ├── components/
│   ├── pages/
│   └── main.tsx
├── package.json
└── README.md

````

## 🧪 Getting Started

### Frontend

1. Install dependencies:

```bash
npm install
````

2. Run the development server:

```bash
npm run dev
```

### Backend (Python)

1. Navigate to the Python script directory:

```bash
cd public/python
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Run the backend script:

```bash
python model_generation.py
```

## 💡 Technologies Used

* React + Vite
* TypeScript
* Tailwind CSS
* Python 3
* (Optional) Flask/FastAPI for backend API
* 3D Libraries (like Trimesh, PyntCloud, etc.)

## 📁 Output Formats

* `.obj`
* `.stl`

## 🛠️ Future Improvements

* Add real-time 3D model preview
* Deploy backend with FastAPI/Flask
* Add support for more file formats
* Improve model generation logic using advanced AI models

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a PR for any improvements or bug fixes.

## 📬 Contact

- **Author:** Krish Garg 
- **GitHub:** [@KrishGarg001](https://github.com/KrishGarg001)  
- **Email:** zexuxkrish123@gmail.com  
