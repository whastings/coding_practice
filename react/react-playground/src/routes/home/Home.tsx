import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>React Playground</h1>
      <nav>
        <ul>
          <li>
            <Link to="/react-19-forms">React 19 Forms</Link>
          </li>
          <li>
            <Link to="/useDeferredValue">useDeferredValue</Link>
          </li>
          <li>
            <Link to="/useOptimistic">useOptimistic</Link>
          </li>
          <li>
            <Link to="/useTransition">useTransition</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}

export default Home;
