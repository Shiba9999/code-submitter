const puppeteer=require("puppeteer");
let { answers } = require("./codes");
let cTab
let browserOpenPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args: ["--start-maximized"]
})
browserOpenPromise
                .then(function(browser){
                    let alltabsArrpromise=browser.pages();
                    return alltabsArrpromise;
                }).then(function(allTabsArr){
                    cTab=allTabsArr[0];
                    let visitLoginpagePromise=cTab.goto("https://www.hackerrank.com/auth/login");
                    return visitLoginpagePromise;
                }).then(function(){
                    let emailwillTypedPromise=cTab.type("input[name='username']","virew80130@0pppp.com",{delay:10});
                    return emailwillTypedPromise;
                }).then(function(){
                    let emailwillTypedPromise=cTab.type("input[name='password']","virew@12345", {delay: 10});
                    return emailwillTypedPromise;
                }).then(function(){
                   let loginPromise=cTab.click("button[data-analytics='LoginPassword']");
                   return loginPromise;
                })
                // .then(function(){
                // //     let waitforIpKit=cTab.waitForSelector("#base-card-1-link",{visible:true});
                // //     return waitforIpKit;
                // // }).then(function(){
                // //     let gotoIpKit=cTab.click("#base-card-1-link");
                // //     return gotoIpKit;
                //  })
                .then(function(){
                   let waitforIpKit= waitAndClick("#base-card-1-link");
                   return waitforIpKit;
                })
                //  .then(function(){
                //     let waitforWarmup=cTab.waitForSelector("a[data-attr1='warmup']",{visible:true});
                //     return waitforWarmup;
                // }).then(function(){
                //     let clickonWampup=cTab.click("a[data-attr1='warmup']");
                //     return clickonWampup;
                //  })
                .then(function(){
                    let waitforWarmup=waitAndClick("a[data-attr1='warmup']");
                    return waitforWarmup;
                })  .then(function(){
                    let waitForQuestions=cTab.waitForSelector("a[data-analytics='ChallengeListChallengeName']",{visible:true});
                    return waitForQuestions;
                }).then (function(){
                    function  consoleWalaFn(){
                        let allElem=document.querySelectorAll("a[data-analytics='ChallengeListChallengeName']");
                        let linksArr=[];
                        for(let i=0;i<allElem.length;i++){
                            linksArr.push(allElem[i].getAttribute("href"));
 
                        }
                        return linksArr;
                    }
                    let linkArrpromise= cTab.evaluate(consoleWalaFn);
                    return linkArrpromise;
                }).then(function (linksArr) {
                    // console.log(linksArr);
                    // bugs code -> 
                    let questionWillBeSolvedPromise = questionSolver(linksArr[0], 0);
                    // loop chaining 
                    for (let i = 1; i < linksArr.length; i++) {
                        questionWillBeSolvedPromise = questionWillBeSolvedPromise
                            .then(function () {
                                return questionSolver(linksArr[i], i);
                            })
                    }
                    return questionWillBeSolvedPromise;
                }).then(function () {
                    console.log("Question printed code is moved to clipboard");
                }).catch(function (err) {
                    console.log(err);
                })

                

    function waitAndClick(selector){
        //wait+click
        return new Promise(function(resolve,reject){
            let waitForElementPromise=cTab.waitForSelector(selector,{visible:true});
            waitForElementPromise
                               .then(function(){
                                   let clickPromise=cTab.click(selector);
                                   return clickPromise;

            })
            .then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            })
                                  
        })
    } 

      function questionSolver (url,idx){
          return new Promise(function(resolve,reject){
              //go to page
              let fullLink = `https://www.hackerrank.com${url}`;
              let goToQuestionPagePromise=cTab.goto(fullLink);
              goToQuestionPagePromise
                                  .then(function(){
                                      let waitForCheckBoxAndClick=waitAndClick(".checkbox-input");
                                      return waitForCheckBoxAndClick;
                                      //input wait box and click
                                   }).then (function(){
                                    let waitForTextBox = cTab.waitForSelector(".custominput", { visible: true });
                                    return waitForTextBox;
                                    //text box data input

                                   }).then(function(){
                                    let codeWillBeAddedPromise = cTab.type(".custominput", answers[idx], { delay: 10 });
                                    return codeWillBeAddedPromise;

                                
                                   }).then(function(){
                                       let ctrlWillBeDownPromise=cTab.keyboard.down("Control");
                                       return ctrlWillBeDownPromise;
                                   }).then(function(){
                                       let aWillBepressedPromise=cTab.keyboard.press("a");
                                       return aWillBepressedPromise;
                                   }).then(function(){
                                    let xWillBepressedPromise=cTab.keyboard.press("x");
                                    return xWillBepressedPromise;
                                   }).then(function(){
                                    let pointerWillBeClicked = cTab.click(".monaco-editor.no-user-select.vs");
                                    return pointerWillBeClicked;
                                   }).then(function(){
                                       let awillBePressedOnPointer=cTab.keyboard.press("a");
                                       return awillBePressedOnPointer;
                                   }).then(function(){
                                       let codePastePromise=cTab.keyboard.press("v");
                                       return codePastePromise;
                                   }).then(function(){
                                       let submitWillClickPromise=cTab.click(".hr-monaco-submit");
                                       return submitWillClickPromise;
                                   }).then(function () {
                                    let ctrWillBeDownPromise = cTab.keyboard.up("Control");
                                    return ctrWillBeDownPromise;
                                })
                                   
                                   .then(function(){
                                       resolve();

                                   }).catch(function(err){
                                       reject(err);
                                   })



          })
      }
     


        //dynamic site-> id change
        //create new promise
        
