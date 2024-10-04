import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BlogsList.css'; // Import the custom CSS file

const BlogsListByCategoryId = () => {
  const { id }: any = useParams();
  const [blogs, setBlogs] = useState([] as any);

  useEffect(() => {
    const demoBlogs = [
      // JavaScript Blogs (Category 1)
      {
        id: 1,
        title: 'React vs Vue: Which is Better?',
        content: `
      <h2>Introduction</h2>
      <p>React and Vue are two of the most popular frameworks in web development today. Both have their own strengths, making it hard to choose between them.</p>
      <h3>React Advantages</h3>
      <p>React is backed by Facebook, has a larger community, and is widely adopted in large-scale applications, making it a solid choice for enterprise solutions.</p>
      <h3>Vue Advantages</h3>
      <p>Vue is known for its simplicity and ease of integration, especially in smaller projects, making it a good choice for beginners or small teams.</p>
      <h3>Conclusion</h3>
      <p>Choosing between React and Vue depends on your project needs, team size, and experience level.</p>
    `,
        faq: [
          {
            question: 'Why should I choose React over Vue?',
            answer: `
          <p>React is a library that offers developers flexibility and control over how they structure their applications. Its vast ecosystem, including libraries like Redux for state management, makes it an excellent choice for enterprise-level applications where scalability and maintenance are critical.</p>
          <p><strong>Example:</strong> A simple React component that handles state using <code>useState</code> hook:</p>
          <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}

export default Counter;
          </code></pre>
          <p>This flexibility makes React a better option for complex applications that need efficient state management.</p>
        `
          },
          {
            question: 'Which one is easier to learn?',
            answer: `
          <p>Vue is generally easier to learn for beginners due to its clear documentation, smaller learning curve, and simpler syntax. Vue's single-file components combine HTML, CSS, and JavaScript in one file, making it easy for developers to get started.</p>
          <p><strong>Example:</strong> A simple Vue component:</p>
          <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;You clicked {{ count }} times&lt;/p&gt;
    &lt;button @click="count++"&gt;Click me&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      count: 0
    };
  }
};
&lt;/script&gt;
          </code></pre>
          <p>Vue’s simplicity allows new developers to quickly understand and work with its structure compared to React’s JSX and ecosystem.</p>
        `
          },
          {
            question: 'Which framework is better for large applications?',
            answer: `
          <p>For large-scale applications, React is often preferred due to its vast ecosystem and greater flexibility. Tools like React Router for routing and Redux for managing global state enable developers to build more complex, maintainable applications with React.</p>
          <p><strong>Example:</strong> Using Redux with React:</p>
          <pre><code>import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// Store
const store = createStore(counterReducer);

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => dispatch({ type: 'INCREMENT' })}&gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  );
}

export default function App() {
  return (
    &lt;Provider store={store}&gt;
      &lt;Counter /&gt;
    &lt;/Provider&gt;
  );
}
          </code></pre>
          <p>React’s flexibility and extensive tooling make it more suitable for large applications.</p>
        `
          },
          {
            question: 'Can I switch between React and Vue easily?',
            answer: `
          <p>Switching between React and Vue requires understanding their core differences. Vue's templating syntax is much closer to traditional HTML, while React uses JSX. Moving from React to Vue or vice versa may require rethinking component structures and adjusting to different state management techniques.</p>
          <p><strong>Example:</strong> A React JSX component:</p>
          <pre><code>&lt;div&gt;
  &lt;h1&gt;Hello, World!&lt;/h1&gt;
  &lt;button&gt;Click me&lt;/button&gt;
&lt;/div&gt;
          </code></pre>
          <p><strong>Example:</strong> A Vue component using template syntax:</p>
          <pre><code>&lt;div&gt;
  &lt;h1&gt;Hello, World!&lt;/h1&gt;
  &lt;button&gt;Click me&lt;/button&gt;
&lt;/div&gt;
          </code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        category: 'JavaScript',
        categoryId: 1,
        readTime: '5 min',
        createdAt: '2024-10-01'
      },
      {
        id: 2,
        title: 'JavaScript Promises Explained',
        content: `
      <h2>What is a JavaScript Promise?</h2>
      <p>A promise is an object in JavaScript that represents the eventual completion or failure of an asynchronous operation.</p>
      <h3>States of Promises</h3>
      <p>Promises can be in one of three states: pending, fulfilled, or rejected. The <code>.then()</code> method is used to execute code once the promise is fulfilled.</p>
      <h3>Using Promises in Asynchronous Code</h3>
      <p>Promises help simplify asynchronous code, preventing the "callback hell" often seen with older patterns. For example:</p>
      <pre><code>fetch('api/data')
  .then(response => response.json())
  .then(data => console.log(data));</code></pre>
    `,
        faq: [
          {
            question: 'What is a JavaScript promise?',
            answer: `
          <p>A promise represents the eventual outcome (success or failure) of an asynchronous operation in JavaScript. It allows developers to handle asynchronous code in a cleaner and more manageable way compared to traditional callback functions.</p>
          <p><strong>Example:</strong> Basic usage of a promise:</p>
          <pre><code>const promise = new Promise((resolve, reject) => {
  // Simulate async operation
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

promise.then((message) => {
  console.log(message); // Outputs: Success!
});
          </code></pre>
        `
          },
          {
            question: 'How do you handle errors in promises?',
            answer: `
          <p>Errors in promises can be handled using the <code>.catch()</code> method. This is where you can catch any rejections or errors that occur during the asynchronous operation.</p>
          <p><strong>Example:</strong> Handling errors in promises:</p>
          <pre><code>const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Error occurred!');
  }, 1000);
});

promise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error); // Outputs: Error occurred!
  });
          </code></pre>
        `
          },
          {
            question: 'What are the main advantages of using promises?',
            answer: `
          <p>Promises offer a cleaner, more manageable way to handle asynchronous code compared to callbacks. They allow for chaining of asynchronous operations using <code>.then()</code>, making the code easier to read. Additionally, error handling is improved with <code>.catch()</code> blocks, and promises can be combined using <code>Promise.all()</code> for handling multiple async operations.</p>
          <p><strong>Example:</strong> Using <code>Promise.all()</code> to handle multiple promises:</p>
          <pre><code>const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, 'foo']
});
          </code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        category: 'JavaScript',
        categoryId: 1,
        readTime: '7 min',
        createdAt: '2024-10-03'
      },
      {
        id: 3,
        title: 'Understanding JavaScript Closures',
        content: `
      <h2>What are Closures in JavaScript?</h2>
      <p>A closure is a function that has access to its own scope, the scope of the outer function, and the global scope. It allows a function to access variables from an outer function even after the outer function has returned.</p>
      <h3>Why are Closures Important?</h3>
      <p>Closures are essential for creating private variables, implementing currying, and building modular code in JavaScript. They help functions maintain state across multiple executions.</p>
      <h3>Example of Closure</h3>
      <pre><code>function outer() {
  let counter = 0;
  return function inner() {
    counter++;
    return counter;
  };
}

const increment = outer();
console.log(increment()); // Output: 1
console.log(increment()); // Output: 2
      </code></pre>
    `,
        faq: [
          {
            question: 'What is a closure in JavaScript?',
            answer: `
          <p>A closure in JavaScript refers to a function that retains access to variables in its parent scope, even after the parent function has returned. Closures are created whenever a function is defined inside another function, allowing the inner function to "remember" the environment in which it was created.</p>
          <p><strong>Example:</strong> Simple closure:</p>
          <pre><code>function outer() {
  let name = "John";
  return function inner() {
    console.log("Hello, " + name);
  };
}
const greet = outer();
greet(); // Outputs: Hello, John
          </code></pre>
        `
          },
          {
            question: 'Why are closures useful?',
            answer: `
          <p>Closures are particularly useful in JavaScript for creating private variables or encapsulating logic. For example, you can use closures to protect the state of variables from being accessed or modified outside the function.</p>
          <p><strong>Example:</strong> Using closures to create private variables:</p>
          <pre><code>function Counter() {
  let count = 0;
  return {
    increment() {
      count++;
      console.log(count);
    },
    reset() {
      count = 0;
      console.log("Counter reset.");
    }
  };
}

const counter = Counter();
counter.increment(); // Outputs: 1
counter.increment(); // Outputs: 2
counter.reset();     // Outputs: Counter reset.
          </code></pre>
        `
          },
          {
            question: 'Can closures cause memory leaks?',
            answer: `
          <p>Closures can lead to memory leaks if not used carefully, especially if references to outer variables are kept unintentionally. JavaScript's garbage collector won't clean up variables as long as they are referenced inside a closure, which may result in memory not being freed.</p>
          <p><strong>Example:</strong> Unintentional memory leak with closures:</p>
          <pre><code>function createBigArray() {
  const bigArray = new Array(1000).fill("Some large data");
  return function inner() {
    console.log(bigArray[0]);
  };
}

const leak = createBigArray();
leak(); // The bigArray is still in memory even after being used.
          </code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        category: 'JavaScript',
        categoryId: 1,
        readTime: '7 min',
        createdAt: '2024-09-20'
      },
      {
        id: 4,
        title: 'Asynchronous JavaScript: Callbacks, Promises, and Async/Await',
        content: `
      <h2>Handling Asynchronous Operations in JavaScript</h2>
      <p>JavaScript is single-threaded, meaning it can only perform one operation at a time. However, with asynchronous programming techniques like callbacks, promises, and async/await, JavaScript can handle multiple tasks without blocking the main thread.</p>
      <h3>Callbacks</h3>
      <p>Callbacks are functions passed as arguments to other functions and executed once the task is completed. Although useful, they can lead to deeply nested code known as "callback hell."</p>
      <h3>Promises</h3>
      <p>Promises represent the eventual completion (or failure) of an asynchronous operation, providing a cleaner and more structured way to handle async tasks.</p>
      <h3>Async/Await</h3>
      <p>Async/await is syntactic sugar built on promises, allowing you to write asynchronous code in a synchronous style.</p>
    `,
        faq: [
          {
            question: 'What are callbacks in JavaScript?',
            answer: `
          <p>Callbacks are functions passed as arguments to other functions. They are invoked after the completion of an asynchronous operation, but overuse of callbacks can lead to deeply nested, hard-to-read code.</p>
          <p><strong>Example:</strong> Callback function example:</p>
          <pre><code>function fetchData(callback) {
  setTimeout(() => {
    callback("Data fetched successfully.");
  }, 2000);
}

fetchData(function(response) {
  console.log(response); // Outputs: Data fetched successfully.
});
          </code></pre>
        `
          },
          {
            question: 'What’s the advantage of using promises over callbacks?',
            answer: `
          <p>Promises provide a more structured and readable way to handle asynchronous operations. Unlike callbacks, promises allow you to chain async tasks using <code>.then()</code>, making the code easier to follow and less prone to errors.</p>
          <p><strong>Example:</strong> Using promises instead of callbacks:</p>
          <pre><code>function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched successfully.");
    }, 2000);
  });
}

fetchData().then(response => console.log(response));
          </code></pre>
        `
          },
          {
            question: 'Why should I use async/await?',
            answer: `
          <p>Async/await makes asynchronous code easier to read and write by removing the need for chaining <code>.then()</code> and <code>.catch()</code> blocks. With async/await, you can handle promises in a synchronous style, which improves code readability and maintainability.</p>
          <p><strong>Example:</strong> Using async/await:</p>
          <pre><code>async function fetchData() {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched successfully.");
    }, 2000);
  });
  console.log(response);
}

fetchData();
          </code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
        category: 'JavaScript',
        categoryId: 1,
        readTime: '8 min',
        createdAt: '2024-09-30'
      },
      {
        id: 5,
        title: '10 CSS Tricks Every Developer Should Know',
        content: `
      <h2>Introduction to Advanced CSS Tricks</h2>
      <p>CSS offers more than just basic styling. These advanced tricks can help you enhance your design skills and make your websites more dynamic and user-friendly.</p>
      <h3>1. Centering with Flexbox</h3>
      <p>Flexbox makes it easy to center content both horizontally and vertically:</p>
      <pre><code>display: flex;
justify-content: center;
align-items: center;</code></pre>
      <h3>2. CSS Variables</h3>
      <p>Using CSS variables (<code>--varname</code>) makes it easier to maintain and update styles across your website. They can be dynamically updated, providing more flexibility in your design.</p>
    `,
        faq: [
          {
            question: 'What are CSS variables?',
            answer: `
          <p>CSS variables, also known as custom properties, allow you to store values that can be reused throughout your CSS. This makes your styles easier to manage and maintain, as you can update one variable to change multiple elements in your design.</p>
          <p><strong>Example:</strong> Defining and using CSS variables:</p>
          <pre><code>:root {
  --primary-color: #3498db;
}

button {
  background-color: var(--primary-color);
}</code></pre>
        `
          },
          {
            question: 'How does Flexbox make layout design easier?',
            answer: `
          <p>Flexbox simplifies the process of creating responsive layouts by providing alignment and distribution properties that can adjust items dynamically. It's perfect for centering content or creating layouts that adapt to different screen sizes.</p>
          <p><strong>Example:</strong> Simple flexbox layout:</p>
          <pre><code>.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}</code></pre>
        `
          },
          {
            question: 'Can CSS animations be combined with JavaScript?',
            answer: `
          <p>Yes, CSS animations can be triggered and controlled using JavaScript. This provides dynamic interactivity, where animations can be started or stopped based on user actions like clicks or scrolling.</p>
          <p><strong>Example:</strong> Triggering a CSS animation with JavaScript:</p>
          <pre><code>document.querySelector('button').addEventListener('click', () => {
  document.querySelector('.box').classList.add('animate');
});

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

.box.animate {
  animation: slide 1s forwards;
}</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
        category: 'CSS',
        categoryId: 2,
        readTime: '4 min',
        createdAt: '2024-09-25'
      },
      {
        id: 6,
        title: 'Building Responsive Layouts with CSS Grid',
        content: `
      <h2>Introduction to CSS Grid</h2>
      <p>CSS Grid is a powerful two-dimensional layout system that provides an easy way to create complex web layouts with rows and columns. It offers more control over the placement of elements than traditional layout methods like floats and Flexbox.</p>
      <h3>Basic Grid Layout</h3>
      <p>To create a basic grid layout, you can use the <code>display: grid;</code> property and define the number of columns and rows with <code>grid-template-columns</code> and <code>grid-template-rows</code>.</p>
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}</code></pre>
      <h3>Responsive Grids</h3>
      <p>CSS Grid allows for easy creation of responsive designs by adjusting the number of columns based on screen size using media queries or the <code>minmax()</code> function.</p>
    `,
        faq: [
          {
            question: 'What is CSS Grid?',
            answer: `
          <p>CSS Grid is a layout system in CSS that enables you to divide a web page into rows and columns, allowing for more flexible layouts. It offers a simple and powerful way to manage the alignment and positioning of elements on a page.</p>
          <p><strong>Example:</strong> Simple grid layout:</p>
          <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.grid-item {
  background-color: #3498db;
  color: white;
  padding: 20px;
  text-align: center;
}</code></pre>
        `
          },
          {
            question: 'How do you create a responsive grid layout?',
            answer: `
          <p>A responsive grid layout can be achieved by adjusting the number of columns based on the screen size. This can be done using media queries or the <code>repeat()</code> and <code>minmax()</code> functions for flexibility.</p>
          <p><strong>Example:</strong> Responsive grid layout with <code>minmax()</code>:</p>
          <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
}</code></pre>
        `
          },
          {
            question: 'How does CSS Grid differ from Flexbox?',
            answer: `
          <p>CSS Grid is designed for two-dimensional layouts (rows and columns), while Flexbox is designed for one-dimensional layouts (either rows or columns). Grid is more suitable for creating complex layouts, while Flexbox is better for aligning items within a container.</p>
          <p><strong>Example:</strong> Combining Grid and Flexbox:</p>
          <pre><code>.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}</code></pre>
        `
          }
        ],
        bannerImage: 'https://plus.unsplash.com/premium_photo-1683120974913-1ef17fdec2a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
        category: 'CSS',
        categoryId: 2,
        readTime: '5 min',
        createdAt: '2024-09-26'
      },
      {
        id: 7,
        title: 'Mastering Flexbox for Responsive Design',
        content: `
      <h2>What is Flexbox?</h2>
      <p>Flexbox is a CSS layout module that provides a simple way to arrange elements in a container, even when their size is unknown or dynamic. It is particularly useful for responsive designs.</p>
      <h3>Creating a Flexbox Layout</h3>
      <p>To create a Flexbox layout, use <code>display: flex;</code> on the container, and control the alignment and distribution of child elements with properties like <code>justify-content</code> and <code>align-items</code>.</p>
      <pre><code>.container {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>
      <h3>Flexbox Properties</h3>
      <p>Flexbox offers a range of properties for controlling the layout of child elements, including <code>flex-direction</code>, <code>flex-wrap</code>, and <code>flex-grow</code>.</p>
    `,
        faq: [
          {
            question: 'What is the main advantage of using Flexbox?',
            answer: `
          <p>The main advantage of Flexbox is its ability to provide flexible layouts, especially for aligning items and distributing space within a container. It simplifies the process of creating responsive designs without needing to use floats or positioning.</p>
          <p><strong>Example:</strong> Centering items with Flexbox:</p>
          <pre><code>.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}</code></pre>
        `
          },
          {
            question: 'How does Flexbox handle item spacing?',
            answer: `
          <p>Flexbox uses properties like <code>justify-content</code> and <code>align-items</code> to control how items are spaced and aligned within the container. These properties distribute space along the main axis (row or column).</p>
          <p><strong>Example:</strong> Spacing items in a row:</p>
          <pre><code>.container {
  display: flex;
  justify-content: space-between;
}</code></pre>
        `
          },
          {
            question: 'Can Flexbox be used for two-dimensional layouts?',
            answer: `
          <p>Flexbox is primarily intended for one-dimensional layouts, handling either rows or columns. For two-dimensional layouts, CSS Grid is a better option, as it allows you to create both rows and columns simultaneously.</p>
          <p><strong>Example:</strong> Flexbox used for row-based layout:</p>
          <pre><code>.flex-container {
  display: flex;
  flex-direction: row;
}</code></pre>
        `
          }
        ],
        bannerImage: 'https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
        category: 'CSS',
        categoryId: 2,
        readTime: '4 min',
        createdAt: '2024-09-10'
      },
      {
        id: 8,
        title: 'CSS Animations: How to Add Motion to Your Web Projects',
        content: `
      <h2>Introduction to CSS Animations</h2>
      <p>CSS animations allow you to add dynamic effects to web elements, making them more interactive and engaging for users. Animations are created using keyframes to define the start and end states of the animation.</p>
      <h3>Keyframes in CSS</h3>
      <p>Keyframes define the animation stages, specifying the styles at different points of the animation. You can create animations with multiple keyframes to control how elements appear, move, or disappear.</p>
      <pre><code>@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}</code></pre>
      <h3>Applying Animations</h3>
      <p>Once keyframes are defined, animations can be applied to elements using the <code>animation</code> property. You can control the duration, timing function, and delay of the animation.</p>
    `,
        faq: [
          {
            question: 'What are CSS animations?',
            answer: `
          <p>CSS animations allow you to create transitions and motion effects that change the appearance of an element over time. They can be used to animate properties like color, position, size, and more.</p>
          <p><strong>Example:</strong> Simple fade-in animation:</p>
          <pre><code>@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 2s ease-in-out;
}</code></pre>
        `
          },
          {
            question: 'How do keyframes work in CSS?',
            answer: `
          <p>Keyframes define the stages of an animation by specifying what styles should be applied at different points in the animation. You can control the progression of the animation by setting percentages for each keyframe.</p>
          <p><strong>Example:</strong> Using keyframes for a sliding animation:</p>
          <pre><code>@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

.element {
  animation: slide 1s ease-in-out;
}</code></pre>
        `
          },
          {
            question: 'Can CSS animations be triggered by JavaScript?',
            answer: `
          <p>Yes, CSS animations can be controlled and triggered by JavaScript, allowing for dynamic user interactions. You can add or remove classes with JavaScript to start or stop animations.</p>
          <p><strong>Example:</strong> Triggering an animation with JavaScript:</p>
          <pre><code>document.querySelector('.button').addEventListener('click', () => {
  document.querySelector('.box').classList.add('animate');
});

.box.animate {
  animation: slide 2s forwards;
}</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
        category: 'CSS',
        categoryId: 2,
        readTime: '6 min',
        createdAt: '2024-10-07'
      },
      {
        id: 9,
        title: 'Getting Started with React Hooks',
        content: `
      <h2>Introduction to React Hooks</h2>
      <p>React Hooks are a way to use state and other React features in functional components. They were introduced in React 16.8 and have transformed how developers write components, eliminating the need for class components in most cases.</p>
      <h3>Commonly Used Hooks</h3>
      <p>The two most commonly used hooks are <code>useState</code> and <code>useEffect</code>. These allow you to manage state and handle side effects, respectively.</p>
      <pre><code>const [count, setCount] = useState(0);

useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);</code></pre>
      <h3>Why Use Hooks?</h3>
      <p>Hooks allow you to reuse stateful logic without the need for classes. They make components easier to understand and maintain, especially as your app grows in complexity.</p>
    `,
        faq: [
          {
            question: 'What are React Hooks?',
            answer: `
          <p>React Hooks allow you to use state and other React features without writing class components. They make it easier to manage component state and lifecycle in functional components.</p>
          <p><strong>Example:</strong> Using <code>useState</code> hook:</p>
          <pre><code>const [name, setName] = useState('John');

return (
  &lt;input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
  /&gt;
);</code></pre>
        `
          },
          {
            question: 'What is the difference between useState and useEffect?',
            answer: `
          <p><code>useState</code> is used to manage local state within a component, while <code>useEffect</code> is used to perform side effects such as data fetching or DOM updates after the component renders.</p>
          <p><strong>Example:</strong> Updating the document title with <code>useEffect</code>:</p>
          <pre><code>useEffect(() => {
  document.title = 'My React App';
}, []);</code></pre>
        `
          },
          {
            question: 'Can Hooks replace class components?',
            answer: `
          <p>Yes, Hooks provide a more concise and declarative way to write React components, allowing developers to avoid the complexities of class components. Most applications can be built entirely with functional components using hooks.</p>
          <p><strong>Example:</strong> A functional component using Hooks:</p>
          <pre><code>const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    &lt;button onClick={() => setCount(count + 1)}&gt;
      {count}
    &lt;/button&gt;
  );
};</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1651066471224-b970dd45acc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmxvZ3N8ZW58MHx8MHx8fDA%3D',
        category: 'React',
        categoryId: 3,
        readTime: '6 min',
        createdAt: '2024-09-15'
      },
      {
        id: 10,
        title: 'Advanced React Patterns: Render Props and Higher-Order Components',
        content: `
      <h2>Advanced React Design Patterns</h2>
      <p>As React applications grow in complexity, advanced patterns like Render Props and Higher-Order Components (HOCs) become crucial for code reuse and organization.</p>
      <h3>Render Props</h3>
      <p>Render Props is a pattern where a component receives a function as a prop and uses it to determine what to render. This allows for the sharing of logic between components without repeating code.</p>
      <pre><code>const DataProvider = ({ render }) => {
  const data = { user: 'John' };
  return render(data);
};</code></pre>
      <h3>Higher-Order Components (HOCs)</h3>
      <p>HOCs are functions that take a component and return a new component, adding extra functionality or logic. This pattern is useful for reusing logic across multiple components.</p>
    `,
        faq: [
          {
            question: 'What is the purpose of using Render Props?',
            answer: `
          <p>Render Props allows sharing logic between components by passing a function that returns a React element. This enables the reuse of component behavior without duplication.</p>
          <p><strong>Example:</strong> Using Render Props:</p>
          <pre><code>&lt;DataProvider render={(data) => (
  &lt;div&gt;User: {data.user}&lt;/div&gt;
)} /&gt;</code></pre>
        `
          },
          {
            question: 'What are HOCs used for?',
            answer: `
          <p>HOCs are used to wrap components and extend their functionality. This pattern allows you to add cross-cutting concerns (e.g., authentication or logging) without modifying the component itself.</p>
          <p><strong>Example:</strong> Creating an HOC:</p>
          <pre><code>const withLogging = (Component) => {
  return (props) => {
    console.log('Rendering', Component.name);
    return &lt;Component {...props} /&gt;;
  };
};</code></pre>
        `
          },
          {
            question: 'Can you use HOCs and Render Props together?',
            answer: `
          <p>Yes, you can combine both patterns. Render Props handle conditional rendering, while HOCs can wrap components to inject additional behavior or data.</p>
          <p><strong>Example:</strong> Combining HOC and Render Props:</p>
          <pre><code>const withData = (Component) => (props) => {
  const data = { user: 'Jane' };
  return &lt;Component data={data} {...props} /&gt;;
};</code></pre>
        `
          }
        ],
        bannerImage: 'https://plus.unsplash.com/premium_photo-1681755915233-9acafb348a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8QmxvZ3N8ZW58MHx8MHx8fDA%3D',
        category: 'React',
        categoryId: 3,
        readTime: '10 min',
        createdAt: '2024-10-05'
      },
      {
        id: 11,
        title: 'Understanding React Context API',
        content: `
      <h2>React Context API: Global State Management</h2>
      <p>The React Context API provides a way to pass data through the component tree without manually passing props at every level. It's often used for global state management, such as theme or authentication status.</p>
      <h3>How to Use Context</h3>
      <p>To use the Context API, create a context object using <code>React.createContext()</code>, provide the context at a high level in your component tree, and consume it in any child component using <code>useContext()</code>.</p>
      <pre><code>const ThemeContext = React.createContext('light');

const App = () => {
  return (
    &lt;ThemeContext.Provider value="dark"&gt;
      &lt;Toolbar /&gt;
    &lt;/ThemeContext.Provider&gt;
  );
};</code></pre>
      <h3>When to Use Context</h3>
      <p>Use Context when data or state needs to be accessible by many components at different levels of your app’s hierarchy, without having to manually pass props through each level.</p>
    `,
        faq: [
          {
            question: 'What is React Context API?',
            answer: `
          <p>The React Context API allows you to manage global state by passing data through the component tree without manually passing props at every level. It's commonly used for themes, authentication, or language settings.</p>
          <p><strong>Example:</strong> Setting up a Context:</p>
          <pre><code>const UserContext = React.createContext(null);

const App = () => {
  return (
    &lt;UserContext.Provider value={{ name: 'John' }}&gt;
      &lt;Profile /&gt;
    &lt;/UserContext.Provider&gt;
  );
};</code></pre>
        `
          },
          {
            question: 'How is Context different from Redux?',
            answer: `
          <p>Context is a simpler tool for managing global state in small to medium-sized applications. Redux provides more features like middleware, advanced state management, and better debugging tools, making it better for large-scale apps.</p>
          <p><strong>Example:</strong> Accessing context data:</p>
          <pre><code>const Profile = () => {
  const user = useContext(UserContext);
  return &lt;div&gt;Hello, {user.name}&lt;/div&gt;;
};</code></pre>
        `
          },
          {
            question: 'When should I use the Context API?',
            answer: `
          <p>The Context API is ideal for small to medium-sized applications where only a few pieces of state (like theme or user data) need to be shared across multiple components.</p>
          <p><strong>Example:</strong> Sharing theme data across components:</p>
          <pre><code>const ThemeButton = () => {
  const theme = useContext(ThemeContext);
  return &lt;button className={theme}&gt;Click me&lt;/button&gt;;
};</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1583314965950-cd54a8b6db84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
        category: 'React',
        categoryId: 3,
        readTime: '8 min',
        createdAt: '2024-09-05'
      },
      {
        id: 12,
        title: 'React vs Angular: Which One Should You Choose?',
        content: `
      <h2>React vs Angular: Key Differences</h2>
      <p>React and Angular are two of the most widely used JavaScript frameworks for building modern web applications. While both are powerful tools, they have significant differences that make them suitable for different types of projects.</p>
      <h3>React</h3>
      <p>React is a library for building user interfaces, developed by Facebook. It uses a component-based architecture and is primarily focused on the view layer of applications.</p>
      <h3>Angular</h3>
      <p>Angular, developed by Google, is a full-fledged framework for building web applications. It includes built-in tools for routing, state management, and form validation, making it a more opinionated framework.</p>
      <h3>Which One is Better?</h3>
      <p>The choice between React and Angular largely depends on the complexity of your application and your development team's experience. React is flexible and easier to learn, while Angular provides a more comprehensive solution with built-in features.</p>
    `,
        faq: [
          {
            question: 'Which is easier to learn, React or Angular?',
            answer: `
          <p>React is generally considered easier to learn due to its simplicity and flexibility. Angular, being a full-fledged framework, has a steeper learning curve, especially for developers new to JavaScript frameworks.</p>
          <p><strong>Example:</strong> React Component:</p>
          <pre><code>const MyComponent = () => {
  return &lt;h1&gt;Hello, World!&lt;/h1&gt;;
};</code></pre>
        `
          },
          {
            question: 'Which framework is better for large applications?',
            answer: `
          <p>Angular is often better suited for large-scale applications because it provides built-in tools like routing, state management, and form validation. React, on the other hand, requires third-party libraries for these features, giving developers more flexibility.</p>
          <p><strong>Example:</strong> Angular Component:</p>
          <pre><code>@Component({
  selector: 'app-root',
  template: '&lt;h1&gt;Hello, World!&lt;/h1&gt;'
})
export class AppComponent {}</code></pre>
        `
          },
          {
            question: 'Can I integrate React with other libraries?',
            answer: `
          <p>Yes, React is highly flexible and can be integrated with any other libraries or frameworks. This is one of the reasons React is popular in projects where you want to choose your own tools for routing, state management, etc.</p>
          <p><strong>Example:</strong> Using React with Redux for state management:</p>
          <pre><code>const store = createStore(rootReducer);

const App = () => (
  &lt;Provider store={store}&gt;
    &lt;MyComponent /&gt;
  &lt;/Provider&gt;
);</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1611200945005-403b70229452?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww',
        category: 'React',
        categoryId: 3,
        readTime: '7 min',
        createdAt: '2024-10-08'
      },
      {
        id: 13,
        title: 'Introduction to TypeScript',
        content: `
      <h2>Getting Started with TypeScript</h2>
      <p>TypeScript is a superset of JavaScript that adds optional static typing, making it easier to catch errors early in development. TypeScript can be used in any JavaScript environment, including Node.js and React applications.</p>
      <h3>Setting Up TypeScript</h3>
      <p>To use TypeScript, you need to install the TypeScript compiler by running <code>npm install typescript</code>. Once installed, you can start writing TypeScript by renaming your JavaScript files to <code>.ts</code> or <code>.tsx</code> (for React components).</p>
      <h3>Why Use TypeScript?</h3>
      <p>TypeScript helps catch common JavaScript errors at compile time, leading to fewer runtime errors and better code maintainability.</p>
    `,
        faq: [
          {
            question: 'What is TypeScript?',
            answer: `
          <p>TypeScript is a superset of JavaScript that adds optional static typing. It allows you to define types for variables, functions, and objects, helping to prevent bugs caused by incorrect data types.</p>
          <p><strong>Example:</strong> Defining types in TypeScript:</p>
          <pre><code>let age: number = 25;
let name: string = 'John';</code></pre>
        `
          },
          {
            question: 'Why use TypeScript over JavaScript?',
            answer: `
          <p>TypeScript helps catch errors early in development by enforcing type safety. It also provides better tooling support, such as autocompletion and code refactoring, making it easier to maintain large codebases.</p>
          <p><strong>Example:</strong> Using TypeScript in a function:</p>
          <pre><code>function greet(name: string): string {
  return 'Hello, ' + name;
}</code></pre>
        `
          },
          {
            question: 'Can TypeScript be used with React?',
            answer: `
          <p>Yes, TypeScript is commonly used with React to provide type safety and better tooling for React components. You can define the types for your component props and state, ensuring that your components receive the correct data.</p>
          <p><strong>Example:</strong> TypeScript with React:</p>
          <pre><code>interface Props {
  name: string;
}

const MyComponent: React.FC<Props> = ({ name }) => {
  return &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;
};</code></pre>
        `
          }
        ],
        bannerImage: 'https://plus.unsplash.com/premium_photo-1664297543985-a0cef55975fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww',
        category: 'TypeScript',
        categoryId: 4,
        readTime: '6 min',
        createdAt: '2024-09-28'
      },
      {
        id: 14,
        title: 'Advanced TypeScript Tips and Tricks',
        content: `
      <h2>Maximizing TypeScript for Large-Scale Projects</h2>
      <p>TypeScript offers several advanced features like generics, decorators, and type inference that can help you write more efficient and maintainable code, especially in large-scale projects.</p>
      <h3>Using Generics</h3>
      <p>Generics allow you to create reusable components that work with any data type. This is particularly useful when working with collections or implementing reusable logic.</p>
      <pre><code>function identity<T>(arg: T): T {
  return arg;
}</code></pre>
      <h3>Type Inference</h3>
      <p>TypeScript's type inference system automatically determines the type of a variable based on its initial value, reducing the need for explicit type annotations.</p>
    `,
        faq: [
          {
            question: 'What are TypeScript generics?',
            answer: `
          <p>Generics allow you to create reusable components that can work with any data type. This makes your code more flexible and reduces duplication.</p>
          <p><strong>Example:</strong> Using generics in a function:</p>
          <pre><code>function merge<T, U>(obj1: T, obj2: U): T & U {
  return Object.assign({}, obj1, obj2);
}</code></pre>
        `
          },
          {
            question: 'What is type inference in TypeScript?',
            answer: `
          <p>Type inference allows TypeScript to automatically determine the type of a variable based on its value. This reduces the need for explicit type annotations and simplifies your code.</p>
          <p><strong>Example:</strong> Type inference in action:</p>
          <pre><code>let name = 'John';  // TypeScript infers this as a string</code></pre>
        `
          },
          {
            question: 'Can I use TypeScript with Node.js?',
            answer: `
          <p>Yes, TypeScript is commonly used with Node.js to provide better type safety and tooling for server-side applications. You can define types for your Node.js modules and APIs.</p>
          <p><strong>Example:</strong> Setting up TypeScript in a Node.js project:</p>
          <pre><code>// Install TypeScript and Node types
npm install typescript @types/node

// Create a simple TypeScript file
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data);
});</code></pre>
        `
          }
        ],
        bannerImage: 'https://plus.unsplash.com/premium_photo-1672997189763-7002561b5e29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww',
        category: 'TypeScript',
        categoryId: 4,
        readTime: '8 min',
        createdAt: '2024-10-10'
      },
      {
        id: 15,
        title: 'TypeScript vs JavaScript: When to Use Which?',
        content: `
      <h2>Choosing Between TypeScript and JavaScript</h2>
      <p>While TypeScript adds valuable features, JavaScript still has its place in web development. Understanding when to use each depends on the scale of your project and your team’s needs.</p>
      <h3>Why Use TypeScript?</h3>
      <p>TypeScript is best for large, complex applications where catching errors early and maintaining code quality are crucial.</p>
      <h3>When to Stick with JavaScript</h3>
      <p>For smaller projects, prototypes, or teams familiar with JavaScript, sticking with the simpler JavaScript syntax may be more efficient.</p>
    `,
        faq: [
          {
            question: 'When should I choose TypeScript over JavaScript?',
            answer: `
          <p>TypeScript is ideal for large-scale projects where catching bugs early and maintaining clean code is essential. It provides better tooling, making it easier to manage complex applications.</p>
          <p><strong>Example:</strong> TypeScript with class definitions:</p>
          <pre><code>class Person {
  constructor(private name: string, private age: number) {}

  getDetails(): string {
    return this.name + ' is ' + this.age + ' years old.';
  }
}</code></pre>
        `
          },
          {
            question: 'Is there a performance difference between TypeScript and JavaScript?',
            answer: `
          <p>No, TypeScript compiles down to plain JavaScript, so there is no performance overhead. The difference lies in the development experience, where TypeScript helps catch errors before they occur.</p>
          <p><strong>Example:</strong> TypeScript transpiles to JavaScript:</p>
          <pre><code>// TypeScript
let age: number = 25;

// JavaScript output after compilation
var age = 25;</code></pre>
        `
          },
          {
            question: 'Can I gradually introduce TypeScript into a JavaScript project?',
            answer: `
          <p>Yes, TypeScript can be introduced incrementally, starting with just a few files and gradually adding more as needed. This allows you to slowly adopt TypeScript without needing to rewrite your entire codebase.</p>
          <p><strong>Example:</strong> Adding TypeScript to a JavaScript project:</p>
          <pre><code>// Step 1: Install TypeScript
npm install typescript

// Step 2: Rename .js files to .ts
// Step 3: Start adding types to functions and variables</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1554774853-b415df9eeb92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D',
        category: 'TypeScript',
        categoryId: 4,
        readTime: '7 min',
        createdAt: '2024-09-15'
      },
      {
        id: 16,
        title: 'TypeScript Best Practices for React Developers',
        content: `
      <h2>Best Practices for Using TypeScript with React</h2>
      <p>TypeScript and React are a powerful combination for building large-scale, maintainable web applications. Following best practices ensures that your code is clean, scalable, and easier to manage in the long term.</p>
      <h3>1. Define Prop Types with Interfaces</h3>
      <p>Using TypeScript interfaces to define your component's props ensures that you catch errors at compile time, leading to fewer bugs in production.</p>
      <pre><code>interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;
);</code></pre>
      <h3>2. Use Type Inference</h3>
      <p>TypeScript has powerful type inference capabilities, so you don’t always need to explicitly define types. TypeScript will infer the type based on the context.</p>
      <pre><code>const count = 10;  // TypeScript infers this as a number</code></pre>
    `,
        faq: [
          {
            question: 'Why use TypeScript with React?',
            answer: `
          <p>Using TypeScript with React helps catch errors early in development by enforcing type safety. This leads to more robust and maintainable applications, especially in large-scale projects.</p>
          <p><strong>Example:</strong> Define prop types in React:</p>
          <pre><code>interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => (
  &lt;div&gt;
    &lt;h2&gt;{title}&lt;/h2&gt;
    &lt;p&gt;{content}&lt;/p&gt;
  &lt;/div&gt;
);</code></pre>
        `
          },
          {
            question: 'How can I define prop types in TypeScript?',
            answer: `
          <p>You can define prop types using interfaces or types in TypeScript. This provides better clarity on what data your components should expect, making your code more predictable and maintainable.</p>
          <p><strong>Example:</strong> Using interfaces for props:</p>
          <pre><code>interface UserProps {
  name: string;
  age: number;
}

const User: React.FC&lt;UserProps&gt; = ({ name, age }) => (
  &lt;div&gt;
    &lt;p&gt;Name: {name}&lt;/p&gt;
    &lt;p&gt;Age: {age}&lt;/p&gt;
  &lt;/div&gt;
);</code></pre>
        `
          },
          {
            question: 'Does using TypeScript slow down development?',
            answer: `
          <p>Initially, there may be a learning curve, but in the long run, TypeScript helps catch errors early and makes refactoring easier. This results in faster development over time, as you reduce the number of bugs and maintenance issues.</p>
          <p><strong>Example:</strong> Refactoring with TypeScript:</p>
          <pre><code>// Changing prop types during refactoring

interface ButtonProps {
  label: string;
  size: 'small' | 'large';
}

const Button: React.FC<ButtonProps> = ({ label, size }) => (
  &lt;button className={size}&gt;{label}&lt;/button&gt;
);</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D',
        category: 'TypeScript',
        categoryId: 4,
        readTime: '6 min',
        createdAt: '2024-10-11'
      },
      {
        id: 17,
        title: 'Introduction to Node.js',
        content: `
      <h2>Getting Started with Node.js</h2>
      <p>Node.js is a powerful JavaScript runtime that allows you to run JavaScript on the server. It has become the de facto standard for backend development in the JavaScript ecosystem, especially for building scalable network applications.</p>
      <h3>Why Use Node.js?</h3>
      <p>Node.js is known for its high performance, thanks to its non-blocking, event-driven architecture. This makes it ideal for building scalable applications that handle many concurrent requests, like web servers and real-time chat apps.</p>
      <h3>Building Your First Server</h3>
      <pre><code>const http = require('http');
const server = http.createServer((req, res) => {
  res.write('Hello, World!');
  res.end();
});
server.listen(3000);</code></pre>
      <p>This code creates a basic web server that listens on port 3000 and responds with "Hello, World!"</p>
    `,
        faq: [
          {
            question: 'What is Node.js?',
            answer: `
          <p>Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server side. It is widely used for building scalable network applications, such as web servers, APIs, and real-time applications.</p>
          <p><strong>Example:</strong> Creating a basic server:</p>
          <pre><code>const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
}).listen(8080);</code></pre>
        `
          },
          {
            question: 'Why is Node.js so fast?',
            answer: `
          <p>Node.js uses an event-driven, non-blocking architecture that allows it to handle multiple requests simultaneously without waiting for I/O operations to complete. This makes it highly efficient for handling large numbers of concurrent connections.</p>
          <p><strong>Example:</strong> Non-blocking I/O in Node.js:</p>
          <pre><code>const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});</code></pre>
        `
          },
          {
            question: 'What kind of applications can you build with Node.js?',
            answer: `
          <p>Node.js is commonly used to build web servers, RESTful APIs, real-time applications like chat apps, streaming services, and microservices. Its asynchronous nature makes it ideal for applications that require handling multiple requests simultaneously.</p>
          <p><strong>Example:</strong> Setting up an Express server:</p>
          <pre><code>const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1518644730709-0835105d9daa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D',
        category: 'Node.js',
        categoryId: 5,
        readTime: '5 min',
        createdAt: '2024-09-18'
      },
      {
        id: 18,
        title: 'Node.js vs PHP: Which One to Choose for Backend Development?',
        content: `
      <h2>Choosing Between Node.js and PHP for Backend Development</h2>
      <p>Node.js and PHP are two of the most popular choices for backend development. While both are powerful, they have different strengths and are suited for different types of projects.</p>
      <h3>Node.js: Asynchronous and Non-blocking</h3>
      <p>Node.js excels at handling large numbers of concurrent requests, making it a great choice for real-time applications, APIs, and microservices. Its non-blocking architecture allows it to efficiently handle I/O operations without waiting for tasks to complete.</p>
      <h3>PHP: Synchronous and Mature</h3>
      <p>PHP has been around for much longer and is widely used for traditional web development, including blogs, content management systems, and e-commerce platforms. It is synchronous, meaning it waits for one task to complete before starting another.</p>
    `,
        faq: [
          {
            question: 'Which is faster, Node.js or PHP?',
            answer: `
          <p>Node.js is generally faster due to its asynchronous, non-blocking nature. This allows Node.js to handle many requests at once without waiting for I/O operations to complete, making it ideal for real-time applications. PHP, on the other hand, is synchronous and may be slower for handling many concurrent requests.</p>
          <p><strong>Example:</strong> Non-blocking I/O in Node.js vs synchronous PHP:</p>
          <pre><code>// Node.js non-blocking
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// PHP synchronous
$content = file_get_contents('file.txt');
echo $content;</code></pre>
        `
          },
          {
            question: 'Can I use Node.js and PHP together?',
            answer: `
          <p>Yes, it is possible to integrate Node.js with a PHP backend, although it is not a common practice. For example, you can use PHP to manage traditional server-side rendering and Node.js for real-time features like chat or push notifications.</p>
          <p><strong>Example:</strong> Combining Node.js and PHP:</p>
          <pre><code>// Node.js handles real-time chat
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer();
const io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

server.listen(3000);

// PHP handles traditional requests
&lt;?php
$content = file_get_contents('index.html');
echo $content;
?&gt;</code></pre>
        `
          },
          {
            question: 'Which one is easier to learn?',
            answer: `
          <p>PHP is often considered easier to learn for beginners due to its simple syntax and ease of deployment. Node.js has a steeper learning curve because it requires a solid understanding of asynchronous programming and event-driven architectures.</p>
          <p><strong>Example:</strong> Basic PHP script vs basic Node.js script:</p>
          <pre><code>// Basic PHP script
&lt;?php
echo "Hello, World!";
?&gt;

// Basic Node.js script
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
}).listen(8080);</code></pre>
        `
          }
        ],
        bannerImage: 'https://plus.unsplash.com/premium_photo-1674055047782-76ccc87a1110?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D',
        category: 'Node.js',
        categoryId: 5,
        readTime: '7 min',
        createdAt: '2024-09-25'
      },
      {
        id: 19,
        title: 'Building RESTful APIs with Node.js',
        content: `
      <h2>Creating RESTful APIs Using Node.js and Express</h2>
      <p>RESTful APIs are a common way to structure the backend of web applications. With Node.js and the Express framework, you can easily create powerful APIs that serve data to your front-end applications.</p>
      <h3>Setting Up Express</h3>
      <p>Express is a lightweight and flexible Node.js framework used for building web applications and APIs. Here’s how you can set up a basic API using Express:</p>
      <pre><code>const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.json({ message: 'Hello API!' });
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});</code></pre>
    `,
        faq: [
          {
            question: 'What is a RESTful API?',
            answer: `
          <p>A RESTful API is an API that follows the REST architectural style, using standard HTTP methods like GET, POST, PUT, and DELETE to perform operations on data. REST stands for Representational State Transfer and is based on stateless, client-server communication.</p>
          <p><strong>Example:</strong> Using GET and POST in Express:</p>
          <pre><code>app.get('/api/data', (req, res) => {
  res.json({ data: 'Here is your data!' });
});

app.post('/api/data', (req, res) => {
  // Handle POST request
  res.status(201).json({ message: 'Data created' });
});</code></pre>
        `
          },
          {
            question: 'Why use Node.js for building APIs?',
            answer: `
          <p>Node.js is fast and scalable, making it a great choice for building APIs that need to handle a large number of concurrent requests. Its non-blocking architecture ensures that the server can respond quickly, even when dealing with heavy loads.</p>
          <p><strong>Example:</strong> Creating a simple GET route:</p>
          <pre><code>app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});</code></pre>
        `
          },
          {
            question: 'Can I use databases with Node.js APIs?',
            answer: `
          <p>Yes, Node.js can easily connect to databases like MongoDB, MySQL, and PostgreSQL to handle data for your API. For example, you can use Mongoose with MongoDB to manage your data models.</p>
          <p><strong>Example:</strong> Connecting Node.js to MongoDB using Mongoose:</p>
          <pre><code>const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true });

const User = mongoose.model('User', new mongoose.Schema({ name: String }));
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        category: 'Node.js',
        categoryId: 5,
        readTime: '6 min',
        createdAt: '2024-09-20'
      },
      {
        id: 20,
        title: 'Best Practices for Node.js Application Development',
        content: `
      <h2>Writing Scalable and Maintainable Node.js Applications</h2>
      <p>Node.js applications can grow quickly, and it’s essential to follow best practices to keep your code maintainable and scalable.</p>
      <h3>Use Environment Variables</h3>
      <p>Store sensitive information like API keys and database credentials in environment variables. This keeps your code secure and makes it easier to manage different environments (e.g., development, staging, production).</p>
      <pre><code>require('dotenv').config();

const apiKey = process.env.API_KEY;</code></pre>
      <h3>Implement Logging</h3>
      <p>Implement a logging library like Winston to capture important runtime information and errors in your Node.js applications.</p>
      <pre><code>const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});</code></pre>
    `,
        faq: [
          {
            question: 'What are environment variables?',
            answer: `
          <p>Environment variables are used to store configuration settings that should not be hardcoded in your application, like API keys or database URLs. Using environment variables allows for flexibility and improved security.</p>
          <p><strong>Example:</strong> Setting up environment variables with dotenv:</p>
          <pre><code>require('dotenv').config();
const apiKey = process.env.API_KEY;</code></pre>
        `
          },
          {
            question: 'Why is logging important in Node.js apps?',
            answer: `
          <p>Logging allows you to capture runtime errors and important events, making it easier to debug and monitor your application. It is essential for tracking issues in production environments.</p>
          <p><strong>Example:</strong> Setting up Winston for logging:</p>
          <pre><code>const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

logger.info('App started successfully');</code></pre>
        `
          },
          {
            question: 'How can I ensure my Node.js app is scalable?',
            answer: `
          <p>Following best practices like using load balancers, clustering, and asynchronous code can help your Node.js app scale effectively. Additionally, using tools like Redis for caching and scaling your database horizontally will improve performance.</p>
          <p><strong>Example:</strong> Using clustering in Node.js:</p>
          <pre><code>const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello, world!');
  }).listen(8000);
}</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        category: 'Node.js',
        categoryId: 5,
        readTime: '6 min',
        createdAt: '2024-10-02'
      },
      {
        id: 21,
        title: 'Introduction to Web Development',
        content: `
      <h2>Getting Started with Web Development</h2>
      <p>Web development involves building and maintaining websites for the internet or an intranet. It can range from creating simple static pages to complex web applications with dynamic functionality.</p>
      <h3>HTML, CSS, and JavaScript</h3>
      <p>At the core of web development are HTML (for structure), CSS (for styling), and JavaScript (for interactivity). Mastering these technologies is essential for building modern websites.</p>
      <h3>Client-Side vs. Server-Side Development</h3>
      <p>Client-side development focuses on what users see and interact with in the browser, while server-side development handles data storage, processing, and authentication on the backend.</p>
    `,
        faq: [
          {
            question: 'What is web development?',
            answer: `
          <p>Web development involves building and maintaining websites using technologies like HTML, CSS, and JavaScript. It includes both client-side (front-end) and server-side (back-end) development.</p>
          <p><strong>Example:</strong> A basic HTML structure:</p>
          <pre><code>&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My Website&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Welcome to My Website&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
        `
          },
          {
            question: 'What is the difference between front-end and back-end development?',
            answer: `
          <p>Front-end development focuses on what users see and interact with in the browser (using HTML, CSS, and JavaScript), while back-end development handles data processing, storage, and server-side operations (using databases, server-side scripting languages).</p>
          <p><strong>Example:</strong> Front-end and back-end interaction:</p>
          <pre><code>// Front-end JavaScript (AJAX request)
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));

// Back-end Node.js (Express API)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});</code></pre>
        `
          },
          {
            question: 'Can I learn web development without a computer science degree?',
            answer: `
          <p>Yes, many successful web developers are self-taught. There are plenty of resources online for learning web development from scratch, including free tutorials, courses, and documentation.</p>
          <p><strong>Example:</strong> Free online platforms for learning:</p>
          <ul>
            <li><a href="https://www.freecodecamp.org">freeCodeCamp</a></li>
            <li><a href="https://www.codecademy.com">Codecademy</a></li>
            <li><a href="https://www.mdnwebdocs.com">MDN Web Docs</a></li>
          </ul>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1651066471224-b970dd45acc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmxvZ3N8ZW58MHx8MHx8fDA%3D',
        category: 'Web Development',
        categoryId: 6,
        readTime: '5 min',
        createdAt: '2024-10-05'
      },
      {
        id: 22,
        title: 'Full Stack Web Development: An Overview',
        content: `
      <h2>Understanding Full Stack Web Development</h2>
      <p>Full stack web development involves working on both the front-end (client-side) and back-end (server-side) of web applications. A full stack developer is proficient in all aspects of web development, from designing user interfaces to managing databases.</p>
      <h3>What Does a Full Stack Developer Do?</h3>
      <p>Full stack developers handle both the front-end and back-end of web applications, which means they work with technologies like HTML, CSS, JavaScript, Node.js, and databases like MongoDB or SQL.</p>
      <h3>Benefits of Full Stack Development</h3>
      <p>Full stack developers have a deep understanding of how the entire web application works, making them valuable for troubleshooting issues and optimizing the overall performance.</p>
    `,
        faq: [
          {
            question: 'What is full stack web development?',
            answer: `
          <p>Full stack web development involves working on both the front-end and back-end of web applications. A full stack developer is capable of building and managing both aspects of a web project.</p>
          <p><strong>Example:</strong> Building a full stack application with React and Node.js:</p>
          <pre><code>// React front-end
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(setData);
  }, []);

  return (
    &lt;div&gt;
      {data.map(item => &lt;p key={item.id}&gt;{item.name}&lt;/p&gt;)}
    &lt;/div&gt;
  );
}

// Node.js back-end (Express)
app.get('/api/data', (req, res) => {
  res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
});</code></pre>
        `
          },
          {
            question: 'What technologies do full stack developers use?',
            answer: `
          <p>Full stack developers typically work with a combination of front-end tools (HTML, CSS, JavaScript) and back-end technologies (Node.js, databases). They are responsible for both user-facing features and server-side logic.</p>
          <p><strong>Example:</strong> Common full stack technologies:</p>
          <ul>
            <li><strong>Front-end:</strong> React, Angular, Vue.js</li>
            <li><strong>Back-end:</strong> Node.js, Express, Python (Django, Flask)</li>
            <li><strong>Databases:</strong> MongoDB, MySQL, PostgreSQL</li>
          </ul>
        `
          },
          {
            question: 'Why is full stack development important?',
            answer: `
          <p>Full stack developers have the versatility to work on both ends of the application, which improves problem-solving and speeds up development. They understand how the front-end and back-end interact, allowing them to optimize performance and manage deployments efficiently.</p>
          <p><strong>Example:</strong> The interaction between a full stack developer’s tools:</p>
          <pre><code>// Full stack project
// Front-end (React) fetches data from back-end (Node.js API)
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));</code></pre>
        `
          }
        ],
        bannerImage: 'https://plus.unsplash.com/premium_photo-1681755915233-9acafb348a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8QmxvZ3N8ZW58MHx8MHx8fDA%3D',
        category: 'Web Development',
        categoryId: 6,
        readTime: '7 min',
        createdAt: '2024-09-28'
      },
      {
        id: 23,
        title: 'Top Web Development Frameworks in 2024',
        content: `
      <h2>Best Web Development Frameworks for 2024</h2>
      <p>Web development frameworks provide a structure for building web applications, making it easier to develop complex projects quickly and efficiently. Here are some of the top frameworks for 2024.</p>
      <h3>React</h3>
      <p>React is a popular JavaScript library for building user interfaces. It is known for its virtual DOM and component-based architecture, which make it highly efficient and scalable.</p>
      <h3>Vue.js</h3>
      <p>Vue.js is another popular framework known for its simplicity and flexibility. It is a great choice for developers who want a lightweight and easy-to-learn framework.</p>
      <h3>Angular</h3>
      <p>Angular is a full-fledged framework for building large-scale applications. It comes with everything you need, including built-in routing and state management.</p>
    `,
        faq: [
          {
            question: 'What is the best framework for front-end development?',
            answer: `
          <p>React is currently one of the best frameworks for front-end development due to its efficiency, large community, and ecosystem of third-party libraries.</p>
          <p><strong>Example:</strong> A simple React component:</p>
          <pre><code>function App() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello, React!&lt;/h1&gt;
    &lt;/div&gt;
  );
}</code></pre>
        `
          },
          {
            question: 'Is Vue.js better than React?',
            answer: `
          <p>Vue.js is easier to learn and more lightweight, but React is more widely used in large-scale applications. The decision between Vue and React often comes down to the specific needs of your project.</p>
          <p><strong>Example:</strong> A simple Vue.js component:</p>
          <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;Hello, Vue!&lt;/h1&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: 'App'
}
&lt;/script&gt;</code></pre>
        `
          },
          {
            question: 'Why choose Angular?',
            answer: `
          <p>Angular is a complete framework that provides built-in tools for routing, state management, and form validation, making it ideal for complex applications. It offers a more opinionated structure than React or Vue.</p>
          <p><strong>Example:</strong> Setting up routing in Angular:</p>
          <pre><code>import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        category: 'Web Development',
        categoryId: 6,
        readTime: '8 min',
        createdAt: '2024-09-22'
      },
      {
        id: 24,
        title: 'Web Development Trends to Watch in 2024',
        content: `
      <h2>Top Web Development Trends for 2024</h2>
      <p>The web development landscape is constantly evolving, with new technologies and trends emerging every year. Here are some of the key trends to watch in 2024.</p>
      <h3>Progressive Web Apps (PWAs)</h3>
      <p>PWAs combine the best of web and mobile apps, offering fast loading times, offline capabilities, and a native app-like experience.</p>
      <h3>Serverless Architecture</h3>
      <p>Serverless computing allows developers to build and deploy applications without managing servers, making it easier to scale and reduce costs.</p>
      <h3>AI-Powered Chatbots</h3>
      <p>AI-powered chatbots are becoming increasingly popular for providing customer support and improving user engagement on websites.</p>
    `,
        faq: [
          {
            question: 'What are Progressive Web Apps?',
            answer: `
          <p>PWAs are web apps that offer fast loading times, offline functionality, and a native app-like experience on mobile devices. They bridge the gap between traditional websites and native mobile apps.</p>
          <p><strong>Example:</strong> Adding a service worker to a PWA:</p>
          <pre><code>navigator.serviceWorker.register('/sw.js')
  .then(registration => {
    console.log('Service Worker registered with scope:', registration.scope);
  })
  .catch(error => {
    console.error('Service Worker registration failed:', error);
  });</code></pre>
        `
          },
          {
            question: 'What is serverless architecture?',
            answer: `
          <p>Serverless architecture allows developers to build and deploy applications without the need to manage infrastructure. It is called "serverless" because the cloud provider handles the server management for you.</p>
          <p><strong>Example:</strong> Using AWS Lambda to handle a request:</p>
          <pre><code>exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda!' }),
  };
};</code></pre>
        `
          },
          {
            question: 'How are AI-powered chatbots used in web development?',
            answer: `
          <p>AI-powered chatbots are used to automate customer support and improve user engagement on websites. They can handle common queries, reduce the workload on human support teams, and improve response times.</p>
          <p><strong>Example:</strong> Implementing a simple chatbot using Dialogflow:</p>
          <pre><code>const { SessionsClient } = require('@google-cloud/dialogflow');
const client = new SessionsClient();

async function detectIntent(projectId, sessionId, text) {
  const sessionPath = client.projectAgentSessionPath(projectId, sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: 'en-US',
      },
    },
  };
  const response = await client.detectIntent(request);
  return response.queryResult.fulfillmentText;
}</code></pre>
        `
          }
        ],
        bannerImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        category: 'Web Development',
        categoryId: 6,
        readTime: '6 min',
        createdAt: '2024-09-30'
      }
      // You can continue similarly for other blogs.
    ];


    // Function to check if the date is today or earlier
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const today = new Date();
      const isPastOrToday = date <= today;

      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-GB', options);

      return isPastOrToday ? 'Recently Added' : formattedDate;
    };

    const blogsWithFormattedDate = demoBlogs.map(blog => ({
      ...blog,
      formattedDate: formatDate(blog.createdAt)
    }));

    setBlogs(blogsWithFormattedDate);
  }, []);

  // Filter the blog list based on the selected category
  const filteredBlogs = Number(id) === 0
    ? blogs
    : blogs.filter((blog: any) => blog.categoryId === Number(id));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    const copyAlert: any = document.querySelector('.blog-list-copy-alert');
    if (copyAlert) {
      copyAlert.style.display = 'block';
      setTimeout(() => {
        copyAlert.style.display = 'none';
      }, 1000);
    }
  };

  const handleWhatsAppShare = () => {
    const pageUrl = window.location.href; // Get the current page URL
    const message = `Check out this page: ${pageUrl}`; // The message to be shared
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`; // Encode URL

    window.open(whatsappUrl, '_blank'); // Open WhatsApp in a new tab
  };

  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <Link to="/categories" className="blog-list-back">
          <i className="fas fa-arrow-left blog-list-back-icon"></i> Go To Categories
        </Link>
        <div className="blog-list-share">
          <div className="share-icons blog-list-share">
            <i className="fab fa-whatsapp blog-list-share-icon" onClick={handleWhatsAppShare}></i>
            <i className="fas fa-copy blog-list-share-icon" onClick={handleCopyLink}></i>
          </div>
        </div>
      </div>

      {/* View All Button placed above the category list */}
      <div className="view-all-container">
        <Link to="/blogs" className="view-all-link">
          <i className="fas fa-th"></i> View All Blogs
        </Link>
      </div>

      {/* Blog list grid */}
      <div className="blog-list-grid">
        {filteredBlogs.map((blog: any) => (
          <div key={blog.id} className="blog-list-card">
            <div className="blog-labels">
              <span className="blog-category-label">{blog.category}</span>
              <span className="blog-date-label">{blog.formattedDate}</span>
            </div>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={blog.bannerImage} alt={blog.title} />
              <div className="blog-list-card-content">
                <h3 className="blog-list-title">
                  {blog.title.length > 30 ? `${blog.title.slice(0, 30)}...` : blog.title}
                </h3>
                <p className="blog-list-read-time">
                  <i className="fas fa-clock"></i> {blog.readTime} read
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="blog-list-copy-alert">
        Link copied to clipboard!
      </div>
    </div>
  );
};

export default BlogsListByCategoryId;
