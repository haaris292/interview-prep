Generate a production-ready JSON interview question bank.

Follow these rules exactly.

1. Output ONLY valid JSON.
2. Do not include markdown.
3. Do not include explanations.
4. Do not include comments.
5. Use this schema exactly:

{
"id": "PREFIX-001",
"question": "Professional interview question.",
"difficulty": "Beginner | Intermediate | Advanced",
"tags": [
"tag1",
"tag2"
]
}

Rules

• Rewrite shorthand notes into professional interview questions.
• Preserve the original meaning.
• Remove duplicates.
• Merge duplicate questions whenever appropriate.
• Expand vague questions into proper interview questions.
• Do NOT invent unrelated questions.
• Keep the interview intent.
• Generate searchable tags.
• IDs must be sequential.
• Difficulty should be realistic.
• Output should be immediately usable in a website.

Difficulty Guidelines

Beginner

- Definitions
- Basic concepts
- Simple commands
- Basic comparisons

Intermediate

- Real-world usage
- Configuration
- Design choices
- Best practices
- Troubleshooting basics

Advanced

- Production scenarios
- System design
- Architecture
- Performance
- HA
- Security
- Disaster Recovery
- Incident Response
- Enterprise deployments

Tag Rules

• lowercase
• hyphen-separated
• 2-5 tags
• No spaces
• No duplicate tags

Question Style

Good:

"What is the difference between Terraform Import and Data Sources?"

Good:

"How would you troubleshoot Pods stuck in the Pending state?"

Good:

"How do you design a highly available Kubernetes control plane?"

Bad:

"What is pod?"

Bad:

"Terraform"

Bad:

"Difference?"

ID Prefix

Use the following prefix:

PREFIX

Start numbering at:

001

Topic

TOPIC NAME

Questions

YOUR QUESTIONS HERE
