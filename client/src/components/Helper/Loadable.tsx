import { Suspense } from "react";
import Loading from "./Loading";

const Loadable =
  (Component: React.ReactNode | JSX.Element | any) => (props: any) => {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
