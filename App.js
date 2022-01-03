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

  useEffect(function() { //(useEffect함수의 첫번째 인자로 전달한 함수(콜백함수!) -> side effect기능)
    document.title = number; //수정 -> *number라는 state의 값이 변경됐을 때만, 콜백함수와 clean up함수가 호출되도록 하고싶음 (*바뀐 값만 처리하게 함으로써 성능을 향상!)
    
    return function() { //(useEffect의 첫번째 인자로 전달한 함수의, "return값"인 함수 -> clean up(정리))
      //아무거나..
    }
  }, [number]); //**useEffect함수의 두번째 인자로 배열을 전달하고 그 배열에 'number'값을 넣는다 -> "'number'라는 state의 값이 바뀌었을 때만, 첫번째 인자인 콜백함수와 clean up함수가 호출되도록" 약속돼있음 (*바뀐 값만 처리하게 함으로써 성능을 향상!)

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


//함수 스타일 컴포넌트가 실행된 후에, 추가로 필요한 작업을 처리하기 위해 -> *"useEffect함수(훅)"를 이용 
/*
'함수' 스타일 컴포넌트의 라이프사이클 (완성X)
: render -> 'useEffect함수'의 인자로 전달한 함수가 호출돼서 side effect기능 
-> state/props가 바뀌는 '변화'가 생김 -> render -> 'useEffect함수'의 인자로 전달한 함수가 호출돼서 side effect기능
*/
//*useEffect함수 -> render가 실행될때마다 그 후에 실행됨 (클래스 스타일 컴포넌트의 componentDidMount,componentDidUpdate와 같은 효과)
//컴포넌트의 main effect는 FuncComp이라는 함수가 호출됐을 때 return값을 화면에 그려주는 작업 / side effect는 컴포넌트가 화면에 render된 후에, 컴포넌트의 정보를 다른데서 가져와 나중에 내용을 변경하거나 네트워크 통신 등의 작업
//*useEffect함수 -> 'side effect'기능을 함 (클래스 스타일 컴포넌트의 componentDidMount,componentDidUpdate와 같은 효과)
//useEffect를 여러개 설치할 수 있다

//useEffect-'clean up'개념
//컴포넌트가 처음으로 DOM에 나타나는 순간에 componentWillMount/componentDidMount를 사용, 컴포넌트가 소멸할 때는 componentWillUnmount를 사용 -> 컴포넌트가 등장할 때/소멸할 때 하는 작업이 구분됨
//위의 이야기를 useEffect를 사용해서 해보자
//*'변화'가 생겨서 다시 한번 render 후에 'useEffect함수'의 인자로 전달한 함수가 다시 실행되기 전에, '그 이전에 실행했던 것을 정리하기 위해', useEffect의 첫번째 인자로 전달한 함수의 "return값"인 함수(함수여야함!)를 실행해서 'clean up(정리)'
/*
'함수' 스타일 컴포넌트의 라이프사이클 (완성X)
: render -> 'useEffect함수'의 인자로 전달한 함수가 호출돼서 side effect기능
-> state/props가 바뀌는 '변화'가 생김 -> render -> "useEffect의 첫번째 인자로 전달한 함수의 'return값'인 함수가 호출돼서 'clean up(정리)'" ->  'useEffect함수'의 인자로 전달한 함수가 호출돼서 side effect기능
*/

//여기부터
//useEffect-'skipping effect'개념 (*바뀐 값만 처리하게 함으로써 성능을 향상!)
//**useEffect함수의 두번째 인자로 배열을 전달하고 그 배열에 'number'값을 넣는다 -> "'number'의 state의 값이 바뀌었을 때만, 첫번째 인자인 콜백함수와 clean up함수가 호출되도록" 약속돼있음 (*바뀐 값만 처리하게 함으로써 성능을 향상!)
/*
'함수' 스타일 컴포넌트의 라이프사이클 
: render -> useEffect함수의 첫번째 인자로 전달한 함수(콜백함수!)가 호출돼서 side effect기능
-> number라는 state의 값이 바뀌는 '변화'가 생김(random버튼 클릭) -> render -> useEffect의 첫번째 인자로 전달한 함수의 'return값'인 함수가 호출돼서 clean up(정리) ->  useEffect함수의 첫번째 인자로 전달한 함수(콜백함수)가 호출돼서 side effect기능
(**date버튼을 클릭하면, 콜백함수와 clean up함수 호출안됨 -> useEffect함수의 두번째 인자로 전달된 배열에 있는 'number'라는 state의 값을 바꾸는 것이 아니라, _date라는 state의 값을 바꾸는 것이기 때문 )
*/
//useEffect함수의 두번째 인자로 '빈 배열'을 전달하면 -> render후에 useEffect함수의 첫번째 인자로 전달한 함수가 딱 한번 호출되고, 이후에 state값이 바뀌어도 호출되지 않음 (클래스 스타일 컴포넌트의 componentDidMount만 실행하는 것과 같음)


