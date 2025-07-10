from datetime import datetime

from fastapi import APIRouter, HTTPException

from app.constants.chat_context import CONTEXT_DATA
from app.schemas.chat import ChatResponse, ParsedMessage
from app.utils.chat import generate_response, resolve_mention_context

router = APIRouter(tags=["chat"])


@router.post("/api/chat", response_model=ChatResponse)
async def process_chat_message(message: ParsedMessage):
    """Process chat message with mentions"""
    try:
        # Resolve context for each mention
        processed_mentions = []
        for mention in message.mentions:
            context = resolve_mention_context(mention)
            processed_mentions.append(context)

        # Generate response
        response_text = generate_response(message.text, message.mentions)

        return ChatResponse(
            success=True,
            responseMessage=response_text,
            processedMentions=processed_mentions,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/api/mentions")
async def get_mentions():
    """Get all available mentions for frontend"""
    mentions = []

    # Add users
    for user_id, user_data in CONTEXT_DATA.items():
        if user_id.startswith("user_"):
            mentions.append(
                {
                    "id": user_id,
                    "label": user_data["name"],
                    "type": "user",
                    "char": "@",
                    "metadata": {
                        "email": user_data["email"],
                        "description": user_data["role"],
                    },
                },
            )

    # Add files
    for file_id, file_data in CONTEXT_DATA.items():
        if file_id.startswith("file_"):
            mentions.append(
                {
                    "id": file_id,
                    "label": file_data["name"],
                    "type": "file",
                    "char": "#",
                    "metadata": {
                        "path": file_data["path"],
                        "description": file_data["description"],
                    },
                },
            )

    # Add statuses
    for status_id, status_data in CONTEXT_DATA.items():
        if status_id.startswith("status_"):
            mentions.append(
                {
                    "id": status_id,
                    "label": status_data["name"],
                    "type": "status",
                    "char": "#",
                    "metadata": {
                        "description": status_data["description"],
                    },
                },
            )

    return mentions


@router.get("/api/context/{mention_id}")
async def get_mention_context(mention_id: str):
    """Get detailed context for a specific mention"""
    context = CONTEXT_DATA.get(mention_id)

    if not context:
        raise HTTPException(status_code=404, detail="Mention not found")

    return {
        "id": mention_id,
        "context": context,
        "timestamp": datetime.now().isoformat(),
    }
