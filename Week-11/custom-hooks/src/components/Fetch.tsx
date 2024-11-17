import { useEffect, useState } from 'react';
import { ResponseData, useFetch } from '../hooks/useFetch';
import { usePrev } from '../hooks/usePrev';
import axios from 'axios';
import { useDebounce } from '../hooks/useDebounce';

function Fetch() {
  const [postNumber, SetPostNumber] = useState(1);
  const [value, setValue] = useState('1');
  const [displayValue, setDisplayValue] = useState();
  const {
    responseData,
    loading,
  }: { responseData: ResponseData | null; loading: Boolean } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postNumber}`
  );

  const prev = usePrev(responseData);

  const getSearchResponse = async (value: string) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${value}`
    );

    return response.data;
  };

  const debouncedValue = useDebounce(value, 200);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSearchResponse(debouncedValue);
      setDisplayValue(result);
    };
    fetchData();
  }, [debouncedValue]);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div>
      <p>USerId: {JSON.stringify(responseData?.userId)}</p>
      <p>PostId: {JSON.stringify(responseData?.id)}</p>
      <p>Title: {JSON.stringify(responseData?.title)}</p>
      <p>Body: {JSON.stringify(responseData?.body)}</p>
      {/* <p>{JSON.stringify(responseData)}</p> */}
      <button onClick={() => SetPostNumber((num) => num + 1)}>
        Next Todos
      </button>
      <input type="number" name="Input todo number" id="todoId" />
      <button
        onClick={() => {
          const inputElement = document.getElementById(
            'todoId'
          ) as HTMLInputElement;
          const inputValue = inputElement
            ? parseInt(inputElement.value, 10)
            : postNumber;
          SetPostNumber(inputValue);
        }}
      >
        Post Number
      </button>
      <div>Prev is {JSON.stringify(prev)}</div>

      <input type="number" onChange={(e) => setValue(e.target.value)} />
      <p>{JSON.stringify(displayValue)}</p>
    </div>
  );
}

export default Fetch;
