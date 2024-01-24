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

DROP TABLE Comentario
CREATE TABLE Comentario(
	id_comentario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	comentario VARCHAR(255),
	id_publicacion INT NOT NULL,
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



DELIMITER //
CREATE PROCEDURE AgregarComentario(IN p_comentario VARCHAR(255), p_id INT)
BEGIN
	INSERT INTO Comentario (comentario, id_publicacion)
  VALUES (p_comentario, p_id);
END

DELIMITER ;
SELECT * FROM Comentario
CALL AgregarComentario ('Ta serio io', 1)


/*Procedimientos Filtrar*/
CALL Filtrarcomentario('F')


/*Procedimientos Editar*/
CALL ActualizarAdministrativo (1, 'Gustavo Pérez', 'gustavop@utp.ac.pa')
CALL ActualizarBiologo (1, NULL , 'moisesbiologo@utp.ac.pa', NULL)
CALL ActualizarComentario('2', 'wou como diria el Feid')
CALL ActualizarEstudiante(5, 'Juan Arango', 'arangol@utp.ac.pa', NULL)
CALL ActualizarFauna(5, 'Ave Fénix', 'Fenixisis', 'Surgió de las cenizas', 'Aves')
CALL ActualizarFlora(5, 'Enredadera', 'Enrediviris siemprus', 'Mas enredada que el cabello de Rapunzel', 'Plantas')
CALL ActualizarPublicaciones(5, 'Vi un Ave Fénix', 'Campus Levi Sasso', NULL,  5)


SELECT * FROM Fauna
SELECT * FROM Publicaciones

/*Procedimientos Eliminar*/

CALL EliminarAdministrativo(4)
CALL EliminarBiologo(5)
CALL EliminarComentario(3)
CALL EliminarEstudiante(5)
CALL EliminarFauna(3)
CALL EliminarFlora(3)
CALL EliminarPublicaciones(3)

SELECT * FROM Comentario

/*Trigger FechaPublicacion*/
DROP TRIGGER FechaPublicacion

DELIMITER //

CREATE TRIGGER FechaPublicacion
BEFORE INSERT ON Publicaciones
FOR EACH ROW
SET NEW.fecha_publicacion = COALESCE(NEW.fecha_publicacion, NOW());

//

DELIMITER ;




SELECT * FROM Fauna
SELECT * FROM Publicaciones
SELECT * FROM Estudiante
SELECT * FROM Estudiante_Publicacion
CALL AgregarEstudiante('PepeGanga', 'pepe.ganga@utp.ac.pa', 'pepeganga45', 'https://github.com/saunpain/FloraFaunaUTP/blob/main/FotoPrueba/PerfilNasua.png?raw=true')
CALL AgregarPublicaciones('Impresionante Reptil le llame Renekton', 'Chiriqui', NULL, NULL, 2)

SELECT * FROM Solicitud

CALL AgregarSolicitud('link4', 'Verificado')
CALL ActualizarSolicitud('4','link4','Sin Verificar')
CALL EliminarSolicitud('4')
CALL FiltrarSolicitud('V')

DELIMITER //
CREATE TRIGGER TriggerFechaEstudiante
BEFORE INSERT ON Estudiante_Publicacion
FOR EACH ROW
SET NEW.fecha_estudiante = IFNULL(NEW.fecha_estudiante, NOW());
//
DELIMITER ;
CALL EliminarPublicaciones('1011')
CALL EliminarFauna('1009')
CALL AgregarFauna('Gato Solo', 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/image-7.png?raw=true', 'Nasua', 'Nasua, llamados coatíes o pizotes, ​ es un género con dos especies de pequeños mamíferos omnívoros americanos de la familia de los prociónidos.​ Habita desde el sur de Estados Unidos hasta el norte de Argentina, Paraguay y Uruguay.','Mamífero')
CALL AgregarPublicaciones('Me encontré un gato solo saliendo de la U. Se llama pansito', 'Campus Levi Sasso',NULL, 1014, 1013, 1012, NULL)
