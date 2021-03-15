//react
//import React from 'react'; 
//import ReactDOM from 'react-dom';
import * as React from 'react';
//react는 default 가 없기 때문에 import React from 'react'; 이렇게 못쓴다. 
import * as  ReactDOM from 'react-dom';
import GuGuDan from './GuGuDan';
//esModuleInterop = true 를 했을 때 import React from 'react' 이렇게 쓸 수 가 있다. 
//하지면 이것을 true로 하는것은 비추천이다. 모듈 시스템을 이해를 잘하면 이걸 false로 가져가도된다. 
//그냥  import * as React from 'react'; 로 쓰는게 낫다. 
ReactDOM.render(<GuGuDan />, document.querySelector("#root"));