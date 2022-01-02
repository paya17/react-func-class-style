import React, {useState} from 'react'; 
import './App.css';

function App() { 
  return (
    <div className="container"> 
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp> 
      <ClassComp initNumber={2}></ClassComp> 
    </div>
  );
}

//--------------------------------------------------------------------------------------//

function FuncComp(props) { 
  //var numberState = useState(props.initNumber);  
  //var number = numberState[0]; 
  //var setNumber = numberState[1]; 
  var [number, setNumber] = useState(props.initNumber); //세줄의 코드를 한줄로 줄여서 개선, 배열을 나타내는 []기호 안에 변수 이름을 넣는다, *useState의 반환값인 배열의 각 요소 값이 number,setNumber변수에 할당됨, dateState변수가 필요 없어짐

  //var dateState = useState((new Date()).toString());  //'state'의 초깃값 지정 
  //var _date = dateState[0]; 
  //var setDate = dateState[1]; 
  var [_date, setDate] = useState((new Date()).toString());

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p> 
      <p>Date : {_date}</p> {/*'state값' 사용*/}
      <input type="button" value="random" onClick={
          function() {
            setNumber(Math.random()); 
          }
        }></input> {/*임의의 값을 발생시키는 random버튼*/}
      <input type="button" value="date" onClick={
          function() {
            setDate((new Date()).toString()); //'state값' 변경
          }
        }></input> {/*현재시각이 나오는 date버튼*/}
    </div>
  );
}

class ClassComp extends React.Component { 
  state ={
    number: this.props.initNumber,
    date: (new Date()).toString() //'state'의 초깃값 지정
  } 

  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number: {this.state.number}</p> 
        <p>Date: {this.state.date}</p> {/*'state값' 사용*/}
        <input type="button" value="random" onClick={
          function() {
            this.setState({number:Math.random()}); 
          }.bind(this)
        }></input> {/*임의의 값을 발생시키는 random버튼*/}
        <input type="button" value="date" onClick={
          function() {
            this.setState({date:(new Date()).toString()}); //'state값' 변경
          }.bind(this)
        }></input> {/*현재시각이 나오는 date버튼*/}
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

/*
'함수' 스타일 컴포넌트의 props와 state
->*함수 스타일 컴포넌트의 함수의 첫번째 인자로 'props'값이 전달되도록 약속돼있음 (this 이용해서, props 전달받지 않는다!)
->**"useState함수(훅)"을 이용해, 'state' 사용 가능
*/
//useState함수의 인자로 state의 초깃값을 지정
//useState함수의 반환값은 길이가 2인 배열

//클래스 스타일 컴포넌트와 함수 스타일 컴포넌트에, 임의의 값을 발생시키는 random버튼을 만들었다 

//여기부터
//클래스 스타일 컴포넌트와 함수 스타일 컴포넌트에, 현재시각이 나오는 date버튼을 만들기 (new Date() 사용!)
//*'state'의 초깃값 지정, 'state값' 사용, 'state값' 변경










