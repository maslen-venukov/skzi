CREATE DATABASE skzi ENCODING = 'utf8';

CREATE TABLE s_user_role (
    id SERIAL PRIMARY KEY,
    role VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    real_name VARCHAR(255) NOT NULL,
    pass_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES s_user_role(id)  NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE s_agreement_type (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE s_sign_type (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE s_skzi_type (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE s_platform_type (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE s_vipnet_lan (
    id SERIAL PRIMARY KEY,
    lan_num INTEGER NOT NULL
);

CREATE TABLE org (
    id SERIAL PRIMARY KEY,
    inn VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_works BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE agreement (
    id SERIAL PRIMARY KEY,
    type_id INTEGER REFERENCES s_agreement_type(id) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    number VARCHAR(255) NOT NULL,
    parent_id INTEGER REFERENCES agreement(id) NULL,
    begin_date DATE NOT NULL DEFAULT NOW() NOT NULL,
    end_date DATE NULL,
    contractor_node_id INTEGER REFERENCES org(id) NOT NULL,
    contractor_segment_id INTEGER REFERENCES org(id) NULL,
    comment TEXT NOT NULL,
    add_user_id INTEGER REFERENCES users(id) NOT NULL,
    add_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    termination_date DATE NULL
);

CREATE TABLE comment_agreement (
    id SERIAL PRIMARY KEY,
    agreement_id INTEGER REFERENCES agreement(id) NOT NULL,
    comment TEXT NOT NULL,
    add_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    add_user_id INTEGER REFERENCES users(id) NOT NULL
);

CREATE TABLE skzi_unit (
    id SERIAL PRIMARY KEY,
    vipnet_lan_id INTEGER REFERENCES s_vipnet_lan(id) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    agreement_id INTEGER REFERENCES agreement(id) NULL,
    skzi_type_id INTEGER REFERENCES s_skzi_type(id) NOT NULL,
    inv_num VARCHAR(255) NULL,
    lan_id VARCHAR(255) NOT NULL,
    lan_name VARCHAR(255) NOT NULL,
    serial_num VARCHAR(255) NULL,
    lic_skzi_num VARCHAR(255) NULL,
    serial_skzi_num VARCHAR(255) NULL,
    platform_id INTEGER REFERENCES s_platform_type(id) NULL,
    is_broken BOOLEAN NOT NULL,
    location VARCHAR(255) NULL,
    add_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    add_user_id INTEGER REFERENCES users(id) NOT NULL,
    inact_date DATE NULL,
    inact_user_id INTEGER REFERENCES users(id) NULL,
    skzi_owner_id INTEGER REFERENCES org(id) NULL
);

CREATE TABLE comment_skzi (
    id SERIAL PRIMARY KEY,
    skzi_unit_id INTEGER REFERENCES skzi_unit(id) NOT NULL,
    comment TEXT NOT NULL,
    add_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    add_user_id INTEGER REFERENCES users(id) NOT NULL
);

CREATE TABLE act (
    id SERIAL PRIMARY KEY,
    number VARCHAR(255) NOT NULL,
    arg_id INTEGER REFERENCES agreement(id) NOT NULL,
    date DATE DEFAULT NOW() NOT NULL,
    skzi_unit_id INTEGER REFERENCES skzi_unit(id) NOT NULL,
    sign_type_id INTEGER REFERENCES s_sign_type(id) NOT NULL,
    add_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    add_user_id INTEGER REFERENCES users(id) NOT NULL,
    eq_inventory_num VARCHAR(255) NULL
);

CREATE TABLE comment_act (
    id SERIAL PRIMARY KEY,
    act_id INTEGER REFERENCES act(id) NOT NULL,
    comment TEXT NOT NULL,
    add_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    add_user_id INTEGER REFERENCES users(id) NOT NULL
);

INSERT INTO s_agreement_type(type) VALUES
('Двустороннее СКЗИ ПАК (ЦИТ+владелец)'),
('Двустороннее СКЗИ ПО (ЦИТ+владелец)'),
('Трехстороннее СКЗИ ПАК (МЦР+ЦИТ+пользователь)'),
('Трехстороннее СКЗИ ПО (МЦР+ЦИТ+пользователь)'),
('Двусторонее ЕИТКС (ЦИТ+узел)'),
('Трехсторонее ЕИТКС (ЦИТ+узел+сегмент)');

INSERT INTO s_skzi_type(type) VALUES
('HW50'),
('HW100'),
('HW100CU'),
('HW1000'),
('Client Windows'),
('Client Linux'),
('Client Android'),
('Client iOS'),
('Coordinator Windows'),
('Coordinator Linux');

INSERT INTO s_platform_type(type) VALUES
('Q2'),
('Q3'),
('X2'),
('X3');

INSERT INTO s_vipnet_lan(lan_num) VALUES
(1471),
(1483),
(3126);

INSERT INTO s_user_role(role) VALUES
('Система'),
('Администратор'),
('Оператор'),
('Пользователь');

INSERT INTO s_sign_type(type) VALUES
('На бумаге'),
('Электронная подпись');

INSERT INTO users(name, real_name, pass_hash, role_id) VALUES
('system', 'Сергей Сергеев', '$2a$05$4eFwT91PQ7lEnI2FKtBhA.mG6pC7PA0TpZzI7bi/WFD/Z3WLtnWu.', 1),
('admin', 'Иван Иванов', '$2a$05$4eFwT91PQ7lEnI2FKtBhA.mG6pC7PA0TpZzI7bi/WFD/Z3WLtnWu.', 2),
('operator', 'Петр Петров', '$2a$05$4eFwT91PQ7lEnI2FKtBhA.mG6pC7PA0TpZzI7bi/WFD/Z3WLtnWu.', 3),
('user', 'Юзернейм Юзернеймович', '$2a$05$4eFwT91PQ7lEnI2FKtBhA.mG6pC7PA0TpZzI7bi/WFD/Z3WLtnWu.', 4),
('blocked_user', 'Анон Анонович', '$2a$05$4eFwT91PQ7lEnI2FKtBhA.mG6pC7PA0TpZzI7bi/WFD/Z3WLtnWu.', 4);

UPDATE users SET is_active = FALSE WHERE id = 5;