from models.db import db

class Categoria(db.Model):
    __tablename__ = 'categorias'

    idCategoria = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), unique=True, nullable=True)
    descripcion = db.Column(db.String(255))

    #Relaciòn: una categorìa tiene muchos vehículos
    vehiculos = db.relationship('Vehiculo', backref='categoria', lazy=True)

    def __init__(self, name, descripcion):
        self.name = name
        self.descripcion = descripcion

    def serialize(self):
        return {
            'idCategoria': self.idCategoria,
            'name': self.name,
            'descripcion': self.descripcion
        }
