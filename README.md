# aimc-custom-keyboard

> Custom keyboard for integradtion into mobile web apps.

[![NPM](https://img.shields.io/npm/v/aimc-custom-keyboard.svg)](https://www.npmjs.com/package/aimc-custom-keyboard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save aimc-custom-keyboard
```
## Props
For the custom keyboard component to function properly it will require values for 5 props. these are as follows:
####resultText
This is the initial string value for the text in the app. Usually this is an empty string

## Usage

```jsx
import React, {Component} from 'react'
import { CustomKeyboard } from 'aimc-custom-keyboard'

class App extends Component {

    constructor(){
        super();

        this.state = {
            result : "",
            showKeyboard : true
        }
    }
    getText = (newResult) =>{
        this.setState({
            result : newResult
        })
    };

    showHideKeyboardFunct = () =>{
        this.setState({
            showKeyboard : !this.state.showKeyboard
        });
    };

    render() {

        const inputStyle = {
            width: '80vw',
            height: '1em',
            borderRadius: '8px',
            backgroundColor: '#E9E9E9',
            padding: '3vw',
            margin: '5vw auto'
        };

        const buttonStyle = {
            width: '40vw',
            margin : 'auto 30vw'
        };

        return (
            <div>

                <div style={inputStyle}>Input: {this.state.result}</div>
                <button style={buttonStyle} onClick={e =>{this.showHideKeyboardFunct()}}>Toggle Keyboard</button>
                <CustomKeyboard resultText = {this.state.result}
                                showKeyboardVal={this.state.showKeyboard}
                                showKeyboardFunction={this.showHideKeyboardFunct}
                                typeKeyFunction = {this.getText}
                                useTextSuggestions = {true}
                                suggestions = {["suggestion1", "suggestion2", "suggestion3"]}

                />
            </div>
        )
    }


}
export default App

```

## License

MIT © [ewyllie](https://github.com/ewyllie)
