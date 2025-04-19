from models.db import db

class Reparacion(db.Model):
    __tablename__ = 'reparacion'

    idReparacion = db.Column(db.Integer, primary_key=True)
    estado = db.Column(db.String(25), nullable=True)
    descripcion = db.Column(db.String(255))

    # Claves foráneas
    idVehiculo = db.Column(db.Integer, db.ForeignKey('vehiculos.idVehiculo'), nullable=False)
    idMecanico = db.Column(db.Integer, db.ForeignKey('mecanicos.idMecanico'), nullable=False)

    def __init__(self, estado, descripcion, idVehiculo, idMecanico):
        self.estado = estado
        self.descripcion = descripcion
        self.idVehiculo = idVehiculo
        self.idMecanico = idMecanico

    def serialize(self):
        return {
            'idReparacion': self.idReparacion,
            'estado': self.estado,
            'descripcion': self.descripcion,
            'vehiculo': {
                'idVehiculo': self.vehiculo.idVehiculo,
                'patente': self.vehiculo.patente,
                'marca': self.vehiculo.marca,
                'modelo': self.vehiculo.modelo
            } if self.vehiculo else None,
            'mecanico': {
                'idMecanico': self.mecanico.idMecanico,
                'nombre': self.mecanico.nombre,
                'apellido': self.mecanico.apellido
            } if self.mecanico else None
        }

