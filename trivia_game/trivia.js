var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var number = 35;
var intervalId;

    var myQuestions = [
    {
      question: "What is my favorite food?",
      answers: {
        a: "Pizza",
        b: "Pasta",
        c: "Burgers",
        d: "BBQ"
      },
      correctAnswer: "b"
    },
    {
      question: "What is my favorite sport?",
      answers: {
        a: "Soccer",
        b: "Basketball",
        c: "Tennis",
        d: "Baseball"
      },
      correctAnswer: "a"
    },
    {
      question: "What movie am I named after?",
      answers: {
        a: "The Little Mermaid",
        b: "Frozen",
        c: "Mulan",
        d: "All of the Above"
      },
      correctAnswer: "a"
    },
    {
      question: "What is my favorite number?",
      answers: {
        a: "22",
        b: "36",
        c: "14",
        d: "12"
      },
      correctAnswer: "d"
    },
    {
      question: "What is my favorite candy?",
      answers: {
        a: "Skittles",
        b: "Snickers",
        c: "Baby Ruth",
        d: "M&M"
      },
      correctAnswer: "d"
    }
  ];

  function buildQuiz(){
    var output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // we'll want to store the list of answer choices
        var answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    
      function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
      }
  
      //  The decrement function.
      function decrement() {
  
        //  Decrease number by one.
        number--;
  
        //  Show the number in the #show-number tag.
        $("#show-number").html("<h2>Seconds Left: " + number + "</h2>");
  
  
        //  Once number hits zero...
        if (number === 0) {
  
          //  ...run the stop function.
          stop();
          showResults();
  
          //  Alert the user that time is up.
          alert("Time Up!");
        }
      }
      function stop() {

        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
      }
    run();
    });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
    }

    function showResults(){

      // gather answer containers from our quiz
      var answerContainers = quizContainer.querySelectorAll('.answers');
    
      // keep track of user's answers
      var numCorrect = 0;
    
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
    
        // find selected answer
        var answerContainer = answerContainers[questionNumber];
        var selector = 'input[name=question'+questionNumber+']:checked';
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
    
        // if answer is correct
        if(userAnswer===currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
    
          // color the answers blue
          answerContainers[questionNumber].style.color = 'blue';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
    
      // show number of correct answers out of total
      resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
    }

    // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);