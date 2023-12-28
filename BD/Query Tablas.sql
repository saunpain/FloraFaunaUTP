CREATE TABLE Estudiante(

	id_estudiante INT AUTO_INCREMENT PRIMARY KEY NOT null,
	nombre_estudiante VARCHAR(255) NOT null,
	correo_estudiante VARCHAR(255) NOT null,
	contraseña_estudiante VARCHAR(255) NOT null,
	perfil_estudiante VARCHAR(255)
);


CREATE TABLE Solicitud(

	id_solicitud INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	formulario VARCHAR(255),
	estado VARCHAR(255)
);


CREATE TABLE Publicaciones(

	id_publicacion INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	titulo VARCHAR(255),
	lugar VARCHAR(255),
	fecha_publicacion DATE,
	id_flora INT,
	FOREIGN KEY (id_flora) REFERENCES Flora(id_flora),
	id_fauna INT,
	FOREIGN KEY (id_fauna) REFERENCES Fauna(id_fauna)
);


CREATE TABLE Comentario(
	
	comentario VARCHAR(255),
	id_publicacion INT NOT NULL,
	PRIMARY KEY(comentario, id_publicacion),
	FOREIGN KEY (id_publicacion) REFERENCES Publicaciones(id_publicacion)
	
);


