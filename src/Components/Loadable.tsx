import { Suspense, LazyExoticComponent, ComponentType } from 'react';
import { LinearProgressProps } from '@mui/material/LinearProgress';
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

interface LoaderProps extends LinearProgressProps {}

const Loadable = (
    Component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>
) => (props: LoaderProps) => (
    <Suspense fallback={<Loader />}>
        {typeof Component === 'function' ? <Component {...props} /> : null}
    </Suspense>
);

export default Loadable;
