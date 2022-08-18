import { usePersistedState } from './hooks';

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

export default App;
