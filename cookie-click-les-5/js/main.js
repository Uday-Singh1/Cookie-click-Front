class Cookie {
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    //Dit wordt 1x uitgevoerd wanneer "new" wordt gebruikt.
    constructor(newName, newHTMLElement, newScore) {
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }

    onCookieClicked = () => {
        this.score.onCookieClicked(this.factor);
    }

    onStyleChange() {
        this.htmlElement.classList.add("cookie--chocolate");
    }

    onStyleChange2() {
        this.htmlElement.classList.add("cookie--valvet");
    }
}

//SCORE
class Score {
    score = "";
    name = "";
    htmlElement = undefined;

    constructor(newScore, newName, newHTMLElement) {
        this.score = newScore;
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.innerText = newScore;
    }

    onCookieClicked(factorFromCookie) {
        this.score = this.score + factorFromCookie; // plus 1
        this.htmlElement.innerText = this.score;
    }
    //aftrekken van score
    subtractScore() {
        this.score = this.score - 100; // min 100
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClicked = () => {
        setInterval(() => {
            this.score = this.score + 500;
            this.htmlElement.innerText = this.score;
            console.log("hallo");
        }, 800)
    }

    addPoints() {
        this.score = this.score + 10000;
        this.htmlElement.innerText = this.score;
    }

    scoreLoaded(newScore) {
    this.score = newScore;
    this.htmlElement.innerText = this.score;

}
}

class Multiplier {
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onMultiplierClicked;
    }

    onMultiplierClicked = () => {
        if (this.bought === false && window.localStorage.getItem("multi") !== "true") {
            this.bought = true;
            window.localStorage.setItem("multi", this.bought);
            this.cookie.score.subtractScore();    // remove 100 points from score
            this.cookie.factor = this.factor;
        }
    }
}

class AutoScore {
    htmlElement = undefined;
    score = undefined;
    bought = false;

    constructor(htmlElement) {
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClicked;
    }

    onAutoScoreClicked = () => {
        if (this.bought === false && window.localStorage.getItem("auto") !== "true") {
            this.bought = true;
            window.localStorage.setItem("auto", this.bought);
            this.score.subtractScore();
            score.onAutoScoreClicked();
            
        }
    }
}


class ChocolateCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocolateCookieClicked;
        //window.localStorage.setItem("chocolateCookie",this.bought);
    }

    onChocolateCookieClicked = () => {
        if (this.bought === false && window.localStorage.getItem("chocolateCookie") !== "true") {
            this.bought = true;
            window.localStorage.setItem("chocolateCookie", this.bought);
            this.cookie.score.addPoints();
        }
        this.cookie.onStyleChange();
    }

}

class ValvetCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onValvetCookieClicked;
    }

    onValvetCookieClicked = () => {
        if (this.bought === false && window.localStorage.getItem("ValvetCookie") !== "true") {
            this.bought = true;
            window.localStorage.setItem("ValvetCookie",this.bought); 
            this.cookie.score.addPoints();
        }
        this.cookie.onStyleChange2();

    }

}


class Save {
    htmlElement;

    constructor(newHTMLElement){
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onSaveButtonClicked;

    }

    onSaveButtonClicked = () => {
        window.localStorage.setItem("score", score.score);
        //kijk hier of multiplier gekocht is, zo ja zet dan dan in localstorage
    }
}
 
class Load {
    score;

    constructor(score) {
        this.score = score;
        this.onLoad();
    }

    onLoad = () => {
        
        const scoreFromLocalStorage = window.localStorage.getItem("score");
        if (scoreFromLocalStorage !== null) {
            this.score.scoreLoaded(parseInt(scoreFromLocalStorage));
        }


        const autoFromLocalStorage = window.localStorage.getItem("auto");
        if (this.autoFromLocalStorage === "true") {
            this.score.onAutoScoreClicked();
        }

        const multiplierFromLocalStorage = window.localStorage.getItem("multi");
        if (this.multiplierFromLocalStorage === "true") {
            Multiplier.cookie.factor = Multiplier.factor;
        
        }

       
    }
}


/*setup for score and cookie */
const score = new Score(0, "Default Score", document.getElementById("js--score"));
const cookie = new Cookie("Default Cookie", document.getElementById("js--cookie"), score);

/*setup for Desktop upgrades */
const multi = new Multiplier(document.getElementById("js--multiplier"), cookie);
const auto = new AutoScore(document.getElementById("js--autoScore"), score);
const chocolate = new ChocolateCookie(document.getElementById("js--chocolate"), cookie);
const valvet = new ValvetCookie(document.getElementById("js--red--valvet"), cookie);
/* SAVE */
const save = new Save(document.getElementById("js--save"));
const load = new Load(score);

/*setup for Mobile upgrades */
const multiplierMobile = new Multiplier(document.getElementById("js--multiplier--mobile"), cookie);
const autoMobile = new AutoScore(document.getElementById("js--autoScore--mobile"), score);
const chocolateMobile = new ChocolateCookie(document.getElementById("js--chocolate--mobile"), cookie);
const valvetMobile = new ValvetCookie(document.getElementById("js--red--valvet--mobile"), cookie);
//window.localStorage.clear();
//window.localStorage.setItem("name", "Uday");
//console.log(window.localStorage);

//localStorage.clear();