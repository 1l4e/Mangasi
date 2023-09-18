
function Overlay({ show, onClick }:any) {
  return (
    show && (
      <div
        className="fixed top-0 left-0 w-full h-full  z-90"
        onClick={onClick}
      ></div>
    )
  );
}

export default Overlay;