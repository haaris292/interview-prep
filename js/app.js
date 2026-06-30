let allTopics = [];

document.addEventListener("DOMContentLoaded", init);

async function init() {

    try {

        const response = await fetch("data/index.json");

        allTopics = await response.json();

        // Load each topic file and count questions
        for (const topic of allTopics) {

            try {

                const res = await fetch("data/" + topic.file);

                const questions = await res.json();

                topic.questions = questions.length;

            }

            catch {

                topic.questions = 0;

            }

        }

        // Sort alphabetically

        allTopics.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

        updateStats();

        renderTopics(allTopics);

        initializeSearch();

    }

    catch (error) {

        console.error(error);

    }

}

function renderTopics(topics) {

    const container = document.getElementById("topics");

    container.innerHTML = "";

    topics.forEach(topic => {

        container.innerHTML += `

<div class="card">

<div class="icon">

${topic.icon}

</div>

<h2>

${topic.title}

</h2>

<p>

${topic.questions} Questions

</p>

<button onclick="openTopic('${topic.file}','${escapeQuotes(topic.title)}')">

Open Questions →

</button>

</div>

`;

    });

}

function updateStats() {

    document.getElementById("topicCount").textContent =
        allTopics.length;

    const total =
        allTopics.reduce((sum, topic) => sum + topic.questions, 0);

    document.getElementById("questionCount").textContent =
        total;

}

function initializeSearch() {

    const search =
        document.getElementById("searchTopics");

    search.addEventListener("input", () => {

        const value =
            search.value.toLowerCase();

        const filtered =
            allTopics.filter(topic =>

                topic.title
                    .toLowerCase()
                    .includes(value)

            );

        renderTopics(filtered);

    });

}

function openTopic(file, title) {

    window.location.href =
        `topic.html?file=${encodeURIComponent(file)}&title=${encodeURIComponent(title)}`;

}

function escapeQuotes(text) {

    return text.replace(/'/g, "\\'");

}