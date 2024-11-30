// Quiz Evaluation Function
function evaluateQuiz(formId, correctAnswers, resultPage) {
    let score = 0;

    // Get form and user answers
    const form = document.getElementById(formId);
    const userAnswers = {};
    Object.keys(correctAnswers).forEach(question => {
        userAnswers[question] = form.querySelector(`input[name="${question}"]:checked`)?.value;
    });

    // Evaluate answers and calculate score
    for (let question in correctAnswers) {
        if (userAnswers[question] === correctAnswers[question]) {
            score += 3; // Each correct answer is worth 3 points
        }
    }

    // Calculate percentage
    const totalQuestions = Object.keys(correctAnswers).length;
    const percentage = (score / (totalQuestions * 3)) * 100;

    // Save score and percentage to sessionStorage
    sessionStorage.setItem('score', score);
    sessionStorage.setItem('percentage', percentage);

    // Redirect to result page
    window.location.href = resultPage;
}

// HTML Quiz Handler
document.getElementById('submitHtmlQuiz')?.addEventListener('click', function () {
    const htmlCorrectAnswers = {
        q1: 'b', // Hyper Text Markup Language
        q2: 'c', // <!DOCTYPE html>
        q3: 'a', // <h1> to <h6>
        q4: 'b', // <br>
        q5: 'd'  // <img>
    };
    evaluateQuiz('htmlQuizForm', htmlCorrectAnswers, './quiz-result.html');
});

// CSS Quiz Handler
document.getElementById('submitCssQuiz')?.addEventListener('click', function () {
    const cssCorrectAnswers = {
        q1: 'b', // Cascading Style Sheets
        q2: 'a', // body {color: black;}
        q3: 'b', // /* this is a comment */
        q4: 'b', // #example
        q5: 'a'  // background-color
    };
    evaluateQuiz('cssQuizForm', cssCorrectAnswers, './quiz-result.html');
});

// JavaScript Quiz Handler
document.getElementById('submitJsQuiz')?.addEventListener('click', function () {
    const jsCorrectAnswers = {
        q1: 'a', // <script src="script.js">
        q2: 'b', // function myFunction()
        q3: 'a', // alert("Hello World");
        q4: 'a', // // this is a comment
        q5: 'a'  // document.getElementById("myInput").value;
    };
    evaluateQuiz('jsQuizForm', jsCorrectAnswers, './quiz-result.html');
});
