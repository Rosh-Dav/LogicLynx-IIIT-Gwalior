from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.models import Task
import json

router = APIRouter()


@router.post("/")
def create_task(
    level_id: int = Form(...),
    task_type: str = Form(...),
    question: str = Form(...),
    expected_answer: str = Form(...),
    options: str = Form(None),
    db: Session = Depends(get_db)
):
    task = Task(
        level_id=level_id,
        task_type=task_type,
        question=question,
        expected_answer=expected_answer,
        options=json.loads(options) if options else None
    )

    db.add(task)
    db.commit()

    return {"message": "Task created"}