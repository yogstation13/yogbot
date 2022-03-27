CREATE TABLE IF NOT EXISTS bans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    discord_id BIGINT(20) NOT NULL,
    issued_at DATETIME NOT NULL DEFAULT NOW(),
    expires_at DATETIME,
    revoked_at DATETIME,
    reason VARCHAR(2048)
);

CREATE INDEX idx_ban_get ON bans (discord_id, revoked_at, expires_at);
CREATE INDEX idx_ban_gets ON bans (revoked_at, expires_at);

CREATE TABLE IF NOT EXISTS user_sticky_roles (
    discord_id BIGINT(20) NOT NULL,
    role_id BIGINT(20) NOT NULL,
    PRIMARY KEY (discord_id, role_id)
);

CREATE INDEX idx_roles_get ON user_sticky_roles (discord_id)
