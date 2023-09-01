const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 text-center ">
      <p className="text-gray-600">
        &copy; {new Date().getFullYear()} Your Hospital Name. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
