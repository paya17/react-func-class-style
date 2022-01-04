import React, {useState, useEffect} from 'react'; 
import './App.css';

function App() { //App컴포넌트는 '함수' 스타일 컴포넌트
  var [funcShow, setFuncShow] = useState(true); //*state값, state값을 변경할 수 있는 함수 / state의 초깃값이 'true'
  var [classShow, setclassShow] = useState(true);

  return (
    <div className="container"> 
      <h1>Hello World</h1>
      <input type="button" value="remove func" onClick={
          function() {
            setFuncShow(false) //*state값(funcShow)을 'false'로 변경
          }
        }></input> {/*FuncComp컴포넌트를 삭제하는 버튼*/}
      <input type="button" value="remove class" onClick={
          function() {
            setclassShow(false) 
          }
        }></input> {/*ClassComp컴포넌트를 삭제하는 버튼*/}

      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}  {/* *funcShow(state값)가 true면 '<FuncComp initNumber={2}></FuncComp>' 실행, false면 'null' 실행*/}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
      {/* *초기에는 funcShow(state값)가 'true'이기 때문에 '<FuncComp initNumber={2}></FuncComp>'이 렌더링됨. 하지만 remove func버튼을 클릭하면, funcShow(state값)가 'false'가 되어 'null'이 되어서 FuncComp컴포넌트가 사라짐*/}
    </div>
  );
}

//--------------------------------------------------------------------------------------//

function FuncComp(props) { 
   
  var [number, setNumber] = useState(props.initNumber);  
  var [_date, setDate] = useState((new Date()).toString()); 

  useEffect(function() { 
    document.title = number; 
    
    return function() { 
      //아무거나..
    }
  }, [number]); 

  useEffect(function() { //_date에 대해서도 useEffect 구현 
    document.title = _date;  
    
    return function() { 
      //아무거나..
    }
  }, [_date]); //*useEffect함수의 두번째 인자로 전달한 배열에 '_date'값을 넣는다 -> '_date'라는 state의 값이 바뀌었을 때만, 첫번째 인자인 콜백함수와 clean up함수가 호출되도록 

  
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p> 
      <p>Date : {_date}</p> 
      <input type="button" value="random" onClick={
          function() {
            setNumber(Math.random()); 
          }
        }></input> {/*임의의 값을 발생시키는 random버튼*/}
      <input type="button" value="date" onClick={
          function() {
            setDate((new Date()).toString()); 
          }
        }></input> {/*현재시각이 나오는 date버튼*/}
    </div>
  );
}

class ClassComp extends React.Component { 
  state ={
    number: this.props.initNumber,
    date: (new Date()).toString() 
  } 

  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number: {this.state.number}</p> 
        <p>Date: {this.state.date}</p> 
        <input type="button" value="random" onClick={
          function() {
            this.setState({number:Math.random()}); 
          }.bind(this)
        }></input> {/*임의의 값을 발생시키는 random버튼*/}
        <input type="button" value="date" onClick={
          function() {
            this.setState({date:(new Date()).toString()}); 
          }.bind(this)
        }></input> {/*현재시각이 나오는 date버튼*/}
      </div>
    );
  }
}

export default App;



/*
- '클래스' 스타일로 '컴포넌트' 만들기
- *'함수' 스타일로 '컴포넌트' 만들기 -> 최신 기능인 '훅'을 도입해, 컴포넌트 내부의 <state> (useState훅)와, 컴포넌트의 <라이프사이클> (useEffect훅)을 다룰 수 있게 됨
*/

//여기부터
/* 마무리
1. _date에 대해서도 useEffect 구현 
2. App컴포넌트에 reomove func버튼과 remove class버튼을 만들고, reomove func버튼을 클릭하면 FuncComp컴포넌트가 사라지도록, remove class버튼을 클릭하면 ClassComp컴포넌트가 사라지도록
- 함수 스타일 컴포넌트가 소멸될 때, useEffect의 clean up함수가 호출된다
- 클래스 스타일 컴포넌트가 소멸될 때, componenetWillUnmount메서드가 호출된다
*/
//*조건 ? A : B -> 조건이 true면 A 실행, false면 B 실행
