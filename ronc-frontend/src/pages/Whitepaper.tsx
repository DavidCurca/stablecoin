import { Download } from "lucide-react";

export default function Whitepaper(props: { className: string }) {
  return (
    <div className={props.className}>
      <h1 className="text-center text-bold text-2xl mb-5">Whitepaper — these are the original documents from the RONCOIN Team</h1>
      <div className="flex items-center justify-center gap-2">
        <div className="bg-gray-100 flex flex-col items-center justify-center w-[500px] h-[120px] gap-5 p-2">
          <p>Whitepaper Romanian (Original)</p>
          <div className="flex items-center justify-center gap-2 bg-blue-500 p-2 rounded-md cursor-pointer w-full text-white">Download <Download /></div>
        </div>
        <div className="bg-gray-100 flex flex-col items-center justify-center w-[500px] h-[120px] gap-2 p-2">
          <p>Whitepaper Englush</p>
          <div className="flex items-center justify-center gap-2 bg-blue-500 p-2 rounded-md cursor-pointer w-full text-white">Download <Download /></div>
        </div>
      </div>
    </div>
  );
}