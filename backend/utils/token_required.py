from flask import request, jsonify
from functools import wraps
from utils.jwt_manager import verify_token
from models.Usuarios import Usuario

def token_required(allowed_roles=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            if 'Authorization' in request.headers:
                auth_header = request.headers['Authorization']
                if auth_header.startswith('Bearer '):
                    token = auth_header[7:]

            if not token:
                return jsonify({'error': 'Token faltante'}), 401

            data = verify_token(token)
            if not data:
                return jsonify({'error': 'Token inválido o expirado'}), 401

            user = Usuario.query.get(data['user_id'])
            if not user:
                return jsonify({'error': 'Usuario no encontrado'}), 404

            if allowed_roles and user.rol not in allowed_roles:
                return jsonify({'error': 'Acceso denegado, rol insuficiente'}), 403

            request.user = user
            return f(*args, **kwargs)
        return decorated
    return decorator
