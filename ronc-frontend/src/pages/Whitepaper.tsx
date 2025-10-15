import { Download } from "lucide-react";
import { Link } from "react-router";


interface DocMetadata {
    name: string,
    url: string,
}

export default function Whitepaper(props: { className: string }) {
  const documents: DocMetadata[] = [
    {name: "Whitepaper Romanian (Original)", url: "/whitepaper/whitepaper_RO.pdf"},
    {name: "Whitepaper English", url: "/whitepaper/whitepaper_EN.pdf"},
  ]
  return (
    <div className={`${props.className} pb-16`}>
      <h1 className="text-center text-bold text-2xl mb-5">
        Whitepaper — these are the original documents from the RONCOIN Team
      </h1>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {documents.map((document) => 
          <div key={document.name} className="bg-gray-100 flex flex-col items-center justify-center w-[90vw] max-w-[500px] h-[120px] gap-5 p-2 border-2 border-gray-200 rounded-md">
            <p>{document.name}</p>
            <Link to={document.url} target="_blank" rel="noopener noreferrer" className="w-full">
              <div className="flex items-center justify-center gap-2 bg-blue-500 p-2 rounded-md cursor-pointer w-full text-white">
                Download <Download />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
