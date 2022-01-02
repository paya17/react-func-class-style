import React from 'react';
import './App.css';

function App() { //App컴포넌트
  return (
    <div className="container"> {/*이 태그 안에 들어있는 게 'App컴포넌트의 내용'*/}
      <h1>Hello World</h1>
      <FuncComp></FuncComp> {/*FuncComp컴포넌트*/}
      <ClassComp></ClassComp> {/*ClassComp컴포넌트*/}
    </div>
  );
}

//--------------------------------------------------------------------------------------//

function FuncComp() { //FuncComp컴포넌트('함수' 스타일 컴포넌트)
  return (
    <div className="container">
      <h2>function style component</h2>
    </div>
  );
}

class ClassComp extends React.Component { //ClassComp컴포넌트('클래스' 스타일 컴포넌트)
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
      </div>
    );
  }
}

export default App;



/*
- '클래스' 스타일로 '컴포넌트' 만들기
- *'함수' 스타일로 '컴포넌트' 만들기 -> 최신 기능인 '훅'을 도입해, 컴포넌트 내부의 <state>와, 컴포넌트의 <라이프사이클>을 다룰 수 있게 됨
*/

/*
-함수 스타일로 컴포넌트 만들 때 -> 'return값'만 만들면, 그게 바로 컴포넌트의 실제 모양
-클래스 스타일로 컴포넌트 만들 때 -> 'render메서드' 정의한 후, 그것의 'return값'이 컴포넌트의 실제 모양
*/

//FuncComp컴포넌트와 ClassComp컴포넌트를 저번처럼 따로 컴포넌트 파일을 만들어서 빼내지 않고 App.js에 적었다





