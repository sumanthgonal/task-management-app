export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#features" className="text-base text-gray-300 hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-base text-gray-300 hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/about" className="text-base text-gray-300 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/blog" className="text-base text-gray-300 hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/help" className="text-base text-gray-300 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="text-base text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/privacy" className="text-base text-gray-300 hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-base text-gray-300 hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 