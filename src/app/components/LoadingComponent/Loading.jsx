import Spinner from "../SpinnerComponent/Spinner";

const Loading = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-neutral-700/50 dark:bg-neutral-900/50 z-50">
        <Spinner/>
      </div>
    </>
  );
}

export default Loading;