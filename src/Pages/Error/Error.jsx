import { Link } from 'react-router-dom';

function Error() {
  return (
    <div>
      <div className="grid h-screen place-content-center bg-primary px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-secondary">404</h1>

          <p className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-secondary">We cannot find that page.</p>

          <Link
            to="/"
            className="mt-6 inline-block rounded bg-secondary px-5 py-3 text-sm font-medium text-primary hover:bg-opacity-90 focus:outline-none focus:ring focus:ring-secondary"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
