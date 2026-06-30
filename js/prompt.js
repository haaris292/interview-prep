let lastPrompt = "";

function buildPrompt(topic, difficulty, question) {

    return `You are a Senior Azure Cloud Architect and Technical Interviewer.

Topic:
${topic}

Difficulty:
${difficulty}

Interview Question:
${question}

Please answer using the following format.

# Short Interview Answer

# Detailed Explanation

# Real World Example

# Azure Example

# Code Example (if applicable)

# Best Practices

# Common Mistakes

# Follow-up Interview Questions

# Additional Learning Resources
`;

}

async function copyPrompt(topic, difficulty, question) {

    lastPrompt = buildPrompt(
        topic,
        difficulty,
        question
    );

    await navigator.clipboard.writeText(lastPrompt);

    alert("AI Prompt copied.");

}

function openChatGPT() {

    window.open(
        "https://chatgpt.com",
        "_blank"
    );

}