from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def test_progress():
    return {"message": "Progress working"}