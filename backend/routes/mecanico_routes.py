from flask import Blueprint, request, jsonify
from models.db import db
from models.Mecanicos import Mecanicos
from datetime import datetime
from email_validator import validate_email, EmailNotValidError

mecanicos = Blueprint('mecanicos', __name__, url_prefix='/api')

@mecanicos.route('/mecanicos', methods=['GET'])
def listar_mecanicos():
    mecanicos = Mecanicos.query.all()
    return jsonify([m.serialize() for m in mecanicos]), 200


@mecanicos.route('/mecanicos', methods=['POST'])
def crear_mecanico():
    data = request.get_json()

    dni = data.get('dni')
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    telefono = data.get('telefono')
    email = data.get('email')
    especialidad = data.get('especialidad')
    fecha_nac_str = data.get('fecha_nac')  # "YYYY-MM-DD"

    # Validación de campos requeridos
    if not all([dni, nombre, apellido, telefono, email, especialidad, fecha_nac_str]):
        return jsonify({'error': 'Faltan datos obligatorios'}), 400

    # Validación de formato de email
    try:
        validate_email(email)
    except EmailNotValidError:
        return jsonify({'error': 'Formato de email inválido'}), 400

    # Verificamos si el DNI ya está registrado
    if Mecanicos.query.filter_by(dni=dni).first():
        return jsonify({'error': 'El DNI ya está registrado'}), 400

    # Verificamos si el email ya está registrado
    if Mecanicos.query.filter_by(email=email).first():
        return jsonify({'error': 'El email ya está registrado'}), 400

    # Conversión de fecha de nacimiento
    try:
        fecha_nac = datetime.strptime(fecha_nac_str, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({'error': 'Formato de fecha inválido. Usa YYYY-MM-DD'}), 400

    # Crear el nuevo mecánico
    new_mecanico = Mecanicos(
        dni=dni,
        nombre=nombre,
        apellido=apellido,
        telefono=telefono,
        email=email,
        especilidad=especialidad,
        fecha_nac=fecha_nac
    )

    db.session.add(new_mecanico)
    db.session.commit()

    return jsonify({
        'mensaje': 'Mecánico creado correctamente',
        'mecanico': new_mecanico.serialize()
    }), 201

@mecanicos.route('/mecanicos/<int:id>', methods=['GET'])
def obtener_mecanico(id):
    mecanico = Mecanicos.query.get(id)

    if not mecanico:
        return jsonify({'error': 'Mecánico no encontrado'}), 404

    return jsonify(mecanico.serialize()), 200
