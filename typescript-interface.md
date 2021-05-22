인터페이스는 변수의 타입으로 사용할 수 있다. 이때 인터페이스를 타입으로 선언한 변수는 해당 인터페이스를 준수하여야 한다. 이것은 새로운 타입을 정의하는 것과 유사하다.

```javascript
// 인터페이스의 정의
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

// 변수 todo의 타입으로 Todo 인터페이스를 선언하였다.
let todo: Todo;

// 변수 todo는 Todo 인터페이스를 준수하여야 한다.
todo = { id: 1, content: 'typescript', completed: false };
```
인터페이스를 사용하여 함수 파라미터의 타입을 선언할 수 있다. 
이때 해당 함수에는 함수 파라미터의 타입으로 지정한 인터페이스를 준수하는 인수를 전달하여야 한다. 함수에 객체를 전달할 때 복잡한 매개변수 체크가 필요없어서 매우 유용하다.

