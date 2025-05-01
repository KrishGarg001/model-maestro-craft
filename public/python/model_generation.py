import os
import numpy as np
import base64
import json
from PIL import Image
import io
import trimesh
from trimesh.exchange.obj import export_obj
from trimesh.exchange.stl import export_stl
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

class Model3DGenerator:
    def __init__(self):
        print("Model3DGenerator initialized")
        
    def preprocess_image(self, image_path):
        try:
            img = Image.open(image_path)
            print(f"Image {image_path} preprocessed successfully")
            return img
        except Exception as e:
            print(f"Error preprocessing image: {e}")
            raise
    
    def generate_from_text(self, text_prompt):
        try:
            print(f"Generating 3D model from text: '{text_prompt}'")
            if "car" in text_prompt.lower():
                mesh = self._create_car_mesh()
            elif "chair" in text_prompt.lower():
                mesh = self._create_chair_mesh()
            else:
                mesh = trimesh.creation.icosphere(subdivisions=2)
            
            return mesh
        except Exception as e:
            print(f"Error generating model from text: {e}")
            raise
    
    def generate_from_image(self, image_path):
        try:
            processed_image = self.preprocess_image(image_path)
            print(f"Generating 3D model from image: {image_path}")
            mesh = trimesh.creation.box(extents=[1, 1, 1])
            return mesh
        except Exception as e:
            print(f"Error generating model from image: {e}")
            raise
    
    def _create_car_mesh(self):
        body = trimesh.creation.box(extents=[2, 1, 0.5])
        body.apply_translation([0, 0, 0.5])
        wheel_radius = 0.2
        wheel_height = 0.1
        wheel_positions = [
            [0.5, 0.6, wheel_radius],
            [0.5, -0.6, wheel_radius],
            [-0.5, 0.6, wheel_radius],
            [-0.5, -0.6, wheel_radius]
        ]
        wheels = []
        for position in wheel_positions:
            wheel = trimesh.creation.cylinder(radius=wheel_radius, height=wheel_height)
            wheel.apply_translation(position)
            wheels.append(wheel)
        car = trimesh.util.concatenate([body] + wheels)
        return car
    
    def _create_chair_mesh(self):
        seat = trimesh.creation.box(extents=[1, 1, 0.1])
        seat.apply_translation([0, 0, 0.5])
        backrest = trimesh.creation.box(extents=[1, 0.1, 1])
        backrest.apply_translation([0, -0.45, 1])
        leg_height = 0.5
        leg_width = 0.1
        leg_positions = [
            [0.4, 0.4, leg_height/2],
            [0.4, -0.4, leg_height/2],
            [-0.4, 0.4, leg_height/2],
            [-0.4, -0.4, leg_height/2]
        ]
        legs = []
        for position in leg_positions:
            leg = trimesh.creation.box(extents=[leg_width, leg_width, leg_height])
            leg.apply_translation(position)
            legs.append(leg)
        chair = trimesh.util.concatenate([seat, backrest] + legs)
        return chair
    
    def save_model(self, mesh, output_path, file_format='obj'):
        try:
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            if file_format.lower() == 'obj':
                mesh.export(output_path, file_type='obj')
            elif file_format.lower() == 'stl':
                mesh.export(output_path, file_type='stl')
            else:
                raise ValueError(f"Unsupported file format: {file_format}")
            print(f"Model saved as {output_path}")
        except Exception as e:
            print(f"Error saving model: {e}")
            raise
    
    def visualize_model(self, mesh, save_path=None):
        try:
            vertices = mesh.vertices
            faces = mesh.faces
            fig = plt.figure(figsize=(10, 10))
            ax = fig.add_subplot(111, projection='3d')
            ax.plot_trisurf(vertices[:, 0], vertices[:, 1], vertices[:, 2],
                            triangles=faces, cmap='viridis', alpha=0.7)
            ax.set_box_aspect([1, 1, 1])
            ax.set_axis_off()
            if save_path:
                plt.savefig(save_path, bbox_inches='tight')
                print(f"Visualization saved to {save_path}")
            plt.close()
            return save_path
        except Exception as e:
            print(f"Error visualizing model: {e}")
            raise


def process_request(request_data):
    try:
        generator = Model3DGenerator()
        input_type = request_data.get('type')
        if input_type == 'text':
            text_prompt = request_data.get('data')
            mesh = generator.generate_from_text(text_prompt)
        elif input_type == 'image':
            image_path = request_data.get('image_path')  
            mesh = generator.generate_from_image(image_path)
        else:
            return {'status': 'error', 'error': 'Invalid input type'}
        import uuid
        unique_id = str(uuid.uuid4())
        obj_path = f"output/{unique_id}.obj"
        stl_path = f"output/{unique_id}.stl"
        preview_path = f"output/{unique_id}_preview.png"
        generator.save_model(mesh, obj_path, file_format='obj')
        generator.save_model(mesh, stl_path, file_format='stl')
        generator.visualize_model(mesh, save_path=preview_path)
        return {
            'status': 'success',
            'obj_url': obj_path,
            'stl_url': stl_path,
            'preview_url': preview_path
        }
    except Exception as e:
        print(f"Error processing request: {e}")
        return {'status': 'error', 'error': str(e)}

if __name__ == "__main__":
    text_request = {
        'type': 'text',
        'data': 'a small toy car'
    }
    
    text_response = process_request(text_request)
    print(f"Text response: {text_response}")
    image_request = {
        'type': 'image',
        'image_path': 'examples/chair.jpg'  
    }
    image_response = process_request(image_request)
    print(f"Image response: {image_response}")
