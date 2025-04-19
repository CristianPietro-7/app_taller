from models.db import db


class Vehiculo(db.Model):
    __tablename__ = 'vehiculos'

    idVehiculo = db.Column(db.Integer, primary_key=True)
    patente = db.Column(db.String(25), unique=True, nullable=True)
    marca = db.Column(db.String(50))
    modelo = db.Column(db.String(50))
    year = db.Column(db.String(25))
    nro_chasis = db.Column(db.String(150))
    nro_motor = db.Column(db.String(150))

    # Clave Foránea: cada vehículo pertenece a una categoría
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.idCategoria'), nullable=False)

    def __init__(self, patente, marca, modelo, year, nro_chasis, nro_motor, categoria_id):
        self.patente = patente
        self.marca = marca
        self.modelo = modelo
        self.year = year
        self.nro_chasis = nro_chasis
        self.nro_motor = nro_motor
        self.categoria_id = categoria_id

    def serialize(self):
        return {
            'idVehiculo': self.idVehiculo,
            'patente': self.patente,
            'marca': self.marca,
            'modelo': self.modelo,
            'year': self.year,
            'nro_chasis': self.nro_chasis,
            'nro_motor': self.nro_motor,
            'categoria': self.categoria.name if self.categoria else None
        }

