from flask import Blueprint, jsonify, request
from models.db import db
from models.Categoria import Categoria
from utils.token_required import token_required

categoria = Blueprint('categoria', __name__, url_prefix='/api')

@categoria.route('/categorias')
@token_required(allowed_roles=['admin', 'mecanico'])  # ambos pueden ver
def get_categoria():
    categorias = Categoria.query.all()
    return jsonify([categoria.serialize() for categoria in categorias])


@categoria.route('/categoria', methods=['POST'])
@token_required(allowed_roles=['admin'])  # solo admin puede crear
def add_categoria():
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
        print(f"Error inesperado: {e}")  
        return jsonify({'error': 'Error al agregar el categoría'}), 500