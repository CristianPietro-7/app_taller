from flask import Flask
from config.config import DATABASE_CONNECTION_URI
from flask_cors import CORS
from models.db import db
from routes.vehiculo_routes import vehiculo
from routes.categoria_routes import categoria
from routes.auth_routes import auth_bp
from routes.reparacion_routes import reparaciones
from routes.mecanico_routes import mecanicos


app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"]= DATABASE_CONNECTION_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JSON_SORT_KEYS'] = False

db.init_app(app)

app.register_blueprint(vehiculo)
app.register_blueprint(categoria)
app.register_blueprint(auth_bp)
app.register_blueprint(reparaciones)
app.register_blueprint(mecanicos)


with app.app_context():
    from models.Vehiculo import Vehiculo
    from models.Categoria import Categoria
    from models.Usuarios import Usuario
    from models.Mecanicos import Mecanicos
    from models.Reparacion import Reparacion
    db.drop_all()
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)