from typing import Any

from app.constants.chat_context import CONTEXT_DATA
from app.schemas.chat import MentionItem


def resolve_mention_context(mention: MentionItem) -> dict[str, Any]:
    """Get context for a mention"""
    context = CONTEXT_DATA.get(mention.id, {})

    if not context:
        return {"error": f"No context found for {mention.label}"}

    return {
        "mention": mention.model_dump(),
        "context": context,
        "resolved": True,
    }


def generate_response(message: str, mentions: list[MentionItem]) -> str:
    """Generate a simple contextual response"""
    if not mentions:
        return "I received your message but didn't find any specific mentions."

    response_parts = ["I can see you mentioned:"]

    for mention in mentions:
        context = CONTEXT_DATA.get(mention.id, {})

        if context["type"] == "user":
            response_parts.append(
                f"• {mention.label} ({context.get('role', 'Unknown role')}) - "
                f"currently working on: {context.get('currentWork', 'Unknown task')}",
            )
        elif context["type"] == "file":
            response_parts.append(
                f"• {mention.label} - {context.get('description', 'No description')}",
            )
        elif context["type"] == "status":
            response_parts.append(
                f"• {mention.label} status - {context.get('description', 'No description')} "
                f"({context.get('count', 0)} items)",
            )

    response_parts.append(
        "\nWith this context, I can provide more targeted assistance!",
    )
    return "\n".join(response_parts)
