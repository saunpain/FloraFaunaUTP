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


DROP PROCEDURE FiltrarEstudiante

CALL FiltrarEstudiante ('2')

DELIMITER //

CREATE PROCEDURE FiltrarEstudiante(IN parametro_texto VARCHAR(255))
BEGIN
    SELECT * FROM Estudiante
    WHERE (parametro_texto IS NULL OR CAST(id_estudiante AS VARCHAR(50)) LIKE CONCAT('%', parametro_texto, '%'))
      OR (parametro_texto IS NULL OR nombre_estudiante LIKE CONCAT('%', parametro_texto, '%') OR correo_estudiante LIKE CONCAT('%', parametro_texto, '%'));
END;

DELIMITER ;



DELIMITER //

CREATE PROCEDURE FiltrarBiologo(
  IN nombre_biologo VARCHAR(255),
  IN id_biologo INT,
  IN correo_Biologo VARCHAR(255)
)
BEGIN
  SELECT *
  FROM Biologo
  WHERE
    (nombre_biologo = nombre_biologo OR nombre_biologo IS NULL) OR
    (id_biologo = id_biologo OR id_biologo IS NULL) OR
    (correo_Biologo = correo_Biologo OR correo_Biologo IS NULL);
END //

DELIMITER ;

CALL FiltrarBiologo (NULL, 1, NULL)


DELIMITER //

CREATE PROCEDURE FiltrarAdmin(IN parametro_texto VARCHAR(255))
BEGIN
    SELECT * FROM Administrativo
    WHERE (parametro_texto IS NULL OR CAST(id_admin AS VARCHAR(50)) LIKE CONCAT('%', parametro_texto, '%'))
      OR (parametro_texto IS NULL OR nombre_admin LIKE CONCAT('%', parametro_texto, '%') OR correo_admin LIKE CONCAT('%', parametro_texto, '%'));
END;

DELIMITER ;

CALL FiltrarAdmin ('Gu')




DELIMITER //


DROP PROCEDURE FiltrarFauna
CREATE PROCEDURE FiltrarFauna(IN parametro_texto VARCHAR(255))
BEGIN
    SELECT * FROM Fauna
    WHERE (parametro_texto IS NULL OR CAST(id_fauna AS VARCHAR(50)) LIKE CONCAT('%', parametro_texto, '%'))
       OR (parametro_texto IS NULL OR nombre_animal LIKE CONCAT('%', parametro_texto, '%')
		 OR (parametro_texto IS NULL OR nombre_cientifico_fauna LIKE CONCAT('%', parametro_texto, '%')
		 OR (parametro_texto IS NULL OR categoria_fauna LIKE CONCAT('%', parametro_texto, '%'))
END;

DELIMITER ;

CALL FiltrarFauna ('1')


CREATE PROCEDURE FiltrarPublicaciones(IN parametro_texto VARCHAR(255))
BEGIN
    SELECT * FROM Publicaciones
    WHERE (parametro_texto IS NULL OR CAST(id_publicacion AS VARCHAR(50)) LIKE CONCAT('%', parametro_texto, '%'))
       OR (parametro_texto IS NULL OR titulo LIKE CONCAT('%', parametro_texto, '%'))
		 OR (parametro_texto IS NULL OR lugar LIKE CONCAT('%', parametro_texto, '%'))
		 OR (parametro_texto IS NULL OR CAST(fecha_publicacion AS VARCHAR(50)) LIKE CONCAT('%', parametro_texto, '%'))
		 OR (parametro_texto IS NULL OR CAST(id_flora AS VARCHAR(50)) LIKE CONCAT('%', parametro_texto, '%'))
		 OR (parametro_texto IS NULL OR CAST(fecha_publicacion AS VARCHAR(50)) LIKE CONCAT('%', parametro_texto, '%'))
END;


CALL FiltrarPublicaciones('Campus')










