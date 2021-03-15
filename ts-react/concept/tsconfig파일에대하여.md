## tsconfig.json 

디렉토리에 tsconfig.json파일이 있다면 해당 디렉토리가 TypeScript프로젝트의 루트가 된다. 

tsconfig.json파일은 프로젝트를 컴파일하는데 필요한 루트 파일과 컴파일러 옵션을 지정한다. 

<프로젝트 컴파일 과정>

1. tsconfig.json사용하기

   * 입력파일 없이 tsc를 호출하면 컴파일러는 현재 디렉토리에서부터 시작하여 상위 디렉토리 체인으로 tsconfig.json 파일을 검색한다. 

   * 입력파일 없이 tsc와 tsconfig.json파일이 포함된 디렉토리 경로 또는 설정이 포함된 유효한 경로의 .json파일 경로를 지정하는 --project(or -p) 커맨트라인 옵션을 사용할 수 있다. 

   * 커맨드라인에 입력파일을 지정하면 tsconfig.json이 무시된다. 

     

## d.ts 파일 생성을 위한 프로젝트 설정 (Setting up your Project to emit .d.ts files)

.d.ts 파일을 프로젝트에서 생성하려면, 다음과 같은 4단계를 거쳐야한다.

- 개발 의존성에 TypeScript 추가
- TypeScript 설정을 위해 `tsconfig.json` 추가
- JS 파일에 해당하는 d.ts 파일을 생성하기 위해 TypeScript 컴파일 실행
- (선택적으로) 타입을 참조하기 위한 package.json 수정

### TypeScript 추가 (Adding TypeScript)

[설치 페이지](https://www.typescriptlang.org/download)에서 방법을 확인

### TSConfig

