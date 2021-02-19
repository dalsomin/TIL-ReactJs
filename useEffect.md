이번에는 useEffect 라는 Hook 을 사용하여 컴포넌트가 마운트 됐을 때 (처음 나타났을 때), 언마운트 됐을 때 (사라질 때), 그리고 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리하는 방법에 대해서 알아보자

1. 화면이 처음 떴을때 실행.
   - deps에 [] 빈배열을 넣을 떄.
   - life cycle중 componentDidmount처럼 실행
2. 화면이 사라질때 실행(clean up함수).
   - componentWillUnmount처럼 실행
3. deps에 넣은 파라미터값이 업데이트 됬을때 실행.
   - componentDidUpdate처럼 실행.

https://rinae.dev/posts/a-complete-guide-to-useeffect-ko
 useEffect는 동기화이다 ! 

>  참고로 리액트 컴포넌트는 기본적으로 부모컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링이 됩니다. 바뀐 내용이 없다 할지라도요.

>  물론, 실제 DOM 에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당합니다. 하지만, Virtual DOM 에는 모든걸 다 렌더링하고 있다는 겁니다.
