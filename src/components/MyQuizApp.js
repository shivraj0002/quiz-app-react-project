import React, { useState } from 'react'
import data from './data'
import './MyQuizApp.css'
const MyQuizApp = () => {
    const [start, setStart] = useState(true);   // this is for conditional rendering for start btn
    const [showScore, setshowScore] = useState(false); // this is for conditonal rendering for showing score
    const [correctOptions, setCorrectOptions] = useState(0)
    const [attemptedQuestions, setAttemptedQuestions] = useState(0)

    const startBtnClickHandler = () => {
        setStart(false)
        setshowScore(false)
        setCorrectOptions(0)
        setAttemptedQuestions(0)
    }
    const cheackAnswereHandler = (variant, index, id) => {
        console.log("question btn clicked");
        if (variant === data[index].answer) {
            // console.log("mathced");
            setCorrectOptions((pre) => pre + 1)
        }
        setAttemptedQuestions((pre) => pre + 1)

        // using the querySelectorAll for disabling crrunt question answers
        let btns = document.querySelectorAll(`#btn-${id}`);
        // console.log(btns);
        // itreting through the querySelectorAll elements which have unique id for eact question answers
        for (let i = 0; i < btns.length; i++) {
            let act = btns[i];
            // console.log(act);
            act.disabled = true;
        }
        console.warn("All btns for this question is not disabled");

        // console.log(variant);
        // console.log(index);
        // console.log(id);
    }
    const submitAnsweresHandler = () => {
        setStart(true)
        setshowScore(true)

    }
    if (start) {
        return (
            <div className='start'>
                <h2 className='heading'>Quiz App</h2>
                {showScore && <div className='score'> <p>
                    {`Your have answered ${correctOptions}/${data.length} correctly`}
                </p>
                </div>}
                <center>
                    <button className='start-btn' onClick={startBtnClickHandler}>Start Quiz</button>
                </center>
            </div>
        )
    } else {
        return (
            <>
                <h2 className='heading'>Quiz App</h2>

                <div className='questionContainer'>
                    {
                        data.map((question, index) => {
                            return (<div className='question' key={question.id}>
                                <h3 className='questionTitle'>{question.question}</h3>
                                <br />
                                {question.variants.map((variant) => {
                                    return (
                                        <button className='questionOpt' id={`btn-${question.id}`} onClick={() => { cheackAnswereHandler(variant, index, question.id) }}>{variant}</button>
                                    )
                                })}
                            </div>)
                        })
                    }

                </div>
                {
                    attemptedQuestions === data.length && <center><button className='submitBtn' onClick={submitAnsweresHandler}>submit</button></center>
                }
            </>
        )
    }
}

export default MyQuizApp