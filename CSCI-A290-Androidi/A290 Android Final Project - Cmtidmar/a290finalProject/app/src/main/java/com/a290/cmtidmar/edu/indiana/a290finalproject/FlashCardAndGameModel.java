package com.a290.cmtidmar.edu.indiana.a290finalproject;

import java.util.Random;

public class FlashCardAndGameModel {

    /* VARIABLE INITIALIZATION */
    int currentQuestionIndex = 0;
    int currentAnswerIndex = 0;

    String[] questions = new String[]{"What is an NTP?",
            "Events that are concurrent are in...?",
            "What is the 'holy grail' of distributed computing?",
            "A ____ is always-on host and has a permanent IP address.",
            "A ____ communicates with a server.",
            "Logical communication between hosts...",
            "Logical communication between processes...",
            "What does UDP stand for?"};

    String[] answers = new String[]{"Network Time Protocol", "Partial Order", "Totally Ordered Multicast", "Server", "Client", "Network Layer", "Transport Layer", "User Datagram Protocol"};

    /* FUNCTION FOR LearnActivityViewController
    * @return: question at current index  */
    public String getNextQuestion(){
        if (questions.length >= 0){
            currentQuestionIndex  = currentQuestionIndex + 1;
        }
        if (currentQuestionIndex == questions.length){
            currentQuestionIndex = 0;
        }
        return questions[currentQuestionIndex];

    }
    /* FUNCTION FOR LearnActivityViewController
     * @return: answer at current index  */
    public String getAnswer(){
        if (answers.length >= 0){
            currentAnswerIndex = currentAnswerIndex + 1;
        }
        return answers[currentQuestionIndex];
    }

}

