

function Upbar() {
  return (
    <div className="upbar flex flex-row justify-between items-center p-4 border-b-2 border-gray-300">
      <div className="">
        <div className="">Code Editor</div>
      </div>
      <div className=" flex flex-row items-center">
        <button className=" bg-blue-500 text-white px-4 py-2 rounded">Run</button>
      </div>
    </div>
  )
}

export default Upbar