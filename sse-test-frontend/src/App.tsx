import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/stream3');
    eventSource.onmessage = ({ data }) => {
      const aa = JSON.parse(data);
      console.log('aa: ', typeof aa);
      console.log('New message', aa);
    };
  }, []);

  return (
    <div>hello</div>
  );
}

export default App;
