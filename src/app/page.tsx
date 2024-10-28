import Navbar from "./components/navbar";
import Card from "./components/cards";
import data from "./embbedings.json";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="grid grid-cols-3 space-x-4">
          {
            data.map((item) => {
              return (
                <Card
                  key={item.uniqueName}
                  imageSrc={item.imageSrc}
                  title={item.title}
                  description={item.description}
                  redirectLink={`/element`}
                  redirectText={item.redirectText}
                  element={item.element}
                  type={item.type}
                  uniqueName={item.uniqueName}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}