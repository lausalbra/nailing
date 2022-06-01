-- SI LA CARGA DA ERROR INTENTAD BORRAR LAS MISMAS TABLAS QUE SE TOCAN EN ESTE SCRIPT Y DEJAD QUE SPRING LAS VUELVA A GENERAR--

ALTER SEQUENCE cita_id_seq RESTART WITH 1;
ALTER SEQUENCE usuario_id_seq RESTART WITH 1;
ALTER SEQUENCE tipo_id_seq RESTART WITH 7;
ALTER SEQUENCE base_id_seq RESTART WITH 23;
ALTER SEQUENCE forma_id_seq RESTART WITH 19;
ALTER SEQUENCE tamanyo_id_seq RESTART WITH 25;
ALTER SEQUENCE disenyo_id_seq RESTART WITH 16;
ALTER SEQUENCE decoracion_id_seq RESTART WITH 55;
ALTER SEQUENCE acabado_id_seq RESTART WITH 7;
ALTER SEQUENCE centro_id_seq RESTART WITH 7;
ALTER SEQUENCE valoracion_id_seq RESTART WITH 1;

DELETE FROM cita;
DELETE FROM valoracion;
DELETE FROM usuario;
DELETE FROM tipo;
DELETE FROM base;
DELETE FROM forma;
DELETE FROM tamanyo;
DELETE FROM disenyo;
DELETE FROM decoracion;
DELETE FROM acabado;
DELETE FROM centro;
 
------------------------------------------CENTROS---------------------------------------------
INSERT INTO centro (id, apertura_am, cierre_am, apertura_pm, cierre_pm, dias_disponible, imagen, nombre, provincia, localidad, direccion, suscripcion, ultimasuscripcion, creditosRestantes, pagado, valoracionmedia, valoraciontotal, numvaloraciones) VALUES (1, '09:00:00','13:00:00','16:00:00','21:00:00', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY', 'https://i.ibb.co/qkFKLsm/F253-E9-DA-6780-4-A9-D-9-EAB-804784-BBEE21.jpg', 'Nails by Claudia', 'Málaga','Málaga','Calle Real, 78',0, NOW(),150,true,1.0,5,1);
INSERT INTO centro (id, apertura_am, cierre_am, apertura_pm, cierre_pm, dias_disponible, imagen, nombre, provincia, localidad, direccion, suscripcion, ultimasuscripcion, creditosRestantes, pagado, valoracionmedia, valoraciontotal, numvaloraciones) VALUES (2, '08:30:00','13:00:00','16:00:00','20:30:00', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY', 'https://i.ibb.co/WP2MvVS/867-F548-A-5074-4-C98-AE6-D-F48083-CEE8-E9.jpg', 'Más guapa que la novia', 'Sevilla','Sevilla','Calle Sierpes, 24',2, NOW(),300, true,2.0,5,1);
INSERT INTO centro (id, apertura_am, cierre_am, apertura_pm, cierre_pm, dias_disponible, imagen, nombre, provincia, localidad, direccion, suscripcion, ultimasuscripcion, creditosRestantes, pagado, valoracionmedia, valoraciontotal, numvaloraciones) VALUES (3, '09:30:00','13:00:00','16:00:00','21:30:00', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY', 'https://i.ibb.co/wdhjNNf/8-DF66-CD3-3-E2-D-4-C37-B96-A-247-E3-D5-B221-B.png', 'Nails by Verónica', 'Cádiz','Rota','Calle nueva, 12',3, NOW(),-10,true,3.0,5,1);
INSERT INTO centro (id, apertura_am, cierre_am, apertura_pm, cierre_pm, dias_disponible, imagen, nombre, provincia, localidad, direccion, suscripcion, ultimasuscripcion, creditosRestantes, pagado, valoracionmedia, valoraciontotal, numvaloraciones) VALUES (4, '09:30:00','13:00:00','16:00:00','21:30:00', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY', 'https://i.ibb.co/S62T7XF/CF17-DA41-9-C53-4-B15-B556-A78-BC01-E3-ECF.jpg', 'Nails by Jéssica', 'Cádiz','Cádiz','Calle Real, 78',3, NOW(),0,true,4.0,5,1);
INSERT INTO centro (id, apertura_am, cierre_am, apertura_pm, cierre_pm, dias_disponible, imagen, nombre, provincia, localidad, direccion, suscripcion, ultimasuscripcion, creditosRestantes, pagado, valoracionmedia, valoraciontotal, numvaloraciones) VALUES (5, '09:30:00','13:00:00','16:00:00','21:30:00', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY', 'https://i.ibb.co/KwkGPF5/0-EA73054-CC17-4060-B994-21-D68555-A98-A.jpg', 'Manicuras Paqui', 'Cádiz','Jerez de la Frontera','Calle Halcón, 21',3, NOW(),-10,true,5.0,5,1);
INSERT INTO centro (id, apertura_am, cierre_am, apertura_pm, cierre_pm, dias_disponible, imagen, nombre, provincia, localidad, direccion, suscripcion, ultimasuscripcion, creditosRestantes, pagado, valoracionmedia, valoraciontotal, numvaloraciones) VALUES (6, '09:30:00','13:00:00','16:00:00','21:30:00', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY', 'https://i.ibb.co/ygnWddH/3-A522-ED2-1-DC5-4-C89-9-E76-2-CD5-B9-A007-C5.jpg', 'Manicuras de cuadro', 'Cádiz','Málaga','Calle Real, 78',3, NOW(),0,true,3.2,5,1);

----------------------------------------------TIPOS----------------------------------------------
--CENTRO 1--
INSERT INTO tipo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (1, 10, 0, 1, 15, 1);
INSERT INTO tipo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (2, 20, 1, 1, 20, 1);

--CENTRO 2--
INSERT INTO tipo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (3, 10, 0, 1, 15, 2);
INSERT INTO tipo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (4, 20, 1, 1, 20, 2);

--CENTRO 3--
INSERT INTO tipo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (5, 10, 0, 1, 15, 3);
INSERT INTO tipo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (6, 20, 1, 1, 20, 3);

-----------------------------------------------BASES---------------------------------------------
--CENTRO 1--
--ESCULPIDAS
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (1, 5, 0, 2, 10, 1);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (2, 10, 1, 2, 12, 1);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (3, 15, 2, 2, 14, 1);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (4, 20, 3, 2, 16, 1);
--NATURALES
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (5, 25, 4, 5, 18, 1);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (6, 30, 5, 5, 20, 1);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (7, 35, 6, 8, 22, 1);

--CENTRO 2--
--ESCULPIDAS
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (8, 5, 0, 2, 10, 2);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (10, 10, 1, 2, 12, 2);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (11, 15, 2, 2, 14, 2);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (12, 20, 3, 2, 16, 2);
--NATURALES
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (13, 25, 4, 5, 18, 2);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (14, 30, 5, 5, 20, 2);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (15, 35, 6, 8, 22, 2);

--CENTRO 3--
--ESCULPIDAS
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (16, 5, 0, 2, 10, 3);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (17, 10, 1, 2, 12, 3);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (18, 15, 2, 2, 14, 3);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (19, 20, 3, 2, 16, 3);
--NATURALES
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (20, 25, 4, 5, 18, 3);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (21, 30, 5, 5, 20, 3);
INSERT INTO base (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (22, 35, 6, 8, 22, 3);

----------------------------------------------FORMAS---------------------------------------------
--CENTRO 1--
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (1, 5, 0, 3, 10, 1);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (2, 10, 1, 3, 12, 1);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (3, 15, 2, 3, 14, 1);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (4, 20, 3, 3, 16, 1);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (5, 25, 4, 3, 18, 1);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (6, 30, 5, 3, 20, 1);

--CENTRO 2--
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (7, 5, 0, 3, 10, 2);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (8, 10, 1, 3, 12, 2);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (9, 15, 2, 3, 14, 2);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (10, 20, 3, 3, 16, 2);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (11, 25, 4, 3, 18, 2);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (12, 30, 5, 3, 20, 2);

--CENTRO 3--
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (13, 5, 0, 3, 10, 3);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (14, 10, 1, 3, 12, 3);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (15, 15, 2, 3, 14, 3);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (16, 20, 3, 3, 16, 3);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (17, 25, 4, 3, 18, 3);
INSERT INTO forma (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (18, 30, 5, 3, 20, 3);

---------------------------------------------TAMAÑOS---------------------------------------------
--CENTRO 1--
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (1, 5, 0, 4, 10, 1);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (2, 10, 1, 4, 12, 1);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (3, 15, 2, 4, 14, 1);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (4, 20, 3, 4, 16, 1);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (5, 25, 4, 4, 18, 1);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (6, 30, 5, 4, 20, 1);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (7, 35, 6, 4, 22, 1);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (8, 40, 7, 4, 24, 1);

--CENTRO 2--
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (9, 5, 0, 4, 10, 2);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (10, 10, 1, 4, 12, 2);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (11, 15, 2, 4, 14, 2);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (12, 20, 3, 4, 16, 2);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (13, 25, 4, 4, 18, 2);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (14, 30, 5, 4, 20, 2);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (15, 35, 6, 4, 22, 2);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (16, 40, 7, 4, 24, 2);

--CENTRO 3--
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (17, 5, 0, 4, 10, 3);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (18, 10, 1, 4, 12, 3);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (19, 15, 2, 4, 14, 3);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (20, 20, 3, 4, 16, 3);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (21, 25, 4, 4, 18, 3);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (22, 30, 5, 4, 20, 3);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (23, 35, 6, 4, 22, 3);
INSERT INTO tamanyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (24, 40, 7, 4, 24, 3);

---------------------------------------------DISEÑOS---------------------------------------------
--CENTRO 1--
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (1, 5, 0, 6, 10, 1);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (2, 10, 1, 6, 12, 1);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (3, 15, 2, 6, 14, 1);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (4, 20, 3, 6, 16, 1);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (5, 25, 4, 6, 18, 1);

--CENTRO 2--
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (6, 5, 0, 6, 10, 2);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (7, 10, 1, 6, 12, 2);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (8, 15, 2, 6, 14, 2);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (9, 20, 3, 6, 16, 2);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (10, 25, 4, 6, 18, 2);

--CENTRO 3--
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (11, 5, 0, 6, 10, 3);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (12, 10, 1, 6, 12, 3);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (13, 15, 2, 6, 14, 3);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (14, 20, 3, 6, 16, 3);
INSERT INTO disenyo (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (15, 25, 4, 6, 18, 3);

-------------------------------------------DECORACION--------------------------------------------
--CENTRO 1--
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (1, 5, 0, 7, 10, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (2, 7, 1, 7, 12, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (3, 9, 2, 7, 14, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (4, 11, 3, 7, 16, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (5, 13, 4, 7, 18, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (6, 15, 5, 7, 20, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (7, 17, 6, 7, 22, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (8, 19, 7, 7, 24, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (9, 21, 8, 7, 26, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (10, 23, 9, 7, 28, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (11, 25, 10, 7, 30, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (12, 27, 11, 7, 32, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (13, 29, 12, 7, 34, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (14, 31, 13, 7, 36, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (15, 33, 14, 7, 38, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (16, 35, 15, 7, 40, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (17, 37, 16, 7, 42, 1);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (18, 39, 17, 7, 44, 1);

--CENTRO 2--
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (19, 5, 0, 7, 10, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (20, 7, 1, 7, 12, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (21, 9, 2, 7, 14, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (22, 11, 3, 7, 16, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (23, 13, 4, 7, 18, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (24, 15, 5, 7, 20, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (25, 17, 6, 7, 22, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (26, 19, 7, 7, 24, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (27, 21, 8, 7, 26, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (28, 23, 9, 7, 28, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (29, 25, 10, 7, 30, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (30, 27, 11, 7, 32, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (31, 29, 12, 7, 34, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (32, 31, 13, 7, 36, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (33, 33, 14, 7, 38, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (34, 35, 15, 7, 40, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (35, 37, 16, 7, 42, 2);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (36, 39, 17, 7, 44, 2);

--CENTRO 3--
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (37, 5, 0, 7, 10, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (38, 7, 1, 7, 12, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (39, 9, 2, 7, 14, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (40, 11, 3, 7, 16, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (41, 13, 4, 7, 18, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (42, 15, 5, 7, 20, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (43, 17, 6, 7, 22, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (44, 19, 7, 7, 24, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (45, 21, 8, 7, 26, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (46, 23, 9, 7, 28, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (47, 25, 10, 7, 30, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (48, 27, 11, 7, 32, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (49, 29, 12, 7, 34, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (50, 31, 13, 7, 36, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (51, 33, 14, 7, 38, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (52, 35, 15, 7, 40, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (53, 37, 16, 7, 42, 3);
INSERT INTO decoracion (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (54, 39, 17, 7, 44, 3);

--------------------------------------------ACABADOS---------------------------------------------
--CENTRO 1--
INSERT INTO acabado (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (1, 5, 0, 8, 10, 1);
INSERT INTO acabado (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (2, 10, 1, 8, 20, 1);

--CENTRO 2--
INSERT INTO acabado (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (3, 5, 0, 8, 10, 2);
INSERT INTO acabado (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (4, 10, 1, 8, 20, 2);

--CENTRO 3--
INSERT INTO acabado (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (5, 5, 0, 8, 10, 3);
INSERT INTO acabado (id, coste, nombre, siguiente_fase, tiempo, centro_id) VALUES (6, 10, 1, 8, 20, 3);
