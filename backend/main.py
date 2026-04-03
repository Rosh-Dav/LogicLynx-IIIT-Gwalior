from fastapi import FastAPI
from backend.database import engine, Base

# import routes
from backend.routes import auth, language, story, level, scene, task, progress

app = FastAPI()

# create tables
Base.metadata.create_all(bind=engine)

# include routes
app.include_router(auth.router, prefix="/auth")
app.include_router(language.router, prefix="/language")
app.include_router(story.router, prefix="/story")
app.include_router(level.router, prefix="/level")
app.include_router(scene.router, prefix="/scene")
app.include_router(task.router, prefix="/task")
app.include_router(progress.router, prefix="/progress")