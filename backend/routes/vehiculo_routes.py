from flask import Blueprint, jsonify, request
from models.db import db
from models.Vehiculo import Vehiculo

vehiculo = Blueprint('vehiculo', __name__)

@vehiculo.route('/api/vehiculo')
def get_vehiculos():
    vehiculos = Vehiculo.query.all()
    return jsonify([vehiculo.serialize() for vehiculo in vehiculos])

@vehiculo.route('/api/vehiculo', methods=['POST'])
def add_vehiculo():
    data = request.get_json()

    if not data or not all(key in data for key in ['patente', 'marca', 'modelo', 'year', 'nro_chasis', 'nro_motor', 'categoria_id']):
        return jsonify({'error': 'Faltan datos requeridos'}), 400
        
    try:
        new_vehiculo = Vehiculo(data['patente'],data['marca'],data['modelo'],data['year'],data['nro_chasis'],data['nro_motor'],data['categoria_id'],)

        db.session.add(new_vehiculo)
        db.session.commit()

        return jsonify({'message': 'Vehiculo agregado exitosamente', 'vehiculo': new_vehiculo.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error inesperado: {e}")  # Ver el error en la terminal
        return jsonify({'error': 'Error al agregar el vehiculo'}), 500
    
@vehiculo.route('/api/vehiculo/<int:id>', methods=['DELETE'])
def del_vehiculo(id):
    vehiculo = Vehiculo.query.get(id)

    if not vehiculo:
        return jsonify({'message':'Vehículo no encontrado'}), 404 
    
    try:
        db.session.delete(vehiculo)
        db.session.commit()
        return jsonify({'message': 'Vehículo eliminado exitosamente!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error':str(e)}), 500
