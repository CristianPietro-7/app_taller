import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "key_secreta"

def generate_token(user_id, rol):
    payload = {
        'user_id': user_id,
        'rol': rol,
        'exp': datetime.now(timezone.utc) + timedelta(hours=2)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
