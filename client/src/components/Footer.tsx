const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <div className="flex mt-10 p-2 rounded-md bg-indigo-500/50 text-white text-center">
      Copyright &copy; Nayan Bastola. {currentYear}
    </div>
  );
};

export default Footer;
