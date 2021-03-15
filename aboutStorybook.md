스토리북의 전제 조건은 컴포넌트 기반 개발 방법론에 따라 UI를 만드는 것이다. 이는 컴포넌트로부터 싲가하여 마지막 화면에 이르기까지 상향적으로 UI를 개발하는 과정이다. CDD는 UI를 구출할때 직면하게 되는 규모의 복잡성을 해결하는 데 도움이 된다. 

Task은 예시프로젝트에서 핵심 컴포넌트이다. 각각의 task는 현재 어떤 state에 있는지에 따라 약간씩 다르게 나타나게 되는데, 선택 된 체크박스, task에 대한 정보, 그리고 task를 위아래로 움직일수 있도록 도와주는 핀버튼이 표시되는 등, state상태에 따라 다양한 형태로 다르게 나타난다. 

이를 위해 다음과 같은 props들이 필요하다. 

* title - task를 설명해주는 문자열

* state - 현재 어떤 task가 목록에 있으며, 선택되어있는지의 여부 

지금부터 Task 컴포넌트를 만들기 위해 위에서 살펴본 여러 유형의 task에 해당하는 테스트 state를 작성해 볼 것이다. 그 후 , 다음 모의 데이터를 사용하여 독립적 환경에서 컴포넌트를 구축하기 위해 storybook을 사용할 것이며 각각의 state에 따라 컴포넌트의 모습을 수동으로 테스트하면서 진행할 것이다. 

1. 스토리파일을 만들어보자. 

   * /src/components/Task.js  :  Todos앱의 기본HTML을 기반으로 Task에 대한 간단한 마크업을 렌더링한다. 

   ```js
   // src/components/Task.js
   
   import React from 'react';
   
   export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
     return (
       <div className="list-item">
         <input type="text" value={title} readOnly={true} />
       </div>
     );
   }
   ```

   * /src/components/Task.stories.js :  Task의 세가지 state를 스토리파일에 작성한 것. 

   ```js
   // src/components/Task.stories.js
   
   import React from 'react';
   
   import Task from './Task';
   
   export default {
     component: Task,
     title: 'Task',
   };
   
   const Template = args => <Task {...args} />;
   
   export const Default = Template.bind({});
   Default.args = {
     task: {
       id: '1',
       title: 'Test Task',
       state: 'TASK_INBOX',
       updatedAt: new Date(2018, 0, 1, 9, 0),
     },
   };
   
   export const Pinned = Template.bind({});
   Pinned.args = {
     task: {
       ...Default.args.task,
       state: 'TASK_PINNED',
     },
   };
   
   export const Archived = Template.bind({});
   Archived.args = {
     task: {
       ...Default.args.task,
       state: 'TASK_ARCHIVED',
     },
   };
   ```

2. 스토리북은 컴포넌트와 그 하위 스토리의 두가지 기본단계로 구성되어 있다. 각 스토리는 해당 컴포넌트에 대응된다고 생각하면된다. 우리는 앞으로 개발시, 얼마든지 필요한만큼의 스토리를 컴포넌트별로 작성할 수 있다. 

> * 컴포넌트 
>   * 스토리
>   * 스토리
>   * 스토리

3. 스토리북에게 우리가 문서화하고 있는 컴포넌트에 대해 알려주기 위해, 아래사항들을 포함하는 default export를 생성한다. 
   * component -- 해당 컴포넌트
   * title -- Storybook앱의 사이드바에서 컴포넌트를 참조하는 방법. 
   * excludeStories -- Storybook에서 스토리를 내보낼때 렌더링에서 제외되는 것.
   * argsTypes -- 각각의 스토리에서 인수(args)의 행동방식을 명시한다. 
4. 스토리를 정의하기 위해 각각의 테스트 state에 해당하는 스토리를 만들기 위해서 우리는 함수를 내보낸다. 스토리는 주어진 state안에서 렌더링된 요소  

