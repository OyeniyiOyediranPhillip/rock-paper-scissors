import Head from "next/head";
import styles from "/styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandScissors, faCheck, faHandPaper, faHandRock } from "@fortawesome/free-solid-svg-icons";


const Page = () => {

  const [rulesVisible, setRulesVisible] = useState(false);

  const [MyScore, setMyScore] = useState(0);

  const [ComputerScore, setComputerScore] = useState(0);

  const [GameStatus, setGameStatus] = useState({});

  const [ScoreModal, setSCoreModal] = useState(false);
  
  const [Alert, setAlert] = useState(false);

  const [Restart, setRestart] = useState(false);

  const modalParentVariant = {
    initial:{
        opacity:0
    },
    animate:{
        opacity:0.9,
        transition:{
            delay:0.3,
            duration:0.5,
            when:"beforeChildren"
        }
    },
    exit:{
        opacity:0,
        transition:{
          duration:0.5,
          delay:0.5,
          when:"afterChildren"
        }
    }
  };

  const modalContentVariant = {
    initial:{
      x:"-100vw"
    },
    animate:{
      x:0,
      transition:{
        duration:0.5,
        delay:0.8
      }
    },
    exit:{
      x:"-100vw",
      transition:{
        duration:0.3
      }
    }
  };

  const scoreVariant = {
    initial:{
      x:"-100vw"
    },
    animate:{
      x:0,
      transition:{
        delay:0.8,
        duration:0.5
      }
    },
    exit:{
      x:"-100vw",
      transition:{
        duration:0.3
      }
    }
  };

  const showRules = ()=>{
    setRulesVisible(true);
  };

  const showScore = ()=>{
    setSCoreModal(true);
  };

  const closeScore = ()=>{
    setSCoreModal(false);
  };

  const gameResult = (player)=>{
    let computer;
    const random = Math.ceil(Math.random() * 9);
    if(random <= 3)
      computer = "rock";
    else if(random <= 6)
      computer = "paper";
    else if(random <= 9)
      computer = "scissors";

    if(player == computer){
      setGameStatus({
        player,
        computer,
        result:"draw"
      })
    }
    else if((player == "rock") && (computer == "paper")){
      setComputerScore(ComputerScore + 1);
      setGameStatus({
        player,
        computer,
        result:"loss"
      })
    }
    else if((player == "rock") && (computer == "scissors")){
      setMyScore(MyScore + 1);
      setGameStatus({
        player,
        computer,
        result:"win"
      })
    }
    else if((player == "paper") && (computer == "rock")){
      setMyScore(MyScore + 1);
      setGameStatus({
        player,
        computer,
        result:"win"
      })
    }
    else if((player == "paper") && (computer == "scissors")){
      setComputerScore(ComputerScore + 1);
      setGameStatus({
        player,
        computer,
        result:"loss"
      })
    }
    else if((player == "scissors") && (computer == "paper")){
      setMyScore(MyScore + 1);
      setGameStatus({
        player,
        computer,
        result:"win"
      })
    }
    else if((player == "scissors") && (computer == "rock")){
      setComputerScore(ComputerScore + 1);
      setGameStatus({
        player,
        computer,
        result:"loss"
      })
    }
    else{
      setGameStatus({
        player,
        computer,
        result:undefined
      })
    }
    showScore();
  };

  const remark = (value)=>{
    if(value == "draw")
      return "It's a stalemate"
    else if(value == "win")
      return "You Won"
    else if(value == "loss")
      return "Computer Won"
    else
      return undefined
  };

  const closeRules = () =>{
    setRulesVisible(false)
  };

  const decodeIcon = (value)=>{
    if(value == "rock")
      return faHandRock
    else if(value == "paper")
      return faHandPaper;
    else if(value == "scissors")
      return faHandScissors;
    else
      return undefined
  };

  const restartGame = ()=>{
    setRestart(true);
  };

  const ClearScore = ()=>{
    setMyScore(0);
    setComputerScore(0);
    setRestart(false);
    setAlert(true)
    autoCloseAlert();
  };

  const closeAlert = ()=>{
    setAlert(false)
  };
  
 const alertRef = useRef(null);

 const autoCloseAlert = ()=>{
   alertRef.current = setTimeout(() => {
     closeAlert();
   }, 5000);
 }

 useEffect(() => { 
   return () => {
     clearTimeout(alertRef.current)
   }
 }, [])

  const [RulesArray,setRulesArray] = useState(["Click on any of the three icons to make your choice",
  "The restart button gets the score record wiped", "Have FUN !!!" ]);

  return (
    <div>
      <Head>
        <title>Rock Paper Scissors</title>
        <meta name="description" content="rock paper scissors web game"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.root}`}>
        <section className={`${styles.play} mx-auto rounded`}>
          {
            Alert &&
            <div className={`${styles.alert} mx-auto mt-2 rounded d-flex`}>
              <span className="pt-2">Scoreline successfully cleared</span>
              <span className={`display-6 mx-2 rounded bg-light text-danger px-2 ${styles.alertClose}`} onClick={closeAlert}>X</span>
          </div>
          }
          <div className={`px-2 py-5 fa-3x`}>
            <div className={`d-flex mb-5`}>
              <FontAwesomeIcon icon={faHandRock} onClick={()=>{gameResult("rock")}} className={`${styles.rock} mx-4`}/>
              <FontAwesomeIcon icon={faHandPaper} onClick={()=>{gameResult("paper")}} className={`${styles.paper} mx-4`}/>
            </div>
            <FontAwesomeIcon icon={faHandScissors} onClick={()=>{gameResult("scissors")}} className={`${styles.scissors}`}/>
          </div>
          <div className="d-flex justify-content-between px-3 lead">
            <p onClick={restartGame} className={`${styles.rulesButton}`}>restart</p>
            <p onClick={showRules} className={`${styles.rulesButton}`}>rules</p>
          </div>
        </section>

        <AnimatePresence>
          {
            rulesVisible &&
            <motion.section variants={modalParentVariant} exit="exit" initial="initial" animate="animate" className={`${styles.modalOverlay} w-100`}>
              <motion.div variants={modalContentVariant} exit="exit" animate="animate" initial="initial" className={`lead mx-auto ${styles.rulesContent}`}>
                {
                  RulesArray.map((q,index)=>{
                    return (
                      <motion.div key={index}
                      initial={{x:"-150vw"}}
                      animate={{x:0}}
                      transition={{delay:index + 1.2, duration:0.5}}>
                        <FontAwesomeIcon icon={faCheck}/>{q}
                      </motion.div>
                    )
                  })
                }
                <div className={`mt-5 mx-auto ${styles.closeButton}`} onClick={closeRules}>Close</div>
              </motion.div>
            </motion.section>
          }
        </AnimatePresence>

        <AnimatePresence>
          {
            ScoreModal &&
            <motion.section variants={modalParentVariant} initial="initial" animate="animate" exit="exit" className={`${styles.modalOverlay} w-100`}>
              <motion.div className={` mx-auto ${styles.scoreModal}`} variants={scoreVariant} exit="exit" animate="animate" initial="initial">
              <div className={`${styles.scoreSection}  mx-auto lead  border border-light rounded`}>
                <div className="d-flex justify-content-between"><span> You : </span> <span>{MyScore}</span></div>
                <span className={`${styles.computerScore}`}>Computer : {ComputerScore}</span>
              </div>
              <hr />
              <div className={`d-grid justify-content-around lead ${styles.statement}`}>
                <p className="d-flex float-left">You Picked</p>
                <p className={`${styles.computerStatement}`}>Computer Picked</p>
              </div>
              <div className="d-flex">
                <FontAwesomeIcon icon={decodeIcon(GameStatus.player)} className={`${GameStatus.player} ${GameStatus.result == "win" && styles.boxShadow} fa-2x`}/>
                <p className="display-6 text-capitalize mt-4 mx-1 ">{remark(GameStatus.result)}</p>
                <FontAwesomeIcon icon={decodeIcon(GameStatus.computer)} className={`${GameStatus.computer}  ${GameStatus.result == "loss" && styles.boxShadow} fa-2x`}/>
              </div>
              <div className={`mt-5 mx-auto ${styles.closeButton}`} onClick={closeScore}>Close</div>
              </motion.div>
            </motion.section>
          }
        </AnimatePresence>

        <AnimatePresence>
          {
            Restart &&
            <motion.section variants={modalParentVariant} initial="initial" animate="animate" exit="exit" className={`${styles.modalOverlay} w-100 `}>
              <motion.div variants={modalContentVariant} exit="exit" initial="initial" animate="animate" className={`${styles.restartModal} mx-auto`}>
                <div className={`${styles.scoreSection}  mx-auto lead border border-light rounded`}>
                  <div className="d-flex justify-content-between"><span> You : </span> <span>{MyScore}</span></div>
                  <span className={`${styles.computerScore}`}>Computer : {ComputerScore}</span>
                </div>
                <p className="lead mt-3 text-danger">Clear score record and restart?</p>
                <div className="d-flex mt-5 justify-content-between">
                  <span className={`${styles.restartButtons} bg-primary`} onClick={()=>setRestart(false)}>cancel</span>
                  <span className={`${styles.restartButtons} bg-danger`} onClick={ClearScore}>proceed</span>
                </div>
              </motion.div>
            </motion.section>
          }
        </AnimatePresence>
      </main>
    </div>
  )
}

export default Page
