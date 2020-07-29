# aimc-custom-keyboard

> Custom keyboard for integradtion into mobile web apps.

[![NPM](https://img.shields.io/npm/v/aimc-custom-keyboard.svg)](https://www.npmjs.com/package/aimc-custom-keyboard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save aimc-custom-keyboard
```

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
    
    //function is passed to the CustomKeyboard component and the resulting text is passed through newResult
    getText = (newResult) =>{
        this.setState({
            result : newResult
        })
    };

//function to handling showing and hiding the keyboard
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
# Props
For the custom keyboard component to function properly it will require values for 5 props. these are as follows:

##### resultText (required)
>string

This is the initial string value for the text in the app. Usually this is an empty string, but in some cases you may 
wish to start with a non-empty String.

#### showKeyboardVal (required)
>boolean

This is a true/false Boolean for whether or not the keyboard is visible. Passing 'true' here will reveal the keyboard
and 'false' will hide it.

#### showKeyboardFunction (required)
>function()

The function passed in the showKeyboardFunction prop will be assigned to the 'hide keyboard' (bottom row, far right) button on the keyboard. 
As shown in the above example this allows you to use the same function both within the CustomKeyboard component and in your app to manage the visibility consistently.

#### typeKeyFunction (required)
>function(string)

The typeKeyFunction handles the output of the keyboard. This includes typing new characters and backspaces. This function must
 accept a string as this is the text outputted. In the above example this is shown n the UI using the state.

#### useTextSuggestions (optional)
>boolean

This boolean value should be set to true if you wish to use text suggestions. If omitted the suggestions will not be included by default.

#### suggestions (required if using text suggestions)
>array [string, string, string]

This prop should be an array of 3 strings, these strings will appear in the text suggestions panel. In the above example these values are hard coded but you may populate them
using any method you choose. When a user selects a text suggestion any part-typed word will be removed and replaced by the text suggestion.


## License 

MIT © [ewyllie](https://github.com/ewyllie)
