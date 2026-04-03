from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.models import Language

router = APIRouter()


@router.post("/")
def create_language(language_name: str, db: Session = Depends(get_db)):
    lang = Language(language_name=language_name)
    db.add(lang)
    db.commit()
    return {"message": "Language created"}


@router.get("/")
def get_languages(db: Session = Depends(get_db)):
    return db.query(Language).all()