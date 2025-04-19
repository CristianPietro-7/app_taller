from models.db import db


class Mecanicos(db.Model):
    __tablename__ = 'mecanicos'

    idMecanico = db.Column(db.Integer, primary_key=True)
    dni = db.Column(db.String(25), unique=True, nullable=True)
    nombre = db.Column(db.String(50))
    apellido = db.Column(db.String(50))
    telefono = db.Column(db.String(25))
    email = db.Column(db.String(150), unique=True, nullable=True)
    especilidad = db.Column(db.String(150))
    fecha_nac = db.Column(db.Date) 

     # Relación inversa
    reparaciones = db.relationship('Reparacion', backref='mecanico', lazy=True)

    def __init__(self, dni, nombre, apellido, telefono, email, especilidad, fecha_nac):
        self.dni = dni
        self.nombre = nombre
        self.apellido = apellido
        self.telefono = telefono
        self.email = email
        self.especilidad = especilidad
        self.fecha_nac = fecha_nac

    def serialize(self):
        return {
            'idMecanico': self.idMecanico,
            'dni': self.dni,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'telefono': self.telefono,
            'email': self.email,
            'especilidad': self.especilidad,
            'fecha_nac': self.fecha_nac.strftime('%Y-%m-%d') if self.fecha_nac else None
        }