document.addEventListener("DOMContentLoaded", function () {
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackList = document.getElementById("feedback-list");

    // Display feedback when the page loads
    function displayFeedback() {
        const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        feedbackList.innerHTML = "";

        feedbacks.forEach((feedback, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>${feedback.name}:</strong> ${feedback.comment} 
                            <button onclick="deleteFeedback(${index})">🗑 Delete</button>`;
            feedbackList.appendChild(li);
        });
    }

    // Handle feedback submission
    feedbackForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let username = document.getElementById("username").value.trim();
        let review = document.getElementById("review").value.trim();

        if (username === "" || review === "") {
            alert("Please enter all required information!");
            return;
        }

        let newFeedback = { name: username, comment: review };
        let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        feedbacks.push(newFeedback);
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

        alert("Thank you for your feedback!");
        feedbackForm.reset();
        displayFeedback();
    });

    // Delete feedback
    window.deleteFeedback = function (index) {
        let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        feedbacks.splice(index, 1);
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
        displayFeedback();
    };

    // Display feedback when the page loads
    displayFeedback();
});
