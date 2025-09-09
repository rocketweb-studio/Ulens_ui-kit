import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgIconEmailOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" ref={ref} {...props}><g clipPath="url(#Icon-email-outline_svg__a)"><path fill="currentColor" d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 1.2 0L20 7.25V17a1 1 0 0 1-1 1" /></g><defs><clipPath id="Icon-email-outline_svg__a"><path fill="currentColor" d="M0 0h24v24H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(SvgIconEmailOutline);
const Memo = memo(ForwardRef);
export default Memo;