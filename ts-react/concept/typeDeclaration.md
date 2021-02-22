1. 타입선언 (type declaration)

   typescript는 아래와 같이 변수명 뒤에 타입을 명시하는 것으로 타입을 선언할 수 있다.

   선언한 타입에 맞지 않는 값을 할당하는 컴파일 시점에 에러가 발생하게된다. 

   

   1) 변수 타입선언

   ```javascript
   let foo: string = 'hello';
   let bar: number = true; //error !!!
   ```

   이러한 타입선언은 개발자가 코드를 예측할 수 있도록 돕는다. 또한 타입선언은 강력한 타입체크를 가능하게 하여 문법에러나 타입과 일치 하지 않는 값을 할당등 기본적인 오류를 런타입 이전에 검출한다. vscode를 사용하면 코드를 작성하는 시점에 에러를 검출할 수 있게 되므로 개발효율성이 대폭 향상된다. 

   

   2) 함수 타입선언

   ```javascript
   //함수 선언식
   function multiply1(x: number, y:number):number{
       return x*y ;
   }
   
   //함수 표현식
   const multiply2 =(x:number, y:number) :number => x*y;
   
   //any: 타입 추론(type inference)할 수 없거나 타입 체크가 필요 없는 변수에 사용한다.
   
   
   
   ```

2. 타입형식

   :**타입은 소문자, 대문자를 구별하므로 주의가 필요하다.** 위에서 살펴본 바와 같이 TypeScript가 기본 제공하는 타입은 모두 소문자이다. 아래 코드를 살펴보자.

   1. any: 
   2. void: return값이 없을때 
   3. boolean 
   4. null
   5. undefined
   6. number
   7. string
   8. object
   9. any[]
   10. number[]
   11. Array<number> 제네릭 배열타입
   12. tuple : 고정된 요소수 만큼의 타입을 미리 선언후 배열을 표현
   13. enum : 열거형은 숫자값 집합에 이름을 지정한 것이다.
   14. any: 타입 추론(type inference)할 수 없거나 타입 체크가 필요 없는 변수에 사용한다.
   15.  void : 일반적으로 함수에서 반환값이 없을 경우 사용한다.
   16.  never : 결코 발생하지 않는 값

>  string 타입은 TypeScript가 기본으로 제공하는 원시 타입인 문자열 타입을 의미한다. 하지만 대문자로 시작하는 String 타입은 String 생성자 함수로 생성된 String 래퍼 객체 타입을 의미한다. 따라서 string 타입에 String 타입을 할당하면 에러가 발생한다. 하지만 String 타입에는 string 타입을 할당할 수 있다. 이처럼 객체의 유형도 타입이 될 수 있다.



