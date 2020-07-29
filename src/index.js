import React, {Component} from 'react'
import styles from './styles.module.css'
import KeyboardComponent from './KeyboardComponent';
import TextRecComponent from "./TextRecComponent";
import FastClick from 'fastclick';

export class CustomKeyboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            result : this.props.resultText
        };
    }


    addChar = async(key, suggestion) =>{
        let originalResult = this.state.result;

        if(suggestion){
            let arr = originalResult.split(' ');
            arr.pop();
            originalResult = '';
            for(let i in arr){
                originalResult = originalResult + arr[i] + " ";
            }

        }
        originalResult = originalResult + key;
        const stateSetter = async()=>{
          this.setState({
              result : originalResult
          })
        };
        await stateSetter();
        this.props.typeKeyFunction(originalResult);

    };

    backspace = async() =>{
        let currentText = this.state.result;
        currentText = currentText.slice(0, -1);
        const stateSetter = async()=> {
            this.setState({
                result: currentText
            });
        };
        await stateSetter();
        this.props.typeKeyFunction(currentText);
    };

    render(){
        FastClick.attach(document.body);

        let textSugs = this.props.showKeyboardVal && this.props.useTextSuggestions ?
         <TextRecComponent
        showHide={this.props.showKeyboardVal && this.props.useTextSuggestions}
        suggestions={this.props.suggestions}
        resultText = {this.props.resultText}
        getResult={this.props.getResult}
        typeKey={this.addChar}
        />
            : '';

        return (<div className={styles.bottom_fixed}>
            {textSugs}
            <KeyboardComponent
                resultText = {this.state.result}
                textResultHandler={this.props.textResultHandler}
                showHide={this.props.showKeyboardVal}
                typeKey={this.addChar}
                toggleKB = {this.props.showKeyboardFunction}
                backspace = {this.backspace}
                />
        </div>)
    }

}
