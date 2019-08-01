CREATE DATABASE analytics;
USE analytics;

CREATE TABLE accounts (
  ID INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  password CHAR(60) NOT NULL,
  roles JSON NOT NULL,
  lastSeen DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (ID)
);

CREATE TABLE news (
  ID INT NOT NULL AUTO_INCREMENT UNIQUE,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  released TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (ID)
);

CREATE TABLE analysis (
  ID VARCHAR(10) NOT NULL UNIQUE,
  owner INT NOT NULL,
  creation BIGINT NOT NULL,
  personOne VARCHAR(100) NOT NULL,
  personTwo VARCHAR(100) NOT NULL,
  totalDays INT NOT NULL,
  firstMessage VARCHAR(30) NOT NULL,
  totalMessages INT NOT NULL,
  allDaysInTimestamps TEXT NOT NULL,
  allDaysInEmojiPerMessage TEXT NOT NULL,
  allDaysInTotalMessages TEXT NOT NULL,
  allDaysInEmoji TEXT NOT NULL,
  totalMessagesByPersonOnePercentage FLOAT NOT NULL,
  totalMessagesByPersonTwoPercentage FLOAT NOT NULL,
  totalMessagesByPersonOne INT NOT NULL,
  totalMessagesByPersonTwo INT NOT NULL,
  msgInfoPerDay TEXT NOT NULL,
  messagesPerDays TEXT NOT NULL,
  messagesPerDaysOne TEXT NOT NULL,
  messagesPerDaysTwo TEXT NOT NULL,
  allMessagesByHour TEXT NOT NULL,
  allMessagesByHourOne TEXT NOT NULL,
  allMessagesByHourTwo TEXT NOT NULL,
  mostActive VARCHAR(30) NOT NULL,
  mostMessageCount INT NOT NULL,
  charT TEXT NOT NULL,
  char1 TEXT NOT NULL,
  char2 TEXT NOT NULL,
  topEmojis TEXT NOT NULL,
  topWords TEXT NOT NULL,
  public BOOLEAN NOT NULL DEFAULT  FALSE
);

ALTER TABLE analysis CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
ALTER DATABASE analytics CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
