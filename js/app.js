let allTopics = [];

/*
==========================================
Initialize
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    loadTopics();

});

/*
==========================================
Load Topics
==========================================
*/

async function loadTopics() {

    try {

        const response = await fetch("data/index.json");

        if (!response.ok) {

            throw new Error("Unable to load index.json");

        }

        allTopics = await response.json();

        // Sort alphabetically
        allTopics.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

        updateStats(allTopics);

        renderTopics(allTopics);

        initializeSearch();

    }

    catch (error) {

        console.error(error);

        document.getElementById("topics").innerHTML = `

            <div class="question-card">

                <h2>Unable to load topics</h2>

                <p>${error.message}</p>

            </div>

        `;

    }

}

/*
==========================================
Render Cards
==========================================
*/

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

    <button
        onclick="openTopic('${topic.file}','${escapeQuotes(topic.title)}')">

        Open Questions →

    </button>

</div>

`;

    });

}

/*
==========================================
Statistics
==========================================
*/

function updateStats(topics) {

    document.getElementById("topicCount").innerText =
        topics.length;

    const totalQuestions =
        topics.reduce((sum, topic) => {

            return sum + topic.questions;

        }, 0);

    document.getElementById("questionCount").innerText =
        totalQuestions;

}

/*
==========================================
Search
==========================================
*/

function initializeSearch() {

    const searchBox =
        document.getElementById("searchTopics");

    searchBox.addEventListener("input", () => {

        const search =
            searchBox.value.toLowerCase().trim();

        const filtered =
            allTopics.filter(topic =>

                topic.title
                    .toLowerCase()
                    .includes(search)

            );

        renderTopics(filtered);

    });

}

/*
==========================================
Open Topic
==========================================
*/

function openTopic(file, title) {

    const url =

        `topic.html?file=${encodeURIComponent(file)}&title=${encodeURIComponent(title)}`;

    window.location.href = url;

}

/*
==========================================
Utility
==========================================
*/

function escapeQuotes(text) {

    return text.replace(/'/g, "\\'");

}