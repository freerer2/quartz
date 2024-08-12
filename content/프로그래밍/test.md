<div class="tt_article_useless_p_margin contents_style"><h2>들어가기 전에</h2>
<p>이 글은 <a href="https://nextjs.org/learn/dashboard-app/css-styling">Next.js 튜토리얼</a>을 번역한 글입니다.</p>
<h1>CSS 스타일하기</h1>
<p>현재, 홈페이지는 어떤 스타일도 갖고 있지 않을겁니다. Next.js 어플리케이션을 꾸밀 다양한 방법을 알아봅시다.</p>
<h2>이번 챕터에서...</h2>
<p>여기 우리가 다룰 주제들이 있습니다.</p>
<ul>
<li>전역 CSS 파일을 어플리케이션에 추가하는 방법</li>
<li>두가지 다른 스타일링 방법: Tailwind 그리고 CSS modules</li>
<li>clsx 유틸리티 패키지로 class 명을 조건부로 넣는 방법</li>
</ul>
<h2>전역 스타일</h2>
<p><code>/app/ui</code> 폴더를 봅시다, <code>global.css</code> 파일을 찾을 수 있을겁니다. 이 파일을 추가해 어플리케이션 내에 모든 라우트에 CSS 초기화 룰이나 link같은 사이드 전역에 쓰일만한 CSS 규칙들을 적용할 수 있습니다.</p>
<p><code>global.css</code>는 앱 내에 어디서든 불러(import)들일 수 있습니다, 그러나 보통 최상위 컴퍼넌트에 추가하는게 좋은 관행입니다. 이것이 <a href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required">최상위 레이아웃</a> 입니다.(나중에 다룰거에요)</p>
<p><code>/app/layout.tsx</code>로 이동해서 <code>global.css</code> 파일을 불러(import)들여서 전역스타일을 어플리케이션에 추가하세요:</p>
<div class="code-with-file">

<p><strong>/app/layout.tsx</strong></p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">'@/app/ui/global.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">RootLayout</span>(<span class="hljs-params">{
  children,
}: {
  children: React.ReactNode;
}</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span>
  );
}</code></pre></div>

<p>개발서버가 여전히 동작하는 동안, 변경사항을 저장하면 브라우저에서 미리보기를 할 수 있습니다. 홈페이지는 아래와 같은 형태를 가질겁니다.</p>
<img src="https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fhome-page-with-tailwind.png&amp;w=1920&amp;q=75" alt="NextJS 튜토리얼 chapter 2 글로벌 스타일 적용이미지">

<p>잠깐만요, 당신은 아무 CSS 규칙들을 추가하지 않았습니다. 이 스타일들은 어디서 온 걸까요?</p>
<p><code>global.css</code>을 본다면, @tailwind라는 명령문을 볼 수 있습니다:</p>
<div class="code-with-file">

<p><strong>/app/ui/global.css</strong></p>
<pre><code class="hljs less"><span class="hljs-variable">@tailwind</span> base;
<span class="hljs-variable">@tailwind</span> components;
<span class="hljs-variable">@tailwind</span> utilities;</code></pre></div>

<h2>Tailwind</h2>
<p><a href="https://tailwindcss.com/">Tailwind</a>는 <a href="https://tailwindcss.com/docs/utility-first">유틸리티 클래스</a>들을 바로 TSX 마크업에 빠르게 쓰면서 개발 프로세스 속도를 향상 시킬 수 있는 CSS프레임 워크 입니다.</p>
<p>Tailwind에서는, 클래스명을 추가해서 요소들을 꾸밀 수 있습니다. 예를들어, <code>text-blue-500</code> 클래스를 추가하는 것은 <code>&lt;h1&gt;</code> text를 파랗게 만들겁니다.</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"text-blue-500"</span>&gt;</span>I'm blue!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></code></pre><p>비록 CSS 스타일이 전역적으로 공유되지만, 각 클래스는 각 요소에 개별적으로 적용됩니다. 이 말은, 만약 요소를 더하거나 제거해도, 별도의 서식양식 유지나 스타일 충돌, 앱이 커지면서 CSS 번들이 커지는것을 걱정할 필요가 없다는 겁니다.</p>
<p>프로젝트를 시작하기 위해 <code>create-next-app</code>을 사용했을때, Next.js는 Tailwind를 사용할지 물을겁니다. <code>Yes</code>를 선택한다면, Next.js는 자동으로 필요한 패키지들과 Tailwind 설정을 할겁니다.</p>
<p><code>/app/page.tsx</code>를 본다면, 이 예제에서 우리가 Tailwind 클래스들을 사용하는걸 볼 수 있습니다.</p>
<div class="code-with-file">


<p><strong>/app/page.tsx</strong></p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> AcmeLogo <span class="hljs-keyword">from</span> <span class="hljs-string">'@/app/ui/acme-logo'</span>;
<span class="hljs-keyword">import</span> { ArrowRightIcon } <span class="hljs-keyword">from</span> <span class="hljs-string">'@heroicons/react/24/outline'</span>;
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'next/link'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Page</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="hljs-comment">// These are Tailwind classes:</span>
    &lt;main className="flex min-h-screen flex-col p-6"&gt;
      &lt;div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52"&gt;
    // ...
  )
}</code></pre></div>

<p>만약 이번이 Tailwind를 처음 사용하는 것이어도 걱정하지마세요. 시간을 아끼기 위해 우린 이미 모든 당신이 사용할 컴퍼넌트를 스타일 해놨습니다.</p>
<p>Tailwind를 가지고 놀아봅시다! 아래 코드를 복사하고 <code>/app/page.tsx</code> 내에 <code>&lt;p&gt;</code>태그 위에 넣어봅시다.</p>
<div class="code-with-file">

<p><strong>/app/page.tsx</strong></p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">className</span>=<span class="hljs-string">"h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"</span>
/&gt;</span></code></pre></div>

<div class="quiz">
  <div class="quiz__icon">
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_132_19094)"><path clip-rule="evenodd" d="M16 30.5C24.0081 30.5 30.5 24.0081 30.5 16C30.5 7.99187 24.0081 1.5 16 1.5C7.99187 1.5 1.5 7.99187 1.5 16C1.5 24.0081 7.99187 30.5 16 30.5ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM17.5 22C17.5 22.8284 16.8284 23.5 16 23.5C15.1716 23.5 14.5 22.8284 14.5 22C14.5 21.1716 15.1716 20.5 16 20.5C16.8284 20.5 17.5 21.1716 17.5 22ZM13.5142 11.3218C13.9564 10.391 14.9041 9.75 16 9.75C17.5188 9.75 18.75 10.9812 18.75 12.5C18.75 13.8852 17.7252 15.0323 16.3926 15.2223C15.8162 15.3045 15.25 15.787 15.25 16.5V17.25V18H16.75V17.25V16.6839C18.7397 16.3292 20.25 14.5916 20.25 12.5C20.25 10.1528 18.3472 8.25 16 8.25C14.3035 8.25 12.8406 9.24406 12.1593 10.6782L11.8375 11.3556L13.1924 11.9993L13.5142 11.3218Z" fill="currentColor" fill-rule="evenodd"></path></g><defs><clipPath id="clip0_132_19094"><rect fill="currentColor" height="32" width="32"></rect></clipPath></defs></svg>
  </div>
  <p class="quiz__title">퀴즈할 시간입니다!</p>
  <p class="quiz__desc">익힌걸 테스트해보고 무엇을 배웠는지 봅시다.</p>
  <div class="quiz__box">
    <p class="quiz__question">위에 나온 코드를 적용했을때 어떤 모양이 보이나요?</p>
    <div class="option-list">
      <div class="option" data-question-number="01">
        <span class="option__number">A</span>
        <span class="option__desc">A yellow star</span>
      </div>
      <div class="option" data-question-number="01">
        <span class="option__number">B</span>
        <span class="option__desc">A blue triangle</span>
      </div>
      <div class="option" data-question-number="01" data-answer="true">
        <span class="option__number">C</span>
        <span class="option__desc">A black triangle</span>
      </div>
      <div class="option" data-question-number="01">
        <span class="option__number">D</span>
        <span class="option__desc">A red circle</span>
      </div>
    </div>
    <div class="quiz__btn-container">
      <button class="quiz__btn" data-js-check-answer="" data-question="01">
        정답 확인
      </button>
    </div>
  </div>  
</div>

<p>만약 전통적인 CSS 규칙을 쓰거나, JSX - CSS 간 모듈로부터 스타일들을 분리하고 싶다면 훌륭한 대안들이 있습니다.</p>
<h2>CSS Modules</h2>
<p><a href="https://nextjs.org/docs/basic-features/built-in-css-support">CSS Modules</a>은 자동으로 생성되는 유니크한 클래스 이름으로 컴퍼넌트의 CSS 영역 설정을 가능하게합니다. 그래서 스타일의 충돌도 걱정할 필요 없습니다.</p>
<p>이 강의에서 Tailwind를 계속 쓸 것입니다만 어떻게 CSS모듈을 이용해서 퀴즈의 같은 결과를 얻을 수 있는지 잠깐 봅시다.</p>
<p><code>/app/ui</code> 내부에, <code>home.module.css</code> 파일을 새로 생성하고, 다음의 CSS를 추가합시다.</p>
<div class="code-with-file">

<p><strong>/app/ui/home.module.css</strong></p>
<pre><code class="hljs css"><span class="hljs-selector-class">.shape</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">30px</span> solid black;
  <span class="hljs-attribute">border-left</span>: <span class="hljs-number">20px</span> solid transparent;
  <span class="hljs-attribute">border-right</span>: <span class="hljs-number">20px</span> solid transparent;
}</code></pre></div>

<p>그 다음 <code>/app/page.tsx</code> 파일에서 해당 스타일을 불러오고(import) <code>&lt;div&gt;</code>의 클래스를 방금 추가한 <code>styles.shape</code>로 바꿉시다:</p>
<div class="code-with-file">

<p><strong>/app/page.tsx</strong></p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> AcmeLogo <span class="hljs-keyword">from</span> <span class="hljs-string">'@/app/ui/acme-logo'</span>;
<span class="hljs-keyword">import</span> { ArrowRightIcon } <span class="hljs-keyword">from</span> <span class="hljs-string">'@heroicons/react/24/outline'</span>;
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'next/link'</span>;
<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'@/app/ui/home.module.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Page</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"flex min-h-screen flex-col p-6"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.shape}</span> /&gt;</span>
    // ...
  )
}</span></code></pre></div>

<p>변경사항을 저장하고, 브라우저에서 봅시다. 전과 같은 모양을 볼 수 있을 겁니다.<br>Tailwind와 CSS Modules은 Next.js 어플리케이션을 스타일하는 가장 많이 쓰는 방법들입니다. 둘 중 하나를 사용하는건 선호의 문제입니다 - 같은 어플리케이션에서 두가지 모두를 사용할 수도 있습니다.</p>
<div class="quiz">
  <div class="quiz__icon">
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_132_19094)"><path clip-rule="evenodd" d="M16 30.5C24.0081 30.5 30.5 24.0081 30.5 16C30.5 7.99187 24.0081 1.5 16 1.5C7.99187 1.5 1.5 7.99187 1.5 16C1.5 24.0081 7.99187 30.5 16 30.5ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM17.5 22C17.5 22.8284 16.8284 23.5 16 23.5C15.1716 23.5 14.5 22.8284 14.5 22C14.5 21.1716 15.1716 20.5 16 20.5C16.8284 20.5 17.5 21.1716 17.5 22ZM13.5142 11.3218C13.9564 10.391 14.9041 9.75 16 9.75C17.5188 9.75 18.75 10.9812 18.75 12.5C18.75 13.8852 17.7252 15.0323 16.3926 15.2223C15.8162 15.3045 15.25 15.787 15.25 16.5V17.25V18H16.75V17.25V16.6839C18.7397 16.3292 20.25 14.5916 20.25 12.5C20.25 10.1528 18.3472 8.25 16 8.25C14.3035 8.25 12.8406 9.24406 12.1593 10.6782L11.8375 11.3556L13.1924 11.9993L13.5142 11.3218Z" fill="currentColor" fill-rule="evenodd"></path></g><defs><clipPath id="clip0_132_19094"><rect fill="currentColor" height="32" width="32"></rect></clipPath></defs></svg>
  </div>
  <p class="quiz__title">퀴즈할 시간입니다!</p>
  <p class="quiz__desc">익힌걸 테스트해보고 무엇을 배웠는지 봅시다.</p>
  <div class="quiz__box">
    <p class="quiz__question">CSS 모듈을 사용할때의 장점 하나는 무엇인가요?</p>
    <div class="option-list">
      <div class="option" data-question-number="02">
        <span class="option__number">A</span>
        <span class="option__desc">다른 파일들간 CSS관리를 용이하게 하여 CSS 클래스들의 전역 영역을 확대합니다.</span>
      </div>
      <div class="option" data-question-number="02" data-answer="true">
        <span class="option__number">B</span>
        <span class="option__desc">CSS 클래스들을 컴퍼넌트에 대해 지역적 영역을 갖도록 만드는 방법을 제공하여, 스타일간의 충돌을 줄입니다.</span>
      </div>
      <div class="option" data-question-number="02">
        <span class="option__number">C</span>
        <span class="option__desc">자동으로 압축하고 CSS파일 크기를 줄여 페이지 로딩을 빠르게 합니다.</span>
      </div>
    </div>
    <div class="quiz__btn-container">
      <button class="quiz__btn" data-js-check-answer="" data-question="02">
        정답 확인
      </button>
    </div>
  </div>  
</div>

<h2>클래스 변경(toggle)을 위한 <code>clsx</code> 라이브러리 사용하기</h2>
<p>때때로 요소를 상태가, 다른 조건에 의해 다르게 스타일 해야할 경우가 있습니다.</p>
<p><a href="https://www.npmjs.com/package/clsx"><code>clsx</code></a>는 클래스명을 쉽게 바꿀(toggle)수 있게 해주는 라이브러리 입니다. 더 세부적인 사항을 위해 <a href="https://github.com/lukeed/clsx">문서</a>를 읽어보는걸 추천하지만, 기본적인 사용법은 다음과 같습니다:</p>
<ul>
<li><code>status</code>를 받는 <code>InvoiceStatus</code> 컴퍼넌트를 생성한다고 가정합시다. 상태는 <code>pending</code> 또는 <code>paid</code>가 될 수 있습니다.</li>
<li>만약 <code>paid</code>라면, 색을 초록색으로 하고 싶습니다. <code>pending</code>이라면 회색으로 하고 싶습니다.<br>아래와 같이, <code>clsx</code>를 사용하여 클래스를 조건부로 받을 수 있습니다.</li>
</ul>
<div class="code-with-file">

<p><strong>/app/ui/invoices/status.tsx</strong></p>
<pre><code class="hljs typescript"><span class="hljs-keyword">import</span> clsx <span class="hljs-keyword">from</span> <span class="hljs-string">'clsx'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">InvoiceStatus</span>(<span class="hljs-params">{ status }: { status: <span class="hljs-built_in">string</span> }</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{clsx(</span>
        '<span class="hljs-attr">inline-flex</span> <span class="hljs-attr">items-center</span> <span class="hljs-attr">rounded-full</span> <span class="hljs-attr">px-2</span> <span class="hljs-attr">py-1</span> <span class="hljs-attr">text-sm</span>',
        {
          '<span class="hljs-attr">bg-gray-100</span> <span class="hljs-attr">text-gray-500</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">status</span> === <span class="hljs-string">'pending'</span>,
          '<span class="hljs-attr">bg-green-500</span> <span class="hljs-attr">text-white</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">status</span> === <span class="hljs-string">'paid'</span>,
        },
      )}
    &gt;</span>
    // ...
)}</span></code></pre></div>

<div class="quiz">
  <div class="quiz__icon">
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_132_19094)"><path clip-rule="evenodd" d="M16 30.5C24.0081 30.5 30.5 24.0081 30.5 16C30.5 7.99187 24.0081 1.5 16 1.5C7.99187 1.5 1.5 7.99187 1.5 16C1.5 24.0081 7.99187 30.5 16 30.5ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM17.5 22C17.5 22.8284 16.8284 23.5 16 23.5C15.1716 23.5 14.5 22.8284 14.5 22C14.5 21.1716 15.1716 20.5 16 20.5C16.8284 20.5 17.5 21.1716 17.5 22ZM13.5142 11.3218C13.9564 10.391 14.9041 9.75 16 9.75C17.5188 9.75 18.75 10.9812 18.75 12.5C18.75 13.8852 17.7252 15.0323 16.3926 15.2223C15.8162 15.3045 15.25 15.787 15.25 16.5V17.25V18H16.75V17.25V16.6839C18.7397 16.3292 20.25 14.5916 20.25 12.5C20.25 10.1528 18.3472 8.25 16 8.25C14.3035 8.25 12.8406 9.24406 12.1593 10.6782L11.8375 11.3556L13.1924 11.9993L13.5142 11.3218Z" fill="currentColor" fill-rule="evenodd"></path></g><defs><clipPath id="clip0_132_19094"><rect fill="currentColor" height="32" width="32"></rect></clipPath></defs></svg>
  </div>
  <p class="quiz__title">퀴즈할 시간입니다!</p>
  <p class="quiz__desc">익힌걸 테스트해보고 무엇을 배웠는지 봅시다.</p>
  <div class="quiz__box">
    <p class="quiz__question">코드 에디터에서 `clsx`를 찾아봅시다, 어떤 컴퍼넌트가 클래스 명을 조건으로 받기 위해 이것을 쓰고있나요?</p>
    <div class="option-list">
      <div class="option" data-question-number="03" data-answer="true">
        <span class="option__number">A</span>
        <span class="option__desc">'status.tsx' 그리고 'pagination.tsx'</span>
      </div>
      <div class="option" data-question-number="03">
        <span class="option__number">B</span>
        <span class="option__desc">'table.tsx' 그리고 'status.tsx'</span>
      </div>
      <div class="option" data-question-number="03">
        <span class="option__number">C</span>
        <span class="option__desc">'nav-links.tsx' 그리고 'table.tsx'</span>
      </div>
    </div>
    <div class="quiz__btn-container">
      <button class="quiz__btn" data-js-check-answer="" data-question="03">
        정답 확인
      </button>
    </div>
  </div>  
</div>

<h2>다른 스타일하기 옵션</h2>
<p>우리가 이야기한것 외에 추가적으로, Next.js어플리케이션을 스타일할 수 있습니다:</p>
<ul>
<li><code>.css</code> <code>.scss</code> 파일들을 불러(import)올수 있게해주는 Sass</li>
<li><a href="https://github.com/vercel/styled-jsx">styled-jsx</a>, <a href="https://github.com/vercel/next.js/tree/canary/examples/with-styled-components">styled-components</a>, <a href="https://github.com/vercel/next.js/tree/canary/examples/with-emotion">emotion</a> 같은 CSS-in-JS 라이브러리들</li>
</ul>
<p>더 많은 정보를 위해 <a href="https://nextjs.org/docs/app/building-your-application/styling">CSS 문서</a>를 읽어보세요.</p>
<div class="finish">
  <p class="finish__title">챕터 2를 완료했습니다.</p>
  <p>잘했습니다! Next.js 어플리케이션을 꾸밀 다양한 방법을 배웠습니다.</p>
  <div class="next-box">
    <p class="next">다음</p>    
    <p class="next__title">3: 폰트와 이미지 최적화</p>
    <p>커스텀 폰트와 히어로 이미지를 추가하면서 홈페이지 작업을 계속 할겁니다.</p>
    <a id="next__btn" href="https://thewys.tistory.com/entry/NextJS-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-%EC%B1%95%ED%84%B0-3-%ED%8F%B0%ED%8A%B8%EC%99%80-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94">챕터 3 시작하기
    <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z" fill="currentColor"></path></svg>
    </a>
  </div>
</div>

<h2>Ref</h2>
<ul>
<li>[<a href="https://nextjs.org/learn/dashboard-app/css-styling%5D">https://nextjs.org/learn/dashboard-app/css-styling]</a></li>
</ul>
<link rel="stylesheet" href="https://eso0117.github.io/web-practice/public/next-js-tutorial/css.css">
<script type="text/javascript" src="https://eso0117.github.io/web-practice/public/next-js-tutorial/js.js"></script></div>
