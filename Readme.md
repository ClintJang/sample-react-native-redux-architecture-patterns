# React Native Redux Sample Project

## Info
`React Native`로 간단한 덧셈이 되는 `Redux` 아키텍쳐 패턴을 적용한 간단한 셈플입니다.<br />
개발 소스를 받아서 빌드해 실행해보면, 아키텍쳐를 이해하는 데 더 도움이 되지 않을 까 싶습니다. <br /><br />
🌈 **Result Image (GIF)**<br />
<img width="268" height="480" src="/Image/result_image00.gif"></img>

## The Main Structure

```
- ios
- android
- scr
	- store
		- index.js
	- actions
		- index.js
		- calculatorAction.js
		- types.js
	- reducers
		- index.js
		- calculatorReducer.js
	- components
		- Calculator.js
	- containers
		- Main
		    - index.js
		- Root
		    - index.js
	
- App.js

```



## 설명
### Redux란?
시작이 되는 근원은 `리엑티브` 라고 할 수 있습니다.<br />
리엑티브는 같은 말로 알엑스(`Rx`) 라고 부릅니다.<br />
`리엑티브 페러다임`은 `마이크로소프트`가 창안한 개념으로 **데이터의 흐름에 따른 변화를 만드는 비동기적인 프로그래밍 패러다임**입니다.<br />
기본 실행 모델이 데이터의 흐름을 통해 자동으로 전파하는 것입니다.<br />
<br />
RX 패러다임은 다양한 개발언어로 확장 되었는 데, <br />
`페이스북`에서 만든 `Flux` 패턴의 구현체 중 하나입니다.<br />

- [Redux 상세 설명 링크](https://medium.com/@jang.wangsu/rn-react-native-redux-%EB%9E%80-reactive-%EB%B6%80%ED%84%B0-c089d4549edb)

### Redux 간략 설명

<img width="557" height="315" src="/Image/redux_desc00.png"></img>

**`Redux`는 앱의 상태 모두를 `하나의 store`안에 `트리 구조`로 저장합니다.**  <br />
<br />
그 **store를 변경시키는 것은 `action` (들)** 뿐입니다.<br />
<br />
action이 어떻게 (How) 변경시켜야 하는 지는 `reducer`(들)가 정의합니다.<br />
<br />
화면(`View`)들은 실제 화면을 표현하고, 내부 구성의 명칭은 중요하진 않겠지만 `component`들을 담는 것을 `Container`(들) 이라 지칭하겠습니다.<br />
<br />
Container(들)은 Store의 상태값이 변화되는 지 구독하고(subscribe, subscript) 있는 데, <br />
redux에서는 `props`에 담아 넘겨줍니다. **Props에 `selector`(들)** 하고 있습니다.<br />
<br />
Container 의 화면에서는 사용하기 위해 **`props를 state에 map`** 하는 과정이 진행됩니다.<br />
그리고 화면의 메인스레드 런루프에서 클릭등 이벤트가 발생해서 변경요청을 하면, <br />
Container에서 `action`을 보내는 데, 그것을 `dispatch action`이라 합니다.<br />
**action을 dispatch**하는 거죠....<br />
<br />
추가적으로 state를 변경하기 위해 비동기 처리를 하는 경우가 있는 데 보통 대표적인 것이 네트워크 처리 이죠? 물론 그게 아니더라도 보통 비동기 처리를 하는 것이 대부분 일 것 같기도 합니다.<br /> 
이렇게 `비동기 처리` 등을 위해 action과 reducer 사이에 `middleware`를 둡니다.<br />
<br />
그 때 미들웨어에 `thunk`(들)과 `saga` (들).. 등 이(가) 있습니다.<br />



### 진행 사항 간 특징
- 쉘 명령어 react-native로 구현하였습니다.
	- [react-native 를 이해하기 위한 링크](https://medium.com/@jang.wangsu/rn-react-native-%EC%8B%9C%EC%9E%91-3aab881f574f) : 여기를 참고해서 기본 환경 설정을 해주세요. 
- middleware는 적용하지 않았습니다.
- 동작 시키기 위한 React Native 외의 라이브러리는 없습니다.
- 동작의 흐름을 보기위한 간단한 덧셈이 되는 셈플입니다.

### 상세 설명
> 기본적인 환경설정 (npm 설치 등등)이 되어있다면, 소스를 내려받고 소스 최상위 폴더에서 아래 쉘 명령어를 실행합니다.

```
$ npm install 
```

그리고 iOS 안에 실행파일(SampleReduxCalculator.xcodeproj) 혹은 안드로이드 스튜디오를 열고 프로젝트를 열어서 프로젝트를 실행시킵니다.

또는 

```
$ react-native start

and 

$ react-native run-ios
or
$ react-native run-android
```

그럼 구현된 소스 상세 내용을 알아보겠습니다.

### App.js

- [App.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/App.js)

```jsx
const store = initStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
```

#### Store
> Redux는 앱의 상태 모두를 `하나의 store`안에 `트리 구조`로 저장합니다. 

- src/store/[index.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/src/store/index.js)

```jsx
export default function initStore() {
    const store = createStore( reducers );
    return store;
}
```

#### Action(s)
> store를 변경시키는 것은 `action` (들) 뿐입니다.

- src/actions/[index.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/src/actions/index.js)

```jsx
const ActionCreators = Object.assign({},   
    calculatorAction,
);

export default ActionCreators;
```

- src/actions/[types.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/src/actions/types.js)

```jsx
const types = {
    CALCULATOR_UPDATE_SUM_FIRST: 'CALCULATOR_UPDATE_SUM_FIRST',
    CALCULATOR_UPDATE_SUM_SECOND: 'CALCULATOR_UPDATE_SUM_SECOND',
};

export default types;
```

- src/actions/[calculatorAction.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/src/actions/calculatorAction.js)

```jsx
export function updateSumValueFirst(num) {
    return {
        type: types.CALCULATOR_UPDATE_SUM_FIRST,
        payload: num
    };
}

export function updateSumValueSecond(num) {
    return {
        type: types.CALCULATOR_UPDATE_SUM_SECOND,
        payload: num
    };
}
```

#### Reducer(s)
> action이 어떻게 (How) 변경시켜야 하는 지는 `reducer`(들)가 정의합니다.

- src/reducers/[index.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/src/reducers/index.js)

```jsx
export default combineReducers({
    calculator: CalculatorReducer,
});
```

- src/reducers/[calculatorReducer.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/src/reducers/calculatorReducer.js)

```jsx
const defaultState = {
    result : 0,
    sumInfo: {
        frist : 0,
        second : 0,
    },
}

export default calculator = (state = defaultState, action) => {    
    // For Debugger
    // console.log('payload:' + action.payload);

    switch (action.type) {
        case types.CALCULATOR_UPDATE_SUM_FIRST:
            return {
                // ...state,
                result : action.payload + state.sumInfo.second,
                sumInfo: {
                    frist:action.payload,
                    second:state.sumInfo.second
                }
            };
        case types.CALCULATOR_UPDATE_SUM_SECOND:
            return {
                // ...state,
                result : action.payload + state.sumInfo.frist,
                sumInfo: {
                    frist:state.sumInfo.frist,
                    second:action.payload
                }
            };
        default:
            return state;
    }
};
```

#### View (components, containers)
> 화면(`View`)들은 실제 화면을 표현하고, 내부 구성의 명칭은 중요하진 않겠지만 `component`들을 담는 것을 `Container`(들) 이라 지칭하겠습니다.

##### containers

- src/containers/Root/[index.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/src/containers/Root/index.js)

```jsx
export default class Root extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor:'grey'}}>
                <Text style={{ marginLeft:20, marginTop:100, fontSize:24 }}>React Native Redux Sample</Text>
                <Main />
            </View>
            
        );
    }
}
```

- src/containers/Main/[index.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/src/containers/Main/index.js)

```jsx
export default class Main extends React.Component {
    render() {
        return (
            <Calculator />
        );
    }
}
```

##### components
- Map State To Props : Container 의 화면에서는 사용하기 위해 `props를 state에 map` 하는 과정이 진행됩니다.

<br />그리고 화면의 메인스레드 런루프에서 클릭등 이벤트가 발생해서 변경요청을 하면, <br />

- Map Dispatch To Props : Container에서 `action`을 보내는 데, 그것을 `dispatch action`이라 합니다. action을 dispatch하는 거죠....

- src/components/[Calculator.js](https://github.com/ClintJang/sample-react-native-redux-architecture-patterns/blob/master/src/components/Calculator.js)

```jsx

.. (중략)..

class Calculator extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={calculatorStyles.container}>
                <TextInput 
                    style={ calculatorStyles.input }
                    keyboardType={'number-pad'} 
                    maxLength={1}
                    placeholder={'0'}
                    onChangeText={(text) =>  {
                        this.setState({text}); 
                        var numberAsInt = 0
                        if (text !== '') {
                            numberAsInt = parseInt(text, 10);
                        }
                        console.log(numberAsInt);
                        this.props.updateFirst(numberAsInt); 
                    }}
                    // onSubmitEditing = {() => { this.props.updateFirst(1); }}
                    // placeholderTextColor = {'red'}
                ></TextInput>
                <View style={calculatorStyles.view}>
                    <Text
                        s3yle={ calculatorStyles.text }
                    >+</Text>
                </View>
                <TextInput 
                    style={ calculatorStyles.input }
                    keyboardType={'number-pad'} 
                    maxLength={1}
                    placeholder={'0'}
                    onChangeText={(text) =>  {
                        this.setState({text}); 
                        var numberAsInt = 0
                        if (text !== '') {
                            numberAsInt = parseInt(text, 10);
                        }
                        console.log(numberAsInt);
                        this.props.updateSecond(numberAsInt); 
                    }}
                ></TextInput>
                <View style={ calculatorStyles.view }>
                    <Text
                        style={ calculatorStyles.text }
                    >=</Text>
                </View>
                <View style={ calculatorStyles.view }>
                    <Text 
                        style={ calculatorStyles.text }
                    >{this.props.result}</Text>
                </View>
                
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        result: state.calculator.result,
        first: state.calculator.sumInfo.first,
        second: state.calculator.sumInfo.second
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateFirst:(num) => {
            dispatch(ActionCreator.updateSumValueFirst(num));

        },
        updateSecond:(num) => {
            dispatch(ActionCreator.updateSumValueSecond(num));
        }
    };
}

.. (중략) ..

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
```

<br /><br />
즐거운 하루 되세요 🙇‍ <br />
