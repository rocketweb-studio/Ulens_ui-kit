import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgIconPolygon2 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={7} height={5} viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}><path d="M3.46411 0L6.92821 4.5H9.77516e-06L3.46411 0Z" fill="currentColor"/></svg>;
const ForwardRef = forwardRef(SvgIconPolygon2);
const Memo = memo(ForwardRef);
export default Memo;

