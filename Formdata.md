파일은 아무 형태로나 서버로 전달할 수 없다. 위에서 받아온 file도 그 형태 그대로 전달 할 수 없다.
때문에 formData 라는 것을 사용하게 된다.

let formData = new FormData();
(1) FormData.append()

: 가장 많이 쓰게 될 formdata의 내장 함수로 form 데이터 안에 키,값의 형태로 담을때 사용된다.

  const upload = () => {
    let formData = new FormData();
    formData.append('files', files);
  }
서버에서 files 라는 키에 파일을 담아주기를 원한다면 다음과 같은 방법으로 해당 값을 append를 이용해서 담도록 한다.
(Tip:
(2) Json과 file

: file과 text 동시에 보내기

  const upload = () => {
    const temp = JSON.stringify({
      name: selectedClassName,
      price: selectedPrice,
      sale: selectedDiscount / 100,});
    let formData = new FormData();
    formData.append('body', temp);
    formData.append('files', files);
  }
파일과 그 해당 파일과 관련된 text를 모두 보내는 경우 동일한 딕셔너리(객체)에 담아 보낼 수 없다.
따라서 각각의 append를 이용해서 서버로 전송하도록 한다.
위의 경우 formData의 body 라는 키에 stringify를 이용해서 json 데이터를 분리해서 담았다.
