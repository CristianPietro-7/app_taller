from flask import Flask
from config.config import DATABASE_CONNECTION_URI
from flask_cors import CORS
from models.db import db
from routes.vehiculo_routes import vehiculo
from routes.categoria_routes import categoria


app = Flask(__name__)

CORS(app)

app.register_blueprint(vehiculo)
app.register_blueprint(categoria)


app.config["SQLALCHEMY_DATABASE_URI"]= DATABASE_CONNECTION_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    from models.Vehiculo import Vehiculo
    from models.Categoria import Categoria
    # db.drop_all()
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)