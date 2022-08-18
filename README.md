## Review

We've been learning how to create dynamic components that react to user input, trigger side-effects based on changes and create our own hooks. Lets review with a custom web-hook that is a twist on `useState`, it allows to persist a JSON object in `localStorage`:

```jsx
const usePersistedState = (storageKey, fallbackValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(storageKey);

    if (storedValue === null || !storedValue) {
      return fallbackValue;
    }

    try {
      return JSON.parse(storedValue);
    } catch (e) {
      console.log('Error parsing stored value', e);
      return null;
    }
  });

  useEffect(() => {
    if (value) {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }, [value]);

  return [
    value,
    setValue,
    () => {
      setValue(fallbackValue);
    },
  ];
};
```

and a sample `App` to test it:

```jsx
const App = () => {
  const [value, setValue, resetValue] = usePersistedState('myJson', {
    a: 1,
    b: 2,
  });

  return (
    <div>
      <button
        onClick={() => {
          setValue({
            ...value,
            [new Date().getTime()]: 'new value',
          });
        }}
      >
        Update
      </button>
      <button onClick={() => resetValue()}>Clear</button>
      <div>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </div>
  );
};
```

## Context

Component state allows us to make a component react to changes and upates. A parent component can pass state to children as props, including current values and setters:

```jsx
const GrandParent = () => {
  const [count, setCount] = useState(0);
  return <Parent count={count} setCount={setCount}/>
}

const Parent = ({ count, setCount }) => {
  return <div>
    <div>Parent Count: {count}</div>
    <Button count={count} setCount={setCount}/>
  </div>
}

const Button = ({ count, setCount }) => {
  return <button onClick={() => setCount(count + 1)}>Current {count}</button>;
}
```

As an application grows, so does the number of components and the amount of state that we need to manage. Passing state down to every child component is not scalable and is known as "prop drilling". There's no industry standard as to how many levels are acceptable but personally 2 or 3 is where it starts getting hard to manage. To avoid prop drilling, we have to introduce a new concept called **Context**. Context allows sharing state with an entire component sub-tree without explicitly passing it down through `props`. Lets see how it works:

```jsx
// First we'll create our context
export const AppContext = React.createContext({});

const GrandParent = () => {
  const [count, setCount] = useState(0);
  
  // Then we wrap all children components in a Provider,
  // which will "provide" access to a value to all descendants
  return <AppContext.Provider value={{
    count,
    setCount
  }}>
    <Parent />
  </AppContext.Provider>
}

const Parent = () => {
  const { count } = useContext(AppContext);

  return <div>
    <div>Parent Count: {count}</div>
    <Button />
  </div>
}

const Button = () => {
  const { count, setCount } = useContext(AppContext);
  return <button onClick={() => setCount(count + 1)}>Current {count}</button>;
}
```

Lets abstract this a bit more by creating a little Blog app. First we'll create our provider in a separate file:

`BlogProvider.js`
```jsx
const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  return (
    <BlogContext.Provider
      value={{
        selectedPostId,
        setSelectedPostId,
        posts,
        createPost: ({ title, body }) => {
          const id = posts.length + 1;
          setPosts([...posts, { id, title, body }]);
        },
        retrievePost: ({ postId }) => posts.find(post => `${post.id}` === `${postId}`),
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
```

Now create a component that we can use to create new posts:

`NewPost.js`
```jsx
const NewPost = () => {
  const { createPost } = useContext(BlogContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <PostWrapper>
      <Title>
        <Input placeholder="Title..." value={title} onChange={e => setTitle(e.target.value)} />
      </Title>
      <TextArea value={body} onChange={e => setBody(e.target.value)} />
      <Button
        onClick={() => {
          createPost({ title, body });
          setTitle('');
          setBody('');
        }}
      >
        Submit
      </Button>
    </PostWrapper>
  );
};
```

Then we will create another component to render an existing Post. 

`Post.js`
```jsx
const InnerPost = ({ post }) => {
  const { updatePost, setSelectedPostId } = useContext(BlogContext);

  const [values, setValues] = useState({
    title: post.title,
    body: post.body,
  });

  // Most applications have an read/edit mode but in our example
  // you can always edit the post
  useEffect(() => {
    updatePost({
      ...post,
      ...values,
    });
  }, [values]);

  return (
    <PostWrapper>
      <FakeLink onClick={() => setSelectedPostId(null)}>All Posts</FakeLink>
      <Title>
        <Input
          value={post.title}
          onChange={e => {
            setValues(v => ({ ...v, title: e.target.value }));
          }}
        />
      </Title>
      <Body>
        <TextArea
          value={post.body}
          onChange={e => {
            setValues(v => ({ ...v, body: e.target.value }));
          }}
        />
      </Body>
    </PostWrapper>
  );
};

const Post = ({ postId }) => {
  const { retrievePost } = useContext(BlogContext);
  const post = retrievePost({ postId });

  // Note that we cannot do this in a single component because we 
  // would violate the non-conditional rendering rule of hooks. This
  // is one of the main criticisms of hooks
  if (!post) return <div>Not Found</div>;

  return <InnerPost post={post} />;
};
```

Lastly, we'll glue all of this together:

`Blog.js`
```jsx
const Blog = () => {
  const { selectedPostId, setSelectedPostId, posts } = useContext(BlogContext);
  if (selectedPostId) return <Post postId={selectedPostId} editable />;

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {posts.map(post => (
          <PostWrapper key={post.id} onClick={() => setSelectedPostId(post.id)}>
            <Title>{post.title}</Title>
          </PostWrapper>
        ))}
      </div>
      <NewPost />
    </div>
  );
};

// Again, note here that we broke this up into two components because <Blog/>
// needs to use useContext. 
const Wrapped = () => {
  return (
    <BlogProvider>
      <BlogStyle />
      <Blog />
    </BlogProvider>
  );
};

export default Wrapped;
```