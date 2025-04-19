from flask import Blueprint, request, jsonify
from models.Usuarios import Usuario
from models.db import db
from utils.jwt_manager import generate_token

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    rol = data.get('rol', 'mecanico')  # valor por defecto

    if not username or not password:
        return jsonify({'error': 'Faltan campos requeridos'}), 400

    if Usuario.query.filter_by(username=username).first():
        return jsonify({'error': 'El usuario ya existe'}), 400

    if rol not in ['admin', 'mecanico']:
        return jsonify({'error': 'Rol inválido'}), 400

    user = Usuario(username=username, rol=rol)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado correctamente', 'usuario': user.serialize()}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Datos incompletos'}), 400

    user = Usuario.query.filter_by(username=data['username']).first()

    if user and user.check_password(data['password']):
        token = generate_token(user.id, user.rol)
        return jsonify({
            'token': token,
            'rol': user.rol,
            'usuario': user.serialize()
        }), 200

    return jsonify({'error': 'Credenciales inválidas'}), 401

