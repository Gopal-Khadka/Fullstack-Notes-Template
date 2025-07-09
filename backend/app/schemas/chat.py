from typing import Any

from pydantic import BaseModel


class MentionItem(BaseModel):
    id: str
    label: str
    type: str
    metadata: dict[str, Any] | None = {}


class ParsedMessage(BaseModel):
    text: str
    mentions: list[MentionItem]
    rawContent: dict[str, Any]


class ChatResponse(BaseModel):
    success: bool
    responseMessage: str
    processedMentions: list[dict[str, Any]]
