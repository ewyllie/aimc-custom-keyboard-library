import React, {Component} from 'react';
import TextKeyButton from "./TextKeyButton";
import { useDoubleTap } from "use-double-tap";
import styles from './styles.module.css';
import capsImg from './Images/caps.png';
import shiftImg from './Images/shift.png';
import shiftActiveImg from './Images/shiftActive.png';
import CEImg from './Images/CE.png';
import hideKBImdg from './Images/hideKB.png'
let lastTap;
class KeyboardComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            visible : this.props.showKeyboard,
            fontCase : 'lowercase',
            setshift : true,
            capsLock : false,
            result : this.props.resultText
        };
    }

    incimentKey = () =>{

        this.props.onClick('CE');
    };
    repeatKey = () => {
        this.incimentKey();
        this.t = setTimeout(this.repeatKey, 500);

    };

    backSpaceHold = () => {
        this.repeatKey();
    };

    releaseBackSpace = () => {
        clearTimeout(this.t);

    };

    getKBStyle = () =>{
        let defaults='noneTextKeyStyle keyicon';

    };

    getStyle = (props) => {
        let returnVal = (props.showHide ? styles.revealKB  : styles.kbhide) + ' ';
        return returnVal;
    };


    onClick = (button) => {

        switch(button) {
            case "clear":
                this.reset();
                break;

            case "CE":
                this.props.backspace();
                break;

            case "space":
                this.props.typeKey(' ');
                break;

            case "abc":
                this.setState({
                    fontCase: "lowercase"
                });
                break;

            case "shift":
                this.shift();
                this.handleDoubleTap();
                break;

            case "123":
                this.setState({
                    fontCase: 'numsymb'
                });
                break;

            case "symbols":
                this.setState({
                    fontCase: "symbols"
                });
                break;
            case "kb":
                this.props.toggleKB();
                break;
            case "enter":
                this.reset();
                break;
            //if the button value hasn't matched any of the above criteria, do the below to enter a letter
            default:
                let shiftValue = this.state.setshift;
                let capsValue = this.state.capsLock;
                let caseValue = shiftValue ? 'lowercase' : this.state.fontCase;
                caseValue = capsValue ? 'uppercase' : caseValue;
                this.props.typeKey(button);
                break;
        }
    };




    //handles shift key
    shift = () => {
        let caps = this.state.capsLock;
        if(caps){
            this.setState({
                fontCase :'lowercase',
                setshift : false,
                capsLock : false
            })
        }
        else{
            let newShift = !this.state.setshift;
            let newCase = newShift ? 'uppercase' : 'lowercase';
            this.setState({
                fontCase : newCase,
                setshift : newShift
            })
        }

    };

    lastTap = null;
    handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
            this.setState({
                capsLock : true,
                fontCase : 'uppercase'
            });
        } else {
            this.lastTap = now;
        }

    };
    render() {


        const greyed = {
            background: '#B3B6B9',
            width: '15vw'
        };
        const spaceBar = {
            width: '45vw'
        };
        const m2 = {
            margin: '1vw',
            background: '#B3B6B9',
            width: '15vw',
            // transform: 'translateY(2vw)'
        };
        const hidekb = <img src={hideKBImdg} className={styles.keyimg}/>;

        const shift = <img src={shiftActiveImg} className={styles.keyimg}/>;

        const noshift = <img src={shiftImg} className={styles.keyimg}/>;

        const caps = <img src={capsImg} className={styles.keyimg}/>;

        const shiftSym = "=\\<";

        const abcBtn = "abc";

        const q2p = [];
        const a2l = [];
        const z2m = [];
        let letterButtonList = [];

        const letters = {
            lowercase: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j",
                "k", "l", "z", "x", "c", "v", "b", "n", "m"],
            uppercase: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J",
                "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
            numsymb: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "@", "#", "£", "_", "&", "-", "+",
                "(", ")", "/", "*", "\"", "'", ":", ";", "!", "?"],
            symbols: ["~", "`", "|", "•", "√", "π", "÷", "×", "¶", "∆", "€", "¥", "$", "¢", "^", "°", "=", "{", "}", "\\", "%", "©", "®", "™", "✓", "[", "]"]
        };

        let fontCase = this.state.fontCase;
        let setshift = this.state.setshift;
        let capsLock = this.state.capsLock;

        //if the fontcase is numsymb, set the keyboard switch button to show 'abc' otherwise '123'
        let keyboardSwitchDisplayName = fontCase === 'numsymb' ?
            'abc' : '123';

        //if the current keyboad is letters make ths button show numbers, else show letters
        let abc123Btn = fontCase === 'numsymb' || fontCase === 'symbols' ? 'abc' : '123';

        // //if the fontcase is NOT numsymb, check if it's lowercase, change to shift arrow with appropriate symbol

        //
        //change the name prop of shift based on the current casing
        let shiftName = (fontCase === 'lowercase') || (fontCase === 'uppercase') ?
            'shift'
            : fontCase === 'numsymb' ? 'symbols' : 'abc';

        // //to combat an undefined error appearing in App.js


        let shiftKeyDisplay = setshift ? shift : noshift;
        shiftKeyDisplay = capsLock ? caps : shiftKeyDisplay;
        shiftKeyDisplay = fontCase === 'numsymb' ? shiftSym : shiftKeyDisplay;
        shiftKeyDisplay = fontCase === 'symbols' ? abcBtn : shiftKeyDisplay;

        let shiftRow = [];
        //loop through the number of items in the case list, adding jsx components based on rules
        for (let i in letters[fontCase]) {
            if((i>=19)&&(fontCase === 'lowercase' || fontCase === "uppercase")){
                //add keys to list in correct order including line breaks and special keys
                shiftRow.push(<TextKeyButton key={letters[fontCase][i]} typeKey = {this.props.typeKey} onClick={this.onClick}
                                             letter={letters[fontCase][i]}/>);
            }
            else if(i>19){
                shiftRow.push(<TextKeyButton key={letters[fontCase][i]} typeKey = {this.props.typeKey} onClick={this.onClick}
                                             letter={letters[fontCase][i]}/>);
            }
            else{
                //add keys to list in correct order including line breaks and special keys
                letterButtonList.push(<TextKeyButton key={letters[fontCase][i]} typeKey = {this.props.typeKey} onClick={this.onClick}
                                                     letter={letters[fontCase][i]}/>);
            }


            letterButtonList.push(i == 9 || i == 18 && fontCase !== 'numsymb' && fontCase !== 'symbols' ?
                <br id={"br" + i}/>

                : '');

            shiftRow.push((i == 19 && fontCase === 'symbols')
                || (i == 18 && fontCase === 'lowercase')
                || (i == 18 && fontCase === 'uppercase')
                || (i == 19 && fontCase === 'numsymb') ?

                <button
                    key='⇧'
                    name={shiftName}
                    // className="keyicon greywidekey ce-adjust pressedWrapper"
                    className={styles.keyicon + " " +  styles.greywidekey + " " + styles.pressedWrapper}
                    onClick={e => this.onClick(shiftName)}
                >
                    {shiftKeyDisplay}
                </button>

                : ''
            );
            shiftRow.push((i == 26 && fontCase === 'symbols')
            || (i == 25 && fontCase === 'lowercase')
            || (i == 25 && fontCase === 'uppercase')
            || (i == 26 && fontCase === 'numsymb') ?

                <button
                    key='⌫'
                    id='backSpace'
                    // style={m2}
                    // className="keyicon greywidekey ce-adjust pressedWrapper padce"
                    className={styles.keyicon+  "  " + styles.greywidekey+  "  " + styles.pressedWrapper}
                    name="CE"
                    onClick={() => {this.onClick("CE")}}
                    // onMouseDown={this.backSpaceHold}
                    // onMouseUp={this.releaseBackSpace}
                >
                    <img className={styles.keyimg} src={CEImg}/>
                </button>



                : '');

        }



        return (
            <div className={this.getStyle(this.props) + " " + styles.button + " " + styles.keypad} ref="keypad" id="keypad">
                {letterButtonList}

                <div className={styles.kb_scnd_bottom_row}>
                    {shiftRow}
                </div>
                <div className={styles.kb_bottom_row}>
                    <button className={styles.key + " " + styles.noneTextKeyStyle + " " +styles.greywidekey} name={abc123Btn} onClick={e => this.onClick(e.target.innerHTML)}>{keyboardSwitchDisplayName}</button>
                    <button style={spaceBar} className={styles.key + " " + styles.noneTextKeyStyle} name="space" onClick={e => this.onClick(e.target.name)}>space</button>
                    <button name="." className={styles.key + " " + styles.noneTextKeyStyle} onClick={e => this.onClick(e.target.name)}>.</button>
                    <button name="kb" className={styles.noneTextKeyStyle + " " + styles.keyicon + " " + styles.greywidekey+ " "+ this.props.hideKBStyle} onClick={e => {this.onClick("kb");}}

                    >{hidekb}</button>
                </div>
            </div>
        );


    }



}


export default KeyboardComponent;
