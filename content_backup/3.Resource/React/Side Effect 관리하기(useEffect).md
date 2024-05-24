>의도하지 않은 결과(부수효과)를 컨트롤 할 때 사용
>어떠한 행위로 인해 의도하지 않은 부수효과가 일어 날때
>해당 효과가 일어나지 않도록 무한루프등을 예방하기 위해 사용
>
>1. 컴포넌트가 최초 렌더링 될 때(검사할 의존성 데이터가 존재시)
>2. 검사할 의존성 데이터가 변경 될 때
>3. 컴포넌트가 사라지거나 업데이트되어 렌더링되기 직전(클린업 return 함수)
>에 실행된다.

```jsx
import { useState, useEffect } from 'react';

export default function Component({ attr, children }){
	const [state, setState] = useState('');
	const [isFetching, setIsFetching] = useState('');
	
	useEffect(() => {
		async function getData() {
			setIsFetching(true);
		    const response = await fetch('/api/test');
		    const resData = await response.json(); //타입에 따라 다름
		    setState(resData.data);
			setIsFetching(false); //페치 여부
		}
		getData()
	}, []) //한번만 수행할때는 빈배열을 의존성 데이터로 넣는다.

	// 페치 여부에 따른 처리
	return (
		<div>
			{isFetching && <p>Loding data... </p>}
		</div>
	)
}
```

# **Links**
---
- [[HTTP 요청 보내기]]
- [[로딩 상태 관리]]