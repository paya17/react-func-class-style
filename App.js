import React from 'react';
import './App.css';

function App() { 
  return (
    <div className="container"> 
      <h1>Hello World</h1>
      <FuncComp></FuncComp> 
      <ClassComp initNumber={2}></ClassComp> {/*ClassComp컴포넌트에, initNumber라는 'props' 주기*/}
    </div>
  );
}

//--------------------------------------------------------------------------------------//

function FuncComp() { 
  return (
    <div className="container">
      <h2>function style component</h2>
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
            this.setState({number:Math.random()}); //setState 이용해, 'state값' 변경 -> ClassComp컴포넌트의 *render메서드가 호출됨
          }.bind(this)
        }></input> {/* *누르면 state의 number의 초깃값이었던 2를 임의의 값으로 변경시켜, state값 변경*/}
      </div>
    );
  }
}

export default App;



/*
- '클래스' 스타일로 '컴포넌트' 만들기
- *'함수' 스타일로 '컴포넌트' 만들기 -> 최신 기능인 '훅'을 도입해, 컴포넌트 내부의 <state>와, 컴포넌트의 <라이프사이클>을 다룰 수 있게 됨
*/

//여기부터
//'클래스' 스타일 컴포넌트의 props와 state
//state를 설정하고 초기화하고, 그 state값을 사용하고, 변경하기


