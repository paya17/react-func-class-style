import React, {useState, useEffect} from 'react'; //useEffect함수를 사용하기 위해 import
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
   
  var [number, setNumber] = useState(props.initNumber);  
  var [_date, setDate] = useState((new Date()).toString()); 

  //side effect
  useEffect(function() {
    document.title = number + ':' + _date; //화면이 아닌 title값을 바꾸는 작업(*컴포넌트가 렌더링되는 작업과 상관X)->useEffect함수의 'side effect'기능
  }); //*useEffect함수 사용! (컴포넌트 return전에 작성?!, useEffect함수의 첫번째 인자로 함수가 들어와야 함)

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
        }></input> 
        <input type="button" value="date" onClick={
          function() {
            this.setState({date:(new Date()).toString()}); 
          }.bind(this)
        }></input> 
      </div>
    );
  }
}

export default App;



/*
- '클래스' 스타일로 '컴포넌트' 만들기
- *'함수' 스타일로 '컴포넌트' 만들기 -> 최신 기능인 '훅'을 도입해, 컴포넌트 내부의 <state>와, 컴포넌트의 <라이프사이클>을 다룰 수 있게 됨
*/

//컴포넌트의 '생로병사'와 관련된 기능이, '라이프사이클'
//클래스 스타일 컴포넌트에서 라이프사이클API를 구현하는 방법 / 함수 스타일 컴포넌트에서 라이프사이클API를 구현하는 방법

/*
'클래스' 스타일 컴포넌트의 라이프사이클 
: 'componentWillMount메서드'가 호출됨(컴포넌트가 mount되기 전에(render메서드가 호출되기 전에), 처리해야 할 일을 함) -> 'render메서드'가 호출돼서, mount됨(화면에 그려짐)
-> 'componentDidMount메서드'가 호출됨(화면에 그려진 후에(render메서드가 실행된 후에), 추가로 처리해야 하거나 네트워크에서 뭔가 내려 받아 처리해야 할 일을 함)
V->컴포넌트가 한번 만들어진 후에, state/props가 바뀌는 '변화'가 생기면(ex)random버튼을 클릭) render메서드가 호출될 것임 
-> render메서드가 호출되기 전에, render메서드를 호출할 필요가 있는지 없는지를 결정하는'shouldComponentUpdate메서드'가 호출돼서 true를 return하면 render를 호출, false를 return하면 render를 호출 안함
->(shouldComponentUpdate메서드가 true를 return했다고 하면) 'componentWillUpdate메서드'가 호출됨 -> 'render메서드'가 호출됨 -> 'componentDidUpdate메서드'가 호출됨
('componentWillUnmount메서드'는 컴포넌트가 소멸될 때 호출됨)
*/
//*클래스 스타일 컴포넌트의 라이프사이클에서 원하는 타이밍에 코드를 추가하고 싶으면, 정해진 이름의 메서드(라이프사이클API)를 구현
//mount:화면에 그려짐

//여기부터
//함수 스타일 컴포넌트가 실행된 후에, 추가로 필요한 작업을 처리하기 위해 -> *"useEffect함수(훅)"를 이용 
/*
'함수' 스타일 컴포넌트의 라이프사이클 (완성X)
: render -> 'useEffect함수'의 인자로 전달한 함수가 호출됨 -> state/props가 바뀌는 '변화'가 생김 -> render -> 'useEffect함수'의 인자로 전달한 함수가 호출됨
*/
//*useEffect함수 -> render가 실행될때마다 그 후에 실행됨 (클래스 스타일 컴포넌트의 componentDidMount,componentDidUpdate와 같은 효과)
//컴포넌트의 main effect는 FuncComp이라는 함수가 호출됐을 때 return값을 화면에 그려주는 작업 / side effect는 컴포넌트가 화면에 render된 후에, 컴포넌트의 정보를 다른데서 가져와 나중에 내용을 변경하거나 네트워크 통신 등의 작업
//*useEffect함수 -> 'side effect'기능을 함 (클래스 스타일 컴포넌트의 componentDidMount,componentDidUpdate와 같은 효과)
//useEffect를 여러개 설치할 수 있다




