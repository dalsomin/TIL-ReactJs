### 부모 컴포넌트에서 접근가능한 함수 구현하기-useimperativeHandle

클래스형 컴포넌트의 부모컴포넌트는 ref객체를 통해 자식 컴포넌트의 메서드를 호출할 수 있었다.
이 방식은 자식 컴포넌트의 내부 구현에 대한 의존성이 생기므로 지양해야하지만 종종 필요한 경우가 있다. 
useImperativeHandle훅을 이용하면 마치 함수형 컴포넌트에도 메서드가 있는 것처럼 만들 수 있다. 

1. **useImperative 훅으로 외부로 공개할 함수 정의하기**
   다음은 useImperativeHandle 훅을 이용해서 부모 컴포넌트에서 접근가능한 함수를 구현한 코드이다. 

```jsx
import React, {forwardRef, useState, useImperativeHandle} from 'react';

function Profile(props, ref){
    const[name, setName] = useState('');
    const[age, setAge] = useState(0);
    
    useImperativeHandle(ref, ()=>({
        	addAge : value => setAge(age+value),
        	getNameLength: ()=>name.length,
    	}));
    return (
    	<div>
            <p>{`name is ${name}`}</p>
             <p>{`age is ${age}`}</p>
        </div>
    )
}
export default forwardRef(Profile);
```

1) 부모 컴포넌트에서 입력한ref 객체를 직접 처리하기 위해 forwardRef함수를 호출한다. 

2) ref객체는 두번째 매개변수로 넘어온다. 

3) useImerativeHandle 훅으로 ref객체와 <u>부모컴포넌트에서 접근가능한 여러함수</u>를 전달한다. 



2. useimperativeHandle훅으로 정의한 함수를 외부에서 호출하기 

   다음은 부모 컴포넌트에서 호출하는 코드이다. 

```jsx
function Parent(){
    const profileRef = useRef();
    const onClick = ()=>{
        if(profileRef.current){
            console.log('current name length:', profileRef.current.getNameLength());
            profileRef.current.addAge(5);
        }
    }
    return (
        <div>
        	<Profile ref={profileRef}/>
            <button onClick={onClick}>add age 5</button>
        </div>
    );
}
```

1) Profile컴포넌트에서 구현한 함수를 호출한다. 

2) Profile컴포넌트의 속성값으로 ref객체를 전달한다. 





*<주의>* 
Ref를 남용하지 마세요
ref는 애플리케이션에 “어떤 일이 일어나게” 할 때 사용될 수도 있습니다. 

그럴 때는 잠시 멈추고 어느 컴포넌트 계층에서 상태를 소유해야 하는지 신중하게 생각해보세요. 

대부분의 경우, 상태를 소유해야 하는 적절한 장소가 더 높은 계층이라는 결론이 날 겁니다.

상태를 상위 계층으로 올리는 것에 대한 예제는 상태 끌어올리기 가이드에서 확인하실 수 있습니다. 
