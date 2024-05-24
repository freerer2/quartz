
> [[loader()로 데이터 가져오기]]처럼 action이라는 속성으로 데이터 전송하기 가능

>main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//import Posts, [ loader as dataLoader ] from './routes/Posts.jsx'
const Posts = lazy(() => import("./routes/Posts")); //lazy loading
import NewPost, [ action as dataAction ] from './routes/NewPost.jsx'

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
	      element:(
              <Suspense fallback={<p>Loading..</p>}>
                <Posts />
              </Suspense>
	      ),
	      loader: (await import("./routes/Posts")).loader,
	      children: [
		      { path : '/create-post', element: <NewPost />, action: dataAction } //form이 submit 될 때 실행 됨
		]}
	] }, 
]); //배열을 받음

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router}/> 
	</React.StrictMode>,
)
```

> NewPost.jsx
```jsx
import { Form, redirect } from 'react-router-dom'

export default function NewPost(){
	return (
		<Form method="post">
			<input type="text" id="data1" name="data1" required>
			<input type="text" id="data2" name="data2" required>
			<Link to=".." type="button">
				Cancel
			</Link>
			<button>Submit</button>
		</Form> //리액트 라우터가 폼데이터를 관리함
	)
}

export async function action({request}){
	const formData = await request.formData();
	//formData.get('data1')  > 특정 데이터 들고오기
	const postData = Object.fromEntries(formData);
	await fetch('/dkdkdkd/post', {
		method: 'POST',
		body: JSON.stringfy(postData),
		headers:{
			'Content-Type': 'application/json'
		}
	});
	
	return redirect('/');
	//호출시 응답객체가 만들어지고 action 함수는 그 응답객체를 반환함, 라우터는 반환된 객체를 가지고 이동하고자 하는 곳으로 이동함
}
```

# **Links**
---
- [[레이아웃 라우팅]]
- [[loader()로 데이터 가져오기]]