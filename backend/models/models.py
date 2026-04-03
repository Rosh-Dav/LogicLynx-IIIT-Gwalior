from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.types import JSON
from backend.database import Base


# -------------------- USERS --------------------
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(String)


# -------------------- LANGUAGES --------------------
class Language(Base):
    __tablename__ = "languages"

    language_id = Column(Integer, primary_key=True, index=True)
    language_name = Column(String, nullable=False)


# -------------------- STORIES --------------------
class Story(Base):
    __tablename__ = "stories"

    story_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    language_id = Column(Integer, ForeignKey("languages.language_id"))
    thumbnail_image = Column(String)
    is_active = Column(Boolean, default=True)

    language = relationship("Language")


# -------------------- LEVELS --------------------
class Level(Base):
    __tablename__ = "levels"

    level_id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, ForeignKey("stories.story_id"))
    order_index = Column(Integer)

    xp_reward = Column(Integer, default=10)
    unlock_condition = Column(Integer)  # previous level id

    story = relationship("Story")


# -------------------- SCENES --------------------
class Scene(Base):
    __tablename__ = "scenes"

    scene_id = Column(Integer, primary_key=True, index=True)
    level_id = Column(Integer, ForeignKey("levels.level_id"))

    scene_type = Column(String)  # intro / problem / explanation / task / end

    media_url = Column(String)

    text_lines = Column(JSON)  # ["Line1", "Line2", "Line3"]

    text_position = Column(String)  # top / center / bottom

    order_index = Column(Integer)

    trigger_type = Column(String)  # auto / after_task

    level = relationship("Level")


# -------------------- TASKS --------------------
class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True, index=True)
    level_id = Column(Integer, ForeignKey("levels.level_id"))

    task_type = Column(String)  # text / mcq / code

    question = Column(String)
    expected_answer = Column(String)

    options = Column(JSON)  # for MCQ

    level = relationship("Level")


# -------------------- PROGRESS --------------------
class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    story_id = Column(Integer)

    current_level = Column(Integer)
    xp = Column(Integer, default=0)