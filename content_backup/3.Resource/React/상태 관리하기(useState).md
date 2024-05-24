>useState는 배열을 반환\[ 현재상태, 상태변경함수\]
>인자는 아무거나 (문자, 오브젝트, 배열 등) 받음 
>ex) const \[상태 스냅샷, 상태변경 함수\] = useState(값);
>상태 변경시 현재 컴포넌트와 하위 컴포넌트 함수가 재실행됨

>예제1) 텍스트 변경

```jsx
import { useState } from 'react';

export default function Component({ attr, children }){
	const [state, setState] = useState('');

	function clickHandler(){
		setState("음메")
	}

	return (
		<div onClick={clickHandler}>
			{state}
		</div>
	)
}
```


>예제2) 이전 상태기반 상태 갱신
>
```jsx
import { useState } from 'react';

export default function Component({ attr, children }){
	const [state, setState] = useState([]);

	function clickHandler(newState){
		setState((prevState) =>{
			return [newState, ...prevState];
		})
	}

	return (
		<div onClick={clickHandler}>
			{state}
		</div>
	)
}