// document.documentElement.addEventListener('load', function(){
    // console.log('before while');
    var mode, space, menunav, showbox, dialbox, callbox, calling, menu1, menu2, menu3;
    var callsMade = [];
    var focusOn = document.createEvent('MouseEvent');
    focusOn.initMouseEvent('mouseover', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    // var keySym = document.createEvent('KeyboardEvent'); var toSym = 'q';
    // keySym.initKeyboardEvent('keydown', true, true, window, toSym, 0, '', false, '');
function twoDigit(a){
    if (a.toString().length == 1){
        a = "0" + a;
    }
    return a;
}
function keepTime() {
    var timeNow = new Date();
    var hr = timeNow.getHours();
    var min = timeNow.getMinutes();
    if (hr >= 12) {
        hr = Number(hr) - 12;
        ampm = 'pm';
    } else {
        ampm = 'am';
    }
    if (hr == 0){
        hr = 12;
    }
    hr = twoDigit(hr); 
    min = twoDigit(min);
    totTime = hr + ':' + min;
    document.querySelector('.piecedigit').innerHTML = totTime;
    document.querySelector('.piecepm').innerHTML = ampm;
    document.querySelector('.col-sm-6:nth-of-type(2) .piecedigit').innerHTML = totTime;
    document.querySelector('.col-sm-6:nth-of-type(2) .piecepm').innerHTML = ampm;
    var timeHolder = setTimeout(keepTime, 1000);
}
function clickMenu3() {
    // phoneGet(event);
    if (mode == "home" && dialbox.style.display == "block" && callbox.style.display == "block"){
        home();
    }
    else if (mode == "home" && callsDiv != null){
        console.log('callsDiv != undefined');
        home();
    }
    else if (mode == "home" && dialbox.style.display == "block"){
        tsend('clear');
    }
}
function makeCall(specNumber){
    // phoneGet(event);
    var specNumber = specNumber;
    var callLogObj = function(num, sim, io, pick, duration){
        this.digits = num;
        this.sim = sim;
        this.io = io;
        this.picked = pick;
        this.duration = duration;
        moment = totTime + ampm;
        var dateMaker = new Date();
        dayMaker = twoDigit(dateMaker.getDay());
        monthMaker = twoDigit(dateMaker.getMonth());
        this.times = moment;
        this.fullTime = function(){
            return dayMaker + "-" + monthMaker + ', ' + this.times;
        }
    }
    if (mode == "home" && dialbox.style.display == "block"){
        callbox.style.display = "block";
        if (specNumber != undefined && specNumber != ""){
        var dialedNumber = specNumber;
        } else {
        var dialedNumber = space.value;
        }
        console.log('dialedNumber: ', dialedNumber);
        callingSpan.innerHTML = dialedNumber;
        var presentCall = new callLogObj(dialedNumber, 'SIM1', 'out', 'no', '--:--');
        callsMade.push(presentCall);
        menu1.innerHTML = "";
        menu2.innerHTML = "";
        menu3.innerHTML = "End Call";
        function reachProcess(){
            reachOut(dialedNumber);
        }
        callAnima();
        setTimeout(reachProcess, 3400);
    } else if (mode == "home" && dialbox.style.display == "none") {
        console.log('the call else option');
        var callsDiv =  document.createElement('div');
        callsDiv.classList.add("callsDiv", "bg-theme");
        for (i = 0; i < callsMade.length; i++){
            var callLog = document.createElement('div');
            callLog.classList.add("callLog", "w-100"); 
            var callItems = "<div class='callTop'>";
            var countx = 0;
            for (var x in callsMade[i]){
                countx++;
                switch (countx){
                    case 1: callItems += "\
                    <span class='numSpan'>" + callsMade[i][x] + "</span>";
                    specNumber = callsMade[i][x];
                    callLog.onclick = function(){
                        showbox.removeChild(callsDiv); 
                        console.info('callsDiv removed');
                        makeCall(specNumber);
                    };
                    callLog.title = 'Call ' + specNumber;
                    // callLog.onclick = 'home()';
                        break;
                    case 2: callItems += "\
                    <span class='simSpan float-right'>" + callsMade[i][x] + "</span>\
                <div>";
                        break;
                    case 7: callItems += "\
                <div class='timeSpan d-block'>" + callsMade[i][x]() + "</div>\
                    "; 
                        break;
                    default: callItems += "";
                        break;
                };
                       
            }
            
            callLog.innerHTML = callItems;
            callsDiv.appendChild(callLog);
        }
        if (callsDiv.innerHTML == "" || callsDiv.innerHTML == undefined){
            callsDiv.innerHTML = "\
            <div class='mx-2 mt-4 text-center font-weight-bold p-1 border-1 border-light border-x-0 rounded'\
             style='font-family: Forte, Arial;'>\
                NO CALLS MADE YET!\
            </div>";
        }
        showbox.appendChild(callsDiv);
        topicons.style.opacity = 0;
        menu1.innerHTML = "Options";
        menu2.innerHTML = "Call";
        menu3.innerHTML = "Exit";
    }
    specNumber = "";
    // console.log('presentCall: ', presentCall);
    // console.log('fullTime: ', presentCall.fullTime());
    // console.log('callsMade: ', callsMade);
}
function reachOut(reachNumber){
    mode = "call";
    var reach = reachNumber;
    if (reach == '08040040040' || reach == '*4' || reach == '*blue'){
        rcvBlue(reach);
    }
    if (reach == '08020020020' || reach == '*2' || reach == '*orange'){
        rcvOrange(reach);
    }
    this.reachNumber = reachNumber;
}
function rcvBlue(reach){
    if (reach == '08040040040'){
        var caller = 'Mr. Orange';
        var callerNum = '08020020020';
    }else {
        var caller = reach;
        var callerNum = 'Unknown Number';
    }
    document.querySelector('.col-sm-6:nth-of-type(2) .incoming').style.display = 'block';
    document.querySelector('.col-sm-6:nth-of-type(2) .incomeName').innerHTML = caller;
    document.querySelector('.col-sm-6:nth-of-type(2) .incomeNum').innerHTML = callerNum;
    document.querySelector('.col-sm-6:nth-of-type(2) .menunav').style.background = 'transparent';
    document.querySelector('.col-sm-6:nth-of-type(2) .menu1').innerHTML = 'Options';
    document.querySelector('.col-sm-6:nth-of-type(2) .menu2').innerHTML = 'Mute';
    document.querySelector('.col-sm-6:nth-of-type(2) .menu3').innerHTML = 'Loudspeak.';
}
function rcvOrange(reach){
    if (reach == '08020020020'){
        var caller = 'Mr. Blue';
        var callerNum = '08040040040';
    }else {
        var caller = reach;
        var callerNum = 'Unknown Number';
    }
    document.querySelector('.incoming').style.display = 'block';
    document.querySelector('.incomeName').innerHTML = caller;
    document.querySelector('.incomeNum').innerHTML = callerNum;
    document.querySelector('.menunav').style.background = 'transparent';
    document.querySelector('.menu1').innerHTML = 'Options';
    document.querySelector('.menu2').innerHTML = 'Mute';
    document.querySelector('.menu3').innerHTML = 'Loudspeak.';
}
function tsend(x){
    // space.autofocus = true;
    // phoneGet(event);
    var x = x; spaceValue = space.value;
    console.log('x is: ', x);
    if (x == undefined || x == "&nbsp;"){
        x = "";
    }
    if (space.autofocus != true){
        space.autofocus = true;
        space.addEventListener('keydown', function(event){
            console.log('Keylogged: ', event.key);
            // console.trace();
        });
        space.focus();
    } else {
        // return keySym(x);
        // toSym = 'y';
        var keySym = document.createEvent('KeyboardEvent'); var toSym = x;
        keySym.initKeyboardEvent('keypress', true, true, window, toSym, 0, '', false, '');
        // document.querySelector('input').dispatchEvent(keySym);
        console.log('else of autofocus');
    }
    if (mode = "home"){
        switch (x) {
            case "R": case "T": case "Y": case "U": case "I": case "P":
            case "F": case "G": case "H": case "J":
            case "V": case "B": case "N": case "M":
            dialbox.style.display = "block";
            menu1.innerHTML = "Options";
            menu2.innerHTML = "Save";
            menu3.innerHTML = "Clear";
            menunav.style.background = "transparent";
            x = shiftChar(x);
                
                break;

            case "clear": x = "clear";
                break;

            default: x = "";
                break;
        }
    }
    // space = document.querySelector('input');
    // space = document.querySelector('input').focus;
    // document.querySelector('input').dispatchEvent(focusOn);
    space.focus();
    switch (x) {
        case "*": case "+": toSendValue = spaceValue.concat(x,"");
            break;

        case "clear": toSendValue = spaceValue.slice(0,-1);
        console.log('spaceSliced');
        // console.trace();
            break;

        default: toSendValue = spaceValue.concat("",x);
            break;
    }
    if (space == space){console.log('same space')}
    else {console.log('diff space')};
    space.value = toSendValue;
    if (space.value == ""){
        home();
    }
}
function mutualDisconnect(){
    var incomes = document.querySelector('.incoming');
    // for (var cb = 0; cb < incomes.length; cb++){
        incomes.style.display = 'none';
    // }
    var incalls = document.querySelector('.callbox');
    // for (var cb = 0; cb < incalls.length; cb++){
        incalls.style.display = 'block';
    // }
    var callings = document.querySelector('.calling span:first-of-type');
    // for (var cb = 0; cb < callings.length; cb++){
        callings.innerHTML = 'Disconnecting..';
    // }
    mode = '';
    setPhoneOne();
    setTimeout(homeMutual, 6500);
}
function homeMutual(){
    home();
    setPhoneTwo();
    home();
}
function checkCall(){
    if (mode == 'call'){
        incoming.style.display = 'none';
        console.info('incomeNum:', incomeNum.innerHTML);
        console.info('callingSpan:', callingSpan.innerHTML);
        if (incomeNum.innerHTML == '08040040040' || callingSpan.innerHTML == '08020020020'
        || incomeNum.innerHTML == '08020020020' || callingSpan.innerHTML == '08040040040'){
            console.info('outreach!');
            // setTimeout(mutualDisconnect, 1500);
            mutualDisconnect();
        }
    }
}
function home(){
    checkCall();
    mode = "home";
    console.log("---------------\n HOME MODE");
    // phoneGet(event);
    console.log("space set");
    dialbox.style.display = "none";
    callbox.style.display = "none";
    if (callsDiv != undefined){
    // callsDiv.style.display = "none";
    showbox.removeChild(callsDiv);
    }
    clearTimeout(callAnimaTime);
    callAnimaTime = "";
    space.value = "";
    topicons.style.opacity = 1;
    menunav.style.backgroundColor = "grey";
    menu1.innerHTML = "Go to";
    menu2.innerHTML = "Menu";
    menu3.innerHTML = "Names";
    // console.log('callsDiv.style.display: ', callsDiv.style.display);
}
var callAnimaTime;
function callAnima(){
    var callMageSrc = callNimaImage.src;
    if (callingNima.innerHTML == 'Calling.'){
        callingNima.innerHTML = 'Calling..';
    }
    else if (callingNima.innerHTML == 'Calling..'){
        callingNima.innerHTML = 'Calling...';
    }
    else if (callingNima.innerHTML == 'Calling...'){
        callingNima.innerHTML = 'Calling.';
    }
    // if (callMageSrc.charAt(callMageSrc.length-5) == 'e'){
        // console.log("callMage length:", callMageSrc.length);
        // var newCallMage = callMageSrc.replace("x_dorange", "x_light");
    // } else {
        // var newCallMage = callMageSrc.replace("x_light", "x_dorange");
    // }
    if (callNimaImage.style.visibility == 'visible' || callNimaImage.style.visibility == ''){
        callNimaImage.style.visibility = 'hidden';
    } else if (callNimaImage.style.visibility == 'hidden'){
        callNimaImage.style.visibility = 'visible';
    }
    // document.querySelector('.callImg img').src = newCallMage;
    // console.log("newCallMage: ", newCallMage);
    callAnimaTime = setTimeout(callAnima, 1000);
}
function shiftChar(char){
    var shifted;
    switch (char) {
        case "Q": shifted = '"';
            
            break;
        case "W": shifted = "(";
            
            break;
        case "E": shifted = ")";
            
            break;
        case "R": shifted = "1";
            
            break;
        case "T": shifted = "2";
            
            break;
        case "Y": shifted = "3";
            
            break;
        case "U": shifted = "*";
            
            break;
        case "I": shifted = "+";
            
            break;
        case "O": shifted = "=";
            
            break;
        case "P": shifted = "p";
            
            break;
        case "F": shifted = "4";
            
            break;
        case "G": shifted = "5";
            
            break;
        case "H": shifted = "6";
            
            break;
        case "J": shifted = "#";
            
            break;
        case "K": shifted = "-";
            
            break;
        case "L": shifted = "'";
            
            break;
        case "V": shifted = "7";
            
            break;
        case "B": shifted = "8";
            
            break;
        case "N": shifted = "9";
            
            break;
        case "M": shifted = "0";
            
            break;
        case ",": shifted = ";";
            
            break;
        case ".": shifted = ":";
            
            break;
        case "sym": shifted = "bth";
            
            break;
        case "@": shifted = "/";
            
            break;
        case "?": shifted = "!";
            
            break;
        case "ctrl": shifted = "mute";
            
            break;
    
        default:
            break;
    }
    return shifted;
}
function titleGive(event) {
    var clickWare = document.querySelectorAll('[onclick]');
    for (var i = 0; i < clickWare.length; i++){
        var clickName = clickWare[i].onclick;
        clickWare[i].title = clickName;
        var inPoint = clickName.toString().indexOf('{');
        var stringPoint1 = clickName.toString().lastIndexOf('(');
        var stringPoint2 = clickName.toString().lastIndexOf(')');
        var nameCutOne = clickName.toString().slice(0, inPoint);
        var nameCutTwo = clickName.toString().slice(inPoint+1, clickName.toString().length);
        var newClickName = nameCutOne +
         ' { phoneGet(event); ' + nameCutTwo;
        var clickCut = clickName.toString().slice(inPoint+2, clickName.toString().length-1);
        var clickString = clickName.toString().slice(stringPoint1+2, stringPoint2-1);
        // var otherClickName = (function(event){phoneGet(event); clickName})(event);
        // if (clickCut.indexOf('tsend') != -1){
            // clickWare[i].onclick = function(event){phoneGet(event); tsend(clickString);};
        // }else if (clickCut.indexOf('home') != -1){
            // clickWare[i].onclick = function(event){phoneGet(event); home(clickString);};
        // }else if (clickCut.indexOf('clickMenu3') != -1){
            // clickWare[i].onclick = function(event){phoneGet(event); clickMenu3(clickString);};
        // }else if (clickCut.indexOf('makeCall') != -1){
            // clickWare[i].onclick = function(event){phoneGet(event); makeCall(clickString);};
        // }
        // var otherClickName = function(event){return clickWare[i].onclick};
        // console.log('clickCut: ', clickCut.toString());
        console.log('clickString: ',clickString.toString());
        // clickWare[i].onclick = function(event){phoneGet(event); return otherClickName(event)};
        clickWare[i].title = clickWare[i].onclick;
        // console.log(clickWare[i].onclick.toString());
        // console.log(clickName.toString());
        // clickWare[i].addEventListener('click', phoneGet, false);
    }
}
function nameVars(){
    var classDef = "";
    var allClass = document.querySelectorAll("[class]");
    for (var c = 0; c < allClass.length; c++){
        // console.log(cl);
        var preClass = allClass[c].classList.item(0);
        classDef += "var " + preClass + " = document.querySelector('." + preClass + "');" + "\n";
        // if ()
        // console.log(cl);
    }
    // console.log(classDef);
    var newScript = document.createElement('script');
    var varList = document.createTextNode(classDef);
    // newScript.appendChild(varList);
    var altlist = document.createTextNode('this is an alt list');
    newScript.appendChild(altlist);
    // newScript.innerHTML = classDef;
    document.querySelector('.timeplus').appendChild(newScript);
}
function getPhone(){
    document.querySelector('.phone-bx').addEventListener('mouseover', setPhoneOne);
    document.querySelector('.col-sm-6:nth-of-type(2) .phone-bx').addEventListener('mouseover', setPhoneTwo);
}
function phoneGet(event){
    var phone2targ = document.querySelectorAll('.col-sm-6:nth-of-type(2) [onclick]');
    forSwitch: for (var xt = 0; xt < phone2targ.length; xt++){
        // switch (event.target){
            if (event.target == phone2targ[xt]){
            // space = document.querySelector('.col-sm-6:nth-of-type(2) input');
            setPhoneTwo();
            break forSwitch;
            }
            // console.info(space);
        //  default:
            else {
            setPhoneOne();
            // break;
        // }
            // break forSwitch;
        }
    }
}
function setPhoneOne(){
    showbox = document.querySelector(".showbox");
    topicons = document.querySelector(".topicons");
    dialbox = document.querySelector(".dialbox");
    callsDiv = document.querySelector(".callsDiv");
    callLog = document.querySelector(".callLog");
    callbox = document.querySelector(".callbox");
    calling = document.querySelector(".calling");
    callingNima = document.querySelector(".calling span:first-of-type");
    callingSpan = document.querySelector(".calling span:nth-of-type(2)");
    callNimaImage = document.querySelector(".callImg img");
    incoming = document.querySelector(".incoming");
    incomeNum = document.querySelector(".incomeNum");
    menunav = document.querySelector(".menunav");
    menu1 = document.querySelector(".menu1");
    menu2 = document.querySelector(".menu2");
    menu3 = document.querySelector(".menu3");
    space = document.querySelector('input');
    console.log("space one");
}
function setPhoneTwo(){
    showbox = document.querySelector(".col-sm-6:nth-of-type(2) .showbox");
    topicons = document.querySelector(".col-sm-6:nth-of-type(2) .topicons");
    dialbox = document.querySelector(".col-sm-6:nth-of-type(2) .dialbox");
    callsDiv = document.querySelector(".col-sm-6:nth-of-type(2) .callsDiv");
    callLog = document.querySelector(".col-sm-6:nth-of-type(2) .callLog");
    callbox = document.querySelector(".col-sm-6:nth-of-type(2) .callbox");
    calling = document.querySelector(".col-sm-6:nth-of-type(2) .calling");
    callingNima = document.querySelector(".col-sm-6:nth-of-type(2) .calling span:first-of-type");
    callingSpan = document.querySelector(".col-sm-6:nth-of-type(2) .calling span:nth-of-type(2)");
    callNimaImage = document.querySelector(".col-sm-6:nth-of-type(2) .callImg img");
    incoming = document.querySelector(".col-sm-6:nth-of-type(2) .incoming");
    incomeNum = document.querySelector(".col-sm-6:nth-of-type(2) .incomeNum");
    menunav = document.querySelector(".col-sm-6:nth-of-type(2) .menunav");
    menu1 = document.querySelector(".col-sm-6:nth-of-type(2) .menu1");
    menu2 = document.querySelector(".col-sm-6:nth-of-type(2) .menu2");
    menu3 = document.querySelector(".col-sm-6:nth-of-type(2) .menu3");
    space = document.querySelector('.col-sm-6:nth-of-type(2) input');
    console.log("space two");
}
function readyDos(){
    keepTime();
    getPhone();
    setPhoneOne();
    home();
    // titleGive();
    // nameVars();
    // console.log(event.target.toString());
    // var krill = function(){ 
        // var vanguard = document.querySelector('.dialspace');
        // dialbox.style.display = 'block';
        // vanguard.focus();
        // event.preventDefault();
    // }
    // document.querySelector('.callsDiv').style.display = 'block';
    // krill(event);
    // dialbox.mouseover="(function(){console.log('mouseOver dialbox'); console.log('')})()";
    cara = document.querySelector(".dialspace")/* .addEventListerner('mouseover', function(){console.log('mouseOver dialspace'); console.log('')}) */;
    console.log(cara);
    // cara.focus();
    // cara.click();
    cara.addEventListener('mouseover', function(){console.log('mouseover dialspace')});
}