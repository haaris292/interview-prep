let questions = [];
let filteredQuestions = [];

let topicName = "";

document.addEventListener("DOMContentLoaded", init);

async function init() {

    const params = new URLSearchParams(window.location.search);

    const file = params.get("file");

    topicName = params.get("title") || "Interview Questions";

    document.getElementById("topicTitle").textContent = topicName;

    try {

        const response = await fetch("data/" + file);

        if (!response.ok) {

            throw new Error("Unable to load " + file);

        }

        questions = await response.json();

        filteredQuestions = [...questions];

        document.getElementById("questionCount").textContent =
            `${questions.length} Questions`;

        renderQuestions();

        initializeSearch();

    }

    catch (error) {

        console.error(error);

        document.getElementById("questions").innerHTML = `

<div class="question-card">

<h2>Error Loading Questions</h2>

<p>${error.message}</p>

</div>

`;

    }

}

function renderQuestions() {

    const container =
        document.getElementById("questions");

    container.innerHTML = "";

    if (filteredQuestions.length === 0) {

        container.innerHTML = `

<div class="question-card">

<h2>No questions found</h2>

<p>Try another search.</p>

</div>

`;

        return;

    }

    filteredQuestions.forEach(question => {

        const tags = question.tags
            .map(tag => `<span class="tag">${tag}</span>`)
            .join("");

        container.innerHTML += `

<div class="question-card">

<div
style="
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:15px;
">

<span class="difficulty ${question.difficulty.toLowerCase()}">

${question.difficulty}

</span>

<strong>

${question.id}

</strong>

</div>

<h3>

${question.question}

</h3>

<div class="tags">

${tags}

</div>

<div class="button-row">

<button
onclick="copyQuestion(\`${escapeBackticks(question.question)}\`)">

📋 Copy Question

</button>

<button
onclick="copyPrompt(
'${escapeQuotes(topicName)}',
'${question.difficulty}',
\`${escapeBackticks(question.question)}\`
)">

🧠 Copy AI Prompt

</button>

<button
onclick="openChatGPT()">

🌐 ChatGPT

</button>

</div>

</div>

`;

    });

}

function initializeSearch() {

    const search =
        document.getElementById("search");

    search.addEventListener("input", () => {

        const value =
            search.value.toLowerCase();

        filteredQuestions =
            questions.filter(q =>

                q.question
                    .toLowerCase()
                    .includes(value)

                ||

                q.tags
                    .join(" ")
                    .toLowerCase()
                    .includes(value)

                ||

                q.difficulty
                    .toLowerCase()
                    .includes(value)

            );

        renderQuestions();

    });

}

async function copyQuestion(question) {

    await navigator.clipboard.writeText(question);

    alert("Question copied.");

}

function escapeQuotes(text) {

    return text.replace(/'/g, "\\'");

}

function escapeBackticks(text) {

    return text.replace(/`/g, "\\`");

}