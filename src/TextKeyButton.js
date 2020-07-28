import React, {Component} from "react";
import styles from './styles.module.css';

class TextKeyButton extends Component {
    constructor(){
        super();

        this.state = {
            keyPressed : false
        };
    }


    render(){

        let keyName = this.props.letter;
        return(

            <div onClick={e => this.props.onClick(keyName, this.props.getResult)} className={styles.pressedWrapper}>
                <div key={this.props.letter} id={this.props.letter + 'pressed'} className={this.getClasses()}>{this.props.letter}</div>
                {/*<button name={this.props.letter} onMouseDown={}>{this.props.letter}</button>*/}
                <button name={this.props.letter}
                        onTouchStart={()=>{this.pressKeyDown(keyName)}}
                        onMouseDown={this.pressKeyDown}
                        onMouseLeave={this.pressKeyUp}
                        onMouseUp={this.pressKeyUp}
                        onTouchEnd={this.pressKeyUp}
                        className={this.setPressedKeyDarker()}>{this.props.letter}
                </button>
            </div>

        );
    }



    getClasses () {
        let classes = styles.pressedKeyBox + " ";
        classes += this.state.keyPressed ? styles.show : styles.hide;
        return classes;
    };

    setPressedKeyDarker () {
        let classes = '';
        classes += this.state.keyPressed ? styles.darkKey : styles.bgWhite;
        return classes;
    }

    pressKeyDown = (keyName) => {
        this.setState({
            keyPressed: true
        });
    };

    pressKeyUp =() => {
        this.setState({
            keyPressed: false
        });
    };
}
export default TextKeyButton;
