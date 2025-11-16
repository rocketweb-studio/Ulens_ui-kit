import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgIconPolygon3 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={7} height={5} viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}><path d="M3.46411 4.5L9.53674e-06 0L6.92821 0L3.46411 4.5Z" fill="currentColor"/></svg>;
const ForwardRef = forwardRef(SvgIconPolygon3);
const Memo = memo(ForwardRef);
export default Memo;
