import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;