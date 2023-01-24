
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [frequentNumbers, setFrequentNumbers] = useState<number[]>([]);

  const [downloads, setDownloads] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [instructions2, setInstructions2] = useState("");
  const [downloads2, setDownloads2] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);


function getMostOccuring(){
  if (frequentNumbers.length < 1){
    setShow2(true); 
  }else{
   setShow2(false);
  }
}
  const getDownloads = async () => {
    setFrequentNumbers([]);
    setShow2(false);
    setDownloads2([]);
    getDownloads2();
    setInstructions("");
    setDownloads([]);
    setInstructions("Most Occuring");
    setInstructions2("....Loading");
    const res = await fetch("/api/getDownloads");
    //const res2 = await fetch('http://localhost:3000/api/getDownloads2');
    if(res.status === 200){
      setShow(false)
      }else{
        setShow(true)}
   
    const downloads = await res.json();
    //const  downloads2  = await res2.json()
    setDownloads(downloads);
    setInstructions2("");
    getMostOccuring()
  };




  const getDownloads2 = async () => {
    const res2 = await fetch("/api/getDownloads2");
    const downloads2 = await res2.json();
    setDownloads2(downloads2);
  };

  const firstElement = downloads2.slice(0, 1);
  const firstSixElement = downloads.slice(0, 6);

  useEffect(() => {
 
      let downloadCounts: { [key: number]: number } = {};
      let frequentDownloads: number[] = [];
    
      // Create a dictionary to store the count of each number
      for (let i = 0; i < downloads.length; i++) {
        if (downloadCounts[downloads[i]] === undefined) {
          downloadCounts[downloads[i]] = 1;
        } else {
          downloadCounts[downloads[i]]++;
        }
      }
    
      // Iterate over the dictionary and add numbers that appear more than 2 times to frequentDownloads array
      for (let download in downloadCounts) {
        if (downloadCounts[download] > 2) {
          frequentNumbers.push(parseInt(download));
        }
      }
    
  
  }, [downloads]);
  
  
  function closeShow(){
    setInstructions("");
    setInstructions2("");
    setShow(false);
  }

 

  


  return (
    <>
      <div className={styles.App}>
       {show === true? (<div  className={styles.header6}><div className={styles.header23} >
         <div  className={styles.header24}>Network Error!!</div> <div className={styles.header25} onClick={closeShow}>X</div>
        </div></div>):null} 
        <div className={styles.header}>
          <div className={styles.sitelink}><a href="https://logigames.bet9ja.com/Games/Launcher?gameId=11000&provider=0&pff=1&skin=201" 
          target="_blank" rel="noreferrer"  className={styles.sitelink1} >Go to site Used?</a> </div>
          <div className={styles.ifrme}>
            <div className={styles.header7}>Webscrapper built with NextJs</div>
          </div>
          <div className={styles.mainbody3}>
            <div className={styles.mainbody4}>
              <div className={styles.body5}>
                <div>Last Draw : &nbsp;&nbsp;&nbsp;&nbsp;</div>{" "}
                <div className={styles.draw}>
                  {instructions2}
                  {firstElement.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
                <div className={styles.body6}>
                {firstSixElement.map((go, index) => {
                  let style;
                  if (
                    go === "1" ||
                    go === "4" ||
                    go === "7" ||
                    go === "10" ||
                    go === "13" ||
                    go === "16" ||
                    go === "19" ||
                    go === "22" ||
                    go === "25" ||
                    go === "28" ||
                    go === "31" ||
                    go === "34" ||
                    go === "37" ||
                    go === "40" ||
                    go === "43" ||
                    go === "46"
                  ) {
                    style = {
                      backgroundColor: "red",
                    };
                  } else if (
                    go === "2" ||
                    go === "5" ||
                    go === "8" ||
                    go === "11" ||
                    go === "14" ||
                    go === "17" ||
                    go === "20" ||
                    go === "23" ||
                    go === "26" ||
                    go === "29" ||
                    go === "32" ||
                    go === "35" ||
                    go === "38" ||
                    go === "41" ||
                    go === "44" ||
                    go === "47"
                  ) {
                    style = {
                      backgroundColor: "blue",
                    };
                  } else if (
                    go === "3" ||
                    go === "6" ||
                    go === "9" ||
                    go === "12" ||
                    go === "15" ||
                    go === "18" ||
                    go === "21" ||
                    go === "24" ||
                    go === "27" ||
                    go === "30" ||
                    go === "33" ||
                    go === "36" ||
                    go === "39" ||
                    go === "42" ||
                    go === "45" ||
                    go === "48"
                  ) {
                    style = {
                      backgroundColor: "green",
                    };
                  } else if (go === "49") {
                    style = {
                      backgroundColor: "#c9d916",
                      color: "black",
                    };
                  }
                  return   <div  className={styles.mainbody7} style={style} key={index}>{go}</div>
                })}

                </div>
              </div>
            </div>
            <div className={styles.mainbody4}>
              <div className={styles.body5}>
                <div>Upcoming Draw : &nbsp;&nbsp;&nbsp;&nbsp;</div>{" "}
                <div className={styles.draw}>
                  {instructions2}
                  {firstElement.map((item, index) => {
                    item++;
                    return <div key={index}>{item}</div>;
                  })}
                </div>
              </div>
            </div>
            <button className={styles.mainbody5} onClick={getDownloads}>
              Click To Start
            </button>
            <div className={styles.mainbody1}>
              {" "}
              <h3>{instructions} &nbsp;&nbsp;</h3>{" "}
              <h3>
                <div className={styles.draw}>{instructions2} {show2 === true? <h3>None, wait for Next</h3>: null}</div>
              </h3>{" "}
              {downloads && (
                <>
                  {" "}
                  <h3></h3>
                  {frequentNumbers.map((go, index) => {
                    let style;
                    if (
                      go === 1 ||
                      go === 4 ||
                      go === 7 ||
                      go === 10 ||
                      go === 13 ||
                      go === 16 ||
                      go === 19 ||
                      go === 22 ||
                      go === 25 ||
                      go === 28 ||
                      go === 31 ||
                      go === 34 ||
                      go === 37 ||
                      go === 40 ||
                      go === 43 ||
                      go === 46
                    ) {
                      style = {
                        backgroundColor: "red",
                      };
                    } else if (
                      go === 2 ||
                      go === 5 ||
                      go === 8 ||
                      go === 11 ||
                      go === 14 ||
                      go === 17 ||
                      go === 20 ||
                      go === 23 ||
                      go === 26 ||
                      go === 29 ||
                      go === 32 ||
                      go === 35 ||
                      go === 38 ||
                      go === 41 ||
                      go === 44 ||
                      go === 47
                    ) {
                      style = {
                        backgroundColor: "blue",
                      };
                    } else if (
                      go === 3 ||
                      go === 6 ||
                      go === 9 ||
                      go === 12 ||
                      go === 15 ||
                      go === 18 ||
                      go === 21 ||
                      go === 24 ||
                      go === 27 ||
                      go === 30 ||
                      go === 33 ||
                      go === 36 ||
                      go === 39||
                      go === 42 ||
                      go === 45 ||
                      go === 48
                    ) {
                      style = {
                        backgroundColor: "green",
                      };
                    } else if (go === 49) {
                      style = {
                        backgroundColor: "#c9d916",
                        color: "black",
                      };
                    }

                    return (
                      <p className={styles.mainbody2} style={style} key={index}>
                        {go}
                      </p>
                    );
                  })}{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
