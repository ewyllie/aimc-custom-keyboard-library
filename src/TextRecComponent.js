import React, {Component} from 'react'
import styles from './styles.module.css'
class TextRecComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            result : this.props.resultText
        };

    }
    getStyle = () => {
        let returnVal = (this.props.showHide ? styles.revealKB  : styles.kbhide) + ' ';
        return returnVal;
    };



    render() {
        return (
            <div id="recWrap" className={this.getStyle() + styles.suggestion_body}>
                <div onClick={e=>{this.props.typeKey(this.props.suggestions[0], true)}} className={styles.suggestion}>{this.props.suggestions[0]}</div>
                <div onClick={e=>{this.props.typeKey(this.props.suggestions[1], true)}} className={styles.suggestion}>{this.props.suggestions[1]}</div>
                <div onClick={e=>{this.props.typeKey(this.props.suggestions[2], true)}} className={styles.suggestion}>{this.props.suggestions[2]}</div>
            </div>
        )
    }


}
export default TextRecComponent