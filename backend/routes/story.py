from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.models import Story

router = APIRouter()


@router.post("/")
def create_story(
    title: str = Form(...),
    description: str = Form(...),
    language_id: int = Form(...),
    thumbnail_image: str = Form(...),
    is_active: bool = Form(...),
    db: Session = Depends(get_db)
):
    story = Story(
        title=title,
        description=description,
        language_id=language_id,
        thumbnail_image=thumbnail_image,
        is_active=is_active
    )

    db.add(story)
    db.commit()

    return {"message": "Story created"}