import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex">
      <div className="w-4/5 ml-auto mt-20 flex flex-col justify-center items-center space-y-4">
        <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
        <h4 className="py-10 text-lg text-red-500 font-semibold capitalize">
          The Nothingness and Emptiness is here...
        </h4>
        <p>
          Use the search box or the links below to explore our amazing
          application
        </p>
        <input
          className="w-4/5 px-6 py-3 border border-gray-400 rounded-full"
          type="search"
          placeholder="Just a dummy search box..."
        />
        <div className="space-x-4">
          <Link
            className="underline text-blue-600 hover:text-red-500 duration-300"
            href="/"
          >
            Homepage
          </Link>
          <Link
            className="underline text-blue-600 hover:text-red-500 duration-300"
            href="/latest"
          >
            Latest Products
          </Link>
          <Link
            className="underline text-blue-600 hover:text-red-500 duration-300"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
