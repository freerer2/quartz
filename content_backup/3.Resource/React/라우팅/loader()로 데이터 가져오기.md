> 리액트 라우터 6.4 이상 버전에서는 특정 경로의 특정 컴포넌트를 가져올 수 있는 기능이 추가 됨

>main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//import Posts, [ loader as dataLoader ] from './routes/Posts.jsx'
const Posts = lazy(() => import("./routes/Posts")); //lazy loading

import NewPost from './routes/NewPost.jsx'
import RootLayout from './routes/RootLayout.jsx'

import './index.css'


const router = createBrowserRouter([
	{ 
	  path : '/',
	  element: <RootLayout />,
	  children: [
		{ 
		  path : '/',
	      //element: <Posts /> ,
	      //loader: dataLoader, //렌더링 될 때 loader에서 데이터 가져옴
	      element:(
              <Suspense fallback={<p>Loading..</p>}>
                <Posts />
              </Suspense>
	      ),
	      //loader: () => import('./routes/Posts').then(module => module.loader()) //lazy loading
	      loader: (await import("./routes/Posts")).loader, //짧은 방법
	      //loader: async () => {
	          //const response = await fetch(
	            //`/api/campaign`
	          //);
	          //const resData = await response.json();
	          //return resData.contentsData;
	      //}, // 비추방법(데이터를 가져오는 url은 데이터를 직접 사용/컨트롤 하는 곳에 명시되어야 가독성이 좋다고 생각한다.)
	      children: [
		      { path : '/create-post', element: <NewPost /> }
		]}
	] }, 
]); //배열을 받음

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router}/> //생성한 라우터를 라우터 제공자에 넣어줌
	</React.StrictMode>,
)
```
> [!NOTE] lazy loading
> () => import('해당 함수또는 컴포넌트가 있는 경로').then(module => module.loader())
> **import 함수는 프로미스를 리턴**한다. ( 비동기적으로 관리 가능 )  
> 리턴한 프로미스를 then으로 받아서 그곳에 속한 loader파일을 리턴해준다.
> 
> > [!NOTE] lazy
> const Posts = lazy(() => import("./routes/Posts")); //lazy loading
> 컴포넌트에도 지연로딩을 적용하자.  
> 함수를 선언해주고 동적으로 import한 페이지를 리턴하도록 만드는것이다.
> 다만,  
> 원래대로라면 컴포넌트 함수를 정의해야 하는 것이기에 jsx코드와 같은걸 리턴해주어야 한다. 하지만 import문은 항상 프로미스를 리턴해주고 있기에 유효한 컴포넌트 함수는 아니다.
> 이때, 리엑트에선 해당 함수를 매핑할 특수한 함수키워드를 제공한다. (Suspense)
> 
> > [!NOTE] Suspense
> **Suspense**는 어떤 컴포넌트가 읽어야 하는 데이터가 아직 준비가 되지 않았다고 리액트에게 알려주는 메커니즘이라고 볼 수 있다.(실제 컨텐츠를 렌더링하기 전에 컨텐츠의 로딩을 기다려주는데 사용함)


> [!NOTE] lazy
> const Posts = lazy(() => import("./routes/Posts")); //lazy loading
> 컴포넌트에도 지연로딩을 적용하자.  
> 함수를 선언해주고 동적으로 import한 페이지를 리턴하도록 만드는것이다.
> 다만,  
> 원래대로라면 컴포넌트 함수를 정의해야 하는 것이기에 jsx코드와 같은걸 리턴해주어야 한다. 하지만 import문은 항상 프로미스를 리턴해주고 있기에 유효한 컴포넌트 함수는 아니다.
> 이때, 리엑트에선 해당 함수를 매핑할 특수한 함수키워드를 제공한다. (Suspense)

> [!NOTE] Suspense
> **Suspense**는 어떤 컴포넌트가 읽어야 하는 데이터가 아직 준비가 되지 않았다고 리액트에게 알려주는 메커니즘이라고 볼 수 있다.(실제 컨텐츠를 렌더링하기 전에 컨텐츠의 로딩을 기다려주는데 사용함)

> Posts.jsx
```jsx
import { Outlet } from 'react-router-dom';

import PostsList from '../component/PostsList';

export default function Posts(){
	return (
		<Outlet/> //하위 라우트를 렌더링할 위치
		<main>
			<PostsList/> //속성을 주지 않아도 loader에서 가져온 데이터를 하위 컴포넌트에서 사용 할 수 있다.
		<main/>
	)
}

export async function loader(){ //해당 함수의 결과를 바로 위 Posts 컴포넌트 함수에서 사용이 가능하다
	const response = await fetch('/api/test');
	const resData = await response.json();
	return resData.data;
}
```

> PostsList.jsx
```jsx
import { useLoaderData } from 'react-router-dom';

export default function PostsList(){
	const data = useLoaderData();
	return (
	)
}
```

# **Links**
---
- [[레이아웃 라우팅]]
- [[action()으로 데이터 전송하기]]