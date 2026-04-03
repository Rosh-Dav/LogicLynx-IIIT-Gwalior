from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.models import Level

router = APIRouter()


@router.post("/")
def create_level(
    story_id: int = Form(...),
    order_index: int = Form(...),
    xp_reward: int = Form(...),
    unlock_condition: int = Form(None),
    db: Session = Depends(get_db)
):
    level = Level(
        story_id=story_id,
        order_index=order_index,
        xp_reward=xp_reward,
        unlock_condition=unlock_condition
    )

    db.add(level)
    db.commit()

    return {"message": "Level created"}