const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 mt-6">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} AnjolaDev. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;