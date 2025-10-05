DROP DATABASE IF EXISTS chateis;
CREATE DATABASE chateis;
USE chateis;

-- Creación de tablas

CREATE TABLE usuarios(
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    nombre VARCHAR(100) NOT NULL,
    pwd VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE grupos(
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    nombre VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE salas(
    id VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    publico BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios_en_grupos(
    usuario BINARY(16) NOT NULL,
    grupo BINARY(16) NOT NULL,
    CONSTRAINT FK_usuario_grupo FOREIGN KEY (usuario) REFERENCES usuarios(id),
    CONSTRAINT FK_grupo_usuario FOREIGN KEY (grupo) REFERENCES grupos(id),
    CONSTRAINT PK_usuarios_en_grupos PRIMARY KEY (usuario, grupo)
);

CREATE TABLE usuario_permisos_sala(
    usuario BINARY(16) NOT NULL,
    permiso VARCHAR(30) NOT NULL,
    sala VARCHAR(20) NOT NULL,
    CONSTRAINT FK_usuario_permisos_sala FOREIGN KEY (usuario) REFERENCES usuarios(id),
    CONSTRAINT FK_sala_permisos_usuario FOREIGN KEY (sala) REFERENCES salas(id),
    CONSTRAINT PK_usuario_permisos_sala PRIMARY KEY (usuario, permiso, sala)
);

CREATE TABLE grupos_permisos_sala(
    grupo BINARY(16) NOT NULL,
    permiso VARCHAR(30) NOT NULL,
    sala VARCHAR(20) NOT NULL,
    CONSTRAINT FK_grupo_permisos_sala FOREIGN KEY (grupo) REFERENCES grupos(id),
    CONSTRAINT FK_sala_permisos_grupo FOREIGN KEY (sala) REFERENCES salas(id),
    CONSTRAINT PK_grupo_permisos_sala PRIMARY KEY (grupo, permiso, sala)
);

CREATE TABLE mensajes(
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    sala VARCHAR(20) NOT NULL,
    usuario BINARY(16) NOT NULL,
    mensaje TEXT NOT NULL,
    mandado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_sala_mensajes FOREIGN KEY (sala) REFERENCES salas(id),
    CONSTRAINT FK_usuario_mensajes FOREIGN KEY (usuario) REFERENCES usuarios(id)
);

-- Insertado datos por defecto

