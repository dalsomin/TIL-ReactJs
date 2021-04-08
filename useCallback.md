

* useMemo

  * 계산량이 많은 함수의 반환값을 재활용하는 용도로 사용된다. 

    ```jsx
    import React, {userMemo} from 'react';
    import {runExpensiveJob} from './util';
    
    function MyComponent({v1,v2}){
        const value = useMemo(()=>runExpensiveJob(v1,v2),[v1,v2]);
        return <p>{`value is ${value}`}</p>
    }
    ```

  * useMemo 훅의 첫번째 매개변수로 함수를 입력한다. useMemo 훅은 이함수가 반환한 값을 기억한다. useMemo훅의 두번째 매개변수로 입력된 배열의 값이 변경되지 않으면 이전에 반환된 값을 재사용한다. 만약 배열의 값이 변경 되었으면 첫번째 매개변수로 입력된 합수를 실행하고 그 반환 값을 기억한다. 

* useCallback

  * useMemo 훅은 로다시 같은 라이브러리에서 제공해주는 메모이제이션과 비슷하다. 반면에 useCallback은 리액트의 렌더링 성능을 위해 제공되는 훅이다. 훅을 사용하게 되면서 컴포넌트가 렌더링될때마다 함수를 생성해서 자식 컴포넌트의 속성값으로 입력하는 경우가 많다. 리액트 팀에서는 최근의 브라우저에서 함수 생성이 성능에 미치는 영향은 작다고 주장한다. 그보다는 속상값이 매번 변경되기 때문에 자식 컴포넌트에서 pureComponent나 React.memo를 사용해도 불필요한 렌더링이 발생한다는 문제점이 있다. 리액트에서는 이 문제를 해결하기 위해 useCallback 훅을 제공한다. 

  * 다음으 useCallback이 필요한 예시이다. 

    ```jsx
    import React, {useStaet} from 'react';
    import {saveToServer} from './api';
    import UserEdit from './UserEdit';
    
    function Profile(){
        const[name, setName] = useState('');
        const[age, setAge] = useState(0);
        return (
        	<>
            	<p>{`name is ${name}`}</p>
            	<p>{`age is ${age}`}</p>
            	<UserEdit
                    onSave={()=>saveToServer(name, age)}
                	setName={setName}
                    setAge={setAge}
                </UserEdit>
            </>
        );
    }
    ```

    

  * 
