from flask import Blueprint, request, jsonify
from models.db import db
from models.Reparacion import Reparacion
from models.Mecanicos import Mecanicos
from models.Vehiculo import Vehiculo  # Asegurate de tener este modelo

from datetime import datetime

reparaciones = Blueprint('reparaciones_bp', __name__, url_prefix='/api')

@reparaciones.route('/reparaciones')
def get_categoria():
    reparaciones = Reparacion.query.all()
    return jsonify([reparacion.serialize() for reparacion in reparaciones])

@reparaciones.route('/reparaciones', methods=['POST'])
def crear_reparacion():
    data = request.get_json()

    estado = data.get('estado')
    descripcion = data.get('descripcion')
    idVehiculo = data.get('idVehiculo')
    idMecanico = data.get('idMecanico')

    # Validaciones básicas
    if not all([estado, descripcion, idVehiculo, idMecanico]):
        return jsonify({'error': 'Faltan datos obligatorios'}), 400

    # Verificamos si existen el vehículo y el mecánico
    vehiculo = Vehiculo.query.get(idVehiculo)
    mecanico = Mecanicos.query.get(idMecanico)

    if not vehiculo:
        return jsonify({'error': 'Vehículo no encontrado'}), 404

    if not mecanico:
        return jsonify({'error': 'Mecánico no encontrado'}), 404

    # Creamos la reparación
    new_reparacion = Reparacion(
        estado=estado,
        descripcion=descripcion,
        idVehiculo=idVehiculo,
        idMecanico=idMecanico
    )

    db.session.add(new_reparacion)
    db.session.commit()

    return jsonify({'mensaje': 'Reparación creada correctamente', 'reparacion': new_reparacion.serialize()}), 201
