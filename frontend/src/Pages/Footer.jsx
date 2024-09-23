import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 poppins-medium ">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {/* About Section */}
        <div>
          <h3 className="text-white font-bold mb-4">ABOUT</h3>
          <ul className="space-y-2 flex flex-col">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/shop/listing" className="hover:text-gray-200">
              Products
            </Link>
            <Link to="/" className="hover:text-gray-200">
              About
            </Link>
            <li>
              <a
                href="mailto:codersurajverma@gmail.com?subject=Contact%20Us&body=Hi%20there!"
                className="hover:text-gray-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Group Companies Section */}
        <div>
          <h3 className="text-white font-bold mb-4">GROUP COMPANIES</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-200">
                Myntra
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Cleartrip
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Shopsy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Amazon
              </a>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="text-white font-bold mb-4">HELP</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-200">
                Payments
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Cancellation & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                FAQ
              </a>
            </li>

          </ul>
        </div>

        {/* Consumer Policy Section */}
        <div>
          <h3 className="text-white font-bold mb-4">CONSUMER POLICY</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-200">
                Cancellation & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Terms Of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Privacy
              </a>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="container mx-auto text-center text-sm text-gray-400 py-4 border-t border-gray-700 mt-8">
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-200">
            Become a Seller
          </a>
          <a href="#" className="hover:text-gray-200">
            Advertise
          </a>
          <a href="#" className="hover:text-gray-200">
            Gift Cards
          </a>
          <a href="#" className="hover:text-gray-200">
            Help Center
          </a>
        </div>
        <p className="mt-4 ">&copy; 2007-2024 || <a className='hover:text-white' href="https://e-comarce-2.onrender.com"> E-Comarce</a></p>
      </div>
    </footer>
  );
};

export default Footer;
