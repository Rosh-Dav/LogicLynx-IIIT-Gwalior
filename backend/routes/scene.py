from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.models import Scene
import json

router = APIRouter()


@router.post("/")
def create_scene(
    level_id: int = Form(...),
    scene_type: str = Form(...),
    media_url: str = Form(...),
    text_lines: str = Form(...),   # will come as string
    text_position: str = Form(...),
    order_index: int = Form(...),
    trigger_type: str = Form(...),
    db: Session = Depends(get_db)
):
    scene = Scene(
        level_id=level_id,
        scene_type=scene_type,
        media_url=media_url,
        text_lines=json.loads(text_lines),  # convert string → JSON
        text_position=text_position,
        order_index=order_index,
        trigger_type=trigger_type
    )

    db.add(scene)
    db.commit()

    return {"message": "Scene created"}