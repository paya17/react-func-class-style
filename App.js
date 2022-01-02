import React, {useState} from 'react'; //useState함수를 사용하기 위해 import
import './App.css';

function App() { 
  return (
    <div className="container"> 
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp> {/*FuncComp컴포넌트에, initNumber라는 'props' 주기*/}
      <ClassComp initNumber={2}></ClassComp> {/*ClassComp컴포넌트에, initNumber라는 'props' 주기*/}
    </div>
  );
}

//--------------------------------------------------------------------------------------//

function FuncComp(props) { //*함수 스타일 컴포넌트의 함수의 첫번째 인자로 'props'값이 전달되도록 약속돼있음(props말고 다른 이름 써도 됨)
  var numberState = useState(props.initNumber); //외부에서 전달받은 'props'값을 *"useState함수"의 첫번째 인자로 전달하여, 'state'의 초깃값을 지정
  var number = numberState[0]; //(useState함수의 반환값인) *numberState배열의 첫번째 값은 'state값'
  var setNumber = numberState[1]; //*numberState배열의 두번째 값은 'state값을 변경할 수 있는 함수'

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p> {/*number 이용해, 'state값' 사용*/}
      <input type="button" value="random" onClick={
          function() {
            setNumber(Math.random()); //setNumber 이용해, 'state값' 변경 
          }
        }></input> {/*누르면 state의 초깃값이었던 2를 임의의 값으로 변경시켜, state값 변경*/}
    </div>
  );
}

class ClassComp extends React.Component { 
  state ={
    number: this.props.initNumber
  } //'state'의 초깃값으로, 외부에서 전달받은 'props'값을 지정

  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number: {this.state.number}</p> {/*'state값' 사용*/}
        <input type="button" value="random" onClick={
          function() {
            this.setState({number:Math.random()}); //setState 이용해, 'state값' 변경 -> ClassComp컴포넌트의 render메서드가 호출됨
          }.bind(this)
        }></input> {/*누르면 state의 number의 초깃값이었던 2를 임의의 값으로 변경시켜, state값 변경*/}
      </div>
    );
  }
}

export default App;



/*
- '클래스' 스타일로 '컴포넌트' 만들기
- *'함수' 스타일로 '컴포넌트' 만들기 -> 최신 기능인 '훅'을 도입해, 컴포넌트 내부의 <state>와, 컴포넌트의 <라이프사이클>을 다룰 수 있게 됨
*/

//'클래스' 스타일 컴포넌트의 props와 state
//state를 설정하고 초기화하고, 그 state값을 사용하고, 변경하기

//여기부터
/*
'함수' 스타일 컴포넌트의 props와 state
->*함수 스타일 컴포넌트의 함수의 첫번째 인자로 'props'값이 전달되도록 약속돼있음 (this 이용해서, props 전달받지 않는다!)
->**"useState함수(훅)"을 이용해, 'state' 사용 가능
*/
//useState함수의 인자로 state의 초깃값을 지정
//useState함수의 반환값은 길이가 2인 배열

//클래스 스타일 컴포넌트와 함수 스타일 컴포넌트에, 임의의 값을 발생시키는 random버튼을 만들었다 











