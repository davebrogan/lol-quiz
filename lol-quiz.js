"use strict";

// lol quiz
/*
other ideas:
make wrong answers red and correct answers green.
or put an x by the wrong answer and a check by the right one.
show after 'submit answers'
display wrong answers with corrections to the user
flatten css, remove cascading, BEM?
make a "single page" version using AJAX
*/

//to do's
//make the onclicks in markup eventhandlers in JS
//enter answer (next) with enter (return) key
//figure out what to do with submit answers. maybe have it pulse a little when quiz is finished to make it stand out from "next"
//after last question is answered have the question panel disappear, move the "submit answers" button from and center
//display a "go back" button below it. Or it could be a back arrow with "go back" below it
//hide elements with css state classes i.e. "-is-hidden"
//is it accessible?
//allow user to enter name


var allQuestions = [
    {
        question: "LOL Surprise Dolls are made by which company?",
        choices: ["Mattel", "MGA Entertainment", "Funko", "Fisher Price"],
        correctAnswer: 1
    },
    {
        question: "What is the term for different colored balls within a series?",
        choices: ["Grouped", "Confetti Pop", "Waves", "Under Wraps"],
        correctAnswer: 2
    },
    {
        question: "What series of LOL Dolls comes in a capsule instead of a ball?",
        choices: ["Confetti Pop", "Glam Glitter", "Under Wraps", "Li'l Sisters"],
        correctAnswer: 2
    },
    {
        question: "What year did LOL Surprise dolls come out?",
        choices: ["2008", "2011", "2014", "2016"],
        correctAnswer: 3
    },
    {
        question: "What is the name of the only boy in the Confetti Pop series?",
        choices: ["Li'l Skater Boy", "Li'l Baby Bonito", "Punk Boy", "Li'l Punk Boy"],
        correctAnswer: 2
    },
    {
        question: "In the Opposites Club, who is the opposite to Fresh?",
        choices: ["Fancy", "Spice", "Funky QT", "Teacher’s Pet"],
        correctAnswer: 0
    },
    {
        question: "In which series can the LOL Surprise Ball also be used as a tree ornament?",
        choices: ["Under Wraps", "Confetti Pop", "Bling", "Li'l Sisters"],
        correctAnswer: 2
    },
    {
        question: "How many surprise layers are in the Limited Edition LOL Big Surprise ball?",
        choices: ["20", "40", "50", "60"],
        correctAnswer: 2
    },
    {
        question: "How many LOL Lil Sisters dolls are there in Series 2?",
        choices: ["17", "29", "36", "47"],
        correctAnswer: 3
    }
];

//global NodeLists, HTMLCollections and other html element variables
let questionWrapper = document.getElementById('question-wrapper');
let allButtons = document.getElementsByName('answer');
let numberCorrect = document.getElementById('number-correct');
let answerLists = document.getElementsByClassName('answer-list');
let answerBlock = document.getElementById('answer-block');
let directionBlock = document.getElementById('direction-block');
let questionCount = document.getElementById('question-number');
let questionTotal = document.getElementById('question-total');
let submitButton = document.getElementById('submit-answers');
//let displayToggle = ['style', 'display:none;'];


//answer objects
let answers = [];
let totalCorrect = 0;
//answer output
numberCorrect.innerHTML = '...';

//create html based on the allQuestions array object
function makeQuestionAndAnswers(i) {
    let makeOuterForm = document.createElement('form');
    makeOuterForm.setAttribute("class", "outer-form");
    //set first form card to .show-question'
    if (i === 0) {
        makeOuterForm.setAttribute('id','show-question');
    }
    questionWrapper.appendChild(makeOuterForm);
    makeOuterForm.innerHTML += '<li class="question">' + allQuestions[i].question + '</li>';
    let innerList = document.createElement('ul');
    innerList.setAttribute('type','a');
    innerList.setAttribute('class','answer-list');
    makeOuterForm.appendChild(innerList);
    for (var j = 0; j < 4; j++) {
        innerList.innerHTML += '<li class="answer-item">' + '<input type="radio" name="answer" value="1">' + allQuestions[i].choices[j] + '</li>';
    }
    let firstAnswer = innerList.firstChild.firstChild;
    firstAnswer.checked = true;
    firstAnswer.focus();
}


//make the questions from allQuestions
allQuestions.forEach(function (el,i) {
    makeQuestionAndAnswers(i);
});

var questionCardsNodes = document.querySelectorAll('.outer-form');
var allAnswers = document.getElementsByTagName('ol');
//initially hide the submit button
submitButton.setAttribute('style', 'display:none;');


//set and display question number tracker
let currentQuestionNum = 1;
let questionsLength = questionCardsNodes.length;
questionCount.innerHTML = currentQuestionNum;
questionTotal.innerHTML = questionsLength;


//log answers, forward and back button behavior, input validation with alert for empty input
function questionMove3(buttonId) {
  let idName = 'show-question';
  let lastItem = questionCardsNodes.length - 1;
  let currentIndex;

  for (var i = 0; i < questionCardsNodes.length; i++) {
    if (questionCardsNodes.item(i).getAttribute('id') === idName) {
      currentIndex = i;
      break;
    }
  }

  function checkInputsOn(n) {
    let radioList = questionCardsNodes.item(n).getElementsByTagName('input');
    let checkCount = 0;
    for (var i = 0; i < radioList.length; i++) {
      if (radioList[i].checked === true) {
        checkCount++;
      }
    }
    if (checkCount < 1) {
      alert('Please check an answer. You can go back and change it later if you wish.');
      return true;
    } else {
      return false;
    }
  }

  /*****************next and previous*********************/
  if (currentIndex === 0) {
    if (buttonId === 'next') {
      if (checkInputsOn(currentIndex)) {
        return;
      } else {
        questionCardsNodes.item(currentIndex).removeAttribute('id');
        questionCardsNodes.item(currentIndex + 1).setAttribute('id', idName);
        allAnswers.item(currentIndex + 1).firstChild.firstElementChild.focus();
        questionCount.innerHTML = currentIndex + 2;
      }
    }
  }
  if (currentIndex === lastItem) {
    if (buttonId === 'prev') {
      questionCardsNodes.item(currentIndex).removeAttribute('id');
      questionCardsNodes.item(currentIndex - 1).setAttribute('id', idName);
      questionCount.innerHTML = currentIndex;
    } else if (buttonId === 'next') {
      if (checkInputsOn(currentIndex)) {
        return;
      } else {
        document.getElementById('next').setAttribute('style', 'display:none;');
        submitButton.removeAttribute('style');
        questionCardsNodes.item(currentIndex).removeAttribute('id');
        directionBlock.setAttribute('class', 'submit-state');
        document.getElementById('prev').innerText = "Go Back";
      }
    }
  }
  if ((currentIndex > 0) && (currentIndex < lastItem)) {
    //questionCardsNodes.item(currentIndex).removeAttribute('id');
    if (buttonId === 'prev') {
          questionCardsNodes.item(currentIndex).removeAttribute('id');
          questionCardsNodes.item(currentIndex - 1).setAttribute('id', idName);
          questionCount.innerHTML = currentIndex;
    } else if (buttonId === 'next') {
        if (checkInputsOn(currentIndex)) {
            return;
        } else {
            questionCardsNodes.item(currentIndex).removeAttribute('id');
            questionCardsNodes.item(currentIndex + 1).setAttribute('id', idName);
            allAnswers.item(currentIndex + 1).firstChild.firstElementChild.focus();
            questionCount.innerHTML = currentIndex + 2;
        }
    }
  }
}
/**********************************/

function keyedMove(e) {
    var event = window.event ? window.event : e;
    if (event.key === 'ArrowLeft') {
        return 'prev';
    } else if (event.key === 'ArrowRight') {
        return 'next';
    }
 }

 document.addEventListener('keydown', function(event) {
     if (event.key === 'ArrowLeft' || 'ArrowRight') {
         questionMove3(keyedMove(event));
     } else if (event.key === 'Return' || 'Enter') {
         questionMove3('next'); //not working
     }
 });


function tallyScore() {
    answers.forEach(function(answer,i) {
        if (answer === allQuestions[i].correctAnswer) {
            totalCorrect++
        }
    });
    var perfScore;
    if (totalCorrect === allQuestions.length) {
        perfScore = "Congrats. You got a PERFECT SCORE!!!";
        return numberCorrect.innerHTML = totalCorrect + " out of " + allQuestions.length + " answers correct.<br>" + perfScore;
    } else {
        return numberCorrect.innerHTML = totalCorrect + " out of " + allQuestions.length + " answers correct.<br>";
    }

}


function checkAnswers() {
     for (var i = 0; i < answerLists.length; i++) {
        answerLists.item(i).childNodes.forEach(function(btn,position) {
            if (btn.firstChild.checked) {
                answers.push(position);
            }
        })
    }
    directionBlock.setAttribute('style', 'display:none;');
    answerBlock.removeAttribute('style');
    tallyScore();
}


//need to reset all nodes except 0
function resetGame() {
    totalCorrect = 0;
    allButtons.forEach(function(button) {
        return button.checked = false;
    });
    answers = [];
    questionCardsNodes.forEach(function (el) {
        el.removeAttribute('id');
    });
    questionCardsNodes.item(0).setAttribute('id', 'show-question');
    Array.from(allAnswers).forEach(function(el) {
        el.firstChild.firstChild.checked = true;
    });
    allAnswers.item(0).firstChild.firstElementChild.focus();
    directionBlock.removeAttribute('style').removeAttribute('class');
    answerBlock.setAttribute('style', 'display:none');
    document.getElementById('next').removeAttribute('style');
    submitButton.setAttribute('style', 'display:none;');
    currentQuestionNum = 1;
    questionCount.innerHTML = currentQuestionNum;
    return numberCorrect.innerHTML = '...';

}
