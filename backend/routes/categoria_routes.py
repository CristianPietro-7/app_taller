from flask import Blueprint, jsonify, request
from models.db import db
from models.Categoria import Categoria
categoria = Blueprint('categoria', __name__)

@categoria.route('/api/categorias')
def get_categoria():
    categorias = Categoria.query.all()
    return jsonify([categoria.serialize() for categoria in categorias])

@categoria.route('/api/categoria', methods=['POST'])
def add_client():
    data = request.get_json()
    
    if not data or not all(key in data for key in ['name', 'descripcion']):
        return jsonify({'error': 'Faltan datos requeridos'}), 400

    try:

        new_categoria = Categoria(data['name'], data['descripcion'])
        print(f"Creando categoría: {new_categoria.name}, {new_categoria.descripcion}")

        db.session.add(new_categoria)
        db.session.commit()

        return jsonify({'message': 'Categoría agregado exitosamente', 'categoria': new_categoria.serialize()}), 201


    except Exception as e:
        db.session.rollback()
        print(f"Error inesperado: {e}")  # Ver el error en la terminal
        return jsonify({'error': 'Error al agregar el categoría'}), 500