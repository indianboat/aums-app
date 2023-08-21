import Spinner from "./components/SpinnerComponent/Spinner";

export default function Loading() {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white/50 dark:bg-neutral-700/50 z-50">
        <Spinner/>
      </div>
    </>
  );
}
